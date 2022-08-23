import { Shop } from "components/Shop/Shop";
import { PublicLayout } from "layout/PublicLayout";

import { getAllProduct, getAllType, getAllBrand } from "api/productApi";

const breadcrumbsData = [
    {
        label: "Trang Chủ",
        path: "/",
    },
    {
        label: "Cửa Hàng",
        path: "/shop",
    },
];
const ShopPage = ({ products, categories, brands }) => {
    return (
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Cửa Hàng">
            <Shop
                productsProps={products.productResponses}
                categories={categories.types}
                brands={brands.brands}
            />
        </PublicLayout>
    );
};

export async function getStaticProps() {
    try {
        const productResponse = await getAllProduct();
        const typeResponse = await getAllType();
        const brandResponse = await getAllBrand();
        return {
            props: {
                products: productResponse,
                categories: typeResponse,
                brands: brandResponse,
            },
            revalidate: 10,
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                products: null,
                categories: null,
                brands: null,
            },
        };
    }
}

export default ShopPage;
