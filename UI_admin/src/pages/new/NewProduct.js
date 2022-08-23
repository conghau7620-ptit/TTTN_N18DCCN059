import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { getAllTypeActive } from "../../api/typeApi";
import { getAllBrandActive } from "../../api/brandApi";
import { createProduct } from "../../api/productApi";
import { toast } from "react-toastify";

const NewProduct = () => {
    const navigate = useNavigate();

    const [typeList, setTypeList] = useState([]);
    const [brandList, setBrandList] = useState([]);

    const [files, setFiles] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [typeId, setTypeId] = useState();
    const [brandId, setBrandId] = useState();
    const [discount, setDiscount] = useState();

    useEffect(() => {
        (async () => {
            try {
                const types = await getAllTypeActive();
                const brands = await getAllBrandActive();
                setTypeList(types.data.types);
                setBrandList(brands.data.brands);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("typeId", typeId);
        formData.append("brandId", brandId);
        formData.append("discount", discount);

        try {
            await createProduct(formData);
            setFiles([]);
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setBrandId("");
            setTypeId("");
            setDiscount("");
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Thêm sản phẩm mới</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {files.length > 0 ? null : (
                            <img
                                src={
                                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        )}
                        {files.map((file) => (
                            <img
                                key={file.name}
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="right">
                        <form
                            encType="multipart/form-data"
                            onSubmit={(e) => handleCreateProduct(e)}
                        >
                            <div className="formInput">
                                <label htmlFor="file">
                                    Hình ảnh:{" "}
                                    <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) =>
                                        setFiles([
                                            ...files,
                                            ...Array.from(e.target.files),
                                        ])
                                    }
                                    style={{ display: "none" }}
                                />
                            </div>

                            <div className="formInput">
                                <label>Tên Sản Phẩm</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Mô Tả</label>
                                <textarea
                                    rows={4}
                                    cols={50}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="formInput">
                                <label>Giá</label>
                                <input
                                    type="number"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Số Lượng</label>
                                <input
                                    type="number"
                                    required
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>

                            <div className="formInput">
                                <label>Danh Mục</label>
                                <select
                                    onChange={(e) =>
                                        setTypeId(Number(e.target.value))
                                    }
                                >
                                    {typeList.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="formInput">
                                <label>Thương Hiệu</label>
                                <select
                                    onChange={(e) =>
                                        setBrandId(Number(e.target.value))
                                    }
                                >
                                    {brandList.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="formInput">
                                <label>Giảm Giá</label>
                                <input
                                    type="number"
                                    required
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                />
                            </div>
                            <button>Tạo</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
