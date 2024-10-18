import '../css/product.css';
import '../css/sidebar.css';

function ProductPage() {
  return (
    <div id="product-page">

      <div id="product-container">
        <div id="product-image">
          <img src="src/assets/banana.jpg" alt="banana" />
        </div>
        <div id="product-details">
          <h1>The best product in Regina</h1>
          <p>
            The information about our proudct
          </p>
          <h2>$249</h2>

          <ul>
            <li>Original from: Regina</li>
            <li>Ratings: 0</li>
            <li>Quantity: 87</li>
            <li>In Stock: 125</li>
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
  );
}

export default ProductPage;
