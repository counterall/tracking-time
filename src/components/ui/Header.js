import React from "react";
import { Link } from "react-router-dom";
import "../../style/modules/ui/_header.scss";

function Header(props) {

    return (
        <div className="header">
            <Link to={props.previous} className="header__previous">
                <div className="arrow"></div>
                <div className='name'>{props.txt}</div>
            </Link>
        </div>
    );

}

export default Header;