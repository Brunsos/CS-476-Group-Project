import './css/Ordercheckout.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function Orders() {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    const [buyers, setBuyer] = useState([]);
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }

                const data = await response.json();
                if (!data.isVendor) {
                    // If user is a buyer, redirect to main page
                    navigate('/mainPage');
                    return;
                }

                // If we get here, user is a vendor, so fetch their order
                fetchOrder();
                fetchBuyerInfo();
            } catch (error) {
                console.error("Session check failed:", error);
                navigate('/login');  // Redirect to login if not authenticated
            }
        };

        checkSession();
    }, [navigate]);

    const fetchOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/order', {
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

    const fetchBuyerInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/buyerInfo', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Failed to load items');
            }
            
            const data = await response.json();
            setBuyer(data);
            
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const loadImage = async (plantId) => {
        try {
            console.log("Loading image for plantId:", plantId);

            const response = await fetch(`http://localhost:5000/image/${plantId}`, {
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to load image');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            setImageUrls(prev => ({
                ...prev,
                [plantId]: url
            }));

            console.log("Successfully loaded image for plantId:", plantId);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
    };

    const handleViewDetails = () => {
        setShowDetails(true); //if click on the view deatils button
    };

    const handleBackToList = () => {
        setShowDetails(false); //otherwise..
    };

    const totalPrice = items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + itemTotal;
    }, 0);

    const totalItem = items.reduce((counter, item) => {
        return counter + item.quantity;
    }, 0);

    return (

        <div id="homepage-container">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="orders-container">


                {showDetails ? (
                    
                    <div className="order-details-container">
                        <h2>Order Details</h2>
                        <button onClick={handleBackToList} className="back-button">Back to Orders</button>
                        <div className="order-summary">
                            <table className="details-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {items.length > 0 ? (items.map(item => (
                                    <tr className="order-row">
                                        <td key={item._id}><img src={imageUrls[item.plantId]} alt={item.name} className="details-image"/></td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                        <td>$0000</td>
                                    </tr>
                        
                                    ))) : (<p>there is no item yet</p>)
                                }
                                </tbody>
                            </table>
                                {buyers.map (buyer => (
                                    <div className="order-summary-info">
                                        <p><strong>Order ID:</strong> {buyer._id}</p>
                                        <p><strong>Name:</strong> {buyer.buyerId.userName}</p>
                                        <p><strong>Email:</strong> {buyer.buyerId.email}</p>
                                        <p><strong>Address:</strong> {buyer.buyerId.address}</p>
                                        <p><strong>Payment Method:</strong>credit card</p>
                                        <p><strong>Paid on:</strong> 2024-11-13</p>

                                    </div>
                                ))}
                        </div>
                        <div className="order-total-summary">
                            <p><strong>Items amount:</strong> {totalItem}</p>
                            <p><strong>Shipping:</strong>${totalPrice.toFixed(2)}</p>
                            <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                    
                    <div className="order-list-container">
                        

                        <h2>My Orders</h2>
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>ID</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>

                                {items.length > 0 ? (items.map(item => (
                                    <tr className="order-row">
                                        <td key={item._id}><img src={imageUrls[item.plantId]} alt={item.name}  className="order-image" /></td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td><button className="status-button paid">Completed</button></td>
                                        <td><button className="status-button pending">Pending</button></td>
                                        <td><button className="view-details-button" onClick={handleViewDetails}>View Details</button></td>
                                    </tr>
                        
                                    ))) : (<p>there is no item yet</p>)
                                }
                                

                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </div>
            );
}

export default Orders;
