import "./styles/styles.css"
import logoImage from "./images/logo.png"


const displayController = (function(){

    const createNavBar  = () => {
        const header = document.createElement("header");
        const body = document.querySelector("body");
        const logo = new Image();
        logo.src = logoImage;
        logo.classList.add("logo");
        
        const dateDayTime = document.createElement("div");
        dateDayTime.classList.add("dateDayTime")
        const day = document.createElement("div");
        day.textContent = "Friday";
        const date = document.createElement("div");
        date.textContent = "22/07/22";
        const time = document.createElement("div");
        time.textContent = "10:10 am";
    
        dateDayTime.appendChild(day);
        dateDayTime.appendChild(date);
        dateDayTime.appendChild(time);
    
        header.appendChild(logo);
        header.appendChild(dateDayTime)
    
        body.append(header)
    }

    const createPage = function(){
        createNavBar();
    };

    createPage();
    
})()
