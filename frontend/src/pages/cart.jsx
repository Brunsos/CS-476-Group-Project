import './css/cart.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ShoppingCart() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart');
                if (!response.ok) throw new Error('Failed to load items');
                const data = await response.json();

                console.log("retrieval plant: ", data[0].plantId)

                setItems(data);

                data.forEach(item => {
                    loadImage(item.plantId);
                });
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, []);

    const loadImage = async (plantId) => {
        try {
            console.log("Loading image for plantId:", plantId);

            const response = await fetch(`http://localhost:5000/image/${plantId}`);

            if (!response.ok) throw new Error('Failed to load image');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            setImageUrls(prev => ({
                ...prev,
                [plantId]: url
            }));

            console.log("Successfully loaded image for plantId:", plantId);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

    

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/cart/item/${id}`, {
                method: 'DELETE'
            });
            setItems((prevCart) => prevCart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    const handleCheckout = () => {
        navigate('/shipping');
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-container">
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

            <div className="form-container">
                <h1 className="shopping-cart-title">Shopping Cart</h1>

                <div className="cart-items">

                    {items.length > 0 ? (items.map(item => (
                        <div key={item._id} className="cart-item">
                            {/* <img src={item.imageUrl || 'placeholder.jpg'} alt={item.name} onLoad={(e) => { console.log("Image loaded for item:", item); handleImageLoad(item.plantId, e); }}
                            /> */}

                            <img 
                                src={imageUrls[item.plantId] || 'placeholder.jpg'}
                                alt={item.name}
                            />

                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <span className="item-price">${item.price}</span>
                            </div>
                            <select className="item-quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <button className="remove-item" onClick={() => handleDelete(item._id)}>🗑️</button>
                        </div>
                        ))) : (<p>there is no item yet</p>)
                    }
                        
                </div>

                <div className="cart-summary">
                    <p>Items ({items.length})</p>
                    <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
                </div>

                <button className="checkout-button" onClick={handleCheckout} disabled={items.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;