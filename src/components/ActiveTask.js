import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons";
import "../style/modules/_active_task.scss";

class ActiveTask extends Component {

    render() {
        let content;
        let cls = ['active-task'];

        if (this.props.activeTaskTag) {
            const taskMeta = {
                tag: this.props.activeTaskTag,
                name: this.props.activeTaskName
            }
            content = (
                <React.Fragment>
                    <TaskInfo meta={taskMeta} />
                    <TimeDisplay timestamp={this.props.activeTaskTS} />
                    <Buttons taskIsRunning={this.props.activeTaskIsRunning} resetTask={this.props.handleResetClick} resumeTask={this.props.handleResumeClick} finishTask={this.props.handleFinishClick} />
                </React.Fragment>
            );
        } else {
            cls.push("active-task--empty")
            content = <div className='active-task--empty__msg'>There is no active task.</div>
        }

        return (
            <div className={cls.join(" ")}>{ content }</div>
        );
    }
}

export default ActiveTask;