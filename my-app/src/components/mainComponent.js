import React, { Component } from 'react'
import { HashRouter as Router, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import RegnContent from "./DashBoard/RegnContent";
import RegnDetails from "./DashBoard/RegnDetails";
import Stats from "./DashBoard/Stats.js";
import Register from "./Registration/RegisterPage";

class mainComponent extends Component {
    render() {
        return (
          <Router>
            <Route exact path="/">
              <div>
                <LandingPage />
              </div>
            </Route>
            <Route exact path="/register">
              <div>
                <Register />
              </div>
            </Route>
            <Route exact path="/admin">
              <div>
                <RegnContent />
              </div>
            </Route>
            <Route exact path="/admin/regn/:id" component={RegnDetails} />
            <Route exact path="/admin/stats" component={Stats} />
          </Router>
        );
    }
}

export default mainComponent
