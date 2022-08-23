import axios from "axios";
import queryString from "query-string";
import { getItem } from "utils/local";
const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    // Hanlde token
    // const token = JSON.parse(getItem("TOKEN"));
    // config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        //Handle error
        throw error;
    }
);
export default axiosClient;
