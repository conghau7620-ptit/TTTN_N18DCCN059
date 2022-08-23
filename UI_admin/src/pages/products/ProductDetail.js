import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { getAllTypeActive } from "../../api/typeApi";
import { getAllBrandActive } from "../../api/brandApi";
import { getOneProduct, updateProduct } from "../../api/productApi";

import { toast } from "react-toastify";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [typeList, setTypeList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [productDetail, setProductDetail] = useState();

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
                const productDetail = await getOneProduct(productId);
                setProductDetail(productDetail.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [
        name,
        description,
        price,
        quantity,
        typeId,
        brandId,
        discount,
        productId,
    ]);

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

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const dataUpdate = {
            id: productDetail.id,
            name: name || productDetail.name,
            description: description || productDetail.description,
            price: price || productDetail.price,
            quantity: quantity || productDetail.quantity,
            typeId:
                typeId ||
                typeList.find((type) => type.name === productDetail.type).id,
            brandId:
                brandId ||
                brandList.find((brand) => brand.name === productDetail.brand)
                    .id,
            discount: discount || productDetail.discount,
            active: productDetail.active,
        };
        try {
            /*const response =*/ await updateProduct(dataUpdate);
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
                    <h1>Cập Nhật Thông Tin Sản Phẩm</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {productDetail?.imageUrls.map((url) => (
                            <img src={url} alt="" key={url} />
                        ))}
                    </div>
                    <div className="right">
                        <form onSubmit={(e) => handleUpdateProduct(e)}>
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
                                    defaultValue={productDetail?.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Mô Tả</label>
                                <textarea
                                    rows={4}
                                    cols={50}
                                    defaultValue={productDetail?.description}
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
                                    defaultValue={productDetail?.price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="formInput">
                                <label>Số Lượng</label>
                                <input
                                    type="number"
                                    required
                                    defaultValue={productDetail?.quantity}
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
                                        <option
                                            key={id}
                                            value={id}
                                            selected={
                                                productDetail?.type === name
                                            }
                                        >
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
                                        <option
                                            key={id}
                                            value={id}
                                            selected={
                                                productDetail?.brand === name
                                            }
                                        >
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
                                    defaultValue={productDetail?.discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                />
                            </div>
                            <button>Cập Nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
