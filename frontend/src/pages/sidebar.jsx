import './css/sidebar.css';
import { Link } from 'react-router-dom';
//import React from 'react';
import React, { useState, useEffect } from 'react';




const Sidebar = () => {

const [isVendor, setIsVendor] = useState(false)

useEffect(() => {
    const checkAuth = async () => {
        try {
            // First check localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setIsVendor(userData.isVendor);
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
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setIsVendor(false);
        } 
    };


    checkAuth();
}, []);

  return (
      <div className="sidebar">
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
              {!isVendor && (
              <li>
                  <Link to="/cart">
                      <img src="http://localhost:5173/src/assets/cart.png" alt="Cart" />
                      <span>Cart</span>
                  </Link>
              </li>
              )}
              {/* <li>
                  <Link to="/favorite">
                      <img src="http://localhost:5173/src/assets/favorite.png" alt="Favorites" />
                      <span>Favorites</span>
                  </Link>
              </li> */}
          </ul>

          <ul className="bottom-links">
                  <li>
                      <Link to="/profile">
                          <img src="http://localhost:5173/src/assets/person.png" alt="Profile" />
                          <span>Profile</span>
                      </Link>
                  </li>
                  {isVendor && (
            <li>
                <a href="/Vendor">
                    <img src="src/assets/login.jpg" alt="Vendor" />
                    <span>Vendor</span>
                </a>
            </li>
        )}

          </ul>
      </div>
  );
};

export default Sidebar;