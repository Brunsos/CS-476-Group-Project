import './css/vendor.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function Vendor() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToListPage = () => {
    navigate('/list');
};

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/vendorPost');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/plants/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete plant');

      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
      alert('Plant deleted successfully');
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete plant');
    }
  };

  useEffect(() => {
    const fetchPlants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/vendor/plants', {
              credentials: 'include'
          });
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
  <div id="vendorpage-container">
      <div className="sidebar">
          <Sidebar />
      </div>

      <div className="content">
      <div className="special-products-header">
        <h2 className="special-products-title">My Products</h2>
        <div className="vendor-header-buttons">
          <button type="submit" className="vendor-add-button" onClick={handleSubmit}>Add new product</button>
          <button className="vendor-shop-button" onClick={goToListPage}>Shop</button>
        </div>
      </div>

              <div className="special-product-list">
                  {plants.map(plant => (
                      <div key={plant._id} className="special-product-card">
                          <img src={`data:image/jpeg;base64,${plant.image}`}alt={plant.common_name} className="special-product-image" />
                          <Link to={`/product/${plant._id}`} className='special-product-name'>
                              {plant.common_name}
                          </Link>
                          
                          <p className="product-price">Price: ${plant.price}</p>
                          <button  onClick={() => handleDelete(plant._id)} className="delete-button">
                              Delete Product
                          </button>
                      </div>
                  ))}


              </div>
          </div>
      </div>

);
}

export default Vendor;
