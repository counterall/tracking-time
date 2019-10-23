import React, { Component } from 'react';


class TimeDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            timestamp: 0
        };
    }

    componentDidMount() {
        const originalTmstp = Math.floor(Date.now() / 1000);
        this.timer = setInterval(() => {
            this.setState({
                timestamp: Math.floor(Date.now() / 1000) - originalTmstp
            });
        }, 1000);
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