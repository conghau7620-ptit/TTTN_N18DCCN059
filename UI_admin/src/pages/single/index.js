import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Chart from "../../components/chart";
import List from "../../components/table";
import { useParams } from "react-router-dom";
import { getUser } from "../../api/userAPI";
import "./style.scss";

const Single = () => {
    let { userId } = useParams();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        const getDetailUser = async () => {
            try {
                const response = await getUser(userId);
                setUserDetail(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getDetailUser();
    }, []);

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src={
                                    userDetail?.imageUrl ||
                                    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                }
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">
                                    {userDetail?.name}
                                </h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">
                                        {userDetail?.email}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">
                                        {userDetail?.phone}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        {userDetail?.address}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Active:</span>
                                    <span className="itemValue">
                                        {userDetail?.active ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Single;
