export const Subscribe = () => {
    return (
        <>
            {/* <!-- BEGIN SUBSCRIBE --> */}
            <div className="subscribe">
                <div className="wrapper">
                    <div className="subscribe-form">
                        <form>
                            <h3>Đăng kí để nhận tin</h3>
                            <p>
                                Đăng kí để nhận ngay các chương trình khuyến mãi
                                hấp dẫn nhất
                            </p>
                            <div className="box-field__row">
                                <div className="box-field">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Địa chỉ email của bạn"
                                    />
                                </div>
                                <button type="submit" className="btn">
                                    Đăng kí
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- SUBSCRIBE EOF   --> */}
        </>
    );
};
