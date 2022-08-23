import { createContext, useEffect, useState } from "react";
import AuthProvider from "context/authProvider";
import "../styles/styles.scss";

import { getItem } from "utils/local";
export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(getItem("CART"));
        if (data) {
            setCart(data);
        }
    }, []);

    return (
        <AuthProvider>
            <CartContext.Provider value={{ cart, setCart }}>
                <Component {...pageProps} />
            </CartContext.Provider>
        </AuthProvider>
    );
};

export default MyApp;
