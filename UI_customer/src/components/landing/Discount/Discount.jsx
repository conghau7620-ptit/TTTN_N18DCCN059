import Link from "next/link";

export const Discount = () => {
    return (
        <>
            {/* <!-- BEGIN DISCOUNT --> */}
            <div className="discount js-img">
                <div className="wrapper">
                    <div>
                        <img
                            src="https://cmsv2.yame.vn/uploads/603759e0-c46a-4d8c-bdab-37f9e42b6c75/Thum_blog_sale_08.08_(02).jpg?quality=80&w=700&h=0"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                    <div className="discount-info">
                        <span className="saint-text">Discount</span>
                        <span className="main-text">
                            Get Your <span>50%</span> Off
                        </span>
                        <p>
                            Đừng bỏ lỡ các chương trình khuyến mãi Hot tại
                            BeShop
                        </p>

                        <Link href="/shop">
                            <a className="btn">Mua Ngay</a>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <!-- DISCOUNT EOF   --> */}
        </>
    );
};
