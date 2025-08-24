import apiClient from "./axiosConfig";

export const getLeads = async (page = 1, limit = 20, filters = {}) =>{
    const params = new URLSearchParams({page, limit,...filters});
    const { data } = await apiClient.get("/leads", {params});
    return data;
}
export const createLead = async (leadData) => {
  const { data } = await apiClient.post('/leads', leadData);
  return data;
}
export const updateLead = async ({ id, ...leadData }) => {
  const { data } = await apiClient.put(`/leads/${id}`, leadData);
  return data;
}
export const deleteLead = async (id) => {
  await apiClient.delete(`/leads/${id}`);
  return id;
}