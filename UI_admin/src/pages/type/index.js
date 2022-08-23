import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { typeColumn } from "../../dataTableSource";
import { getAllType, changeStatusType, createType } from "../../api/typeApi";
import AddModal from "../../components/addModal";
import EditModal from "../../components/editModal";

function Type() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        const getTypeData = async () => {
            try {
                const response = await getAllType();
                setData(response.data.types);
            } catch (err) {
                console.log(err);
            }
        };
        getTypeData();
    }, [isOpen]);

    const handleAcive = async (id) => {
        try {
            await changeStatusType({ id, active: true });
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnactive = async (id) => {
        try {
            await changeStatusType({ id, active: false });
            const response = await getAllType();
            setData(response.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddType = async (name, active) => {
        try {
            const response = await createType({ name, active });
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
                        <div
                            className="viewButton"
                            onClick={() => setIsEditOpen(true)}
                        >
                            Sửa
                        </div>
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
                        columns={typeColumn.concat(actionColumn)}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
            <AddModal
                title="Danh Mục"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleAdd={handleAddType}
            />
            <EditModal
                title="Type"
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
            />
        </div>
    );
}

export default Type;
