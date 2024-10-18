import '../css/shipping.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Shipping = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const handleContinue = (e) => {
        e.preventDefault();
        navigate('/placeorder');
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
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

            <div className="shipping-container">
                <div className="progress">
                    <div className="step completed">Login</div>
                    <div className="line completed"></div>
                    <div className="step completed">Shipping</div>
                    <div className="line"></div>
                    <div className="step">Summary</div>
                </div>

                <h2>Shipping</h2>
                <form className="shipping-form" onSubmit={handleContinue}>
                    <input type="text" placeholder="Enter address" required />
                    <input type="text" placeholder="Enter city" required />
                    <input type="text" placeholder="Enter postal code" required />
                    <input type="text" placeholder="Enter country" required />

                    <div className="payment-method">
                        <label>Select Method</label>
                        <input type="radio" id="paypal" name="method" value="PayPal" checked={paymentMethod === 'PayPal'}onChange={handlePaymentChange}/>
                        <label htmlFor="paypal">PayPal or Credit Card</label>
                    </div>

                    <button type="submit" className="continue-button">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;

