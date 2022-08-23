import Link from "next/link";

export const Banner = () => {
    return (
        <>
            {/* <!-- BEGIN MAIN BLOCK --> */}
            <div className="main-block load-bg">
                <div className="wrapper">
                    <div className="main-block__content">
                        <span className="saint-text">Professional</span>
                        <h1 className="main-text">Beauty &amp; Fashion</h1>
                        <p>
                            Thiết kế đặc biệt định hình phong cách cho riêng bạn
                        </p>

                        <Link href="/shop">
                            <a className="btn">Mua ngay</a>
                        </Link>
                    </div>
                </div>
                {/* <img
                    className="main-block__decor"
                    src="/assets/img/main-block-decor.png"
                    alt=""
                /> */}
            </div>
            {/* <!-- MAIN BLOCK EOF --> */}
        </>
    );
};
