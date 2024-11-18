
import './css/mainPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';


function HomePage() {
    // set the defualt value
    const navigate = useNavigate();
    const [plants, setPlants] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login for dynamic rendering
    const [isVendor, setIsVendor] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    // negivate to the list page
    const goToListPage = () => {
        navigate('/list');
    };

   
    // useEffect hook to fetch the list of plants when the component mounts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check localStorage
                const storedUser = localStorage.getItem('user');

                // Check if 'user' data exists in localStorage
                if (storedUser) {
                    // Parse the stored JSON string into a JavaScript object
                    const userData = JSON.parse(storedUser);

                    // Update the state to reflect the user's role (vendor or buyer)
                    setIsVendor(userData.isVendor);

                    // Update the state to indicate the user is logged in
                    setIsLoggedIn(true);
                }

                // Send a GET request to the get the user role
                const response = await fetch('http://localhost:5000/api/user-role', {
                    credentials: 'include', // Include cookies for session handling
                    headers: {
                        'Content-Type': 'application/json' // Indicate that the request body contains JSON
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    // Update the state to reflect the user's role (vendor or buyer)
                    setIsVendor(data.isVendor);
                } else if (response.status === 401) {
                    // Handle unauthorized - clear local storage
                    localStorage.removeItem('user');

                    // user is not login
                    setIsVendor(false);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsVendor(false);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchPlants = async () => {
            try {
                // Send a POST request to the signup endpoint
                const response = await fetch('http://localhost:5000/api/plants');
                if (!response.ok) throw new Error('Failed to fetch plants');

                // get the response from backend
                const data = await response.json();
                
                console.log("Fetched plant data:", data);
                console.log("Plant image data:", data.map(plant => plant.image));

                // set the plant with data passed from backend
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
                {isLoggedIn && !isVendor && (
                    <button className="shop-button" onClick={goToListPage}>Shop</button>
                )}
            </div>

            <div className="special-products">
                <div className="special-product-list">

                    {plants.map(plant => (
                        <div key={plant._id} className="special-product-card">
                            <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.common_name} className="special-product-image" />
                            <Link to={`/product/${plant._id}`} key={plant._id} className='special-product-name'>{plant.common_name}</Link>
                            <p className="product-description">{plant.description}</p>
                            <p className="product-price">Price: ${plant.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
