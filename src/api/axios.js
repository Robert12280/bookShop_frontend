import axios from "axios";
const BASE_URL = "https://bookshop-api-lb8f.onrender.com/auth/google";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
