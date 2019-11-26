import {
    ADD_ACTIVE_TASK,
    TOGGLE_ACTIVE_TASK_STATUS,
    TRIGGER_ACTIVE_TASK_TIMER,
    ADD_TO_COMPLETE_TASK_LIST,
    REMOVE_FROM_TASK_LIST
} from './Today.action';

export const initialState = {
    activeTask: {},
    activeTaskIsRunning: false,
    taskList: []
};
export let timer = false;

const todayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVE_TASK:
            let { activeTask } = action;

            return {
                ...state,
                activeTask
            };

        case TOGGLE_ACTIVE_TASK_STATUS:
            return {
                ...state,
                activeTaskIsRunning: !state.activeTaskIsRunning
            };

        case TRIGGER_ACTIVE_TASK_TIMER:
            let originalActiveTaskDuration = "duration" in state.activeTask ? state.activeTask.duration : 0;
            activeTask = {...state.activeTask, duration: originalActiveTaskDuration + 1};
            return {
                ...state,
                activeTask
            };

        case ADD_TO_COMPLETE_TASK_LIST:
            const { task } = action;
            let newList = [...state.taskList];
            newList.push(task);

            return {
                ...state,
                taskList: newList
            };

        case REMOVE_FROM_TASK_LIST:
            const { task_id } = action;

            return {
                ...state,
                taskList: state.taskList.filter(t => t.id !== task_id)
            };

        default:
            return state;
    }
};

export default todayReducer;
