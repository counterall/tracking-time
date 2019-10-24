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
        const {duration, meta} = this.props.data;

        return (
            <div className="active-task">
                <TimeDisplay duration={duration}/>
                <TaskInfo meta={meta} />
                <Buttons resumeTask={()=>{this.handleResumeClick()}} stopTask={()=>{this.handleStopClick()}} />
            </div>
        );
    }
}

export default ActiveTask;