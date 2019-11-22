import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../../style/modules/ui/_header.scss";

function Header(props) {
    const history = useHistory();
    const action = props.action || false;

    const confirmBtnStyle = {
        display: action ? "block" : "none"
    }

    const handleAction = () => {
        if (action) {
            console.log("Change state: " + action);
            history.push(props.previous);
        }
    };

    return (
        <div className="header">
            <Link to={props.previous} className="header__previous">
                <div className="arrow"></div>
                <div className='name'>{props.txt}</div>
            </Link>
            <div className="header__confirm" onClick={handleAction} style={confirmBtnStyle}>Done</div>
        </div>
    );

}

export default Header;