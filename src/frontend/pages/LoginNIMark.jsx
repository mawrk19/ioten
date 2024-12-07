import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase';

const LoginNIMark = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword( auth, email, password);
            navigate('/dashboard');
        } catch (error){
            alert(error.message);
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
            <button className="login-button" type="submit">Login with Email</button>
          </form>

          
        </div>
      );

};

export default LoginNIMark;