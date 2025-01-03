import './css/vendorPost.css';
import './css/sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';


const VendorPost = () => {
  // set the defualt value
  const [image, setimage] = useState(null);
  const [common_name, setcommon_name] = useState('');
  const [price, setprice] = useState('');
  const [ecozone, setecozone] = useState('');
  const [description, setdescription] = useState('');
  const [countInStock, setcountInStock] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define a function to handle changes in form inputs
  const handleChange = (e) => {
    // Destructure the name and value from the event's target element
    const { name, value } = e.target;

    // Check the name of the input field and update the corresponding state variable
    if (name === 'common_name') setcommon_name(value);
    if (name === 'price') setprice(value);
    if (name === 'ecozone') setecozone(value);
    if (name === 'description') setdescription(value);
    if (name === 'countInStock') setcountInStock(value);
  };

  // Define a function to handle changes when a file is selected in an input field
  const handleFileChange = (e) => {
    // Update the 'image' state with the first file selected by the user
    setimage(e.target.files[0]);
  };

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior to handle it via JavaScript
    e.preventDefault();

     // Create a new FormData object to package form data, including the image
    const formData = new FormData();
    formData.append('image', image);
    formData.append('common_name', common_name);
    formData.append('price', price);
    formData.append('ecozone', ecozone);
    formData.append('description', description);
    formData.append('countInStock', countInStock);
    
    try {
      // Send the form data to the server using a POST request
        const response = await fetch('http://localhost:5000/vendorPost', {
            method: 'POST', // Specify the HTTP method as POST for creating a new resource
            credentials: 'include', // Include cookies in the request for session management
            body: formData, // Attach the FormData object as the request body
        });
    
        // Parse the server's JSON response
        const result = await response.json();
        console.log(result);
    
        // Check if the request was successful
        if (response.ok) {
            navigate('/vendor');
        } else {
            setErrors(result.errors || { general: result.msg });
        }
    } catch (error) {
        console.error('Error during uploading:', error);
        setErrors({ general: 'An error occurred while uploading' });
    }
};

  return (
    <div id="vendor-page">
      <div className="sidebar">
        <Sidebar/>
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
              <label htmlFor="ecozone">Ecozone</label>
              <input type="text" id="ecozone" name="ecozone" onChange={handleChange} />
              {errors.ecozone && <span className="error">{errors.ecozone}</span>}
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



          <button type="submit" className="submit-btn">Submit</button>
          
        </form>
      </div>
    </div>
  );
}


export default VendorPost;


