
import './mainPage.css'; 

function HomePage() {
    return (
      
        <div className="homepage-container">

        <div className="sidebar">
        <ul>
          <li><img src="src/assets/home.svg" alt="Home" /></li>
          <li><img src="src/assets/shop.png" alt="Shop" /></li>
          <li><img src="src/assets/cart.png" alt="Cart" /></li>
          <li><img src="src/assets/favorite.png" alt="Favorites" /></li>
          <li><img src="src/assets/user.png" alt="User" /></li>
        </ul>
        </div>

            <div className="top-section">
                {/* This is for our product list */}
                <form className="product-list-form">
                    <div className="product-card">
                    <img src="/src/assets/banana.jpg" alt="Product 1" className="product-image" />
                        <h2>Product 1</h2>
                        <p className="product-price">$20</p>
                        <button className="buy-button">Buy Now</button>
                    </div>
                    <div className="product-card">
                        <img src="src/assets/potato.jpg" alt="Product 2" className="product-image" />
                        <h2>Product 2</h2>
                        <p className="product-price">$30</p>
                        <button className="buy-button">Buy Now</button>
                    </div>
                    <div className="product-card">
                        <img src="src/assets/tomato.jpg" alt="Product 3" className="product-image" />
                        <h2>Product 3</h2>
                        <p className="product-price">$40</p>
                        <button className="buy-button">Buy Now</button>
                    </div>
                    <div className="product-card">
                        <img src="src/assets/yam.jpg" alt="Product 4" className="product-image" />
                        <h2>Product 4</h2>
                        <p className="product-price">$50</p>
                        <button className="buy-button">Buy Now</button>
                    </div>
                </form>

                {/* This is for featured product*/}
                <div className="featured-product">
                   
                    <div className="product-display">
                        <img src="src/assets/banana.jpg" alt="Featured Product" className="featured-image" />
                        <h2>Product 1</h2>
                        <p>This is product 1</p>
                        <p className="product-price">$20</p>
                    </div>
                    
                </div>
            </div>


            {/*This is special product below:*/}
            <div className="special-products">
                <h2>Special Products</h2>
                <div className="special-product-list">
                    <div className="special-product-card">
                        <img src="src/assets/potato.jpg" alt="Special Product 1" className="special-product-image" />
                        <p>Special Product 1</p>
                        <p className="product-price">$20</p>
                    </div>
                    <div className="special-product-card">
                        <img src="src/assets/tomato.jpg" alt="Special Product 2" className="special-product-image" />
                        <p>Special Product 2</p>
                        <p className="product-price">$30</p>
                    </div>
                    <div className="special-product-card">
                        <img src="src/assets/yam.jpg" alt="Special Product 3" className="special-product-image" />
                        <p>Special Product 3</p>
                        <p className="product-price">$40</p>
                    </div>
                    <div className="special-product-card">
                        <img src="src/assets/banana.jpg" alt="Special Product 4" className="special-product-image" />
                        <p>Special Product 4</p>
                        <p className="product-price">$50</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;