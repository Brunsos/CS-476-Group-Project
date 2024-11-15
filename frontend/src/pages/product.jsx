import './css/product.css';
import './css/sidebar.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';


function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (plant) => {
    try {
      const response = await fetch('http://localhost:5000/api/addcart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user-role', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Not authenticated');
            }

            const data = await response.json();
            setUser(data);

            fetchProduct();
        } catch (error) {
            console.error("Session check failed:", error);
            navigate('/login');  // Redirect to login if not authenticated
        }
    };

    checkSession();
  }, [navigate]);

  const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5000/product/${id}`,{
            credentials: 'include'
          });
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
              <li>From: {product.ecozone}</li>
              <li>Total number in stock: {product.countInStock}</li>
            </ul>
            {!user.isVendor && (
              <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to cart</button>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

export default ProductPage;
