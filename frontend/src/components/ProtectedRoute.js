import {Navigate} from "react-router-dom";
import React from "react";

const PrivateRoute = ({ loggedIn, children }) => {
    return loggedIn ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;