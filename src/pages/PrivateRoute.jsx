import React, {useContext, useState} from "react";
import {Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    
    return (
        <Route
            {...rest}
            render={routeProps =>
                localStorage.getItem('login') ? (
                    <RouteComponent {...routeProps}/>
                ) : (
                    <Redirect to={"/login"}/>
                )
            }
        />
    );
};

export default PrivateRoute;