import React from 'react';

function Buttons(props) {

    const {taskIsRunning, resumeTask, finishTask} = props;

    return (
        <div className="active-task__btns">
            <button className={ taskIsRunning ? "active-task__btns--pause" : "active-task__btns--resume"} onClick={resumeTask}></button>
            <button className='active-task__btns--finish' onClick={finishTask}></button>
        </div>
    );
}

export default Buttons;