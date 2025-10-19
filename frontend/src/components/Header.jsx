// import { Link } from 'react-router-dom';
// import { ShoppingCart, User } from 'react-feather';
// import { useContext } from 'react'; 
// import { CartContext } from '../context/CartContext'; 

// const Header = () => {
//   const { itemCount } = useContext(CartContext); 

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
//         <Link to="/" className="text-3xl font-bold text-primary">
//           ShopyZone
//         </Link>
        

//         <nav className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
//                 <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Products</Link>
//                 <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Categories</Link>
//                 <Link to="#" className="text-gray-600 hover:text-primary transition-colors">About</Link>
//         </nav>
        
//         <div className="flex items-center space-x-5">
//           <Link to="/cart" className="relative text-text-light hover:text-primary transition-colors">
//             <ShoppingCart size={24} />
            
//             {itemCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                 {itemCount}
//               </span>
//             )}

//           </Link>
//           <Link to="/login" className="text-text-light hover:text-primary transition-colors">
//             <User size={24} />
//           </Link>
//           <button className="md:hidden text-text-light">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
//           </button>
//         </div>
        
//       </div>
//     </header>
//   );
// };

// export default Header;











import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'react-feather';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // 1. Import AuthContext

const Header = () => {
  const { itemCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // 2. Get user and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-3xl font-bold text-primary">
          ShopyZone
        </Link>
        
         <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Products</Link>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Categories</Link>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">About</Link>
        </nav>
        
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative text-text-light hover:text-primary transition-colors">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* 3. Conditional Auth Links */}
          {user ? (
            <>
              <span className="text-text-light hidden sm:block">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-text-light hover:text-primary transition-colors"
                title="Logout"
              >
                <LogOut size={24} />
              </button>
            </>
          ) : (
            <Link to="/login" className="text-text-light hover:text-primary transition-colors" title="Login">
              <User size={24} />
            </Link>
          )}

          <button className="md:hidden text-text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;