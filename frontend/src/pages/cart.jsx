import './css/cart.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

function ShoppingCart() {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/shipping');
    };

    return (
        <div className="cart-container">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="form-container">
                <h1 className="shopping-cart-title">Shopping Cart</h1>
                <div className="cart-items">
                    <div className="cart-item">
                        <img src="src/assets/banana.jpg" alt="Fresh Tomatoes" />
                        <div className="item-details">
                            <h2>Golden Banana</h2>
                            <p>Organic Farm</p>
                            <span className="item-price">$5.99</span>
                        </div>
                        <select className="item-quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <button className="remove-item">🗑️</button>
                    </div>

                    <div className="cart-item">
                        <img src="src/assets/banana.jpg" alt="Potatoes" />
                        <div className="item-details">
                            <h2>Golden Banana</h2>
                            <p>Organic Farm</p>
                            <span className="item-price">$3.49</span>
                        </div>
                        <select className="item-quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <button className="remove-item">🗑️</button>
                    </div>
                </div>

                <div className="cart-summary">
                    <p>Items (2)</p>
                    <p className="total-price">$9.48</p>
                </div>

                <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;

