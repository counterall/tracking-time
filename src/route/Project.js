import React, { useState } from "react";

function Project(props) {
    const projectID = props.match.params.id;

    return (
        <div className="project-view">
            Project ID is <b>{projectID}</b>
        </div>
    );
}

export default Project;