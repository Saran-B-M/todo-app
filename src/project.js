function Notes(description){
    return {description}
}


function Project(title, description='', dueDate='', priority=''){
    let notes = [];
    let subTasks = [];
    const projectAbout = () => console.log({title, description, dueDate, priority})
    return {title, description, dueDate, priority, notes, subTasks, projectAbout};
}

function SubTask(title) {
    let priority;
    let tasks = [];
    return {title, priority, tasks};
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


let subTaskList = [];
subTaskList.push(s1);
subTaskList.push(s2);
subTaskList.push(s3);

let n1 = Notes("Lorem ipsum dolor sit.");
let n2 = Notes("Lorem ipsum dolor sit.");
let n3 = Notes("Lorem ipsum dolor sit.");
let generalNotes = [];
generalNotes.push(n1);
generalNotes.push(n2);
generalNotes.push(n3);

export {Project, SubTask, Notes, projectList, subTaskList, generalNotes};