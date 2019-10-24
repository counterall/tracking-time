function crud() {

    const setActiveTask = function(activeTask) {
        localStorage.setItem('active_task', JSON.stringify(activeTask));
    }

    const getActiveTask = () => JSON.parse(localStorage.getItem('active_task')) || {};

    return {
        setActiveTask: setActiveTask,
        getActiveTask: getActiveTask
    }
}

export default crud();