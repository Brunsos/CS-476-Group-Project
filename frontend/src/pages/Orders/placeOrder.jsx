import '../css/placeOrder.css';
import '../css/sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';



function PlaceOrder() {
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
                            <tr>
                                <td><img src="src/assets/banana.jpg" alt="Golden Bananas" /></td>
                                <td>Golden Bananas</td>
                                <td>2</td>
                                <td>$5.99</td>
                                <td>$11.98</td>
                            </tr>
                            <tr>
                                <td><img src="src/assets/potato.jpg" alt="Organic Potato" /></td>
                                <td>Organic Potato</td>
                                <td>3</td>
                                <td>$1.49</td>
                                <td>$4.47</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="place-order-button-container">
                    <button className="place-order-button">Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
