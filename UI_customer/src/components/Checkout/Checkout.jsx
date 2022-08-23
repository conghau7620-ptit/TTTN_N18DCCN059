import { useState, useContext } from "react";
import { AuthContext } from "context/authProvider";
import { CartContext } from "pages/_app";
import { CheckoutOrders } from "./CheckoutOrder/CheckoutOrders";
import { CheckoutStep1 } from "./CheckoutSteps/CheckoutStep1";
import { CheckoutStep3 } from "./CheckoutSteps/CheckoutStep3";
import { createOrder } from "api/userApi";
import { removeItem } from "utils/local";

const detailBlocks = [
    {
        step: "Bước 1",
        title: "Điền Thông Tin",
        icon: "icon-step1",
    },
    {
        step: "Bước 2",
        title: "Hoàn Thành",
        icon: "icon-step3",
    },
];

export const Checkout = () => {
    const { auth } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [activeStep, setActiveStep] = useState(1);
    const [ordersResponse, setOrdersResponse] = useState({});

    const handleNext = async ({ orderPhone, orderAddress, note }) => {
        // Map product property
        const productList = cart.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity,
            };
        });
        const orderData = {
            orders: {
                customerId: auth.id,
                orderPhone,
                orderAddress,
                note,
            },
            orderDetails: productList,
        };
        try {
            const response = await createOrder(orderData);
            removeItem("CART");
            setOrdersResponse(response);
            setActiveStep(activeStep + 1);
        } catch (err) {
            console.log(err);
        }
        // setActiveStep(activeStep + 1);
    };

    // const handlePrev = () => {
    //     setActiveStep(activeStep - 1);
    // };
    console.log(ordersResponse);

    return (
        <>
            <div className="wrapper">
                {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
                <div className="detail-block__items">
                    {detailBlocks.map((block, index) => (
                        <div
                            key={index}
                            className={`detail-block__item ${
                                activeStep <= index &&
                                "detail-block__item-inactive"
                            }`}
                        >
                            <div className="detail-block__item-icon">
                                <img
                                    src={
                                        activeStep <= index
                                            ? "/assets/img/main-text-decor2.svg"
                                            : "/assets/img/main-text-decor.svg"
                                    }
                                    className="js-img"
                                    alt=""
                                />
                                <i className={block.icon}></i>
                            </div>
                            <div className="detail-block__item-info">
                                <h6>{block.step}</h6>
                                {block.title}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <!-- DETAIL MAIN BLOCK EOF --> */}
            </div>

            {/* <!-- BEGIN CHECKOUT --> */}
            <div className={`checkout ${activeStep == 2 && "checkout-step2"}`}>
                <div className="wrapper">
                    <div className="checkout-content">
                        {(() => {
                            switch (activeStep) {
                                case 1:
                                    return (
                                        <CheckoutStep1 onNext={handleNext} />
                                    );
                                case 2:
                                    return (
                                        <CheckoutStep3
                                            orderData={ordersResponse}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()}
                        <div className="checkout-info">
                            <CheckoutOrders />
                        </div>
                    </div>
                </div>
                {/* <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        /> */}
            </div>
            {/* <!-- CHECKOUT EOF   --> */}
        </>
    );
};
