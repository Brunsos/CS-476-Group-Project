import './css/signup.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';


const Signup = () => {
  // set the defualt value
  const [userName, setuserName] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define a function to handle changes in form inputs
  const handleChange = (e) => {
    // Destructure the name and value from the event's target element
    const { name, value } = e.target;

    // Check the name of the input field and update the corresponding state variable
    if (name === 'userName') setuserName(value);
    if (name === 'province') setProvince(value);
    if (name === 'city') setCity(value);
    if (name === 'address') setAddress(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'isVendor') setIsVendor(value);
  };

  // function to handle the submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // set the error field to blank
    setErrors({});

    const newErrors = {};

    // error check
    if (!userName.trim()) {
      newErrors.userName = 'user name is required.';
    }

    if (province.valueOf() === "F"){
      newErrors.province = "Please enter your province";
    }
    if (!city.trim()){
      newErrors.city = "Please enter your city";
    }
    if (!address.trim()) {
      newErrors.address = "Please enter your address";
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
      // send a request to add product to cart and get the response from backend
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          province,
          city,
          address,
          email,
          password,
          confirmPassword,
          isVendor
        }),
      });
    
      // Parse the response JSON
      const data = await response.json();
    
      // if everything ok
      if (response.status === 201) {
        navigate('/login');
      } // otherwise
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
        <Sidebar />
      </div>

      <div id="form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p className="input-field">
            <label htmlFor="userName">User name:</label>
            <input type="text" name="userName" value={userName} onChange={handleChange} />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </p>
          
          <p className="input-field">
            <label htmlFor="province">Province:</label>
            <select name="province" id="province" value={province} onChange={handleChange}>
              <option value="F" hidden></option>
              <option value="AB">AB</option>
              <option value="SK">SK</option>
              <option value="MB">MB</option>
            </select>
            {errors.province && <span className="error">{errors.province}</span>}
          </p>

          <p className="input-field">
            <label htmlFor="city">City:</label>
            <input type="text" name="city" value={city} onChange={handleChange} />
            {errors.city && <span className="error">{errors.city}</span>}
          </p>
          
          <p className="input-field">
            <label htmlFor="address">Address:</label>
            <input type="text" name="address" value={address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
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

         <p className="check-input-field">
            <label htmlFor="isVendor" className="vendor-label">Are you a vendor?</label>
            <input label="Yes" type="checkbox" name="isVendor" value={!isVendor} onChange={handleChange}className="vendor-checkbox"/>
          </p>

          <p className="input-field">
            <button type="submit">Signup</button>
          </p>

          <p className="login-prompt"> Already have an account? <a href="/login" className="login-link">Login</a>
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
