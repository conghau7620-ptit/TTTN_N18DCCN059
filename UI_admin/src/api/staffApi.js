import axiosClient from "./axiosClient";
import { getItem } from "../common/storage";

export const getAllStaff = async (params) => {
    const url = "/user/staff";
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
