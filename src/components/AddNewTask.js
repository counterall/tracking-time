import React, { useState } from "react";
import AddButton from "./add_task/AddButton";
import AddTaskModal from "./add_task/AddTaskModal";
import "../style/modules/_add_task.scss";

function AddNewTask(props) {

    const [openForm, setOpenForm] = useState(false);

    const showNewTaskModal = () => {
        setOpenForm(true);
    };

    const HideNewTaskModal = () => {
        setOpenForm(false);
    };

    return (
        <div className="add-task-wrapper">
            <AddButton openTaskModal={showNewTaskModal} />
            <AddTaskModal show={openForm} onHide={HideNewTaskModal} handleAddTask={props.handleAddTask} />
        </div>
    );

}


export default AddNewTask;