import React, { useState } from "react";
import { Link } from "react-router-dom";


function Menu(props) {

    return (
        <div className="menu-view">
            <Link to="/today">Today</Link>
        </div>
    );
}

export default Menu;