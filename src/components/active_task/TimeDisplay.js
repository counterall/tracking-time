import React, { PureComponent } from 'react';
import Crud from "../../helpers/crud";

class TimeDisplay extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            timestamp: 0
        };
        this.saveActiveTaskDurationBeforePageReload();
    }

    // if active task is still running when page is refreshed, save data of active task to localStorage
    saveActiveTaskDurationBeforePageReload() {
        if (this.props.duration !== undefined) {
            window.onunload = () => {
                const oldActiveTask = Crud.getActiveTask();
                const newActiveTask = {...oldActiveTask, duration: this.state.timestamp};
                Crud.setActiveTask(newActiveTask);
            };
        }
    }

    componentDidMount() {
        // automatically start ticking if duration of active task is 0
        if (typeof this.props.duration !== 'undefined') {
            const originalTmstp = Math.floor(Date.now() / 1000) - this.props.duration;
            if (this.props.duration === 0) {
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

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    formatTimeDigit(digit) {
        if (digit.toString().length < 2) {
            digit = "0" + digit.toString();
        }
        return digit;
    }

    setUpdatedTime() {
        const newTime = {
            hour: "--",
            min: "--",
            sec: '--'
        };
        if (this.state.timestamp) {
            newTime.sec = this.formatTimeDigit(this.state.timestamp % 3600 % 60);
            newTime.min = this.formatTimeDigit(Math.floor(this.state.timestamp % 3600 / 60));
            newTime.hour = this.formatTimeDigit(Math.floor(this.state.timestamp / 3600));
        }
        return (
            <div className="active-task__time">
                <div className="active-task__time__h">{newTime.hour}</div>
                <div className="active-task__time__spliter">.</div>
                <div className="active-task__time__m">{newTime.min}</div>
                <div className="active-task__time__spliter">.</div>
                <div className="active-task__time__s">{newTime.sec}</div>
            </div>
        )
    }

    render() {
        const newTime = this.setUpdatedTime();
        return newTime;
    }
}

export default TimeDisplay;