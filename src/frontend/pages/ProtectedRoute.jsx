import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        alert('Please verify your email to access the app.');
        navigate('/verification'); // Redirect unverified users
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <Outlet />; // Render child routes
};

export default ProtectedRoute;
