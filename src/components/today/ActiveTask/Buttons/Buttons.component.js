import React from 'react';

function Buttons(props) {

    const {taskIsRunning, resumeTask, pauseTask, finishTask, resetTask} = props;

    return (
        <div className="active-task__btns">
            <button className='active-task__btn active-task__btn--reset' disabled={ taskIsRunning ? "disabled" : ""} onClick={ resetTask }></button>
            <button className={ taskIsRunning ? "active-task__btn active-task__btn--pause" : "active-task__btn active-task__btn--resume"} onClick={taskIsRunning ? resumeTask : pauseTask}></button>
            <button className='active-task__btn active-task__btn--finish' onClick={finishTask}></button>
        </div>
    );
}

export default Buttons;