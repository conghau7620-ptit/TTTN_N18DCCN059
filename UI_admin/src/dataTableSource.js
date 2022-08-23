export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Tên",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={
                            params.row.imageUrl ||
                            "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        }
                        alt="avatar"
                    />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "roleId",
        headerName: "Access Level",
        width: 150,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.roleId}`}>
                    {params.row.roleId === 1
                        ? "Admin"
                        : params.row.roleId === 2
                        ? "Staff"
                        : "Customer"}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "address",
        headerName: "Địa Chỉ",
        width: 300,
    },
    {
        field: "phone",
        headerName: "Số Điện Thoại",
        width: 200,
    },
    {
        field: "active",
        headerName: "Hoạt Động",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Có" : "Không"}
                </div>
            );
        },
    },
];

export const typeColumn = [
    { field: "id", headerName: "ID", width: 70 },

    {
        field: "name",
        headerName: "Tên",
        width: 200,
    },

    {
        field: "active",
        headerName: "Hoạt Động",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Có" : "Không"}
                </div>
            );
        },
    },
];

export const brandColumn = [
    { field: "id", headerName: "ID", width: 70 },

    {
        field: "name",
        headerName: "Tên",
        width: 200,
    },

    {
        field: "active",
        headerName: "Hoạt Động",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Có" : "Không"}
                </div>
            );
        },
    },
];

export const productsColumn = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Tên",
        width: 300,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={params.row.imageUrls[0]}
                        alt="avatar"
                    />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "description",
        headerName: "Mô Tả",
        width: 500,
    },

    {
        field: "price",
        headerName: "Giá",
        width: 200,
        renderCell: (params) => {
            return (
                <div>
                    {params.row.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            );
        },
    },
    {
        field: "quantity",
        headerName: "Số Lượng",
        width: 100,
    },
    {
        field: "discount",
        headerName: "Giảm Giá",
        width: 100,
    },
    {
        field: "type",
        headerName: "Danh Mục",
        width: 100,
    },
    {
        field: "brand",
        headerName: "Thương Hiệu",
        width: 100,
    },

    {
        field: "active",
        headerName: "Hoạt Động",
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.active}`}>
                    {params.row.active ? "Có" : "Không"}
                </div>
            );
        },
    },
];
