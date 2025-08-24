import apiClient from "./axiosConfig";

export const loginUser = async (credentials) => {
    const {data} = await apiClient.post("/auth/login", credentials);
    return data;
}
export const registerUser = async (userData) => {
    const { data } = await apiClient.post("/auth/register", userData);
    return data;
}
export const logoutUser = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
}