import axios from "axios";

const apiClient = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL || 'http://localhost:2810/api',
    withCredentials : true
})
export default apiClient;