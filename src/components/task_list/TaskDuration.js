import React from 'react';

function TaskDuration(props) {
    const { timestamp } = props;
    const formatTimeDigit = digit => {
        if (digit.toString().length < 2) {
            digit = "0" + digit.toString();
        }
        return digit;
    }

    const taskDuration = {
        hour: "00",
        min: "00",
        sec: '00'
    };
    if (timestamp) {
        taskDuration.sec = formatTimeDigit(timestamp % 3600 % 60);
        taskDuration.min = formatTimeDigit(Math.floor(timestamp % 3600 / 60));
        taskDuration.hour = formatTimeDigit(Math.floor(timestamp / 3600));
    }

    return (
        <div className="item-info__duration">
            <div className="item-info__duration__h">{taskDuration.hour}</div>
            <div className="item-info__duration__spliter">:</div>
            <div className="item-info__duration__m">{taskDuration.min}</div>
            <div className="item-info__duration__spliter">:</div>
            <div className="item-info__duration__s">{taskDuration.sec}</div>
        </div>
    );

}

export default TaskDuration;