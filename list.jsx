import './list.css'; 

function Shop() {
    return (
      <div id="shop-page">
        <aside id="filter-container">
          <h1>Filter by Categories</h1>
          <div className="filter-options">
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
            <label><input type="checkbox" /> potato</label>
            <label><input type="checkbox" /> tomato</label>
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
          </div>
  
          <h1>Filter by Brands</h1>
          <div className="filter-options">
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> yam</label>
            <label><input type="checkbox" /> potato</label>
            <label><input type="checkbox" /> tomato</label>
            <label><input type="checkbox" /> banana</label>
            <label><input type="checkbox" /> Apple</label>
          </div>
  
          <h1>Filter by Price</h1>
          <input type="number" placeholder="Enter Price" />
          <button className="reset-button">Reset</button>
        </aside>
  
        <section id="product-container">
          <div className="product-card">
          <img src="src/assets/banana.jpg" alt="banana" />
            <h2>Banana</h2>
            <p>$249</p>
            <h3>The Banana information</h3>
            <button className="read-more-button">Read More</button>
          </div>
  
          <div className="product-card">
          <img src="src/assets/tomato.jpg" alt="tomato" />
            <h2>Tomato</h2>
            <p>$249</p>
            <h3>The Tomato information</h3>
            <button className="read-more-button">Read More</button>
          </div>

          <div className="product-card">
          <img src="src/assets/yam.jpg" alt="yam" />
            <h2>Yam</h2>
            <p>$249</p>
            <h3>The Yam information</h3>
            <button className="read-more-button">Read More</button>
          </div>

          <div className="product-card">
          <img src="src/assets/potato.jpg" alt="potato" />
            <h2>Potato</h2>
            <p>$249</p>
            <h3>The Potato information</h3>
            <button className="read-more-button">Read More</button>
          </div>

          <div className="product-card">
          <img src="src/assets/banana.jpg" alt="banana" />
            <h2>Banana</h2>
            <p>$249</p>
            <h3>The Banana information</h3>
            <button className="read-more-button">Read More</button>
          </div>
  
          <div className="product-card">
          <img src="src/assets/tomato.jpg" alt="tomato" />
            <h2>Tomato</h2>
            <p>$249</p>
            <h3>The Tomato information</h3>
            <button className="read-more-button">Read More</button>
          </div>

          <div className="product-card">
          <img src="src/assets/yam.jpg" alt="yam" />
            <h2>Yam</h2>
            <p>$249</p>
            <h3>The Yam information</h3>
            <button className="read-more-button">Read More</button>
          </div>

          <div className="product-card">
          <img src="src/assets/potato.jpg" alt="potato" />
            <h2>Potato</h2>
            <p>$249</p>
            <h3>The Potato information</h3>
            <button className="read-more-button">Read More</button>
          </div>

        </section>
      </div>
    );
  }
  
  export default Shop;
  