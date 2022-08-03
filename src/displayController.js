import "normalize.css/normalize.css"
import "./styles/base.css"
import "./styles/home.css"
import "./styles/project.css"
import homeLogo from "./images/home-outline.png"

import * as logic from "./logic"

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
        if(content) body.removeChild(content);
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
        projectDueDateInput.id = "dueDate";
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

            logic.addNewProject(title, description, dueDate, priority);
            createProjectPage(title);
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

        newProjectBtn.addEventListener("click", createNewProject);

        projectHeadingDiv.appendChild(projectHeading);
        projectHeadingDiv.appendChild(newProjectBtn);

        const projects = document.createElement("div");
        projects.classList.add("projects");

        for(let project of logic.projectList){
            let projectBtn = document.createElement("button");
            projectBtn.classList.add("project");
            projectBtn.textContent = project.title;
            
            projectBtn.id = project.title;
            projectBtn.addEventListener('click', (e)=>{
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

        const newSubTask = document.createElement("div");
        newSubTask.classList.add("newSubTask");
        const newSubTaskInput = document.createElement("input");
        newSubTaskInput.id = "newSubTask";
        const addNewSubTaskBtn = document.createElement("button");
        addNewSubTaskBtn.textContent = "Add";
        addNewSubTaskBtn.addEventListener("click", ()=>{
            logic.addNewSubTask(newSubTaskInput.value);     
            createHomePage();
        })
        newSubTask.appendChild(newSubTaskInput);
        newSubTask.appendChild(addNewSubTaskBtn);

        logic.generalSubTasks.forEach((subTask => {
            let subTaskDiv = document.createElement("div");

            let subTaskDescription = document.createElement("h3")
            subTaskDescription.textContent = subTask.description;

            let removeSubTask = document.createElement("button");
            removeSubTask.textContent = "X";
            removeSubTask.addEventListener("click", ()=>{
                logic.removeSubTask(subTask);
                createHomePage();
            })

            subTaskDiv.appendChild(subTaskDescription);
            subTaskDiv.appendChild(removeSubTask);
            subTasks.appendChild(subTaskDiv);

        }))

        subTaskContainer.appendChild(subTaskHeading);
        subTaskContainer.appendChild(subTasks);
        subTaskContainer.appendChild(newSubTask);

        const notesContainer = document.createElement("div");
        notesContainer.classList.add("notes-container");
        
        const notesHeading = document.createElement("h2");
        notesHeading.textContent = "Notes";

        const notes = document.createElement("div");
        notes.classList.add("notes");

        const newNotes = document.createElement("div");
        newNotes.classList.add("newNotes");
        const newNotesInput = document.createElement("input");
        newNotesInput.id = "newNotes";
        const addNewNotesBtn = document.createElement("button");
        addNewNotesBtn.textContent = "Add";
        addNewNotesBtn.addEventListener("click", ()=>{
            logic.addNewNote(newNotesInput.value);
            createHomePage();
        })
        newNotes.appendChild(newNotesInput);
        newNotes.appendChild(addNewNotesBtn); 

        logic.generalNotes.forEach((note => {
            let noteDiv = document.createElement("div");

            let notesDescription = document.createElement("h3")
            notesDescription.textContent = note.description;

            let removeNote = document.createElement("button");
            removeNote.textContent = "X";
            removeNote.addEventListener("click", ()=>{
                logic.removeNote(note);
                createHomePage();
            })

            noteDiv.appendChild(notesDescription);
            noteDiv.appendChild(removeNote);
            
            notes.appendChild(noteDiv);
        }))

        notesContainer.appendChild(notesHeading);
        notesContainer.appendChild(notes);
        notesContainer.appendChild(newNotes);
        

        content.appendChild(greetings);
        content.appendChild(projectsContainer);
        content.appendChild(subTaskContainer);
        content.appendChild(notesContainer);

        body.appendChild(content);

    }

    //Create a function called create Project page that takes a project title 
    //and shows the relevant data about the project
    const createProjectPage = function(projectTitle){
        if(content) body.removeChild(content); 
        let project;
        logic.projectList.forEach((p)=>{
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

        const subTasksHeadingContainer = document.createElement("div");
        subTasksHeadingContainer.classList.add("subtasks-heading-container");

        const subTasksHeading = document.createElement("h2");
        subTasksHeading.textContent = "Sub Tasks";
        const addSubtaskBtn = document.createElement("button");
        addSubtaskBtn.textContent = "New Subtask";
        addSubtaskBtn.addEventListener("click", ()=>{
            let subTaskHeading = prompt("What's the title of the subtask?");
            project.addSubTask(project, subTaskHeading); 
            createProjectPage(project.title);
        })

        subTasksHeadingContainer.appendChild(subTasksHeading);
        subTasksHeadingContainer.appendChild(addSubtaskBtn);

        const subTasks = document.createElement("div");
        subTasks.classList.add("project-subTasks");

        for(let subTask of project.subTasks){
            let subTaskDiv = document.createElement("div");
            subTaskDiv.classList.add("project-subTask"); 

            let subHeadingDiv = document.createElement("div");

            let subTaskTitle = document.createElement("h3");
            subTaskTitle.textContent = subTask.title;

    
            let removeSubTask = document.createElement("button");
            removeSubTask.textContent = "X";
            removeSubTask.addEventListener("click", ()=>{
                project.removeSubTask(project, subTask);
                createProjectPage(project.title);
            })
    
            subHeadingDiv.appendChild(subTaskTitle);
            subHeadingDiv.appendChild(removeSubTask);
            
            subTaskDiv.appendChild(subHeadingDiv);

            for(let sub of subTask.tasks){
                let subDiv = document.createElement("div");

                let subDescription = document.createElement("p")
                subDescription.textContent = sub.description;
    
                let removeSub = document.createElement("button");
                removeSub.textContent = "X";
                removeSub.addEventListener("click", ()=>{
                    subTask.removeTask(subTask, sub);
                    createProjectPage(project.title);
                })
    
                subDiv.appendChild(subDescription);
                subDiv.appendChild(removeSub);
                
                subTaskDiv.appendChild(subDiv);
            }


            const newTask = document.createElement("div");
            newTask.classList.add("newTask");
            const newTaskInput = document.createElement("input");
            newTaskInput.id = "newTask";
            const addNewTaskBtn = document.createElement("button");
            addNewTaskBtn.textContent = "Add";
            addNewTaskBtn.addEventListener("click", ()=>{
                subTask.addTask(subTask, newTaskInput.value)
                createProjectPage(project.title);

            })
            newTask.appendChild(newTaskInput);
            newTask.appendChild(addNewTaskBtn);
            subTaskDiv.appendChild(newTask);

            subTasks.appendChild(subTaskDiv);

        }

        subTasksContainer.appendChild(subTasksHeadingContainer);
        subTasksContainer.appendChild(subTasks);

        const notesContainer = document.createElement("div");
        notesContainer.classList.add("notes-container");
        
        const notesHeading = document.createElement("h2");
        notesHeading.textContent = "Notes";

        const notes = document.createElement("div");
        notes.classList.add("notes");

        const newNote = document.createElement("div");
        newNote.classList.add("newNote");
        const newNoteInput = document.createElement("input");
        newNoteInput.id = "newNote";
        const addNewNoteBtn = document.createElement("button");
        addNewNoteBtn.textContent = "Add";
        addNewNoteBtn.addEventListener("click", ()=>{
            project.addNote(project, newNoteInput.value);
            createProjectPage(project.title);

        })
        newNote.appendChild(newNoteInput);
        newNote.appendChild(addNewNoteBtn);

        project.notes.forEach((note => {
            let noteDiv = document.createElement("div");

            let notesDescription = document.createElement("h3")
            notesDescription.textContent = note.description;

            let removeNote = document.createElement("button");
            removeNote.textContent = "X";
            removeNote.addEventListener("click", ()=>{
                project.removeNote(project, note);
                createProjectPage(project.title)
            })

            noteDiv.appendChild(notesDescription);
            noteDiv.appendChild(removeNote);
            
            notes.appendChild(noteDiv);
        }));

        notesContainer.appendChild(notesHeading);
        notesContainer.appendChild(notes);
        notesContainer.appendChild(newNote);

        projectInfoContainer.appendChild(notesContainer);

        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.textContent = "Delete Project";
        deleteProjectBtn.addEventListener("click", ()=>{
            logic.removeProject(project);
            createHomePage();
        })
        content.appendChild(projectInfoContainer);
        content.appendChild(subTasksContainer);
        content.appendChild(deleteProjectBtn);
        

        body.appendChild(content);
        
    }


    const createPage = function(){
        createNavBar();
        createHomePage();
    };

    createPage();
    
})()
