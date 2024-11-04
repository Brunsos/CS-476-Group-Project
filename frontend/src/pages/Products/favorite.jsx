import '../css/favorite.css';
import '../css/sidebar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Favorite = ({ products = [] }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId]
        );
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

                    <li className="sidebar-item">
                        <Link to="/favorite">
                            <img src="src/assets/favorite.png" alt="Favorites" />
                            <span className="favorite-text">Favorites ({favorites.length})</span>
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

            <div className="favorite-container">
                <h2>Favorite Products</h2>
                <div className="favorite-products">
                    {favorites.length > 0 ? (
                        favorites.map((product) => (
                            <div key={product.id} className="favorite-product-card">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <button className="favorite-icon" onClick={() => toggleFavorite(product.id)}>❤️</button>
                            </div>
                        ))
                    ) : (
                        <p>No favorite products yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorite;
