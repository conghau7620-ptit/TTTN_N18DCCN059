import axiosClient from "./axiosClient";

export const login = async (username, password) => {
    const url = '/login';
    const response = await axiosClient.post(url, {username, password});
    return response;
}
