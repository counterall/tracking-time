import React, { PureComponent } from 'react';

class TimeDisplay extends PureComponent {

    formatTimeDigit(digit) {
        if (digit.toString().length < 2) {
            digit = "0" + digit.toString();
        }
        return digit;
    }

    setUpdatedTime() {
        const newTime = {
            hour: "00",
            min: "00",
            sec: '00'
        };
        if (this.props.timestamp) {
            newTime.sec = this.formatTimeDigit(this.props.timestamp % 3600 % 60);
            newTime.min = this.formatTimeDigit(Math.floor(this.props.timestamp % 3600 / 60));
            newTime.hour = this.formatTimeDigit(Math.floor(this.props.timestamp / 3600));
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