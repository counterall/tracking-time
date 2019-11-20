import React from 'react';
import "../../style/modules/ui/_add_btn.scss";

function AddButton(props) {


    return (
        <button className="add-btn" onClick={props.handleClick}>
            <span className="add-btn__icon"></span>
        </button>
    );

}

export default AddButton;