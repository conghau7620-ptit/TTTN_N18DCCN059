import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
    { value: "highToMin", label: "Giá Cao - Thấp" },
    { value: "minToHigh", label: "Giá Thấp - Cao" },
];
export const Shop = ({ productsProps, categories, brands }) => {
    const allProducts = [...productsProps];

    const [productOrder, setProductOrder] = useState(
        allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
    );

    const [products, setProducts] = useState([...productOrder]);
    // const [filter, setFilter] = useState({ isNew: false, isSale: false });
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [rangeValues, setRangeValues] = useState([0, 2000000]);
    const [searchValue, setSearchValue] = useState("");

    const handleFilterByCategories = (e, name) => {
        e.preventDefault();
        setCategory(name);
    };

    const handleFilterByBrands = (e, name) => {
        e.preventDefault();
        setBrand(name);
    };

    useEffect(() => {
        let newProduct;
        newProduct = productOrder.filter(
            (product) =>
                product.price >= rangeValues[0] &&
                product.price <= rangeValues[1]
        );

        if (category && brand) {
            newProduct = newProduct.filter(
                (product) =>
                    product.type === category && product.brand === brand
            );
            return setProducts(newProduct);
        } else if (category && !brand) {
            newProduct = newProduct.filter(
                (product) => product.type === category
            );
            return setProducts(newProduct);
        } else if (brand && !category) {
            newProduct = newProduct.filter(
                (product) => product.brand === brand
            );
            return setProducts(newProduct);
        } else {
            return setProducts(newProduct);
        }
    }, [category, brand, rangeValues]);

    //Search Effect
    useEffect(() => {
        const newProduct = productOrder.filter((product) =>
            product.name
                .toLowerCase()
                .split(" ")
                .join("")
                .includes(searchValue.toLowerCase().trim().split(" ").join(""))
        );
        console.log(newProduct);
        setProducts(newProduct);
    }, [searchValue]);

    useEffect(() => {
        setProducts(productOrder);
    }, [productOrder]);

    // useEffect(() => {
    //     if (filter.isNew && filter.isSale) {
    //         const newPro = productOrder.filter(
    //             (pd) => pd.isNew === true && pd.isSale === true
    //         );
    //         setProducts(newPro);
    //     } else if (filter.isNew && !filter.isSale) {
    //         const newPro = productOrder.filter((pd) => pd.isNew === true);
    //         setProducts(newPro);
    //     } else if (filter.isSale && !filter.isNew) {
    //         const newPro = productOrder.filter((pd) => pd.isSale === true);
    //         setProducts(newPro);
    //     } else {
    //         setProducts([...productOrder]);
    //     }
    // }, [filter, productOrder]);
    const paginate = usePagination(products, 9);

    const handleSort = (value) => {
        if (value === "highToMin") {
            const newOrder = products.sort((a, b) =>
                a.price < b.price ? 1 : -1
            );
            setProducts([...newOrder]);
        }
        if (value === "minToHigh") {
            const newOrder = products.sort((a, b) =>
                a.price > b.price ? 1 : -1
            );
            setProducts([...newOrder]);
        }
    };

    const handleClearFilter = () => {
        if (brand) setBrand(null);
        if (category) setCategory(null);
        if (rangeValues) setRangeValues([0, 2000000]);
    };

    return (
        <div>
            {/* <!-- BEGIN SHOP --> */}
            <div className="shop">
                <div className="wrapper">
                    <div className="shop-content">
                        {/* <!-- Shop Aside --> */}
                        <div className="shop-aside">
                            <div className="box-field box-field__search">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Tìm Kiếm"
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                />
                                <i className="icon-search"></i>
                            </div>
                            <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Khoảng Giá
                                </span>
                                <div className="range-slider">
                                    <Range
                                        min={0}
                                        max={2000000}
                                        defaultValue={[0, 2000000]}
                                        value={rangeValues}
                                        tipFormatter={(value) =>
                                            `${value.toLocaleString("vi", {
                                                style: "currency",
                                                currency: "VND",
                                            })}`
                                        }
                                        allowCross={false}
                                        tipProps={{
                                            placement: "bottom",
                                            prefixCls: "rc-slider-tooltip",
                                        }}
                                        onChange={(values) =>
                                            setRangeValues([...values])
                                        }
                                    />
                                </div>
                            </div>
                            <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Danh Mục Sản Phẩm
                                </span>
                                <ul>
                                    {categories.map(({ name }) => (
                                        <li
                                            key={name}
                                            onClick={(e) =>
                                                handleFilterByCategories(
                                                    e,
                                                    name
                                                )
                                            }
                                        >
                                            <a
                                                className={
                                                    name === category
                                                        ? "active"
                                                        : null
                                                }
                                                href="#"
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="shop-aside__item">
                                <span className="shop-aside__item-title">
                                    Thương Hiệu
                                </span>
                                <ul>
                                    {brands.map(({ id, name }) => (
                                        <li
                                            key={id}
                                            onClick={(e) =>
                                                handleFilterByBrands(e, name)
                                            }
                                        >
                                            <a
                                                className={
                                                    name === brand
                                                        ? "active"
                                                        : null
                                                }
                                                href="#"
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* <!-- Shop Main --> */}
                        <div className="shop-main">
                            <div className="shop-main__filter">
                                <div className="shop-main__checkboxes">
                                    {category || brand ? (
                                        <button
                                            style={{
                                                background: "#fd6d75",
                                                padding: "10px 25px",
                                                color: "#ffffff",
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                lineHeight: "100%",
                                                outline: "none",
                                                border: "none",
                                            }}
                                            onClick={handleClearFilter}
                                        >
                                            Xóa Bộ Lọc
                                        </button>
                                    ) : null}
                                </div>
                                <div className="shop-main__select">
                                    <Dropdown
                                        options={options}
                                        className="react-dropdown"
                                        onChange={(option) =>
                                            handleSort(option.value)
                                        }
                                        value={options[0]}
                                    />
                                </div>
                            </div>
                            <div className="shop-main__items">
                                <Products products={paginate?.currentData()} />
                            </div>

                            {/* <!-- PAGINATE LIST --> */}
                            <PagingList paginate={paginate} />
                        </div>
                    </div>
                </div>
                {/* <img
                    className="promo-video__decor js-img"
                    src="/assets/img/promo-video__decor.jpg"
                    alt=""
                />
                <img
                    className="shop-decor js-img"
                    src="/assets/img/shop-decor.jpg"
                    alt=""
                /> */}
            </div>
            {/* <!-- SHOP EOF   --> */}
        </div>
    );
};
