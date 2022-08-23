import axiosClient from "./axiosClient";
import { getItem } from "../common/storage";

export const getAllType = async (params) => {
    const url = "/type";
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

export const getAllTypeActive = async () => {
    const url = "/type/active";
    const response = await axiosClient.get(url);
    return response;
};

export const changeStatusType = async (data) => {
    const url = "type/active";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const createType = async (data) => {
    const url = "/type";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
