import productData from "data/product/product";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { Reviews } from "../Reviews/Reviews";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";
import { getOneProduct } from "api/productApi";
import { setItem } from "utils/local";

export const ProductDetails = () => {
    const router = useRouter();
    const { cart, setCart } = useContext(CartContext);

    const socialLinks = [...socialData];
    const [product, setProduct] = useState(null);
    const [addedInCart, setAddedInCart] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const data = await getOneProduct(router.query.id);
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        };
        getProductDetails();
    }, [router.query.id]);

    useEffect(() => {
        if (product) {
            setAddedInCart(Boolean(cart?.find((pd) => pd.id === product.id)));
        }
    }, [product, cart]);

    const [quantity, setQuantity] = useState(1);
    const [tab, setTab] = useState(2);
    const [activeColor, setActiveColor] = useState(2);
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const handleAddToCart = () => {
        const newProduct = { ...product, quantity: quantity };
        setCart([...cart, newProduct]);
        setItem("CART", JSON.stringify([...cart, newProduct]));
        console.log(JSON.stringify([...cart, newProduct]));
    };

    if (!product) return <></>;
    return (
        <>
            {/* <!-- BEGIN PRODUCT --> */}
            <div className="product">
                <div className="wrapper">
                    <div className="product-content">
                        {/* <!-- Product Main Slider --> */}
                        <div className="product-slider">
                            <div className="product-slider__main">
                                <Slider
                                    fade={true}
                                    asNavFor={nav2}
                                    arrows={false}
                                    lazyLoad={true}
                                    ref={(slider1) => setNav1(slider1)}
                                >
                                    {product.imageUrls.map((img, index) => (
                                        <div
                                            key={index}
                                            className="product-slider__main-item"
                                        >
                                            <div className="products-item__type">
                                                {product.discount > 0 && (
                                                    <span className="products-item__sale">
                                                        sale
                                                    </span>
                                                )}
                                            </div>
                                            <img src={img} alt="product" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* <!-- Product Slide Nav --> */}
                            <div className="product-slider__nav">
                                <Slider
                                    arrows={false}
                                    asNavFor={nav1}
                                    ref={(slider2) => setNav2(slider2)}
                                    slidesToShow={4}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                >
                                    {product.imageUrls.map((img, index) => (
                                        <div
                                            key={index}
                                            className="product-slider__nav-item"
                                        >
                                            <img src={img} alt="product" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            {product.quantity > 0 ? (
                                <span className="product-stock">Còn Hàng</span>
                            ) : (
                                ""
                            )}

                            <span className="product-num">
                                SKU: {product.id}
                            </span>
                            {product.oldPrice ? (
                                <span className="product-price">
                                    <span>${product.oldPrice}</span>$
                                    {product.price}
                                </span>
                            ) : (
                                <span className="product-price">
                                    {product.price.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            )}
                            <p>{product.description}</p>

                            {/* <!-- Social Share Link --> */}
                            <div className="contacts-info__social">
                                <span>Kết nối với chúng tôi:</span>
                                <ul>
                                    {socialLinks.map((social, index) => (
                                        <li key={index}>
                                            <a href={social.path}>
                                                <i
                                                    className={
                                                        social.icon
                                                            ? social.icon
                                                            : ""
                                                    }
                                                ></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* <!-- Product Color info--> */}
                            <div className="product-options">
                                <div className="product-info__color">
                                    <span>Color:</span>
                                    <ul>
                                        {product?.colors?.map(
                                            (color, index) => (
                                                <li
                                                    onClick={() =>
                                                        setActiveColor(index)
                                                    }
                                                    className={
                                                        activeColor === index
                                                            ? "active"
                                                            : ""
                                                    }
                                                    key={index}
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                ></li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                {/* <!-- Order Item counter --> */}
                                <div className="product-info__quantity">
                                    <span className="product-info__quantity-title">
                                        Số Lượng:
                                    </span>
                                    <div className="counter-box">
                                        <span
                                            onClick={() => {
                                                if (quantity > 1) {
                                                    setQuantity(quantity - 1);
                                                }
                                            }}
                                            className="counter-link counter-link__prev"
                                        >
                                            <i className="icon-arrow"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="counter-input"
                                            disabled
                                            value={quantity}
                                        />
                                        <span
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                            className="counter-link counter-link__next"
                                        >
                                            <i className="icon-arrow"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-buttons">
                                <button
                                    disabled={addedInCart}
                                    onClick={() => handleAddToCart()}
                                    className="btn btn-icon"
                                >
                                    <i className="icon-cart"></i> Thêm vào giỏ
                                    hàng
                                </button>
                                {/* <button className="btn btn-grey btn-icon">
                                    <i className="icon-heart"></i> Yêu thích
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Details Tab --> */}
                    <div className="product-detail">
                        <div className="tab-wrap product-detail-tabs">
                            <ul className="nav-tab-list tabs pd-tab">
                                <li
                                    className={tab === 1 ? "active" : ""}
                                    onClick={() => setTab(1)}
                                >
                                    Mô Tả
                                </li>
                                <li
                                    className={tab === 2 ? "active" : ""}
                                    onClick={() => setTab(2)}
                                >
                                    Đánh Giá
                                </li>
                            </ul>
                            <div className="box-tab-cont">
                                {/* <!-- Product description --> */}
                                {tab === 1 && (
                                    <div className="tab-cont">
                                        <p>{product.description}</p>
                                    </div>
                                )}

                                {tab === 2 && (
                                    <div className="tab-cont product-reviews">
                                        {/* <!-- Product Reviews --> */}
                                        <Reviews reviews={product.reviews} />

                                        {/* <!-- Product Review Form --> */}
                                        {/* <ReviewFrom /> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img
                    className="promo-video__decor js-img"
                    src="/assets/img/promo-video__decor.jpg"
                    alt=""
                /> */}
            </div>
            {/* <!-- PRODUCT EOF   --> */}
        </>
    );
};
