import React, { PureComponent } from "react";
import idbCRUD from "../helpers/idbCRUD";
import User from "../components/menu/User";
import Separator from "../components/menu/Separator";
import Main from "../components/menu/Main";
import Avatar from "../images/avatar.png";
import Projects from "../components/menu/Projects";
import AddButton from "../components/ui/AddButton";



class Menu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "Kan",
                avatar: Avatar
            },
            projects: []
        }
    }

    componentDidMount() {
        idbCRUD.getProjectList().then((list) => {
            this.setState({projects: list});
        });
    }

    handleAddProject() {
        console.log("project added!");
    }

    render() {
        return (
            <div className="menu-view">
                <User {...this.state.user} />
                <Separator />
                <Main />
                <Separator />
                <Projects list={this.state.projects} />
                <AddButton type="project" pushState={
                    {
                        previous: "/",
                        previousName: "Home",
                        action: "addProject"
                    }
                } />
            </div>
        );
    }
}

export default Menu;