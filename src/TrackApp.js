import React, { Component } from 'react';
import ActiveTask from "./components/ActiveTask";
import AddNewTask from "./components/AddNewTask";
import Crud from "./helpers/crud";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/trackapp.scss';

const basicStructure = {
    task_count: 0,
    active_task: JSON.stringify({})
}

if (localStorage.getItem("task_count") === null) {
    Object.keys(basicStructure).forEach((k) => {
        localStorage.setItem(k, basicStructure[k])
    });
}

class TrackApp extends Component {
    constructor(props){
        super(props);
        Crud.removeActiveTask();

        const {activeTaskTime, activeTaskTag, activeTaskName} = {...Crud.getActiveTask()};

        this.state = {
            activeTaskTS: typeof activeTaskTime !== "undefined" ? activeTaskTime : 0,
            activeTaskTag: typeof activeTaskTag !== "undefined" ? activeTaskTag : "",
            activeTaskName: typeof activeTaskName !== "undefined" ? activeTaskName : "",
            activeTaskIsRunning: false
        };

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.handleResumeClick = this.handleResumeClick.bind(this);

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

    }

    // if active task is still running when page is refreshed, save data of active task to localStorage
    saveActiveTaskDurationBeforePageReload() {
        window.onunload = () => {
            if (this.state.activeTaskTS > 0) {
                const oldActiveTask = Crud.getActiveTask();
                const newActiveTask = {...oldActiveTask, duration: this.state.activeTaskTS};
                Crud.setActiveTask(newActiveTask);
            }
        };
    }

    componentDidMount() {
        this.initialiseDisplay();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    initialiseDisplay() {
        clearInterval(this.timer);
        let originalTmstp = Math.floor(Date.now() / 1000);
        originalTmstp = originalTmstp - this.state.activeTaskTS;

        if (this.state.activeTaskIsRunning) {
            this.timer = setInterval(() => {
                this.setState({
                    activeTaskTS: Math.floor(Date.now() / 1000) - originalTmstp
                });
            }, 1000);
        } else {
            this.setState({
                activeTaskTS: Math.floor(Date.now() / 1000) - originalTmstp
            });
        }

    }

    render() {

        return <div className="wrapper">
            <ActiveTask {...this.state} handleFinishClick={this.handleFinishClick} handleResumeClick={this.handleResumeClick} />
            <AddNewTask handleAddTask={this.handleAddTask} />
        </div>
    }
}

export default TrackApp;