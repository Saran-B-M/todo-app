import "normalize.css/normalize.css"
import "./styles/base.css"
import "./styles/home.css"
import "./styles/project.css"
import homeLogo from "./images/home-outline.png"

import * as bL from "./project"

const displayController = (function(){
    const body = document.querySelector("body");
    let content='';

    const createNavBar  = () => {
        const header = document.createElement("header");

        const homeLogoEle = new Image();
        homeLogoEle.src = homeLogo;
        homeLogoEle.addEventListener("click", createHomePage);
        
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
    
        header.appendChild(homeLogoEle);
        header.appendChild(dateDayTime)
    
        body.append(header)
    }

    const createNewProject = function(){
        content = document.createElement("div");
        content.classList.add("content-newProject");
        
        const heading = document.createElement("h1");
        heading.textContent = "New Project";

        const newProjectForm = document.createElement("div");

        const projectTitle = document.createElement("label");
        projectTitle.textContent = "Title";
        const projectTitleInput = document.createElement("input");
        projectTitleInput.id = 'title';
        projectTitle.appendChild(projectTitleInput);

        const projectDescription = document.createElement("label");
        projectDescription.textContent = "Description";
        const projectDescriptionInput = document.createElement("input");
        projectDescriptionInput.id = "description";
        projectDescription.appendChild(projectDescriptionInput);

        const projectDueDate = document.createElement("label");
        projectDueDate.textContent = "Due-Date";
        const projectDueDateInput = document.createElement("input");
        projectDueDateInput.id = "duedate";
        projectDueDate.appendChild(projectDueDateInput);

        const projectPriority = document.createElement("label");
        projectPriority.textContent = "Priority";
        const projectPriorityInput = document.createElement("input");
        projectPriorityInput.id = "priority";
        projectPriority.appendChild(projectPriorityInput);

        const createProject = document.createElement("button");
        createProject.textContent = "Create";

        createProject.addEventListener("click", ()=>{
            let title = document.querySelector("#title").value;
            let description = document.querySelector("#description").value;
            let dueDate = document.querySelector("#duedate").value;
            let priority = document.querySelector("#priority").value;

            let newProject = bL.Project(title, description, dueDate, priority);
            console.log(newProject);
            bL.projectList.push(newProject);
            body.removeChild(content);
            createProjectPage(newProject.title);
        })

        newProjectForm.appendChild(projectTitle);
        newProjectForm.appendChild(projectDescription);
        newProjectForm.appendChild(projectDueDate);
        newProjectForm.appendChild(projectPriority);
        newProjectForm.appendChild(createProject);

        content.appendChild(heading);
        content.appendChild(newProjectForm);

        body.appendChild(content);
    }

    const  createHomePage = function(){
        if(content) body.removeChild(content);
        content = document.createElement("div");
        content.classList.add("content-home");

        const greetings = document.createElement("h1");
        greetings.classList.add("greetings")
        greetings.textContent = "Hi Saran!";

        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("project-container");

        const projectHeadingDiv = document.createElement("div");
        const projectHeading = document.createElement("h2");
        projectHeading.textContent = "What do you like to work on?";
        const newProjectBtn = document.createElement("button");
        newProjectBtn.textContent = "New Project";

        newProjectBtn.addEventListener("click", ()=> {
            body.removeChild(content);
            createNewProject();
        })

        projectHeadingDiv.appendChild(projectHeading);
        projectHeadingDiv.appendChild(newProjectBtn);

        const projects = document.createElement("div");
        projects.classList.add("projects");

        const eventListeners = function() {
            const openProject = (e) => {
                
            }

            return {openProject};
        }

        for(let project of bL.projectList){
            let projectBtn = document.createElement("button");
            projectBtn.classList.add("project");
            projectBtn.textContent = project.title;
            
            projectBtn.id = project.title;
            projectBtn.addEventListener('click', (e)=>{
                body.removeChild(content);
                createProjectPage(e.target.id);
            });
            projects.appendChild(projectBtn);

        }

        projectsContainer.appendChild(projectHeadingDiv);
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

        content = document.createElement("div");
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
        createHomePage();
        //createProjectPage("1st Project");
    };

    createPage();
    
})()
