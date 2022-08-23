import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../dataTableSource";
import { Link } from "react-router-dom";
import { getAllUser, updateUser } from "../../api/userAPI";

import "./style.scss";

const Datatable = () => {
    const [data, setData] = useState([]);

    const handleUnActive = async (id) => {
        const user = data.find((user) => user.id === id);
        delete user["imageUrl"];
        await updateUser({ ...user, active: false });
        const response = await getAllUser();
        setData(response.data.userResponses);
    };

    const handleActive = async (id) => {
        const user = data.find((user) => user.id === id);
        delete user["imageUrl"];
        await updateUser({ ...user, active: true });
        const response = await getAllUser();
        setData(response.data.userResponses);
    };

    useEffect(() => {
        const getAllUserData = async () => {
            const response = await getAllUser();
            console.log(response.data);
            setData(response.data.userResponses);
        };
        getAllUserData();
    }, []);

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
        <div className="datatable">
            <div className="datatableTitle">
                <p></p>
                <Link to="/users/new" className="link">
                    Thêm Mới
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={10}
                pagination
                rowsPerPageOptions={[10]}
            />
        </div>
    );
};

export default Datatable;
