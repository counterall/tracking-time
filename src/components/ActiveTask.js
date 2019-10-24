import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons"

class ActiveTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumeTask: false
        };
        this.handleResumeClick = this.handleResumeClick.bind(this);
    }

    handleResumeClick(resume) {
        this.setState({resumeTask: resume});
    }

    handleStopClick() {

    }

    render() {
        const {duration, meta} = this.props.data;
        const resetTime = this.props.isNewTask;

        return (
            <div className="active-task">
                <TimeDisplay duration={duration} resume={this.state.resumeTask} reset={resetTime} />
                <TaskInfo meta={meta} />
                <Buttons resume={this.state.resumeTask} resumeTask={this.handleResumeClick} stopTask={()=>{this.handleStopClick()}} />
            </div>
        );
    }
}

export default ActiveTask;