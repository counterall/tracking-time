import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Today from "./Today";
import Menu from "./Menu";
import Project from "./Project";
import AddItem from "./AddItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/index.scss';
import '../style/trackapp.scss';

class AppRouter extends Component {

    render() {
        return (
            <Router>
            {
                <div className="wrapper">
                    <Switch>
                        <Route path="/today" component={ Today } />
                        <Route path="/project/:id" component={ Project } />
                        <Route path="/add/:type" component={ AddItem } />
                        <Route exact path="/" component={ Menu } />
                    </Switch>
                </div>
            }
            </Router>
        );
    };

}

export default AppRouter;