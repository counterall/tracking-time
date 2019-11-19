import React, { useState } from "react";
import User from "../components/menu/User";
import Separator from "../components/menu/Separator";
import Main from "../components/menu/Main";
import Avatar from "../images/avatar.png";


function Menu(props) {
    const user = {
        name: "Kan",
        avatar: Avatar
    }

    return (
        <div className="menu-view">
            <User {...user} />
            <Separator />
            <Main />
        </div>
    );
}

export default Menu;