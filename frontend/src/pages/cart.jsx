import './css/cart.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function ShoppingCart() {
    // set the defualt value
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    // useEffect hook to fetch the list of plants when the component mounts
    useEffect(() => {

        // Define an asynchronous function to check the user's session
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
                    navigate('/vendor');
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

    const handleDelete = async (id) => {
        try {
            // // Send a DELETE request to the server to remove the plant with the given id
            const response = await fetch(`http://localhost:5000/api/cart/item/${id}`, {
                method: 'DELETE', // Specify the HTTP method for deletion
                credentials: 'include'  // Include cookies in the request for session management
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            // Update the local state by removing the deleted plant
            setItems((prevCart) => prevCart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error removing product from cart:", error);
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
                [plantId]: url  // Add or update the URL for the current plant's image
            }));

            console.log("Successfully loaded image for plantId:", plantId);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      // navigate user to shipping page
    const handleCheckout = () => {
        navigate('/shipping');
    };

    // calculate the total price
    const totalPrice = items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + itemTotal;
    }, 0);

    // calculate the number of total items
    const totalItem = items.reduce((counter, item) => {
        return counter + item.quantity;
    }, 0);

    return (
        <div className="cart-container">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="form-container">
                <h1 className="shopping-cart-title">Shopping Cart</h1>

                <div className="cart-items">

                    {items.length > 0 ? (items.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={imageUrls[item.plantId] || 'placeholder.jpg'} alt={item.name}/>

                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <span className="item-price">${item.price}</span>
                            </div>
                                <span className="item-quantity">Quantity: {item.quantity}</span>
                                <button className="remove-item" onClick={() => handleDelete(item._id)}>🗑️</button>
                        </div>
                        
                        ))) : (<p>there is no item yet</p>)
                    }
                </div>

                <div className="cart-summary">
                    <p>Items {totalItem}</p>
                    <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
                </div>

                <button className="checkout-button" onClick={handleCheckout} disabled={items.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;