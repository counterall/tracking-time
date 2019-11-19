import React from 'react';

function AddButton(props) {


    return (
        <button className="add-btn" onClick={props.openTaskModal}>
            <span className="add-btn__icon"></span>
        </button>
    );

}

export default AddButton;