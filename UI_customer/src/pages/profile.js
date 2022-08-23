import { useEffect, useContext } from "react";
import { AuthContext } from "context/authProvider";
import { Profile } from "components/Profile/Profile";
import { PublicLayout } from "layout/PublicLayout";
import router from "next/router";

const breadcrumbsData = [
    {
        label: "Trang Chủ",
        path: "/",
    },
    {
        label: "Hồ Sơ",
        path: "/profile",
    },
];
const ProfilePage = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    useEffect(() => {
        !auth && router.push("/login");
    });
    return (
        <PublicLayout
            breadcrumb={breadcrumbsData}
            breadcrumbTitle="Hồ Sơ Của Tôi"
        >
            <Profile />
        </PublicLayout>
    );
};

export default ProfilePage;
