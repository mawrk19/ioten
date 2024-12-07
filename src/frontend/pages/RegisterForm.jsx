import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth from firebase.js
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css';
import { saveUser } from '../saveUser'; // Import saveUser function

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
      // Save user to Firestore
      await saveUser({ username, email });

      setIsRegistered(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email address is already in use. Please try with a different email.');
      } else {
        alert(error.message);
      }
    }
  };
  

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
  
      // Check if the user is verified
      if (!user.emailVerified) {
        alert("Please verify your email before using the app.");
        return;
      }
  
      // Save user to Firestore
      await saveUser({ username: user.displayName, email: user.email });

      // Proceed with app logic for signed-in user
      console.log('User signed in:', user);

    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('This account is already registered with a different method (e.g., email/password).');
      } else {
        alert(error.message);
      }
    }
  };
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="register-container">
      {isRegistered ? (
        <div className="verification-message">
          <h2>Check your email to verify your account</h2>
          <Link to="/login" className="login-link">Go to Login Page</Link>
        </div>
      ) : (
        <>
          <h2 className="register-title">Register</h2>
          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="register-button" type="submit">Register</button>
          </form>
          <button className="google-signin-button" onClick={handleGoogleSignIn}>Sign in with Google</button>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
