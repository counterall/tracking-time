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
        this.state = {
            activeTask: Crud.getActiveTask()
        };
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    handleAddTask(task) {

    }

    render() {

        return <div className="wrapper">
            <ActiveTask data={this.state.activeTask} />
            <AddNewTask handleAddTask={this.handleAddTask} />
        </div>
    }
}

export default TrackApp;