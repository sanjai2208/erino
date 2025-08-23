import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {loginUser, registerUser} from "../api/auth.js";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation(loginUser, {
        onSuccess : (data)=> {
            toast.success("Login successfull");
            navigate("/leads");
        }, onError :(error) =>  {
            toast.error(error.response?.data?.error || "Ab error occured");
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation(registerUser, {
        onSuccess: (data) => {
            toast.success('Registration successful. Please log in.');
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    });
};