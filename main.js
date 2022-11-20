window.addEventListener('load',()=>{
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
    },1000);
})