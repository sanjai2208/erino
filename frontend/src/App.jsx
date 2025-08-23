import { Link, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
const App = () => {

  return (
    <div className="p-4">
  <nav className="flex justify-end space-x-2 mb-2">
    <Link to="/login" className="text-blue-500">Login</Link>
    <span>|</span>
    <Link to="/register" className="text-blue-500">Register</Link>
  </nav>

  <hr className="border-gray-300 mb-4" />

  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
</div>

  )
}

export default App
