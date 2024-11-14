
import './css/list.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Children } from 'react';
import Sidebar from './sidebar';

function Shop() {
  const [plants, setPlants] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // Variables and states for the filter process
  const [plantFilter, setPlantFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [plantCards, setPlantCards] = useState([]);

  // Fetch the list of plants for the page
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

  
  useEffect(() => {
    // Create an empty array to store the filters in
    let displayed = [];
    // If the user has set a required price then use that filter
    if(priceFilter.length !== 0){
      displayed = priceFilter.filter(plant => plant).map(x => x);
    }
    // Set the filter as the list of name wanting to be seen
    else{
      displayed = plantFilter.filter(plant => plant).map(x => x);
    }

    // Create an array to store the cards in 
    let plantsArray = [];
    // go through every object in the filter
    for (const value in displayed) {
      // set "obj" to the object at the current index of the array
      const obj = displayed.at(value);
      // Create a variable to store the card for that particular object
      var plantCard =  (
      
      <section key={obj._id} id="product-container">
        <div className="product-card">
          <div className="product-image-container">
            <img src={`data:image/jpeg;base64,${obj.image}`} alt={obj.common_name} className="product-image" />
          </div>

          <h2 className="product-title">{obj.common_name}</h2>

          <div className="product-description-container">
            <p>{obj.description}</p>
          </div>

          <p className="product-price">`Price: ${obj.price}`</p>
          <button className="read-more-button">Add to cart</button>
        </div>
      </section>
      );
      // Push the new card onto the array for storage
    plantsArray.push(plantCard);
  }
  // set the display of cards to what the array of cards is
  setPlantCards(plantsArray);
},[plantFilter, priceFilter]);
  
  
  const handleChange = (e) =>{
    var { name, value } = e.target;
    if(name === "plants") {
      // The default is that all the values are already in stored in the state
      if(plantFilter.some(plant => plant.common_name === value)){
        //If the user has set a price first then filter based off of that
        if(priceFilter.length !== 0){
          // Remove the "value" from the items displayed with the current price filter
          const priceFirst = priceFilter.filter(price => value !== price.common_name).map(x => x);
          //set the price filter to the new values
          setPriceFilter(priceFirst);
        }
        // Get rid of the value from the current list of applied filters
        else{
        const arr = plantFilter.filter(plant => value !== plant.common_name).map(x => x);
        setPlantFilter(arr);
        }
      }
      // If the array doesn't have the value then add the value to it
      else {
        // This will have all the values of things currently displayed
        const currFilter = plantFilter.filter(item => value !== item.common_name);

        // This will find the missing value from the original imported array of plants
        const missingV = plants.filter(item => value === item.common_name);

        // merge the two together to reupload the "hidden" filter
        const temp = currFilter.concat(missingV);

        // Set the state to the new values
        setPlantFilter(temp);
      } 
    } 
    if (name === "price") {
      // If the filter has prices that are more than the user has entered then proceed
      if(plantFilter.some(plant => value > plant.price)){
        // Remove values that are more than the user has selected
        const newMaxPrice = plantFilter.filter(plant => value >= plant.price).map(x => x);
        // set the filter to the new values
        setPriceFilter(newMaxPrice);
      }
      // If the user has selected items that they don't want to see then added a price that they want to see under proceed
      if(plantFilter.length !== plants.length){
        // Filter the remaining items based on price
        const newMaxPrice = plantFilter.filter(plant => value > plant.price).map(x => x);
        /*
          If the user selects a value that can't be applied to any of the items in the list it will return the current view. 
          I am unsure of how to change it so that the users wouldn't see anything, basically a "No Results" view
        */
        setPriceFilter(newMaxPrice);

      }
      else {
        // If the user wipes the values in the price filter then reset the filter
        const resetPrice = plants.filter(plant =>  plant.price);
        setPriceFilter(resetPrice);
      }
    }
  }
  
    return (
    <div className="page-container">

      <div className="sidebar">
        <Sidebar />
      </div>
      <div id="shop-page">
        <aside id="filter-container">
          <h1>Filter by Plants</h1>
          <section id='plants'>
            {plants.map(plant => (
              <div key={plant._id}>
                <input type="checkbox" name="plants" id="plants" defaultChecked value={plant.common_name} onChange={handleChange}/>
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
          <input type="number" placeholder="Enter Price" name="price" onChange={handleChange}/>
          <button className="reset-button">Reset</button>
        </aside>
        {plantCards}
      </div>
    </div>
  );
}

export default Shop;