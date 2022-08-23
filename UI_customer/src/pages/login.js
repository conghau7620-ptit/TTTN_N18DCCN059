import { useEffect, useContext } from "react";
import { AuthContext } from "context/authProvider";
import { Login } from "components/Login/Login";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
    {
        label: "Trang Chủ",
        path: "/",
    },
    {
        label: "Đăng Nhập",
        path: "/login",
    },
];
const LoginPage = () => {
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Đăng Nhập">
            <Login />
            <Subscribe />
        </PublicLayout>
    );
};

export default LoginPage;
