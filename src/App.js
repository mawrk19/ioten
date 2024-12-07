import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./frontend/pages/AuthContext";
import LoginPage from "./frontend/pages/LoginPage";
import RegisterPage from "./frontend/pages/RegisterForm";
import DashboardPage from "./frontend/pages/Dashboard";
import LandingPage from "./frontend/pages/LandingPage";
import Admin from "./frontend/pages/Admin";
import NoAccountPage from "./frontend/pages/NoAccount";
import ProtectedRoute from "./frontend/pages/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/no-account" element={<NoAccountPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
