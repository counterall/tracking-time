import React from 'react';
import TaskDuration from "./task_list/TaskDuration";
import "../../style/modules/_task_list.scss";

function TaskList(props) {
    const { taskList } = props;

    return (
        <div className="task-history">
        {
            taskList.map((task, i) => {
                return (
                    <div key={i} className="task-history__item">
                        <div className="item-info">
                            <div className="item-info__name">{ task.name }</div>
                            <TaskDuration timestamp={task.duration} />
                        </div>
                        <div className="item-tags">
                        {
                            task.tags.map((tag, i) => <div key={i} className="item-tag">{tag}</div>)
                        }
                        </div>
                    </div>
                );
            })
        }
        </div>
    );

}

export default TaskList;