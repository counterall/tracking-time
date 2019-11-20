import React from "react";
import { Link } from "react-router-dom";
import "../../style/modules/menu/_projects.scss";

function Projects(props) {

    return (
        <div className="menu-view__projects">
            {
                props.list.map(project => {
                    const path = `/project/${project.id}`;
                return <Link key={project.id} to={path} className="project-entry">{project.name}</Link>
                })
            }
        </div>
    );

}

export default Projects;