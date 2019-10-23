import React from 'react';

function Buttons(props) {

    return <div className="active-task__btns">
        <button className='active-task__btns--resume' onClick={props.resumeTime}>Resume</button>
        <button className='active-task__btns--stop' onClick={props.stopTime}>Stop</button>
    </div>;
}

export default Buttons;