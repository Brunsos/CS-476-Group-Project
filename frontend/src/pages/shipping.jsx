import './css/shipping.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './card.jsx';

const Shipping = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleContinue = (e) => {
        e.preventDefault();
        console.log("Form submitted");


        if (paymentMethod === 'PayPal') {
            window.location.href = 'https://www.paypal.com/signin?locale.x=en_CA';
        } else {
            navigate('/placeOrder');
        }
    };

    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
        if (method === 'Debit') {
            setIsModalOpen(true);
        }
    };

    const closeCard = () => {
        setIsModalOpen(false);
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
                    <input type="text" placeholder="Enter country" required />
                    <input type="text" placeholder="Enter city" required />
                    <input type="text" placeholder="Enter postal code" required />
                    <input type="text" placeholder="Enter address" required />



                    <div className="payment-method">
                        <h3>Select Payment Method</h3>
                        <div className="payment-options">
                            <button type="button" className={`payment-button ${paymentMethod === 'PayPal' ? 'selected' : ''}`} onClick={() => handlePaymentChange('PayPal')}>
                                <img src="/src/assets/paypal.jpg" alt="PayPal" />
                                <span>PayPal</span>
                            </button>

                            <button type="button" className={`payment-button ${paymentMethod === 'Debit' ? 'selected' : ''}`} onClick={() => handlePaymentChange('Debit')}>
                                <img src="/src/assets/wallet.png" alt="Debit or Credit Card" />
                                <span>Debit or Credit Card</span>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="continue-button">Continue</button>
                </form>

                <Card isOpen={isModalOpen} onClose={closeCard} />
            </div>
        </div>
    );
};

export default Shipping;


