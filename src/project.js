
function Project(title, description='', dueDate='', priority=''){

    const projectAbout = () => console.log({title, description, dueDate, priority})
    return {title, description, dueDate, priority, projectAbout};
}

function SubTask(description) {
    return {description}
}

export {Project, SubTask};