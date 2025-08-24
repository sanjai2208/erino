import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadsPage from "./pages/LeadsPage";
import { useLogout } from "./hooks/useAuth";
const App = () => {
  const { isAuthenticated  } = useAuth();
   const logoutMutation = useLogout();
   const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    
    <div className="p-4">
      
      <nav className="flex justify-end space-x-4 items-center mb-2">

        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            <span>|</span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </>
        )}


        {isAuthenticated && (
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isLoading}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
          >
            {logoutMutation.isLoading ? "Logging out..." : "Logout"}
          </button>
        )}
      </nav>

      <hr className="border-gray-300 mb-4" />

      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/leads" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/leads" /> : <RegisterPage />
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadsPage/>
            </ProtectedRoute>
          }
        />
         <Route path="/" element={<Navigate to="/leads" />} />
      </Routes>
    </div>
  );
};

export default App;
