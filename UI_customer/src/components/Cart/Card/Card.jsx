import Link from "next/link";

export const Card = ({ cart, onChangeQuantity, onRemoveProduct }) => {
    const {
        name,
        imageUrls,
        id,
        isStocked,
        productNumber,
        oldPrice,
        price,
        quantity,
    } = cart;

    return (
        <>
            <div className="cart-table__row">
                <div className="cart-table__col">
                    <Link href={`/product/${id}`}>
                        <a className="cart-table__img">
                            <img src={imageUrls[0]} className="js-img" alt="" />
                        </a>
                    </Link>
                    <div className="cart-table__info">
                        <Link href={`/product/${id}`}>
                            <a className="title5">{name}</a>
                        </Link>
                        {true && (
                            <span className="cart-table__info-stock">
                                Còn Hàng
                            </span>
                        )}
                        <span className="cart-table__info-num">SKU: {id}</span>
                        <p
                            style={{ color: "#d05278", cursor: "pointer" }}
                            onClick={() => onRemoveProduct(id)}
                        >
                            Xóa
                        </p>
                    </div>
                </div>
                <div className="cart-table__col">
                    {oldPrice ? (
                        <span className="cart-table__price">
                            <span>${oldPrice}</span>${price}
                        </span>
                    ) : (
                        <span className="cart-table__price">
                            {price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    )}
                </div>
                <div className="cart-table__col">
                    <div className="cart-table__quantity">
                        <div className="counter-box">
                            <span
                                onClick={() =>
                                    onChangeQuantity("decrement", quantity)
                                }
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
                                    onChangeQuantity("increment", quantity)
                                }
                                className="counter-link counter-link__next"
                            >
                                <i className="icon-arrow"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cart-table__col">
                    <span className="cart-table__total">
                        {(price * quantity).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
            </div>
        </>
    );
};
