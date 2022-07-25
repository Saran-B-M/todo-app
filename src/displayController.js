import "normalize.css/normalize.css"
import "./styles/styles.css"
import logoImage from "./images/logo.png"

import { Project, SubTask } from "./project"

const displayController = (function(){

    const createNavBar  = () => {
        const header = document.createElement("header");
        const body = document.querySelector("body");
        
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
    
        header.appendChild(dateDayTime)
    
        body.append(header)
    }


    function createHomePage(){
        const body = document.querySelector("body");
        const content = document.createElement("div");
        content.classList.add("content-home");

        const greetings = document.createElement("h1");
        greetings.classList.add("greetings")
        greetings.textContent = "Hi Saran!";

        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("project-container");

        const projectHeading = document.createElement("h2");
        projectHeading.textContent = "What do you like to work on?";

        const projects = document.createElement("div");
        projects.classList.add("projects");

        const p1 = Project("Lorem Ipsum");
        const p2 = Project("Lorem Ipsum");
        const p3 = Project("Lorem Ipsum");

        let projectList = [];
        projectList.push(p1);
        projectList.push(p2);
        projectList.push(p3);
        

        for(let project of projectList){
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            let projectTitle = document.createElement("h3");
            projectTitle.textContent = project.title;
            projectDiv.appendChild(projectTitle);

            projects.appendChild(projectDiv);

        }

        projectsContainer.appendChild(projectHeading);
        projectsContainer.appendChild(projects);

        const subTaskContainer = document.createElement("div");
        subTaskContainer.classList.add("subtasks-container");
        
        const subTaskHeading = document.createElement("h2");
        subTaskHeading.textContent = "Sub Tasks";

        const subTasks = document.createElement("div");
        subTasks.classList.add("subtasks");

        let s1 = SubTask("poganum");
        let s2 = SubTask("poitu irruken");
        let s3 = SubTask("poiten");

        let subTaskList = [];
        subTaskList.push(s1);
        subTaskList.push(s2);
        subTaskList.push(s3);

        subTaskList.forEach((subTask => {
            let subTaskDiv = document.createElement("h3");
            subTaskDiv.textContent = subTask.description;

            subTasks.appendChild(subTaskDiv);
        }))

        subTaskContainer.appendChild(subTaskHeading);
        subTaskContainer.appendChild(subTasks);

        content.appendChild(greetings);
        content.appendChild(projectsContainer);
        content.appendChild(subTaskContainer);

        body.appendChild(content);

    }
    const createPage = function(){
        createNavBar();
        createHomePage();
    };

    createPage();
    
})()
