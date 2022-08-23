import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import {
    getAllBrand,
    changeStatusBrand,
    createBrand,
} from "../../api/brandApi";
import { brandColumn } from "../../dataTableSource";
import AddModal from "../../components/addModal";

function Brand() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getBrandDetail = async () => {
            try {
                const response = await getAllBrand();
                setData(response.data.brands);
            } catch (err) {
                console.log(err);
            }
        };

        getBrandDetail();
    }, [isOpen]);

    const handleAcive = async (id) => {
        try {
            await changeStatusBrand({ id, active: true });
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnactive = async (id) => {
        try {
            await changeStatusBrand({ id, active: false });
            const response = await getAllBrand();
            setData(response.data.brands);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddBrand = async (name, active) => {
        try {
            const response = await createBrand({ name, active });
            setIsOpen(false);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
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
                            to="/users/test"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="viewButton">Sửa</div>
                        </Link>
                        {params.row.active ? (
                            <div
                                className="deleteButton"
                                onClick={() => handleUnactive(params.row.id)}
                            >
                                Tắt Hoạt Động
                            </div>
                        ) : (
                            <div
                                className="activeButton"
                                onClick={() => handleAcive(params.row.id)}
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
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        <p></p>
                        <button
                            className="link"
                            onClick={() => setIsOpen(true)}
                        >
                            Tạo Mới
                        </button>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={brandColumn.concat(actionColumn)}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
            <AddModal
                title="Thương Hiệu"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleAdd={handleAddBrand}
            />
        </div>
    );
}

export default Brand;
