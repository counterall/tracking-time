import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons";
import "../../style/modules/today/_active_task.scss";

class ActiveTask extends Component {

    render() {
        let content;
        let cls = ['active-task'];

        if (typeof this.props.duration !== 'undefined') {
            const taskMeta = {
                tags: this.props.tags,
                name: this.props.name
            }
            content = (
                <React.Fragment>
                    <TaskInfo meta={taskMeta} />
                    <TimeDisplay timestamp={this.props.duration} />
                    <Buttons taskIsRunning={this.props.isRunning} resetTask={this.props.handleResetClick} resumeTask={this.props.handleResumeClick} finishTask={this.props.handleFinishClick} />
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