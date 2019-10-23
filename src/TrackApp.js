import React, { Component } from 'react';
import './style/trackapp.scss';
import ActiveTask from "./components/ActiveTask";

class TrackApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render() {
        return <div className="wrapper">
            <ActiveTask />
        </div>
    }
}

export default TrackApp;