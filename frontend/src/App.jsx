import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/signup.jsx';
import Login from './pages/Auth/login.jsx';
import Mainpage from './pages/User/mainPage.jsx';
import Vendor from './pages/Admin/vendor.jsx';
import VendorPost from './pages/Admin/vendorPost.jsx';
import Product from './pages/Products/product.jsx';
import List from './pages/User/list.jsx';
import Cart from './pages/User/cart.jsx';
import Shipping from './pages/Orders/shipping.jsx';
import PlaceOrder from './pages/Orders/placeOrder.jsx';
import Favorite from './pages/Products/favorite.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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




