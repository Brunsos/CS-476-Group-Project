import '../css/vendorPost.css';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';

function CreateProduct() {
  return (
    <div id="vendor-page">
      <div className="sidebar">
        <ul>
          <li>
            <a href="/mainPage">
              <img src="/assets/home.png" alt="mainPage" />
              <span>Home</span>
            </a>
          </li>

          <li>
            <a href="/list">
              <img src="/assets/shop.png" alt="list" /><span>Shop</span>
            </a>
          </li>

          <li>
            <a href="/cart">
              <img src="/assets/cart.png" alt="Cart" />
              <span>Cart</span>
            </a>
          </li>

          <li>
            <Link to="/favorite">
              <img src="/assets/favorite.png" alt="Favorites" />
              <span>Favorites</span>
            </Link>
          </li>
        </ul>

      </div>

      <div className="content">
        <h2>Create Product</h2>
        <form id="vendor-form">
          <div className="input-field">
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" />
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="name">Product Name</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="input-field">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" />
            </div>
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="quantity">Quantity</label>
              <input type="number" id="quantity" name="quantity" />
            </div>

            <div className="input-field">
              <label htmlFor="original">Original from</label>
              <input type="text" id="original" name="original" />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>

          <div className="input-group">
            <div className="input-field">
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="number" id="countInStock" name="countInStock" />
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

export default CreateProduct;


