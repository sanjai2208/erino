import axios from "axios";

const apiClient = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL || "https://erino-backend-j4d5.onrender.com/api" ,
    withCredentials : true
})
export default apiClient;