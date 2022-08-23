import { MostViewed } from "components/shared/MostViewed/MostViewed";
import { ProductDetails } from "components/Product/ProductDetails/ProductDetails";

const { PublicLayout } = require("layout/PublicLayout");

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
        label: "Product",
        path: "/product",
    },
];
const ProductPage = () => {
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
            <ProductDetails />
        </PublicLayout>
    );
};

export default ProductPage;
