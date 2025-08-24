import React, { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const fetchCurrentUser = async () => {
  const { data } = await apiClient.get("/auth/me");
  return data?.user ?? null;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  // useEffect(()=>{
  //   if(user){
  //     NavigationHistoryEntry("/leads")
  //   }
  // },[user, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RingLoader color="#4F46E5" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
