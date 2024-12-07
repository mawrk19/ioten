import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import './App.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check email verification status
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }
  
      // Redirect to dashboard if email is verified
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Check if the email is registered in Firebase
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
      if (signInMethods.length === 0) {
        // If the email is not registered, navigate to NoAccountPage
        navigate("/no-account", { replace: true });
        setLoading(false);
        return;  // Do not proceed further
      }
  
      // If the account is registered, check if the email is verified
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        await auth.signOut();  // Sign out the user if the email is not verified
        setLoading(false);
        return;  // Do not proceed further
      }
  
      // If email is verified and registered, redirect to the dashboard
      navigate("/dashboard", { replace: true });
  
    } catch (error) {
      alert(getErrorMessage(error.code));  // Show specific error message if there's an issue
    } finally {
      setLoading(false);  // Stop the loading state once everything is handled
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login with Email"}
        </button>
      </form>
      <button className="google-login-button" onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
