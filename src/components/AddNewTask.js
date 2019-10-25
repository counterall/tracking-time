import React, { useState } from "react";
import "../style/modules/_add_task.scss";

function AddNewTask(props) {


    return (
        <div className="add-task-wrapper">
            <button className="add-btn">
                <span className="add-btn__icon"></span>
            </button>
        </div>
    );

}


export default AddNewTask;