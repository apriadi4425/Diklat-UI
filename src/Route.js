import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from './App'
import Login from './pages/Login';
import index from './pages/rebuilds/Index';
import PrivateRoute from './pages/PrivateRoute';

const RouteCustom = () => {
    return(
        <Router>
            <Switch>
                <PrivateRoute path="/" exact component={index}/>
                <PrivateRoute path="/app" component={App}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
    )
}

export default RouteCustom;