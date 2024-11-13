import './css/favorite.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

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
                <Sidebar />
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
