import './css/mainPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';


function HomePage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [plants, setPlants] = useState([]);
    const [isVendor, setIsVendor] = useState(false)
    const [isLoading, setIsLoading] = useState(true);


    const goToListPage = () => {
        navigate('/list');
    };

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) => prevFavorites.includes(productId) ?
            prevFavorites.filter((id) => id !== productId) : [...prevFavorites, productId]
        );
    };

   

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First check localStorage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setIsVendor(userData.isVendor);
                }

                // Then verify with server
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsVendor(data.isVendor);
                } else if (response.status === 401) {
                    // Handle unauthorized - clear local storage
                    localStorage.removeItem('user');
                    setIsVendor(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsVendor(false);
            } finally {
                setIsLoading(false);
            }
        };

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
        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    

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
            <div key={plant.id} className="special-product-card">
               
                    <img src={`data:image/jpeg;base64,${plant.image}`}alt={plant.common_name} className="special-product-image"/>
               

                <div className="product-details">
                    <Link to={`/product/${plant.id}`} className="special-product-name">
                        {plant.common_name}
                    </Link>
                    <p className="product-price">Price: ${plant.price}</p>
                </div>
            </div>
        ))}
    </div>
</div>
        </div>
    );
}

export default HomePage;