import React, { Component } from 'react';
import ActiveTask from "./components/ActiveTask";
import AddNewTask from "./components/AddNewTask";
import TaskList from "./components/TaskList";
import Crud from "./helpers/crud";
import idbCRUD from "./helpers/idbCRUD";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/trackapp.scss';

class TrackApp extends Component {
    constructor(props){
        super(props);
        // this.saveStateToLocalStorageBeforePageReload();
        this.state = {
            activeTask: {},
            activeTaskIsRunning: false,
            activeProject: {},
            taskList: []
        };

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.handleResumeClick = this.handleResumeClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);

        this.initData().then(data => {
            console.log("initial data is reseting state!");
            this.setState({
                ...data
            });
        });
    }

    async initData() {
        const data = await Promise.all([idbCRUD.getActiveTask(),idbCRUD.getActiveProject(), idbCRUD.getTaskListOfToday()]);
        console.log("initial data fetched from IDB!");

        return {
            activeTask: data[0],
            activeProject: data[1],
            taskList: data[2]
        };
    }

    handleAddTask(newTask) {
        if (Object.keys(newTask).length) {
            const newState = {
                activeTaskTag: newTask.tag,
                activeTaskName: newTask.name,
                activeTaskTS: 0,
                activeTaskIsRunning: true
            };
            this.setState(() => {
                return newState
            }, this.initialiseDisplay);
        }
    }

    handleResumeClick() {
        this.setState((state) => {
            return {activeTaskIsRunning: !state.activeTaskIsRunning}
        }, this.initialiseDisplay);
    }

    handleFinishClick() {
        this.setState((state) => {
            const finishedTask = {
                tag: state.activeTaskTag,
                name: state.activeTaskName,
                timestamp: state.activeTaskTS
            };
            const taskList = [...state.taskList];
            taskList.unshift(finishedTask);

            return {
                activeTaskTS: 0,
                activeTaskTag: "",
                activeTaskName: "",
                activeTaskIsRunning: false,
                taskList: taskList
            };
        }, Crud.removeActiveTask());
    }

    handleResetClick() {
        this.setState({
            activeTaskTS: 0
        });
    }

    saveStateToLocalStorageBeforePageReload() {
        window.onunload = () => {
            this._saveActiveTaskDuration();
            this._saveTaskList();
        }
    }

    // if active task is still running when page is refreshed, save data of active task to localStorage
    _saveActiveTaskDuration() {
        if (this.state.activeTaskTS >= 0) {
            const oldActiveTask = Crud.getActiveTask();
            const newActiveTask = {...oldActiveTask, duration: this.state.activeTaskTS, name: this.state.activeTaskName, tag: this.state.activeTaskTag};
            Crud.setActiveTask(newActiveTask);
        }
    }

    _saveTaskList() {
        if (this.state.taskList.length) {
            Crud.updateTaskListofToday(this.state.taskList);
        }
    }

    componentDidMount() {
        // this.initialiseDisplay();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    initialiseDisplay() {
        clearInterval(this.timer);
        let originalActiveTaskDuration = "duration" in this.state.activeTask ? this.state.activeTask.duration : 0;
        const updateActiveTaskDurationState = state => {return {activeTask: {...state.activeTask, duration: originalActiveTaskDuration}}};

        if (this.state.activeTaskIsRunning) {
            this.timer = setInterval(() => {
                this.setState(updateActiveTaskDurationState);
                originalActiveTaskDuration++;
            }, 1000);
        } else {
            this.setState(updateActiveTaskDurationState);
        }

    }

    render() {
        console.log('rendered once!');
        return <div className="wrapper">
            <ActiveTask {...this.state.activeTask} isRunning={this.state.activeTaskIsRunning} handleResetClick={this.handleResetClick} handleFinishClick={this.handleFinishClick} handleResumeClick={this.handleResumeClick} />
            {/* <AddNewTask handleAddTask={this.handleAddTask} />
            <TaskList taskList={this.state.taskList} /> */}
        </div>
    }
}

export default TrackApp;