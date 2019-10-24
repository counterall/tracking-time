import React from 'react';

function Buttons(props) {
    const resume = props.resume;

    const resumeTask = () => {
        props.resumeTask(!resume);
    }

    return (
    <div className="active-task__btns">
        <button className={resume ? "active-task__btns--resume" : "active-task__btns--pause"} onClick={resumeTask}></button>
        <button className='active-task__btns--finish' onClick={props.finishTask}></button>
    </div>);
}

export default Buttons;