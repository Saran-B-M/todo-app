import "normalize.css/normalize.css"
import "./styles/base.css"
import "./styles/home.css"
import "./styles/project.css"
import logoImage from "./images/logo.png"

import * as bL from "./project"

const displayController = (function(){
    const body = document.querySelector("body");

    const createNavBar  = () => {
        const header = document.createElement("header");
        
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


    const  createHomePage = function(){
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

        for(let project of bL.projectList){
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

        bL.subTaskList.forEach((subTask => {
            let subTaskDiv = document.createElement("h3");
            subTaskDiv.textContent = subTask.description;

            subTasks.appendChild(subTaskDiv);
        }))

        subTaskContainer.appendChild(subTaskHeading);
        subTaskContainer.appendChild(subTasks);

        const notesContainer = document.createElement("div");
        notesContainer.classList.add("notes-container");
        
        const notesHeading = document.createElement("h2");
        notesHeading.textContent = "Notes";

        const notes = document.createElement("div");
        notes.classList.add("notes");

        bL.generalNotes.forEach((note => {
            let noteDiv = document.createElement("h3");
            noteDiv.textContent = note.description;

            notes.appendChild(noteDiv);
        }))

        notesContainer.appendChild(notesHeading);
        notesContainer.appendChild(notes);
        

        content.appendChild(greetings);
        content.appendChild(projectsContainer);
        content.appendChild(subTaskContainer);
        content.appendChild(notesContainer);

        body.appendChild(content);

    }

    //Create a function called create Project page that takes a project title 
    //and shows the relevant date about the project
    const createProjectPage = function(projectTitle){
        let project;
        bL.projectList.forEach((p)=>{
            if(p.title===projectTitle) project = p;
        });

        const content = document.createElement("div");
        content.classList.add("content-project");

        const projectInfoContainer = document.createElement("div");
        projectInfoContainer.classList.add("project-info");

        const projectHeading = document.createElement("h1");
        projectHeading.textContent = project.title;

        const projectDueDate = document.createElement("p");
        projectDueDate.textContent = `Due date: ${project.dueDate}`;

        const projectDescriptionContainer = document.createElement("div");
        const projectDescriptionHeading = document.createElement("h2");
        projectDescriptionHeading.textContent = "Description:";
        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectDescriptionContainer.appendChild(projectDescriptionHeading);
        projectDescriptionContainer.appendChild(projectDescription);

        projectInfoContainer.appendChild(projectHeading);
        projectInfoContainer.appendChild(projectDueDate);
        projectInfoContainer.appendChild(projectDescriptionContainer);

        const subTasksContainer = document.createElement("div");
        subTasksContainer.classList.add("project-subtasks-container");

        const subTasksHeading = document.createElement("h2");
        subTasksHeading.textContent = "Sub Tasks";
        

        const subTasks = document.createElement("div");
        subTasks.classList.add("project-subTasks");

        for(let p of project.subTasks){
            let subTaskDiv = document.createElement("div");
            subTaskDiv.classList.add("project-subTask");
            let subTaskTitle = document.createElement("h3");
            subTaskTitle.textContent = p.title;
            subTaskDiv.appendChild(subTaskTitle);

            for(let sub of p.tasks){
                let subTaskP = document.createElement("p");
                subTaskP.textContent = sub.description;
                subTaskDiv.appendChild(subTaskP);
            }
            

            subTasks.appendChild(subTaskDiv);

        }

        subTasksContainer.appendChild(subTasksHeading);
        subTasksContainer.appendChild(subTasks);

        const notesContainer = document.createElement("div");
        notesContainer.classList.add("notes-container");
        
        const notesHeading = document.createElement("h2");
        notesHeading.textContent = "Notes";

        const notes = document.createElement("div");
        notes.classList.add("notes");

        project.notes.forEach((note => {
            let noteDiv = document.createElement("h3");
            noteDiv.textContent = note.description;

            notes.appendChild(noteDiv);
        }))

        notesContainer.appendChild(notesHeading);
        notesContainer.appendChild(notes);

        projectInfoContainer.appendChild(notesContainer);
        content.appendChild(projectInfoContainer);
        content.appendChild(subTasksContainer);
        

        body.appendChild(content);
        
    }


    const createPage = function(){
        createNavBar();
        //createHomePage();
        createProjectPage("1st Project");
    };

    createPage();
    
})()
