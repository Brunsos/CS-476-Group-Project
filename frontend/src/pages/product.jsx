import './css/product.css';
import './css/sidebar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from './sidebar';


function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div id="product-page">
        <div id="product-container">

          <div id="product-image">
            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.common_name} />
          </div>
          <div id="product-details">
            <h1>{product.common_name}</h1>
            <p>{product.description}</p>
            <h2>Price: ${product.price}</h2>

            <ul>
              <li>{product.original}</li>
              <li>Ratings: 0</li>
              <li>{product.quantity}</li>
              <li>{product.countInStock}</li>
            </ul>
            <button className="add-to-cart-button">Add To Cart</button>
          </div>
        </div>

        <div id="review-section">
          <h2>Write Your Review</h2>
          <form id="review-form">
            <div className="form-field">
              <label htmlFor="rating">Rating</label>
              <select id="rating">
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="comment">Comment</label>
              <textarea id="comment"></textarea>
            </div>

            <button type="submit" className="submit-review-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
