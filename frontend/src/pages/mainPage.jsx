import './css/mainPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';

function HomePage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [plants, setPlants] = useState([]);


    const goToListPage = () => {
        navigate('/list');
    };

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) => prevFavorites.includes(productId) ?
            prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
        );
    };

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/plants');
                if (!response.ok) throw new Error('Failed to fetch plants');
                const data = await response.json();
                
                console.log("Fetched plant data:", data);
                console.log("Plant image data:", data.map(plant => plant.image));

                setPlants(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchPlants();
    }, []);

    return (

        <div id="homepage-container">
            <div className="sidebar">
                <Sidebar /> 
            </div>

            <div className="special-products-header">
                <h2 className="special-products">Special Products</h2>
                <button className="shop-button" onClick={goToListPage}>Shop</button>
            </div>

            <div className="special-products">
                <div className="special-product-list">

                    {plants.map(plant => (
                        <div key={plant._id} className="special-product-card">
                            <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.common_name} className="special-product-image" />
                            <Link to={`/product/${plant._id}`} key={plant._id} className='special-product-name'>{plant.common_name}</Link>
                            <p>{plant.description}</p>
                            <p className="product-price">Price: ${plant.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;