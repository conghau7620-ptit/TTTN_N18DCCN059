import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { getAllStaff } from "../../api/staffApi";
import { userColumns } from "../../dataTableSource";
import { updateUser } from "../../api/userAPI";
import AuthContext from "../../context/authProvider";
const Staff = () => {
    const [staff, setStaff] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const getAllStaffDetail = async () => {
            try {
                const response = await getAllStaff();
                const filterStaff = response.data.userResponses.filter(
                    (staff) => staff.id !== auth.id
                );
                setStaff(filterStaff);
            } catch (err) {
                console.log(err);
            }
        };

        getAllStaffDetail();
    }, []);

    const handleUnActive = async (id) => {
        const staffUpdate = staff.find((staff) => staff.id === id);
        delete staffUpdate["imageUrl"];
        await updateUser({ ...staffUpdate, active: false });
        const response = await getAllStaff();
        const filterStaff = response.data.userResponses.filter(
            (staff) => staff.id !== auth.id
        );
        setStaff(filterStaff);
    };

    const handleActive = async (id) => {
        const staffUpdate = staff.find((staff) => staff.id === id);
        delete staffUpdate["imageUrl"];
        await updateUser({ ...staffUpdate, active: true });
        const response = await getAllStaff();
        const filterStaff = response.data.userResponses.filter(
            (staff) => staff.id !== auth.id
        );
        setStaff(filterStaff);
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Hành Động",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to={`/users/${params.row.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="viewButton">Xem</div>
                        </Link>
                        {params.row.active ? (
                            <div
                                className="deleteButton"
                                onClick={() => handleUnActive(params.row.id)}
                            >
                                Tắt Hoạt Động
                            </div>
                        ) : (
                            <div
                                className="activeButton"
                                onClick={() => handleActive(params.row.id)}
                            >
                                Bật Hoạt Động
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];
    return (
        <div className="list-product">
            <Sidebar />
            <div className="list-product-container">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        <p></p>
                        <Link to="/users/new" className="link">
                            Thêm Mới
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={staff}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={10}
                        pagination
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
        </div>
    );
};
export default Staff;
