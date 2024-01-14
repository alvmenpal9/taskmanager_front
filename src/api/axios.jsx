import axios from "axios";
import { API_URL } from "./config";

export default axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})