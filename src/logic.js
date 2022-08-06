import { format, differenceInDays } from 'date-fns';

function Notes(description){
    return {description};
}


function Project(title, description='', dueDate='', priority=''){
    let notes = [];
    let subTasks = [];
    const projectAbout = () => console.log({title, description, dueDate, priority});

    const addSubTask = (project, subTaskHeading) => {
        if(subTaskHeading){
            let subTask = SubTask(subTaskHeading);
            project.subTasks.push(subTask);     
            updateStorage();   
        }
    }
    const removeSubTask = (project, p) => {
        let subTaskIndex = project.subTasks.indexOf(p);
        project.subTasks.splice(subTaskIndex, 1);
        updateStorage();
    }
    const addNote = (project, note) => {
        if(note) {
            let newNote = Notes(note);
            project.notes.push(newNote);
            updateStorage();
        }  
    }
    const removeNote = (project, note) => {
        let noteIndex = project.notes.indexOf(note);
        project.notes.splice(noteIndex, 1);
        updateStorage();
    }

    
    return Object.assign(Object.create({}), {title, description, dueDate, priority, notes, subTasks, addSubTask,
        removeSubTask, addNote, removeNote});
}

function SubTask(title) {
    let priority;
    let tasks = [];

    const addTask = (subTask, task) => {
        if(task){
            let newTask = Notes(task);
            subTask.tasks.push(newTask);
            updateStorage();
        }
    }
    const removeTask = (subTask, task) => {
        let subIndex = subTask.tasks.indexOf(task);
        subTask.tasks.splice(subIndex, 1);
        updateStorage();
    }
    return {title, priority, tasks, addTask, removeTask};
}

//Create a module named Clock that does the date manipulations
const Clock = (function(){
    let today = new Date();

    const getDay = () => format(today, "EEEE");
    const getDate = (date=today) => format(date, "dd/MM/yy");
    const getTime = () => format(new Date(), "hh:mm:ss a")
    const diffDays = (date1, date2) => differenceInDays(date1, date2);


    return {getDay, getDate, getTime, diffDays}
})();

// let s1 = SubTask("poganum");
// s1.tasks.push(Notes('sub1'));
// s1.tasks.push(Notes('sub2'));
// s1.tasks.push(Notes('sub3'));

// let s2 = SubTask("poitu irruken");
// let s3 = SubTask("poiten");

// const p1 = Project("1st Project");
// p1.description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusamus totam, quo culpa suscipit ipsa reiciendis libero rerum sint aperiam est, aliquam vel ad amet. Provident tenetur tempora enim commodi.
// Repudiandae incidunt, perferendis in esse magnam ratione harum qui ducimus expedita doloremque placeat iste cupiditate temporibus modi. Magni, voluptatem sint. Molestiae assumenda dolore, doloribus quae velit minus expedita nemo accusamus.`
// p1.dueDate = '26/07/22';
// p1.priority = 'High';
// p1.subTasks.push(s1);
// p1.subTasks.push(s2);
// p1.subTasks.push(s3);
// p1.notes.push(Notes("Lorem ipsum dolor sit."));
// p1.notes.push(Notes("Lorem ipsum dolor sit."));
// p1.notes.push(Notes("Lorem ipsum dolor sit."));

// const p2 = Project("Lorem Ipsum");
// const p3 = Project("Lorem Ipsum");
let projectList = [];
if(localStorage.getItem("projectList")) {
    let projectListJSON = JSON.parse(localStorage.getItem("projectList"));
    for(let project of projectListJSON){
        let newProject = Project(project.title, project.description, project.dueDate,
            project.priority);
        for(let note of project.notes){
            newProject.notes.push(Notes(note.description));
        }
        for(let subTask of project.subTasks){
            console.log(subTask);
            let newSubTask = SubTask(subTask.title);
            for(let task of subTask.tasks){
                newSubTask.tasks.push(Notes(task.description))
            }
            newProject.subTasks.push(newSubTask);
        }
        projectList.push(newProject);
    }
}
// projectList.push(p1);
// projectList.push(p2);
// projectList.push(p3);

// let n1 = Notes("Lorem ipsum dolor sit.");
// let n2 = Notes("Lorem ipsum dolor sit.");
// let n3 = Notes("Lorem ipsum dolor sit.");
let generalSubTasks = [];
if(localStorage.getItem('generalSubTasks')){
    let generalSubTasksJSON = localStorage.getItem('generalSubTasks');
    generalSubTasks = JSON.parse(generalSubTasksJSON);
}
// generalSubTasks.push(n1);
// generalSubTasks.push(n2);
// generalSubTasks.push(n3);


let generalNotes = [];
if(localStorage.getItem('generalNotes')){
    let generalNotesJSON = localStorage.getItem('generalNotes');
    generalNotes = JSON.parse(generalNotesJSON);
}
// generalNotes.push(n1);
// generalNotes.push(n2);
// generalNotes.push(n3);

//create a function called updateStorage that updates the local storage of the 
//browser every time a change occurs in the projects, subtasks, notes...

//Change the current values to JSON string
//Update the localStorage's keys with the JSON string
function updateStorage(){
    let projectListJSON = JSON.stringify(projectList);
    let generalSubTasksJSON = JSON.stringify(generalSubTasks);
    let generalNotesJSON = JSON.stringify(generalNotes);

    localStorage.setItem("projectList", projectListJSON);
    localStorage.setItem("generalSubTasks", generalSubTasksJSON);
    localStorage.setItem("generalNotes", generalNotesJSON);
}

//Create a function that creates a new project with the given values and adds 
//it to the project list

//create a project object with the given values
//push the project to the project list
//return
function addNewProject(title, description, dueDate, priority){
    if(title){
        if(dueDate) dueDate = new Date(dueDate);
        let newProject = Project(title, description, dueDate, priority);
        projectList.push(newProject);
        updateStorage();

    }
}

function removeProject(project){
    let projectIndex = projectList.indexOf(project);
    projectList.splice(projectIndex,1);
    updateStorage();
}

function addNewSubTask(task){
    if(task) {
        let subTask = Notes(task);
        generalSubTasks.push(subTask);
        updateStorage();
    }

}

function removeSubTask(task){
    if(task) {
        let subTaskIndex = generalSubTasks.indexOf(task);
        generalSubTasks.splice(subTaskIndex, 1);
        updateStorage();
    }
}

function addNewNote(note){
    if(note) {
        let newNote = Notes(note);
        generalNotes.push(newNote);
        updateStorage();
    }
}

function removeNote(note){
    if(note){
        let noteIndex = generalNotes.indexOf(note);
        generalNotes.splice(noteIndex, 1);
        updateStorage();
    }
}



export {projectList, generalNotes, generalSubTasks, Project, SubTask,
    addNewSubTask, removeSubTask, addNewNote, removeNote, addNewProject, 
    removeProject, Clock};


    //Use localStorage of web storage API to store the projects

    //When adding/editing a project set the projectList again to the local storage