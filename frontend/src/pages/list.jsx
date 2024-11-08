import './css/list.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

function Shop() {
  const [plants, setPlants] = useState([]);

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

    <div className="page-container">

      <div className="sidebar">
        <Sidebar />
      </div>
      <div id="shop-page">
        <aside id="filter-container">
          <h1>Filter by Categories</h1>
          <div className="filter-options">
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
            <label><input type="checkbox" /> potato</label>
            <label><input type="checkbox" /> tomato</label>
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
          </div>

          <h1>Filter by Brands</h1>
          <div className="filter-options">
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
            <label><input type="checkbox" /> potato</label>
            <label><input type="checkbox" /> tomato</label>
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> Apple</label>
          </div>

          <h1>Filter by Price</h1>
          <input type="number" placeholder="Enter Price" />
          <button className="reset-button">Reset</button>
        </aside>

        <section id="product-container">

          {plants.map(plant => (
            <div key={plant._id} className="product-card">
              <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.common_name} className="special-product-image" />
              <h2>{plant.common_name}</h2>
              <p>Price: ${plant.price}</p>
              <h3>{plant.description}</h3>
              <Link to={`/product/${plant._id}`} key={plant._id} className='read-more-button'>Read More</Link>
            </div>
          ))}

          

        </section>
      </div>
    </div>
  );
}

export default Shop;
