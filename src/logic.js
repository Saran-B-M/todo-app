function Notes(description){
    return {description}
}


function Project(title, description='', dueDate='', priority=''){
    let notes = [];
    let subTasks = [];
    const projectAbout = () => console.log({title, description, dueDate, priority});

    const addSubTask = (project, subTaskHeading) => {
        if(subTaskHeading){
            let subTask = SubTask(subTaskHeading);
            project.subTasks.push(subTask);
        }
    }
    const removeSubTask = (project, p) => {
        let subTaskIndex = project.subTasks.indexOf(p);
        project.subTasks.splice(subTaskIndex, 1);
    }
    const addNote = (project, note) => {
        if(note) {
            let newNote = Notes(note);
            project.notes.push(newNote);
        }  
    }
    const removeNote = (project, note) => {
        let noteIndex = project.notes.indexOf(note);
        project.notes.splice(noteIndex, 1);
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
        }
    }
    const removeTask = (subTask, task) => {
        let subIndex = subTask.tasks.indexOf(task);
        subTask.tasks.splice(subIndex, 1);
    }
    return {title, priority, tasks, addTask, removeTask};
}

let s1 = SubTask("poganum");
s1.tasks.push(Notes('sub1'));
s1.tasks.push(Notes('sub2'));
s1.tasks.push(Notes('sub3'));

let s2 = SubTask("poitu irruken");
let s3 = SubTask("poiten");

const p1 = Project("1st Project");
p1.description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusamus totam, quo culpa suscipit ipsa reiciendis libero rerum sint aperiam est, aliquam vel ad amet. Provident tenetur tempora enim commodi.
Repudiandae incidunt, perferendis in esse magnam ratione harum qui ducimus expedita doloremque placeat iste cupiditate temporibus modi. Magni, voluptatem sint. Molestiae assumenda dolore, doloribus quae velit minus expedita nemo accusamus.`
p1.dueDate = '26/07/22';
p1.priority = 'High';
p1.subTasks.push(s1);
p1.subTasks.push(s2);
p1.subTasks.push(s3);
p1.notes.push(Notes("Lorem ipsum dolor sit."));
p1.notes.push(Notes("Lorem ipsum dolor sit."));
p1.notes.push(Notes("Lorem ipsum dolor sit."));

const p2 = Project("Lorem Ipsum");
const p3 = Project("Lorem Ipsum");
let projectList = [];
projectList.push(p1);
projectList.push(p2);
projectList.push(p3);

let n1 = Notes("Lorem ipsum dolor sit.");
let n2 = Notes("Lorem ipsum dolor sit.");
let n3 = Notes("Lorem ipsum dolor sit.");
let generalSubTasks = [];
generalSubTasks.push(n1);
generalSubTasks.push(n2);
generalSubTasks.push(n3);


let generalNotes = [];
generalNotes.push(n1);
generalNotes.push(n2);
generalNotes.push(n3);

//Create a function that creates a new project with the given values and adds 
//it to the project list

//create a project object with the given values
//push the project to the project list
//return
function addNewProject(title, description, dueDate, priority){
    if(title){
        let newProject = Project(title, description, dueDate, priority);
        projectList.push(newProject);
    }
    return;
}

function removeProject(project){
    let projectIndex = projectList.indexOf(project);
    projectList.splice(projectIndex,1);
}

function addNewSubTask(task){
    if(task) {
        let subTask = Notes(task);
        generalSubTasks.push(subTask);
    }
    return
}

function removeSubTask(task){
    if(task) {
        let subTaskIndex = generalSubTasks.indexOf(task);
        generalSubTasks.splice(subTaskIndex, 1);
    }
}

function addNewNote(note){
    if(note) {
        let newNote = Notes(note);
        generalNotes.push(newNote);
    }
}

function removeNote(note){
    if(note){
        let noteIndex = generalNotes.indexOf(note);
        generalNotes.splice(noteIndex, 1);
    }
}



export {projectList, generalNotes, generalSubTasks, Project, SubTask,
    addNewSubTask, removeSubTask, addNewNote, removeNote, addNewProject, removeProject};