import axiosClient from "./axiosClient";
import { getItem } from "utils/local";

export const getOneUser = async (id) => {
    const url = `/user/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};

export const getOrder = async (id) => {
    const url = `/order/customer/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};

export const createOrder = async (data) => {
    const url = "/order";
    const response = await axiosClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN"))}`,
        },
    });
    return response;
};
