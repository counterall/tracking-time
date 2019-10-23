import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons"

class ActiveTask extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleResumeClick() {

    }

    handleStopClick() {

    }

    render() {
        const taskMeta = this.props.taskMeta;
        return (
            <div className="active-task">
                <TimeDisplay />
                <TaskInfo meta={taskMeta} />
                <Buttons resumeTime={()=>{this.handleResumeClick()}} stopTime={()=>{this.handleBtnClick()}} />
            </div>
        );
    }
}

export default ActiveTask;