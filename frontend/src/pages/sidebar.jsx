import './css/sidebar.css';
import { Link } from 'react-router-dom';
//import React from 'react';
import React, { useState, useEffect } from 'react';

const Sidebar = () => {

const [isLoggedIn, setIsLoggedIn] = useState(false); //track login for dynamic rendering
const [isVendor, setIsVendor] = useState(false) //check if user is vendor

useEffect(() => {
    const checkAuth = async () => {
        try {
            // First check localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setIsVendor(userData.isVendor);
                setIsLoggedIn(true);
            }

            // Then verify with server
            const response = await fetch('http://localhost:5000/api/user-role', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setIsVendor(data.isVendor);
            } else if (response.status === 401) {
                // Handle unauthorized - clear local storage
                localStorage.removeItem('user');
                setIsVendor(false);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setIsVendor(false);
            setIsLoggedIn(false);
        } 
    };


    checkAuth();
}, []);

  return (
      <div className="sidebar">
        {/* always visible */}
          <ul className="top-links">
              <li>
                  <Link to="/mainPage">
                      <img src="http://localhost:5173/src/assets/home.png" alt="mainPage" />
                      <span>Home</span>
                  </Link>
              </li>
              <li>
                  <Link to="/list">
                      <img src="http://localhost:5173/src/assets/shop.png" alt="list" />
                      <span>Shop</span>
                  </Link>
              </li>
              {/* only show cart if logged in */}
              {isLoggedIn && (
          <li>
            <Link to="/cart">
              <img src="http://localhost:5173/src/assets/cart.png" alt="Cart" />
              <span>Cart</span>
            </Link>
          </li>
        )}
          </ul>
            {/* conitional rendering */}
            <ul className="bottom-links">
        {isLoggedIn ? (
          // only show when logged int
          <>
            <li>
              <Link to="/profile">
                <img src="http://localhost:5173/src/assets/person.png" alt="Profile" />
                <span>Profile</span>
              </Link>
            </li>
            {isVendor && (
            // only show if user is a vendor
              <li>
                <Link to="/vendor">
                  <img src="http://localhost:5173/src/assets/login.jpg" alt="Vendor" />
                  <span>Vendor</span>
                </Link>
              </li>
            )}
          </>
        ) : (
          // only show when not logged in
          <>
            <li>
              <Link to="/login">
                <img src="http://localhost:5173/src/assets/login.jpg" alt="Login" />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <img src="http://localhost:5173/src/assets/register.jpg" alt="Register" />
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;