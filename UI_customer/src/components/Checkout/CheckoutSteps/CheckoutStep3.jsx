import { useContext } from "react";
import { CartContext } from "pages/_app";
import router from "next/router";
export const CheckoutStep3 = ({ orderData }) => {
    const { setCart } = useContext(CartContext);
    return (
        <>
            {/* <!-- BEING CHECKOUT STEP Three -->  */}
            <div className="checkout-purchase checkout-form">
                <h4>
                    LiLy Shop Cảm Ơn
                    <br />
                    Bạn Đã Ủng Hộ Chúng Tôi
                </h4>
                <ul className="checkout-purchase__list">
                    <li>
                        <span>Mã Đơn Hàng</span>
                        {orderData?.id}
                    </li>
                    <li>
                        <span>Trạng Thái Đơn Hàng</span>
                        {orderData?.status}
                    </li>
                </ul>

                <p
                    onClick={() => {
                        setCart([]);
                        router.push("/shop");
                    }}
                    className="checkout-purchase__link"
                    style={{ cursor: "pointer" }}
                >
                    Tiếp Tục Mua Sắm
                </p>
            </div>
            {/* <!-- CHECKOUT STEP TWO EOF -->  */}
        </>
    );
};
