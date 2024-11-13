import './css/shipping.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './card.jsx';
import Sidebar from './sidebar';

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
                <Sidebar />
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


