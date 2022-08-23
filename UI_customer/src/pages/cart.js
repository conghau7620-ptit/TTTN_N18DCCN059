import { Cart } from "components/Cart/Cart";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
    {
        label: "Trang Chủ",
        path: "/",
    },
    {
        label: "Cart",
        path: "/cart",
    },
];
const CartPage = () => {
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Giỏ Hàng">
            <Cart />
        </PublicLayout>
    );
};

export default CartPage;
