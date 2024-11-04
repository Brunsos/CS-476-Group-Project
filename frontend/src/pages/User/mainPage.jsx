
import '../css/mainPage.css';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



function HomePage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);


    const goToListPage = () => {
        navigate('/list');
    };

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) => prevFavorites.includes(productId) ?
            prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
        );
    };


    return (

        <div id="homepage-container">
            <div className="sidebar">
                <ul className="top-links">
                    <li>
                        <a href="/mainPage">
                            <img src="src/assets/home.png" alt="mainPage" /><span>Home</span>
                        </a>
                    </li>

                    <li>
                        <a href="/list">
                            <img src="src/assets/shop.png" alt="list" /><span>Shop</span>
                        </a>
                    </li>

                    <li>
                        <a href="/cart">
                            <img src="src/assets/cart.png" alt="Cart" /><span>Cart</span>
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

            <div className="featured-product">
                <div className="product-display">
                    <img src="src/assets/banana.jpg" alt="Featured Product" className="featured-image" />
                    <h2>Product 1</h2>
                    <p>This is product 1</p>

                </div>
            </div>


            <div className="special-products-header">
                <h2 className="special-products">Special Products</h2>
                <button className="shop-button" onClick={goToListPage}>Shop</button>
            </div>

            <div className="special-products">
                <div className="special-product-list">


                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(1)}>{favorites.includes(1) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>



                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(2)}>{favorites.includes(2) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>

                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(3)}>{favorites.includes(3) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>

                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(4)}>{favorites.includes(4) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>

                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(5)}>{favorites.includes(5) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>

                    <div className="special-product-card">
                        <img src="/src/assets/banana.jpg" alt="Special Product 1" className="special-product-image" />

                        <button className="favorite-icon" onClick={() => toggleFavorite(6)}>{favorites.includes(6) ? '❤️' : '♡'}</button>

                        <Link to="/product" className="special-product-name">Special Product 1</Link>
                        <p className="product-price">$20</p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default HomePage;