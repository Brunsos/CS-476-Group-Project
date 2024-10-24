import '../css/signup.css';
import '../css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') setuserName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = 'user name is required.';
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
          confirmPassword,
        }),
      });
    
      const data = await response.json();
    
      if (response.status === 201) {
        navigate('/login');
      } 
      else if(response.status === 400) {
        setErrors(data.errors);
      }
      else {
        alert(data.msg || 'Error during registration');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div id="signup-container">

      <div className="sidebar">
        <ul>
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
              <img src="src/assets/login.jpg" alt="Login" /><span>Login</span></a>
          </li>

          <li>
            <a href="/Signup">
              <img src="src/assets/register.jpg" alt="Signup" /><span>Register</span>
            </a>
          </li>
          <li>
            <a href="/Vendor">
              <img src="src/assets/login.jpg" alt="Vendor" /><span>Vendor</span>
            </a>
          </li>
        </ul>
      </div>

      <div id="form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p className="input-field">
            <label htmlFor="userName">User name:</label>
            <input type="text" name="userName" value={userName} onChange={handleChange} />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </p>
          
          <p className="input-field">
            <label htmlFor="email">Email address:</label>
            <input type="email" name="email" value={email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </p>
          <p className="input-field">
            <button type="submit">Signup</button>
          </p>
        </form>
      </div>
      <div id="image-container">
        <img src="/src/assets/farmer.jpg" alt="Featured Product" className="image-container" />
      </div>
    </div>
  );
};

export default Signup;











