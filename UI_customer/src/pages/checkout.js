import { useContext, useEffect } from "react";
import { AuthContext } from "context/authProvider";
import { Checkout } from "components/Checkout/Checkout";
import { PublicLayout } from "layout/PublicLayout";
import router from "next/router";

const breadcrumbsData = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Shop",
        path: "/shop",
    },
    {
        label: "Thanh Toán",
        path: "/checkout",
    },
];
const CheckoutPage = () => {
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        !auth && router.push("/login");
    }, []);
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Thanh Toán">
            <Checkout />
        </PublicLayout>
    );
};

export default CheckoutPage;
