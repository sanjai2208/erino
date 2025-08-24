import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, logoutUser, registerUser } from "../api/auth.js";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext);

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successfull");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/leads");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Ab error occured");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful. Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      toast.success("Logged out successfully!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
};
