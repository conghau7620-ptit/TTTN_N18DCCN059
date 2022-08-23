export const Card = ({ order, index, onCollapse, active }) => {
    const { createdDate, orderAddress, total, status, orderDetailsResponses } =
        order;

    return (
        <>
            <div
                className={`profile-orders__item ${
                    active === index && "active"
                }`}
            >
                <div className="profile-orders__row">
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">Ngày</span>
                        <span className="profile-orders__item-date">
                            {createdDate}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">Địa Chỉ</span>
                        <span className="profile-orders__item-addr">
                            {orderAddress}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">
                            Tổng Đơn Hàng
                        </span>
                        <span className="profile-orders__item-price">
                            {total.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </div>
                    <div className="profile-orders__col">
                        <span className="profile-orders__col-mob">
                            Trạng Thái
                        </span>
                        <span
                            className={`profile-orders__col-${
                                status.delivered ? "delivered" : "onway"
                            }`}
                        >
                            {status}
                        </span>
                        <span
                            onClick={() => onCollapse(index)}
                            className="profile-orders__col-btn"
                        ></span>
                    </div>
                </div>
                <div className="profile-orders__content">
                    <ul>
                        {orderDetailsResponses.map((item, index) => (
                            <li key={index}>
                                {`Tên Sản Phẩm: ${item.productName}`}
                                <span>{`Số Lượng: ${item.quantity}`}</span>
                                <span>
                                    {`Tổng: ${item.amount.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}`}
                                </span>
                            </li>
                        ))}
                        <li>
                            Phương Thức Thanh Toán
                            <span>Thanh Toán Khi Nhận Hàng</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
