import './css/sidebar.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
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
              <li>
                  <Link to="/cart">
                      <img src="http://localhost:5173/src/assets/cart.png" alt="Cart" />
                      <span>Cart</span>
                  </Link>
              </li>
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
          </ul>
      </div>
  );
};

export default Sidebar;