import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/authProvider";

const AdminRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    if (auth?.roleId === 1) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default AdminRoute;
