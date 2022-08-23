import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";

export const Trending = ({ productsProps, categories }) => {
    const trendingProducts = [...productsProps.slice(0, 15)];
    const [products, setProducts] = useState(trendingProducts);
    const [filterItem, setFilterItem] = useState("Jacket");

    useEffect(() => {
        const newItems = trendingProducts.filter(
            (pd) => pd.type === filterItem
        );
        setProducts(newItems);
    }, [filterItem]);

    return (
        <>
            {/* <!-- BEGIN TRENDING --> */}
            <section className="trending">
                <div className="trending-content">
                    <SectionTitle title="Sản Phẩm Nổi Bật" />
                    <div className="tab-wrap trending-tabs">
                        <ul className="nav-tab-list tabs">
                            {categories.slice(0, 5).map(({ name }) => (
                                <li
                                    key={name}
                                    onClick={() => setFilterItem(name)}
                                    className={
                                        name === filterItem ? "active" : ""
                                    }
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <div className="products-items">
                            <ProductsCarousel products={products} />
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- TRENDING EOF   --> */}
        </>
    );
};
