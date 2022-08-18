import { format, differenceInDays } from 'date-fns';

function Notes(description) {
  return { description };
}

function Project(title, description = '', dueDate = '', priority = '') {
  const notes = [];
  const subTasks = [];
  const projectAbout = () => console.log({
    title, description, dueDate, priority,
  });

  const addSubTask = (project, subTaskHeading) => {
    if (subTaskHeading) {
      const subTask = SubTask(subTaskHeading);
      project.subTasks.push(subTask);
      updateStorage();
    }
  };
  const removeSubTask = (project, p) => {
    const subTaskIndex = project.subTasks.indexOf(p);
    project.subTasks.splice(subTaskIndex, 1);
    updateStorage();
  };
  const addNote = (project, note) => {
    if (note) {
      const newNote = Notes(note);
      project.notes.push(newNote);
      updateStorage();
    }
  };
  const removeNote = (project, note) => {
    const noteIndex = project.notes.indexOf(note);
    project.notes.splice(noteIndex, 1);
    updateStorage();
  };

  return Object.assign(Object.create({}), {
    title,
    description,
    dueDate,
    priority,
    notes,
    subTasks,
    addSubTask,
    removeSubTask,
    addNote,
    removeNote,
  });
}

function SubTask(title) {
  let priority;
  const tasks = [];

  const addTask = (subTask, task) => {
    if (task) {
      const newTask = Notes(task);
      subTask.tasks.push(newTask);
      updateStorage();
    }
  };
  const removeTask = (subTask, task) => {
    const subIndex = subTask.tasks.indexOf(task);
    subTask.tasks.splice(subIndex, 1);
    updateStorage();
  };
  return {
    title, priority, tasks, addTask, removeTask,
  };
}

// Create a module named Clock that does the date manipulations
const Clock = (function () {
  const today = new Date();

  const getDay = () => format(today, 'EEEE');
  const getDate = (date = today) => format(date, 'dd/MM/yy');
  const getTime = () => format(new Date(), 'hh:mm:ss a');
  const diffDays = (date1, date2) => differenceInDays(date1, date2);

  return {
    getDay, getDate, getTime, diffDays,
  };
}());

const projectList = [];
if (localStorage.getItem('projectList')) {
  const projectListJSON = JSON.parse(localStorage.getItem('projectList'));
  projectListJSON.forEach((project) => {
    const newProject = Project(
      project.title,
      project.description,
      project.dueDate,
      project.priority,
    );
    project.notes.forEach((note) => {
      newProject.notes.push(Notes(note.description));
    });
    project.subTasks.forEach((subTask) => {
      console.log(subTask);
      const newSubTask = SubTask(subTask.title);
      subTask.tasks.forEach((task) => {
        newSubTask.tasks.push(Notes(task.description));
      });
      newProject.subTasks.push(newSubTask);
    });
    projectList.push(newProject);
  });
}

let generalSubTasks = [];
if (localStorage.getItem('generalSubTasks')) {
  const generalSubTasksJSON = localStorage.getItem('generalSubTasks');
  generalSubTasks = JSON.parse(generalSubTasksJSON);
}

let generalNotes = [];
if (localStorage.getItem('generalNotes')) {
  const generalNotesJSON = localStorage.getItem('generalNotes');
  generalNotes = JSON.parse(generalNotesJSON);
}

// create a function called updateStorage that updates the local storage of the
// browser every time a change occurs in the projects, subtasks, notes...

// Change the current values to JSON string
// Update the localStorage's keys with the JSON string
function updateStorage() {
  const projectListJSON = JSON.stringify(projectList);
  const generalSubTasksJSON = JSON.stringify(generalSubTasks);
  const generalNotesJSON = JSON.stringify(generalNotes);

  localStorage.setItem('projectList', projectListJSON);
  localStorage.setItem('generalSubTasks', generalSubTasksJSON);
  localStorage.setItem('generalNotes', generalNotesJSON);
}

// Create a function that creates a new project with the given values and adds
// it to the project list

// create a project object with the given values
// push the project to the project list
// return
function addNewProject(title, description, dueDateStr, priority) {
  if (title) {
    let dueDate;
    if (dueDateStr) {
      dueDate = new Date(dueDateStr);
    }
    const newProject = Project(title, description, dueDate, priority);
    projectList.push(newProject);
    updateStorage();
  }
}

function removeProject(project) {
  const projectIndex = projectList.indexOf(project);
  projectList.splice(projectIndex, 1);
  updateStorage();
}

function addNewSubTask(task) {
  if (task) {
    const subTask = Notes(task);
    generalSubTasks.push(subTask);
    updateStorage();
  }
}

function removeSubTask(task) {
  if (task) {
    const subTaskIndex = generalSubTasks.indexOf(task);
    generalSubTasks.splice(subTaskIndex, 1);
    updateStorage();
  }
}

function addNewNote(note) {
  if (note) {
    const newNote = Notes(note);
    generalNotes.push(newNote);
    updateStorage();
  }
}

function removeNote(note) {
  if (note) {
    const noteIndex = generalNotes.indexOf(note);
    generalNotes.splice(noteIndex, 1);
    updateStorage();
  }
}

export {
  projectList,
  generalNotes,
  generalSubTasks,
  Project,
  SubTask,
  addNewSubTask,
  removeSubTask,
  addNewNote,
  removeNote,
  addNewProject,
  removeProject,
  Clock,
};

// Use localStorage of web storage API to store the projects

// When adding/editing a project set the projectList again to the local storage
