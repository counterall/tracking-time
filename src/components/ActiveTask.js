import React, { Component } from 'react';
import TimeDisplay from "./active_task/TimeDisplay";
import TaskInfo from "./active_task/TaskInfo";
import Buttons from "./active_task/Buttons";
import Crud from "../helpers/crud";
import "../style/modules/_active_task.scss";

class ActiveTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: 0,
            isRunning: false
        };
        this.handleResumeClick = this.handleResumeClick.bind(this);
        // this.saveActiveTaskDurationBeforePageReload();
        Crud.removeActiveTask();
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
            if (typeof this.props.duration !== 'undefined') {
                originalTmstp = originalTmstp - this.props.duration;
                if (this.props.duration === 0) {
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
        let content;
        let cls = ['active-task'];
        let activeTaskTime = this.state.timestamp > 0 ? this.state.timestamp : this.props.duration;
        if (activeTaskTime >= 0) {
            content = (
                <React.Fragment>
                    <TimeDisplay timestamp={activeTaskTime} />
                    <TaskInfo meta={this.props.meta} />
                    <Buttons taskIsRunning={this.state.isRunning} resumeTask={this.handleResumeClick} finishTask={()=>{this.handleFinishClick()}} />
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