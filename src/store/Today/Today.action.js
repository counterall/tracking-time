export const ADD_ACTIVE_TASK = "ADD_ACTIVE_TASK";
export const TOGGLE_ACTIVE_TASK_STATUS = "TOGGLE_ACTIVE_TASK_STATUS";
export const TRIGGER_ACTIVE_TASK_TIMER = "TRIGGER_ACTIVE_TASK_TIMER";
export const ADD_TO_COMPLETE_TASK_LIST = "ADD_TO_COMPLETE_TASK_LIST";
export const REMOVE_FROM_TASK_LIST = "REMOVE_FROM_TASK_LIST";

export const addActiveTask = activeTask => ({
    type: ADD_ACTIVE_TASK,
    activeTask
});

export const toggleActiveTaskStatus = (status) => ({
    type: TOGGLE_ACTIVE_TASK_STATUS,
    status
});

export const triggerActiveTaskTimer = (activeTask) => ({
    type: TRIGGER_ACTIVE_TASK_TIMER,
    activeTask
});

export const addToCompleteTaskList = task => ({
    type: ADD_TO_COMPLETE_TASK_LIST,
    task
});

export const removeFromTaskList = taskID => ({
    type: REMOVE_FROM_TASK_LIST,
    task_id: taskID
});


