import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {mutate : login, isLoading, error} = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password});
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-80 p-4 border rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <div className="mb-3">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}  
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
         {error && <p className="text-red-400">{error.response.data.error}</p>} 
      </form>
    </div>
  );
};

export default LoginPage;
