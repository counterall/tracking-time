import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/modules/menu/_main.scss";



function Main(props) {

    return (
        <div className="menu-view__main">
            <Link to="/today">Lovely Today</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/tags">Tags</Link>
        </div>
    );
}

export default Main;