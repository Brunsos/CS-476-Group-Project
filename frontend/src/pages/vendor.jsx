import './css/vendor.css';
import './css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

function Vendor() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/vendorPost');
  };
  return (
    <div id="vendorpage-container">
      
      <div className="sidebar">
        <Sidebar />
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
