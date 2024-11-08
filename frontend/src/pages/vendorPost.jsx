import './css/vendorPost.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';


const VendorPost = () => {
  const [image, setimage] = useState(null);
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
    if (name === 'common_name') setcommon_name(value);
    if (name === 'price') setprice(value);
    if (name === 'quantity') setquantity(value);
    if (name === 'original') setoriginal(value);
    if (name === 'description') setdescription(value);
    if (name === 'countInStock') setcountInStock(value);
  };

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setErrors({});

    // let newErrors = {};

    // if (!image.trim()) {
    //   newErrors.image = 'Image is required.';
    // }

    // if (!common_name.trim()) {
    //   newErrors.common_name = 'Product name is required.';
    // }

    // if (!price.trim()) {
    //   newErrors.price = 'Price is required.';
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('common_name', common_name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('original', original);
    formData.append('description', description);
    formData.append('countInStock', countInStock);
    
    try {
      const response = await fetch('http://localhost:5000/vendorPost', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.status === 200) {
        navigate('/vendor');
      }
      else if (response.status === 400) {
        setErrors(result.errors);
      }
      else {
        alert(result.msg || 'Error during registration');
      }
    } catch (error) {
      console.error('Error during uploading:', error);
      alert('An error occurred while uploading. Please try again.');
    }
  }

  return (
    <div id="vendor-page">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <h2>Create Product</h2>
        <form id="vendor-form" encType="multipart/form-data" onSubmit={handleSubmit}>
          
          <div className="input-field">
              <label htmlFor="image">Upload Image</label>
              <input type="file" id="image" name="image" onChange={handleFileChange} />
              {errors.image && <span className="error">{errors.image}</span>}
          </div>

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
            <textarea type="text" id="description" name="description" onChange={handleChange}></textarea>
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="number" id="countInStock" name="countInStock" onChange={handleChange} />
              {errors.countInStock && <span className="error">{errors.countInStock}</span>}
            </div>
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

          <button type="submit" className="submit-btn">Submit</button>
          
        </form>
      </div>
    </div>
  );
}


export default VendorPost;


