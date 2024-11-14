import './css/Ordercheckout.css';
import './css/sidebar.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function Orders() {
    const [showDetails, setShowDetails] = useState(false);

    const handleViewDetails = () => {
        setShowDetails(true); //if click on the view deatils button
    };

    const handleBackToList = () => {
        setShowDetails(false); //otherwise..
    };

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
                                    <tr>
                                        <td><img src="src/assets/tomato.jpg" alt="Product 1" className="details-image" /></td>
                                        <td>tomato</td>
                                        <td>123456</td>
                                        <td>$123456</td>
                                        <td>$123456</td>
                                    </tr>
                                    <tr>
                                        <td><img src="src/assets/tomato.jpg" alt="Product 2" className="details-image" /></td>
                                        <td>tomato</td>
                                        <td>123456</td>
                                        <td>$123456</td>
                                        <td>$123456</td>
                                    </tr>
                                    <tr>
                                        <td><img src="src/assets/tomato.jpg" alt="Product 3" className="details-image" /></td>
                                        <td>tomato</td>
                                        <td>123456</td>
                                        <td>$123456</td>
                                        <td>$123456</td>
                                    </tr>
                                    <tr>
                                        <td><img src="src/assets/tomato.jpg" alt="Product 4" className="details-image" /></td>
                                        <td>tomato</td>
                                        <td>123456</td>
                                        <td>$123456</td>
                                        <td>$123456</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="order-summary-info">
                                <p><strong>Order ID:</strong> 123456</p>
                                <p><strong>Name:</strong> xinyuan</p>
                                <p><strong>Email:</strong> xinyuan@gmail.com</p>
                                <p><strong>Address:</strong> CA</p>
                                <p><strong>Payment Method:</strong>credit card</p>
                                <p><strong>Paid on:</strong> 2024-11-13</p>
                            </div>
                        </div>
                        <div className="order-total-summary">
                            <p><strong>Items amount:</strong> 123456</p>
                            <p><strong>Shipping:</strong>$123456</p>
                            <p><strong>Total:</strong> $123456</p>
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
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="order-row">
                                    <td><img src="src/assets/tomato.jpg" alt="Product" className="order-image" /></td>
                                    <td>123</td>
                                    <td>2023-10-24</td>
                                    <td>$123456</td>
                                    <td><button className="status-button paid">Completed</button></td>
                                    <td><button className="status-button pending">Pending</button></td>
                                    <td><button className="view-details-button" onClick={handleViewDetails}>View Details</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </div>
            );
}

            export default Orders;
