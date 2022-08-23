import axiosClient from "./axiosClient";

export const getAllProduct = async (params) => {
    const url = "/product/active";
    const response = await axiosClient.get(url, { params });
    return response;
};

export const getOneProduct = async (id) => {
    const url = `/product/${id}`;
    const response = await axiosClient.get(url);
    return response;
};

export const getAllType = async () => {
    const url = "/type/active";
    const response = await axiosClient.get(url);
    return response;
};

export const getAllBrand = async () => {
    const url = "/brand/active";
    const response = axiosClient.get(url);
    return response;
};
