import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
