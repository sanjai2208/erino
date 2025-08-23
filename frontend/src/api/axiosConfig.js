import axios from "axios";

const apiClient = axios.create({
    baseURL : "http://localhost:2810/api",
    withCredentials : true
})
export default apiClient;