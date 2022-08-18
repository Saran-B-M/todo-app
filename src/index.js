// Create a todo application

// The Header shows the current date, day and time in the header and also a back
// button in the projects page

/// ///////////////////////////////Home Page/////////////////////////////////////
// The home page of the app lists all the projects that you are currently
// working on and also shows a list of subtasks that is used to write any quick
// to dos. A greetings message will be shown - There is a separate section to
// take general notes

// The projects are colored as red, blue and grey to show the priority of each
// and also are sorted according to the priority - they also show due dates in
// the top right.
// A scroll will be used in case if the no of subtasks exceeds a limit.

// The subtasks shows a list of general quick to-dos that are shown line by line
// There will be a button to add subtasks and they will be appended to the list
// A scroll will be used in case if the no of subtasks exceeds a limit.

// The notes comes under the subtasks div and used to take general notes.
// There will be a button to add notes and they will be appended to the list
// A scroll will be used in case if the no of notes exceeds a limit.

// Future Features: the subtasks or the notes can be clicked upon and a new page
// dedicated to view or remove or add to the lists

/// ////////////////////////////Project Page/////////////////////////////////////
// Has a description about the project - it's priority and its due date - It also
// have a side bar that contains notes about the project
// It lists all the subtasks that are necessary to finish the project along with
// priority and due date. The subtasks lists some tasks that are necessary to
// finish the subtask.

/// ///////////////////////////Architecture//////////////////////////////////////
// displayController controls all the display element in the page
// project module controls the business logic of the page

import './displayController';
