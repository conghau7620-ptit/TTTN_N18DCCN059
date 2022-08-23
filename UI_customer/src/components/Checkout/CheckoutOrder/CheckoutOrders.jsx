import productData from "data/product/product";
import { CartContext } from "pages/_app";
import { useContext } from "react";
import { Card } from "./Card/Card";

export const CheckoutOrders = () => {
    const { cart } = useContext(CartContext);
    const total = cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    );

    return (
        <>
            <div className="checkout-order">
                <h5>Đơn Hàng Của Bạn</h5>
                {cart.map((order) => (
                    <Card key={order.id} order={order} />
                ))}
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
                    Tổng Cộng
                    <span>
                        {total.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
            </div>
        </>
    );
};
