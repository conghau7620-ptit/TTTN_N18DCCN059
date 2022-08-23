import Link from "next/link";

export const Card = ({ order }) => {
    const { imageUrls, name, price, productNumber, id, quantity } = order;

    return (
        <>
            {/* <!-- BEING ORDER ITEM CARD --> */}
            <div className="checkout-order__item">
                <Link href={`/product/${id}`}>
                    <a className="checkout-order__item-img">
                        <img src={imageUrls[0]} className="js-img" alt="" />
                    </a>
                </Link>
                <div className="checkout-order__item-info">
                    <Link href={`/product/${id}`}>
                        <a className="title6">
                            {name} <span>x{quantity}</span>
                        </a>
                    </Link>
                    <span className="checkout-order__item-price">
                        {(price * quantity).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                    <span className="checkout-order__item-num">SKU: {id}</span>
                </div>
            </div>
            {/* <!-- ORDER ITEM CARD EOF --> */}
        </>
    );
};
