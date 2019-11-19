import React, { useState } from "react";
import { Link } from "react-router-dom";


function Main(props) {

    return (
        <div className="menu-view__main">
            <Link to="/today">Today</Link>
            <Link to="/stats">Stats</Link>
        </div>
    );
}

export default Main;