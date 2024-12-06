import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './frontend/pages/LoginPage';
import RegisterPage from './frontend/pages/RegisterForm';
import DashboardPage from './frontend/pages/Dashboard'; // Import DashboardPage
import LandingPage from './frontend/pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Update route */}
        {/* Additional routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
