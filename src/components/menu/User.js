import React, { useState } from "react";
import "../../style/modules/menu/_user.scss";

function User(props) {

    return (
        <div className="menu-view__user">
            <div className="avatar"></div>
            <h4 className="greeting">Welcome to Timelify, {props.name}!</h4>
            <div className='settings'></div>
        </div>
    );

}

export default User;