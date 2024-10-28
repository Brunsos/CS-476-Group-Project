import '../css/cart.css';
import '../css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/shipping');
    };

    return (
        <div className="cart-container">
            <div className="sidebar">
                <ul>
                    <li>
                        <a href="/mainPage">
                            <img src="/assets/home.png" alt="mainPage" />
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/list">
                            <img src="/assets/shop.png" alt="list" /><span>Shop</span>
                        </a>
                    </li>
                    <li>
                        <a href="/cart">
                            <img src="/assets/cart.png" alt="Cart" />
                            <span>Cart</span>
                        </a>
                    </li>

                    <li>
                        <Link to="/favorite">
                            <img src="/assets/favorite.png" alt="Favorites" />
                            <span>Favorites</span>
                        </Link>
                    </li>
                </ul>

                <ul className="bottom-links">
                    <li>
                        <a href="/Login">
                            <img src="/assets/login.jpg" alt="Login" /><span>Login</span></a>
                    </li>

                    <li>
                        <a href="/Signup">
                            <img src="/assets/register.jpg" alt="Signup" /><span>Register</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Vendor">
                            <img src="/assets/login.jpg" alt="Vendor" /><span>Vendor</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="form-container">
                <h1 className="shopping-cart-title">Shopping Cart</h1>
                <div className="cart-items">
                    <div className="cart-item">
                        <img src="/assets/banana.jpg" alt="Fresh Tomatoes" />
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
                        <img src="/assets/banana.jpg" alt="Potatoes" />
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

