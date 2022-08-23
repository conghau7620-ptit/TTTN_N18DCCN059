import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { DataGrid } from "@mui/x-data-grid";
import { getAllProduct, changeStatusProduct } from "../../api/productApi";
import { Link } from "react-router-dom";
import { productsColumn } from "../../dataTableSource";

import "./style.scss";

const Product = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await getAllProduct();
            setProducts(res.data.productResponses);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUnActive = async (id) => {
        try {
            await changeStatusProduct({ id, active: false });
            const response = await getAllProduct();
            setProducts(response.data.productResponses);
        } catch (err) {
            console.log(err);
        }
    };

    const handleActive = async (id) => {
        try {
            await changeStatusProduct({ id, active: true });
            const response = await getAllProduct();
            setProducts(response.data.productResponses);
        } catch (err) {}
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
                            to={`/products/${params.row.id}`}
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
                        <Link to="/products/new" className="link">
                            Thêm Mới
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={products}
                        columns={productsColumn.concat(actionColumn)}
                        pageSize={10}
                        pagination
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
