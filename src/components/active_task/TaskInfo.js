import React from 'react';

function TaskInfo(props) {
    const {name, tag} = props.meta;

    return (
        <div className="active-task__info">
            <div className="tag btn">{tag}</div>
            <div className="name">{name}</div>
        </div>
    );
}

export default TaskInfo;