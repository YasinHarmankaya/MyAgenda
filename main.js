window.addEventListener('load',()=>{
    todos = JSON.parse(localStorage.getItem('todos'))||[];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    
    newTodoForm.addEventListener('submit', e =>{
        e.preventDefault();
        const todo ={
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done:false,
            createdAt: new Date().getTime()
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();
        
        DisplayTodos();
    })
    DisplayTodos();
    
    
    // Open WeatherMap Api
    // Building Query
    const apiKey = '';
    const url = 'https://api.openweathermap.org/data/2.5/';
    const setQuery = (e)=>{
        if(e.keyCode=='13')
        getResult(cityInput.value)
        
    }
    
    const getResult = (cityName)=>{
        let setQuery =`${url}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;
        fetch(setQuery)
        .then(weather=>{
            return weather.json()
        }).then(displayResults)
    }

    const displayResults = (result) =>{
        weathers = JSON.parse(localStorage.getItem('weathers'))||[];
        console.log(weathers)
        let city =document.querySelector('.city');
        let temp =document.querySelector('.temp');
        let desc =document.querySelector('.desc');
        let minMax =document.querySelector('.minMax');
        city.innerText =`${result.name},${result.sys.country}`;
        temp.innerText =`${result.main.temp}°C`;
        desc.innerText = `${result.weather[0].description.toUpperCase()}`;
        minMax.innerText = `${result.main.temp_min}°C/${result.main.temp_max}°C`;
        const weather = {
            city: result.name,
            temp: result.main.temp,
            desc:result.weather[0].description,
            min: result.main.temp_min,
            max: result.main.temp_max
        }
        weathers.push(weather);
        localStorage.setItem('weathers',JSON.stringify(weathers));
    }


    
    
    const cityInput = document.querySelector('#searchBar');
    cityInput.addEventListener('keypress',setQuery )
    // End Of Open WeatherMap Api

    // Prayer Time Api
    const prayerApiUrl ='https://api.aladhan.com/v1/timingsByCity?'
    const PrayerQuery = (e)=>{
        if(e.keyCode=='13')
        getPrayerCityTimings(prayerCityInput.value)
    }

    const getPrayerCityTimings = (prayerCityName) =>{
        let setPrayerQuery = `${prayerApiUrl}city=${prayerCityName}&country=Turkey&method=13`;
        fetch(setPrayerQuery).then(timings =>{
            return timings.json()
        }).then(displayTimings)
    }

    const displayTimings = (times)=>{
        console.log(times)
        let imsak = document.querySelector('.imsak');
        let gunes = document.querySelector('.gunes');
        let ogle = document.querySelector('.ogle');
        let ikindi = document.querySelector('.ikindi');
        let aksam = document.querySelector('.aksam');
        let yatsi = document.querySelector('.yatsi');
        let prayerCityName = document.querySelector('.prayerCityName');
        imsak.innerText = `${times.data.timings.Imsak}`;
        gunes.innerText =`${times.data.timings.Sunrise}`;
        ogle.innerText =`${times.data.timings.Dhuhr}`;
        ikindi.innerText =`${times.data.timings.Asr}`;
        aksam.innerText =`${times.data.timings.Maghrib}`;
        yatsi.innerText =`${times.data.timings.Isha}`;
        prayerCityName.innerText =`${prayerCityInput.value}`

    }
    const prayerCityInput = document.querySelector('.prayerCity')
    prayerCityInput.addEventListener('keypress', PrayerQuery)
    // End of Prayer Time Api 

    // Quran Api Application
    setInterval(()=>{
        let randomAyah =Math.floor(Math.random()* 6236)
        console.log(randomAyah)
        const QuranApiUrl = 'https://api.alquran.cloud/v1/ayah/'
        let getRadomAyah = ()=>{
            let setAyahQuery = `${QuranApiUrl}${randomAyah}/tr.yazir`;
            fetch(setAyahQuery)
            .then(ayahs =>{
                return ayahs.json()
            }).then(displayAyah)
            
        }
        const displayAyah = (ayah)=>{
            console.log(ayah)
            let surahAyah = document.querySelector('.ayah');
            let surahAndAyahNumber = document.querySelector('.surahAndAyahNumber');
            surahAyah.innerText =`${ayah.data.text}`;
            surahAndAyahNumber.innerText =`${ayah.data.surah.number}/${ayah.data.numberInSurah}`;
            
        }
        getRadomAyah()
    },100000)
    
    // End of Quran Api Application
})
function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML ='';

    todos.forEach(todo => {

        // Assignment and creating elements
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const label =document.createElement('label');
        const input = document.createElement('input');
        const span =document.createElement('span')
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        // Styling elements
        input.type="checkbox";
        input.checked =todo.done;
        span.classList.add('bubble');
        if(todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('business')
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit')
        deleteButton.classList.add('delete')
        content.innerHTML =`<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML ='Düzenle';
        deleteButton.innerHTML='Sil';

        // Constructing html
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done')
        }

        input.addEventListener('click', e=>{
            todo.done=e.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }
            DisplayTodos();
        })
        edit.addEventListener('click', e=>{
            const input =content.querySelector('input');
            const end = input.value.length;
            input.removeAttribute('readonly');
            input.setSelectionRange(end, end)
            input.focus();
            input.addEventListener('blur', e=>{
                input.setAttribute('readonly', true);
                todo.content =e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e=>{
            todos = todos.filter(t=>t!=todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            DisplayTodos();
        })
    });
}
setInterval(()=>{
    // Date Time arrangements
    //Date arrangements
    const date = new Date();
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();
    //Time arrangements
    const time=date.getHours()+":"+date.getMinutes();
    const datetime = document.querySelector("p");
    datetime.innerText= day +"."+ month+"."+year+"/"+ time;
},100000);
