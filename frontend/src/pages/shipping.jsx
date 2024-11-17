import './css/shipping.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './card.jsx';
import Sidebar from './sidebar';

const Shipping = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingInfo, setShippingInfo] = useState([]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }
                
                const user = await fetch('http://localhost:5000/api/specific-user', {
                    credentials: 'include'
                });
                

                const data = await user.json();
                setShippingInfo(data);
            } catch (error) {
                console.error("Session check failed:", error);
                navigate('/login');  // Redirect to login if not authenticated
            }
        };
        checkSession();
    }, [navigate]);


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

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "province"){
            shippingInfo.province = value;
            console.log(shippingInfo);
            setShippingInfo(shippingInfo);
        }
        if (name === "city"){
            const newCity = shippingInfo.map(info => info.city = value);
            console.log(newCity);
            setShippingInfo(newCity);
        }
        if (name === "address"){
            const newAddress = shippingInfo.map(info => info.address = value);
            console.log(newAddress);
            setShippingInfo(newAddress);
        }
    }


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
                    
                    <div key={shippingInfo._id}>
                        <input type="text" name="province" placeholder="Province" onChange={handleChange} defaultValue={shippingInfo.province} required/>
                        <input type="text" name="city" placeholder="City" onChange={handleChange} defaultValue={shippingInfo.city} required/>
                        {/* <input type="text" placeholder="Enter postal code" required defaultValue={info.} /> */}
                        <input type="text" name="address" placeholder="Address" defaultValue={shippingInfo.address} onChange={handleChange} required/>
                    </div>

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


