import React from 'react';

function TaskInfo(props) {
    const {name, tags} = props.meta;
    const tagsDom = tags.map((tag, i) => {
        return <div key={i} className='tag btn'>{tag}</div>;
    });

    return (
        <div className="active-task__info">
            <div className="tags">{tagsDom}</div>
            <div className="name">{name}</div>
        </div>
    );
}

export default TaskInfo;