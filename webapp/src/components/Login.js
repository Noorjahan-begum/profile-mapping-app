import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateCredentials, setAuthToken } from '../utils/auth';
import './Login.css';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCredentials(credentials.username, credentials.password)) {
            setAuthToken();
            const from = location.state?.from?.pathname || "/admin/profiles";
            navigate(from, { replace: true });
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            username: e.target.value
                        })}
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;