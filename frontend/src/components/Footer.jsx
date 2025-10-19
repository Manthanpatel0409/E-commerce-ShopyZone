import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-text-dark text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">MyShop</h3>
          <p className="text-gray-400">
            Your one-stop shop for everything you need.
          </p>
          {/* Add social icons here later */}
        </div>

        {/* Column 2: Shop */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Column 4: Account */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Account</h4>
          <ul className="space-y-2">
            <li><Link to="/login" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Order History</Link></li>
          </ul>
        </div>
        
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MyShop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;