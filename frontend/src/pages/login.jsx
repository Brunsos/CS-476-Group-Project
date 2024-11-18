import './css/login.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

const Login = () => {
    // set the defualt value
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

// error check for the login form
const handleLogin = async (e) => {
    e.preventDefault();

    // set the error content to empty
    setErrors({});

    const newErrors = {};

    // error check
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    // check is there any content in the newErrors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

// pass the data to backend
try {
    // Send a POST request to the signup endpoint
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST', // Specify the HTTP method as POST for creating a new resource
        headers: {
            'Content-Type': 'application/json', // Indicate that the request body contains JSON
        },
        credentials: 'include', // Include cookies for session handling
        // Convert the provided data into a JSON string to include in the request body
        body: JSON.stringify({ email, password }),
    });

    // get the response from backend
    const data = await response.json();

    // if everything ok, direct user to main page
    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/mainPage');
    } else {
        setErrors(data.errors || { general: data.msg });
    }
} catch (error) {
    console.error('Login error:', error);
    setErrors({ general: 'An error occurred during login' });
}
};

    return (

        <div id="login-container">

            <div className="sidebar">
                <Sidebar />
            </div>


            <div id="form-container">
                <form className="login-form" onSubmit={handleLogin}>

                    <p className="input-field">
                        <label htmlFor="email">Email address:</label>
                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </p>

                    <p className="input-field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="Password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </p>

                    <p className="input-field">
                    <button type="submit">Login</button>
                    </p>

                    <p className="login-prompt">
                        New user? <a href="/signup" className="login-link">Register</a>
                    </p>

                </form>
            </div>

            <div id="image-container">
                <img src="src/assets/local.jpg" alt="Featured Product" className="image-container" />
            </div>
        </div>
    );
};

export default Login;
