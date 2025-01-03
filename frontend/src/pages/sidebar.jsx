import './css/sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login for dynamic rendering
    const [isVendor, setIsVendor] = useState(false); // check if user is vendor 
    const navigate = useNavigate(); // navigate after logout

    const handleLogout = async () => { // handles logout when logout button clicked
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST', // Specify the HTTP method as POST for creating a new resource
                credentials: 'include', // Include cookies for session handling
                headers: {
                    'Content-Type': 'application/json' // Indicate that the request body contains JSON
                }
            });

            if (response.ok) {
                localStorage.removeItem('user'); //clear local storage
                setIsLoggedIn(false); //clear conditional rendoring variables
                setIsVendor(false);
                navigate('/login'); // go to login page
            } else {
                console.error('Logout failed'); //error
            }
        } catch (error) { //other errors
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First check localStorage
                const storedUser = localStorage.getItem('user');

                // Check if 'user' data exists in localStorage
                if (storedUser) {
                    // Parse the stored JSON string into a JavaScript object
                    const userData = JSON.parse(storedUser);

                    // Update the state to reflect the user's role (vendor or buyer)
                    setIsVendor(userData.isVendor);

                    // Update the state to indicate the user is logged in
                    setIsLoggedIn(true);
                }
                // Then verify with server
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include', // Include cookies for session handling
                    headers: {
                        'Content-Type': 'application/json' // Indicate that the request body contains JSON
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsVendor(data.isVendor);
                } else if (response.status === 401) {
                    // Handle unauthorized - clear local storage
                    localStorage.removeItem('user');

                    // if there is no login nor user's role
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
            <ul className="top-links">
                <li>
                    <Link to="/mainPage">
                        <img src="http://localhost:5173/src/assets/home.png" alt="mainPage" />
                        <span>Home</span>
                    </Link>
                </li>
                {!isVendor && isLoggedIn && (
                    <li>
                        <Link to="/list">
                            <img src="http://localhost:5173/src/assets/shop.png" alt="list" />
                            <span>Shop</span>
                        </Link>
                    </li>
                )}
                {!isVendor && isLoggedIn && (
                    <li>
                        <Link to="/cart">
                            <img src="http://localhost:5173/src/assets/cart.png" alt="Cart" />
                            <span>Cart</span>
                        </Link>
                    </li>
                )}
                {isVendor && isLoggedIn && ( 
                    // only show if user is vendor
                    <>
                    <li>
                        <Link to="/vendor">
                            <img src="http://localhost:5173/src/assets/vendor.png" alt="Vendor" />
                            <span>Vendor</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Ordercheckout">
                            <img src="http://localhost:5173/src/assets/checkout.png" alt="Ordercheckout" />
                            <span>Order checkout</span>
                        </Link>
                    </li>
                    </>
                )}
            </ul>
            <ul className="bottom-links">
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/profile">
                                <img src="http://localhost:5173/src/assets/person.png" alt="Profile" />
                                <span>Profile</span>
                            </Link>
                        </li>
                            <li>
                                <button onClick={handleLogout} className="sidebar-button"> 
                                    <img src="http://localhost:5173/src/assets/logout.png" alt="Logout" />
                                    <span>Logout</span>
                                </button>
                            </li>
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