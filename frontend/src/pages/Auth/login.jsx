import './css/login.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        navigate('/mainPage');
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
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>

                    <p className="input-field">
                        <label htmlFor="email">Email address:</label>
                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </p>

                    <p className="input-field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="Password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>

                    <p className="input-field">
                        <button type="button" onClick={handleLogin}>Login</button>
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
}

export default App;
