import '../css/vendorPost.css';
import '../css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Vender = () => {
  const [image, setimage] = useState('');
  const [common_name, setcommon_name] = useState('');
  const [price, setprice] = useState('');
  const [quantity, setquantity] = useState('');
  const [original, setoriginal] = useState('');
  const [description, setdescription] = useState('');
  const [countInStock, setcountInStock] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') setimage(value);
    if (name === 'common_name') setcommon_name(value);
    if (name === 'price') setprice(value);
    if (name === 'quantity') setquantity(value);
    if (name === 'original') setoriginal(value);
    if (name === 'description') setdescription(value);
    if (name === 'countInStock') setcountInStock(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const form = document.getElementById("vendor-form");
    // const formData = new FormData(form);
    try {
      const response = await fetch('http://localhost:5000/vendorPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: //formData,
        JSON.stringify({
          image,
          common_name,
          price,
          quantity,
          original,
          description,
          countInStock,
        }),
      });
  
      const data = await response.json();
  
      //if (response.status === 200) {
        navigate('/vendor');
      //}
      //else if (response.status === 400) {
        //setErrors(data.errors);
      //}
      // else {
      //   alert(data.msg || 'Error during registration');
      // }
    } catch (error) {
      // console.error('Error during registration:', error);
      // alert('An error occurred while registering. Please try again.');
    }
  }

  return (
    <div id="vendor-page">
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

      </div>

      <div className="content">
        <h2>Create Product</h2>
        <form id="vendor-form" encType="multipart/from-data" onSubmit={handleSubmit}>
          {<div className="input-field">
             <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>  }

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="common_name">Product Name</label>
              <input type="text" id="name" name="common_name" onChange={handleChange} />
              {errors.common_name && <span className="error">{errors.common_name}</span>}
            </div>

            <div className="input-field">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" onChange={handleChange} />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="quantity">Quantity</label>
              <input type="number" id="quantity" name="quantity" onChange={handleChange} />
              {errors.quantity && <span className="error">{errors.quantity}</span>}
            </div>

            <div className="input-field">
              <label htmlFor="original">Original from</label>
              <input type="text" id="original" name="original" onChange={handleChange} />
              {errors.original && <span className="error">{errors.original}</span>}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea type="text" id="description" name="description" onChange={handleChange}> </textarea>
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="number" id="countInStock" name="countInStock" onChange={handleChange} />
              {errors.countInStock && <span className="error">{errors.countInStock}</span>}
            </div>

            <div className="input-field">
              <label htmlFor="category">Category</label>
              <select id="category" name="category">
                <option value="tomato">tomato</option>
                <option value="yam">yam</option>
                <option value="Potato">potato</option>
                <option value="banana">banana</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}


export default Vender;


