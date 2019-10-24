import React, { useState } from 'react';
import { resolvePlugin } from '@babel/core';

function Buttons(props) {
    const [resume, setResume] = useState(true);

    const resumeTask = () => {
        setResume(!resume);
        props.resumeTask();
    }

    return (
    <div className="active-task__btns">
        <button className={resume ? "active-task__btns--resume" : "active-task__btns--pause"} onClick={resumeTask}></button>
        <button className='active-task__btns--finish' onClick={props.finishTask}></button>
    </div>);
}

export default Buttons;