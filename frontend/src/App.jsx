import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Mainpage from './pages/mainPage';
import Vendor from './pages/vendor';
import Product from './pages/product';
import List from './pages/list';
import VendorPost from './pages/vendorPost';
import Cart from './pages/cart';
import Shipping from './pages/shipping';
import PlaceOrder from './pages/placeOrder'; 
import Favorite from './pages/favorite'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mainPage" element={<Mainpage />} />
                <Route path="/vendor" element={<Vendor />} />
                <Route path="/product" element={<Product />} />
                <Route path="/list" element={<List />} />
                <Route path="/vendorPost" element={<VendorPost />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeorder" element={<PlaceOrder />} /> 
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </Router>
    );
};

export default App;




