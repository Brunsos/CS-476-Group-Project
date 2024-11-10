import './css/sidebar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    province: '',
    city: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from the backend
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/profile'); // Replace with your API endpoint
        const data = await response.json();
        setFormData({
          userName: data.userName,
          email: data.email,
          province: data.province,
          city: data.city,
          address: data.address,
        });
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'User name is required.';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.status === 200) {
        navigate('/mainPage');
      } else {
        alert(data.msg || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile. Please try again.');
    }
  };

  return (
    <div id="profile-container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div id="form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <p className="input-field">
            <label htmlFor="userName">User name:</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="province">Province:</label>
            <select name="province" value={formData.province} onChange={handleChange}>
              <option value="" hidden>Select your province</option>
              <option value="AB">AB</option>
              <option value="SK">SK</option>
              <option value="MB">MB</option>
            </select>
            {errors.province && <span className="error">{errors.province}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="city">City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <span className="error">{errors.city}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="address">Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="password">New Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </p>
          <p className="input-field">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </p>
          <p className="input-field">
            <button type="submit">Update Profile</button>
          </p>
        </form>
      </div>
      <div id="image-container">
        <img src="/src/assets/farmer.jpg" alt="Profile" className="image-container" />
      </div>
    </div>
  );
};

export default ProfilePage;
