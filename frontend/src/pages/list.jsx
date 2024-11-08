import './css/list.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Shop() {
  const [plants, setPlants] = useState([]);

  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  // };

  const addToCart = async (plant) => {
    try {
      const response = await fetch('http://localhost:5000/api/addcart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                plantId: plant._id,
                name: plant.common_name,
                price: plant.price
            })
        });
        console.log(`${plant.name} added to cart`);
        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }
    } catch (error) {
        console.error("Error adding plant to cart:", error);
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        console.log("Fetched plant data:", data);
        console.log("Plant image data:", data.map(plant => plant.image));

        setPlants(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

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

          <li>
            <Link to="/favorite">
              <img src="src/assets/favorite.png" alt="Favorites" />
              <span>Favorites</span>
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
              <div className="product-image-container">
                <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.common_name} className="product-image" />
              </div>

              <h2 className="product-title">{plant.common_name}</h2>

              <div className="product-description-container">
                <p>{plant.description}</p>
              </div>

              <p className="product-price">Price: ${plant.price}</p>
              <button onClick={() => addToCart(plant)} className="read-more-button">Add to cart</button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Shop;