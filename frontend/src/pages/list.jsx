import './css/list.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Shop() {
  const [plants, setPlants] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // Variables and states for the filter process
  const [plantFilter, setPlantFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [brandNameFilter, setBrandNameFilter] = useState('');
  const [plantPriceFilter, setPriceFilter] = useState('');
  const plantNameFilter = [];


  // Fetch the lost of plants for the page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        setPlants(data);
        setPlantFilter(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetches the list of vendors for the filter
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendors');
        if (!response.ok) throw new Error('Failed to fetch vendors');
        const data = await response.json();

        setBrands(data);
        setBrandFilter(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    if(name === "plants") {
      if(plantNameFilter.includes(value)){
        const arr = [];
        if(plantNameFilter.length -1 > plantNameFilter.indexOf(value)){
          let i = plantNameFilter.length - 1;
          do{
            arr.push(plantNameFilter.pop());
          
            i--;
            if(i === plantNameFilter.indexOf(value)){
              // plantNameFilter.pop();
              do{
              plantNameFilter.push(arr.pop());
            } while(arr.length !== 0);
          }        
          }while( i !== 0);
        } else {
          plantNameFilter.pop();
        }
      } else {
        plantNameFilter.push(value);
      }
    }

    console.log(plantNameFilter);
  }
  

  const filterForPlants = plantFilter.filter((plant) => plant.common_name.includes(plantNameFilter)).map((plant) =>( 
    <div key={plant._id} className="product-card">
        <div className="product-image-container">
          <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.name} className="product-image" />
        </div>

        <h2 className="product-title">{plant.name}</h2>

        <div className="product-description-container">
          <p>{plant.description}</p>
        </div>

        <p className="product-price">Price: ${plant.price}</p>
        <button className="read-more-button">Add to cart</button>
      </div>
    ))
    
    
    // if(plantFilter.forEach((plant) => plant.common_name === plantNameFilter)){
    //   const filterForPlants = plantFilter.filter((plant) => plant.common_name.includes(!plantNameFilter).map((plant) =>(
    //     <div key={plant._id} className="product-card">
    //       <div className="product-image-container">
    //         <img src={`data:image/jpeg;base64,${plant.image}`} alt={plant.name} className="product-image" />
    //       </div>

    //       <h2 className="product-title">{plant.name}</h2>

    //       <div className="product-description-container">
    //         <p>{plant.description}</p>
    //       </div>

    //       <p className="product-price">Price: ${plant.price}</p>
    //       <button className="read-more-button">Add to cart</button>
    //     </div>
    //   )))
    // }
    
    
  
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
          <h1>Filter by Plants</h1>
          <section id='plants'>
            {plants.map(plant => (
              <div key={plant._id}>
                <input type="checkbox" name="plants" id="plants" value={plant.common_name} onChange={handleChange}/>
                <label htmlFor="plants">{plant.common_name}</label>
              </div>
            ))}
          </section>
            <h1>Filter by Brands</h1>
          <section id='brands'>
            {brands.map(brand => (
              <div key={brand._id}>
              <input type="checkbox" name="brands" id="brands" value={brand.userName} onChange={handleChange}/>
              <label htmlFor="brands">{brand.userName}</label>
              </div>
             ))}
          </section>

          <h1>Filter by Price</h1>
          <input type="number" placeholder="Enter Price" />
          <button className="reset-button">Reset</button>
        </aside>

        <section id="product-container">
          {filterForPlants}
        </section>
      </div>
    </div>
  );
}

export default Shop;