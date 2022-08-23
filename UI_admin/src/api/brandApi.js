import axiosClient from "./axiosClient";
import { getItem } from "../common/storage";

export const getAllBrand = async (params) => {
    const url = "/brand";
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

export const getAllBrandActive = async () => {
    const url = "/brand/active";
    const response = axiosClient.get(url);
    return response;
};

export const changeStatusBrand = async (data) => {
    const url = "/brand/active";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const createBrand = async (data) => {
    const url = "/brand";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
