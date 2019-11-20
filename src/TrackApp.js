import React from "react";
import { Switch, Route } from "react-router-dom";
import Today from "./route/Today";
import Menu from "./route/Menu";
import Project from "./route/Project";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/trackapp.scss';

function TrackApp() {
  return (
    <div className="wrapper">
      <Switch>
        <Route path="/today">
          <Today />
        </Route>

        <Route path="/project/:id" component={ Project } />

        <Route exact path="/">
          <Menu />
        </Route>
      </Switch>
    </div>
  );
}

export default TrackApp;