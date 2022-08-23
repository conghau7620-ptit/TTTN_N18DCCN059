import { getOneUser } from "api/userApi";
import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { getItem } from "utils/local";
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const token = JSON.parse(getItem("TOKEN"));
            if (token) {
                // Get id uder from decoded token
                const { id } = jwtDecode(token);
                const currentUser = await getOneUser(id);
                if (currentUser) {
                    setAuth(currentUser);
                    setIsLoading(false);
                } else {
                    setAuth(null);
                    setIsLoading(false);
                }
            } else {
                setAuth(null);
                setIsLoading(false);
            }
        })();
    }, []);
    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {isLoading ? <p>Loading</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
