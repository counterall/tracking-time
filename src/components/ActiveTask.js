import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons";
import Crud from "../helpers/crud";

class ActiveTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: 0,
            isRunning: false
        };
        this.handleResumeClick = this.handleResumeClick.bind(this);
        const {duration, meta} = this.props.data;
        this.duration = duration;
        this.meta = meta;
        this.saveActiveTaskDurationBeforePageReload();
    }

    handleResumeClick() {
        this.setState((state) => {
            return {isRunning: !state.isRunning}
        }, this.initialiseDisplay);
    }

    handleFinishClick() {

    }

    // if active task is still running when page is refreshed, save data of active task to localStorage
    saveActiveTaskDurationBeforePageReload() {
        window.onunload = () => {
            if (this.state.timestamp > 0) {
                const oldActiveTask = Crud.getActiveTask();
                const newActiveTask = {...oldActiveTask, duration: this.state.timestamp};
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

        // pause or resume the currently active task
        if (this.state.timestamp) {
            originalTmstp = originalTmstp - this.state.timestamp;
            if (this.state.isRunning) {
                this.timer = setInterval(() => {
                    this.setState({
                        timestamp: Math.floor(Date.now() / 1000) - originalTmstp
                    });
                }, 1000);
            } else {
                this.setState({
                    timestamp: Math.floor(Date.now() / 1000) - originalTmstp
                });
            }
        }
        // no currently active task found
        else {
            if (typeof this.duration !== 'undefined') {
                originalTmstp = originalTmstp - this.duration;
                if (this.duration === 0) {
                    // automatically start ticking if duration of active task is 0, .i.e creating a new active task.
                    this.setState({
                        isRunning: true
                    });
                    this.timer = setInterval(() => {
                        this.setState({
                            timestamp: Math.floor(Date.now() / 1000) - originalTmstp
                        });
                    }, 1000);
                } else {
                    this.setState({
                        timestamp: Math.floor(Date.now() / 1000) - originalTmstp
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="active-task">
                <TimeDisplay timestamp={this.state.timestamp} />
                <TaskInfo meta={this.meta} />
                <Buttons taskIsRunning={this.state.isRunning} resumeTask={this.handleResumeClick} finishTask={()=>{this.handleFinishClick()}} />
            </div>
        );
    }
}

export default ActiveTask;