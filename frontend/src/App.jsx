import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import Mainpage from './pages/mainPage.jsx';
import Vendor from './pages/vendor.jsx';
import VendorPost from './pages/vendorPost.jsx';
import Product from './pages/product.jsx';
import List from './pages/list.jsx';
import Cart from './pages/cart.jsx';
import Shipping from './pages/shipping.jsx';
import PlaceOrder from './pages/placeOrder.jsx';
import Favorite from './pages/favorite.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainPage" element={<Mainpage />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/list" element={<List />} />
        <Route path="/vendorPost" element={<VendorPost />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;




