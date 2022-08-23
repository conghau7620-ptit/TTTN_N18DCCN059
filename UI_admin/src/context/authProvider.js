import { createContext, useState, useEffect } from "react";
import { getItem } from "../common/storage";
import jwtdecode from "jwt-decode";
import { getUser } from "../api/userAPI";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(auth);
    const token = JSON.parse(getItem("TOKEN"))?.token;

    useEffect(() => {
        const getCurrentUser = async () => {
            if (token) {
                const { id } = jwtdecode(token);
                const response = await getUser(id, token);
                console.log(response.data);
                setAuth(response.data);
                setIsLoading(false);
            } else {
                setAuth(null);
                setIsLoading(false);
            }
        };
        getCurrentUser();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {isLoading ? <p>Loading</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
