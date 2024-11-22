import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    // Correct credentials
    const validCredentials = {
        email: 'anuhari@gmail.com', 
        password: 'happy@04', 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the email and password match
        if (email === validCredentials.email && password === validCredentials.password) {
            onLoginSuccess(); 
            navigate('/');
        } else {
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Login;
