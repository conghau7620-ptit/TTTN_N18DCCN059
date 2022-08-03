import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { DataGrid } from "@mui/x-data-grid";
import { getAllProducts } from "../../api/product";
import { Link } from "react-router-dom";

import "./style.scss";

const Product = () => {
  const [products, setProducts] = useState([{ id: "3445", name: "hau" }]);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    if (res && res !== null) {
      setProducts(res);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
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
        <DataGrid
          className="datagrid"
          rows={products}
          columns={products.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Product;
