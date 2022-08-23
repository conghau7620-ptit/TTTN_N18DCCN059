import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AuthContext from "../../context/authProvider";
import { removeItem } from "../../common/storage/local";
import { useNavigate } from "react-router-dom";

import "./style.scss";
const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItem("TOKEN");
        return navigate("/login");
    };
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">LyLy Shop</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">Quản Lý</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Khách Hàng</span>
                        </li>
                    </Link>
                    {auth?.roleId === 1 ? (
                        <Link to="/staff" style={{ textDecoration: "none" }}>
                            <li>
                                <PersonOutlineIcon className="icon" />
                                <span>Nhân Viên</span>
                            </li>
                        </Link>
                    ) : null}
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Sản Phẩm</span>
                        </li>
                    </Link>
                    <Link to="/type" style={{ textDecoration: "none" }}>
                        <li>
                            <CategoryIcon className="icon" />
                            <span>Danh Mục</span>
                        </li>
                    </Link>
                    <Link to="/brand" style={{ textDecoration: "none" }}>
                        <li>
                            <BadgeIcon className="icon" />
                            <span>Thương Hiệu</span>
                        </li>
                    </Link>
                    <p className="title">Tài Khoản</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Thông Tin Tài Khoản</span>
                    </li>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span onClick={handleLogout}>Đăng Xuât</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
