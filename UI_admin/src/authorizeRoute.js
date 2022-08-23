import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/authProvider";

const AuthorizeRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    if (auth?.roleId === 1 || auth?.roleId === 2) {
        return children;
    }
    return <Navigate to="/login" />;
};

export default AuthorizeRoute;
