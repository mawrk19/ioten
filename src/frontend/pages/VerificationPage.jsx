import React from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from "../firebase";

const VerificationPage = () => (
  <div>
    <h2>Please verify your email</h2>
    <p>Check your email inbox for a verification link to activate your account.</p>
    <button onClick={resendVerificationEmail}>Resend Verification Email</button>

  </div>
);

const resendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

export default VerificationPage;
