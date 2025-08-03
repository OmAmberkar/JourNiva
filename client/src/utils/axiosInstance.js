import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:4000/api",
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
    }
})

axiosInstance.interceptors.request.use((config)  =>{
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("[Axios] Authorization header set:", config.headers.Authorization);
    } else {
        console.log("[Axios] No token found in localStorage");
    }
    return config
})

