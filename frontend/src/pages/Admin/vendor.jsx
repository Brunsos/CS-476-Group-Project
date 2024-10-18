import '../css/vendor.css';
import '../css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Vendor() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/vendorPost');
  };
  return (
    <div id="vendorpage-container">
      
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

      <div className="content">
        <form id="vendor-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Add a new product category:</label>
          <input type="text" id="category" name="category" placeholder="Enter category name" />
          <button type="submit">Submit</button>
        </form>

        <div className="category-list">
          <button>Corn</button>
          <button>Wheat</button>
          <button>Vegetables</button>
          <button>Fruits</button>
          <button>Grains</button>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
