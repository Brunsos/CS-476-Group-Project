import './css/cart.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function ShoppingCart() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const checkSession = async () => {
            try {
                // send a request to Validate the Session
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }

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
    // fetch the information from cart
    const fetchCart = async () => {
        try {
            // send a request to get the plant from cart and get the response from backend
            const response = await fetch('http://localhost:5000/api/cart', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Failed to load items');
            }
            
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
    // delete a item from cart
    const handleDelete = async (id) => {
        try {
            // send a delete request to get the plant from cart by specific id and get the response from backend
            const response = await fetch(`http://localhost:5000/api/cart/item/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            // Update the local cart state by filtering out the deleted item
            setItems((prevCart) => prevCart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };
    // load the image from plant db
    const loadImage = async (plantId) => {
        try {
            console.log("Loading image for plantId:", plantId);
            // send a request to get the plant image from plant db and get the response from backend
            const response = await fetch(`http://localhost:5000/image/${plantId}`, {
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to load image');

            // Convert the response data into a Blob object
            const blob = await response.blob();

            // Generate a temporary URL for the Blob to use in the frontend
            const url = URL.createObjectURL(blob);

            // Update the state to include the image URL for the current plant ID
            setImageUrls(prev => ({
                // Keep the existing state
                ...prev,
                // Add or update the URL for this plant ID
                [plantId]: url
            }));

            console.log("Successfully loaded image for plantId:", plantId);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
    };

    const handleCheckout = () => {
        navigate('/shipping');
    };

    // calculate the totoal price by iteration
    const totalPrice = items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + itemTotal;
    }, 0);

    // calculate the total quantity of a single item by iteration
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
                            <img src={imageUrls[item.plantId]} alt={item.name}/>

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
                    <p>Items amount: {totalItem}</p>
                    <p className="total-price">Total price: ${totalPrice.toFixed(2)}</p>
                </div>

                <button className="checkout-button" onClick={handleCheckout} disabled={items.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;