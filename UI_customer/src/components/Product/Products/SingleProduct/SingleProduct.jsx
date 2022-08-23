import Link from "next/link";

export const SingleProduct = ({
    product,
    onAddToWish,
    onAddToCart,
    addedInCart,
}) => {
    const { name, oldPrice, price, imageUrls, isSale, isNew, id, discount } =
        product;
    return (
        <>
            {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
            <div className="products-item">
                <div className="products-item__type">
                    {discount > 0 && (
                        <span className="products-item__sale">sale</span>
                    )}
                </div>
                <div className="products-item__img">
                    <img src={imageUrls[0]} className="js-img" alt="" />
                    <div className="products-item__hover">
                        <Link href={`/product/${id}`}>
                            <a>
                                <i className="icon-search"></i>
                            </a>
                        </Link>
                        <div className="products-item__hover-options">
                            <button
                                disabled={addedInCart}
                                className={`addList ${
                                    addedInCart ? "added" : ""
                                }`}
                                onClick={() => onAddToCart(id)}
                            >
                                <i className="icon-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="products-item__info">
                    <Link href={`/product/${id}`}>
                        <a>
                            <span className="products-item__name">{name}</span>
                        </a>
                    </Link>
                    <span className="products-item__cost">
                        <span>{oldPrice && `$${oldPrice}`}</span>
                        {price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
            </div>
            {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
        </>
    );
};
