function crud() {

    const setActiveTask = function(activeTask) {
        localStorage.setItem('active_task', JSON.stringify(activeTask));
    };

    const updateTaskListofToday = taskList => {
        const date = getTodayTag();
        const taskListObj  = getFullTaskList();
        taskListObj[date] = taskList;
        localStorage.setItem('task_list', JSON.stringify(taskListObj));
    };

    const getTodayTag = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}-${month}-${day}`;
    }

    const getActiveTask = () => JSON.parse(localStorage.getItem('active_task')) || {};

    const getFullTaskList = () => JSON.parse(localStorage.getItem('task_list')) || {};

    const getTaskListOfToday = () => {
        const date = getTodayTag();
        const taskListObj = getFullTaskList();
        return taskListObj[date] || []
    };

    const removeActiveTask = () => {
        localStorage.removeItem('active_task');
    };

    return {
        setActiveTask: setActiveTask,
        getActiveTask: getActiveTask,
        removeActiveTask: removeActiveTask,
        updateTaskListofToday: updateTaskListofToday,
        getTaskListOfToday: getTaskListOfToday
    };
}

export default crud();