import React, { Component } from 'react';
import './style/trackapp.scss';
import ActiveTask from "./components/ActiveTask";
import Crud from "./helpers/crud";

const basicStructure = {
    task_count: 0
}

if (localStorage.getItem("task_number") === null) {
    Object.keys(basicStructure).forEach((k) => {
        localStorage.setItem(k, basicStructure[k])
    });
}

class TrackApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTask: Crud.getActiveTask(),
            newTaskAdded: false
        };
    }

    render() {

        return <div className="wrapper">
            <ActiveTask data={this.state.activeTask} isNewTask={this.state.newTaskAdded}/>
        </div>
    }
}

export default TrackApp;