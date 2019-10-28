function crud() {

    const setActiveTask = function(activeTask) {
        localStorage.setItem('active_task', JSON.stringify(activeTask));
    }

    const getActiveTask = () => JSON.parse(localStorage.getItem('active_task')) || {};

    const removeActiveTask = () => {
        localStorage.removeItem('active_task');
    }

    return {
        setActiveTask: setActiveTask,
        getActiveTask: getActiveTask,
        removeActiveTask: removeActiveTask
    }
}

export default crud();