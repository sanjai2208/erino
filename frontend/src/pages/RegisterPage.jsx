import { useState } from "react"
import { useRegister } from "../hooks/useAuth";
const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate : register, isLoading, error} = useRegister();
    const handleSubmit = (e) => {
        e.preventDefault();
       register({name, email, password});
         
    }
  return (
    <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit} className="w-80 p-4 border rounded">
      <h2 className="text-xl mb-4">Register</h2>

      <div className="mb-3">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

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

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  </div>
  )
}

export default RegisterPage
