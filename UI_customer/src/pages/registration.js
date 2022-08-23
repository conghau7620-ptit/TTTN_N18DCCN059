import { Registration } from "components/Registration/Registration";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
    {
        label: "Trang Chủ",
        path: "/",
    },
    {
        label: "Đăng Kí",
        path: "/registration",
    },
];
const RegistrationPage = () => {
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Đăng Kí">
            <Registration />
            <Subscribe />
        </PublicLayout>
    );
};

export default RegistrationPage;
