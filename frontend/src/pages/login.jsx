import './css/login.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


try {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Optional: Store user info in localStorage or state management
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
                <ul className="top-links">
                    <li>
                        <a href="/mainPage">
                            <img src="src/assets/home.png" alt="mainPage" />
                            <span>Home</span>
                        </a>
                    </li>

                    <li>
                        <a href="/list">
                            <img src="src/assets/shop.png" alt="list" /><span>Shop</span>
                        </a>
                    </li>

                    <li>
                        <a href="/cart">
                            <img src="src/assets/cart.png" alt="Cart" />
                            <span>Cart</span>
                        </a>
                    </li>

                    <li>
                        <Link to="/favorite">
                            <img src="src/assets/favorite.png" alt="Favorites" />
                            <span>Favorites</span>
                        </Link>
                    </li>

                </ul>

                <ul className="bottom-links">
                    <li>
                        <a href="/Login">
                            <img src="src/assets/login.jpg" alt="Login" />
                            <span>Login</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Signup">
                            <img src="src/assets/register.jpg" alt="Signup" />
                            <span>Register</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Vendor">
                            <img src="src/assets/login.jpg" alt="Vendor" />
                            <span>Vendor</span>
                        </a>
                    </li>
                </ul>
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
