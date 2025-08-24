import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getLeads, createLead, updateLead, deleteLead } from "../api/leads.js";
import toast from "react-hot-toast";
export const useLeads = (page, limit, filters) => {
  return useQuery({
    queryKey: ["leads", page, limit, filters],
    queryFn: () => getLeads(page, limit, filters),
    placeholderData: (previousData) => previousData,
  });
};
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success("Lead created successfully!");
      queryClient.invalidateQueries(["leads"]); // Refetch the leads list
    },
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to create lead"),
  });
};

export const useUpdateLead = () => {
     const queryClient = useQueryClient();
      return useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      toast.success("Lead updated successfully!");
      queryClient.invalidateQueries(["leads"]); // Refetch the leads list
    },
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to update lead"),
  });
}
export const useDeleteLead = () => {
     const queryClient = useQueryClient();
      return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast.success("Lead deleted successfully!");
      queryClient.invalidateQueries(["leads"]); // Refetch the leads list
    },
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to delete lead"),
  });
}