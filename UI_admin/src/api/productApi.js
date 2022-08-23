import axiosClient from "./axiosClient";
import { getItem } from "../common/storage/local";

export const getAllProduct = async (params) => {
    const url = "/product";
    const response = await axiosClient({
        medthod: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
        params: params,
    });
    return response;
};

export const getOneProduct = async (id) => {
    const url = `/product/${id}`;
    const response = await axiosClient.get(url);
    return response;
};

export const changeStatusProduct = async (data) => {
    const url = "/product/active";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const createProduct = async (data) => {
    const url = "/product";
    const response = await axiosClient.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const updateProduct = async (data) => {
    const url = "/product";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
