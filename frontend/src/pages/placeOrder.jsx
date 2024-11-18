import './css/placeOrder.css';
import './css/sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



function PlaceOrder() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Send a request to the server to check the user's role
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include' // Include cookies in the request for session management
                });
                
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }

                // Parse the server's JSON response
                const data = await response.json();
                if (data.isVendor) {
                    // If user is a vendor, redirect to vendor page
                    navigate('/mainPage');
                    return;
                }

                // If we get here, user is a buyer, so fetch their cart
                fetchCart();
            } catch (error) {
                console.error("Session check failed:", error);
                navigate('/login');  // Redirect to login if not authenticated
            }
        };

        checkSession();
    }, [navigate]);

    const fetchCart = async () => {
        try {
            // Send a request to the server to the cart endpoint
            const response = await fetch('http://localhost:5000/api/cart', {
                credentials: 'include' // Include cookies in the request for session management
            });
            
            if (!response.ok) {
                throw new Error('Failed to load items');
            }
            
            // Parse the server's JSON response
            const data = await response.json();
            setItems(data);
            
            // Load images for each item
            data.forEach(item => {
                loadImage(item.plantId);
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const loadImage = async (plantId) => {
        try {
            console.log("Loading image for plantId:", plantId);

            // Send the request to the server to get the plant's image by its id
            const response = await fetch(`http://localhost:5000/image/${plantId}`, {
                credentials: 'include' // Include cookies in the request for session management
            });

            if (!response.ok) throw new Error('Failed to load image');

            // Convert the response into a Blob object for handling binary data
            const blob = await response.blob();

            // Create a temporary URL for the Blob object to use in the browser
            const url = URL.createObjectURL(blob);

            // Update the state to store the generated URL for the specific plant ID
            setImageUrls(prev => ({
                ...prev, // Spread the existing image URLs to retain previous entries
                [plantId]: url // Add or update the URL for the current plant's image
            }));

            console.log("Successfully loaded image for plantId:", plantId);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
    };

    const handlePlacedOrder = async() => {
        // try{
        //     const response = await fetch('http://localhost:5000/api/purchased', {
        //         credentials: 'include',
        //         method: 'PUT'
        //     });

        //     const data = await response.json();
        //     console.log(data);
        //     if(!response.ok){
        //         console.log("Here")
        //     }
        //     if(response.ok){
            //     }
            // }
            // catch(error){
                //     console.log(error);
                // }
        navigate('/mainPage');
    };

    return (
        <div className="page-container">

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

            <div className="place-order-container">
                <div className="progress">
                    <div className="step completed">Login</div>
                    <div className="line completed"></div>
                    <div className="step completed">Shipping</div>
                    <div className="line completed"></div>
                    <div className="step active">Summary</div>
                </div>

                <div className="order-details">
                    <h2>Order Summary</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map(item => (
                            <tr key={item._id}>
                                <td><img src={imageUrls[item.plantId]} alt={item.name}/></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="place-order-button-container">
                    <button className="place-order-button" onClick={handlePlacedOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
