import React from 'react';
import { useHistory } from "react-router-dom";
import "../../style/modules/ui/_add_btn.scss";

function AddButton(props) {
    const history = useHistory();
    console.log(history);

    const handleClick = () => {
        history.push(`/add/${props.type}`, props.pushState);
    }

    return (
        <button className="add-btn" onClick={handleClick}>
            <span className="add-btn__icon"></span>
        </button>
    );

}

export default AddButton;