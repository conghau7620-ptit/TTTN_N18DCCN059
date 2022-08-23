import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "context/authProvider";
import { setItem } from "utils/local";
export const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const socialLinks = [...socialData];

    const total = cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    );

    const handleProductQuantity = (change, quantity, id) => {
        console.log(change, quantity, id);
        if (change === "increment") {
            cart.find((item) => item.id === id).quantity = quantity + 1;
            setCount(count + 1);
            setItem("CART", JSON.stringify(cart));
        }
        if (change === "decrement" && quantity > 1) {
            cart.find((item) => item.id === id).quantity = quantity - 1;
            setCount(count + 1);
            setItem("CART", JSON.stringify(cart));
        }
    };

    const handleRemoveProduct = (id) => {
        const newCart = cart.filter((cart) => cart.id !== id);
        setCart(newCart);
        setItem("CART", JSON.stringify(newCart));
    };

    useEffect(() => {
        setCart(cart);
    }, [cart, count]);

    return (
        <>
            {/* <!-- BEGIN CART --> */}
            <div className="cart">
                <div className="wrapper">
                    <div className="cart-table">
                        <div className="cart-table__box">
                            <div className="cart-table__row cart-table__row-head">
                                <div className="cart-table__col">Sản Phẩm</div>
                                <div className="cart-table__col">Giá</div>
                                <div className="cart-table__col">Số Lượng</div>
                                <div className="cart-table__col">Tạm Tính</div>
                            </div>

                            {cart.length <= 0 && (
                                <h2>Bạn Chưa Chọn Sản Phẩm</h2>
                            )}
                            {cart.map((cart) => (
                                <Card
                                    onChangeQuantity={(change, quantity) =>
                                        handleProductQuantity(
                                            change,
                                            quantity,
                                            cart.id
                                        )
                                    }
                                    onRemoveProduct={handleRemoveProduct}
                                    key={cart.id}
                                    cart={cart}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="cart-bottom">
                        <div className="cart-bottom__promo">
                            <form className="cart-bottom__promo-form">
                                <div className="box-field__row">
                                    <div className="box-field">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mã ưu đãi"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-grey"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </form>
                            <h6>Làm Thế Nào Để Lấy Mã Giảm Giá?</h6>
                            <p>
                                Theo dõi tin tức của chúng tôi trên trang web,
                                cũng như đăng ký các mạng xã hội của chúng tôi.
                                Vì vậy, bạn sẽ không chỉ có thể nhận được mã cập
                                nhật mà còn có thể tìm hiểu về các sản phẩm mới
                                và các mặt hàng khuyến mãi.
                            </p>
                            <div className="contacts-info__social">
                                <span>Kết nối với chúng tôi:</span>
                                <ul>
                                    {socialLinks.map((social, index) => (
                                        <li key={index}>
                                            <a
                                                href={social.path}
                                                target="_blank"
                                            >
                                                <i className={social.icon}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="cart-bottom__total">
                            <div className="cart-bottom__total-goods">
                                Tạm Tính
                                <span>
                                    {total.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </div>
                            <div className="cart-bottom__total-promo">
                                Giảm Giá Áp Dụng Mã Khuyễn Mãi
                                <span>Không</span>
                            </div>
                            <div className="cart-bottom__total-num">
                                Tổng Cộng:
                                <span>
                                    {total.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </div>
                            {auth ? (
                                cart.length > 0 ? (
                                    <Link href="/checkout">
                                        <a className="btn">
                                            Tiến Hành Thanh Toán
                                        </a>
                                    </Link>
                                ) : null
                            ) : (
                                <Link href="/login">
                                    <a className="btn">Tiến Hành Thanh Toán</a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* <img
                    className="promo-video__decor js-img"
                    src="assets/img/promo-video__decor.jpg"
                    alt=""
                /> */}
            </div>
            {/* <!-- CART EOF   --> */}
        </>
    );
};
