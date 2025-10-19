// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { Trash2, ChevronRight, Plus, Minus } from 'react-feather';

// const CartPage = () => {
//   // Get all necessary data and functions from our CartContext
//   const { 
//     cartItems, 
//     updateQty, 
//     removeFromCart, 
//     totalPrice, 
//     itemCount 
//   } = useContext(CartContext);
  
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     // 3. Check for user
//     if (user) {
//       navigate('/checkout'); // User is logged in, proceed
//     } else {
//       // User is not logged in, redirect to login
//       // Pass the checkout page as the intended destination
//       navigate('/login?redirect=/checkout'); 
//     }
//   };
  
//   // Helper functions for incrementing/decrementing
//   const handleDecrement = (item) => {
//     const newQty = item.qty - 1;
//     if (newQty >= 1) {
//       updateQty(item._id, newQty);
//     }
//   };
  
//   const handleIncrement = (item) => {
//     const newQty = item.qty + 1;
//     // We should check against item.stockCount here!
//     // For now, just incrementing.
//     updateQty(item._id, newQty);
//   };

//   return (
//     <div className="bg-background-light min-h-screen">
//       <div className="container mx-auto px-6 py-8">
//         {/* Breadcrumbs */}
//         <div className="flex items-center text-sm text-text-light mb-6">
//           <Link to="/" className="hover:text-primary">Home</Link>
//           <ChevronRight size={16} className="mx-1" />
//           <span className="text-text-dark font-medium">Shopping Cart</span>
//         </div>

//         <h1 className="text-4xl font-bold text-text-dark text-center mb-8">
//           Your Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           // --- Empty Cart View ---
//           <div className="text-center py-20 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-text-dark">Your cart is empty.</h2>
//             <p className="text-text-light mt-2 mb-6">
//               Looks like you haven't added anything to your cart yet.
//             </p>
//             <Link
//               to="/products"
//               className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary-hover transition-colors"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           // --- Cart with Items View ---
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* Cart Items List (Left Side) */}
//             <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
//               <h2 className="text-2xl font-semibold text-text-dark border-b pb-4">
//                 Cart Items ({itemCount})
//               </h2>
              
//               {cartItems.map(item => (
//                 <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-6">
//                   <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//                     <img 
//                       src={`https://placehold.co/100x100/5c6ac4/white?text=${item.name}`}
//                       alt={item.name}
//                       className="w-20 h-20 rounded-md object-cover"
//                     />
//                     <div>
//                       <Link to={`/product/${item._id}`} className="text-lg font-semibold text-text-dark hover:text-primary">
//                         {item.name}
//                       </Link>
//                       <p className="text-text-light text-sm">${item.price.toFixed(2)}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-4">
//                     {/* Quantity Selector */}
//                     <div className="flex items-center border border-gray-300 rounded-full">
//                       <button 
//                         onClick={() => handleDecrement(item)}
//                         className="px-3 py-1 text-lg font-medium text-text-light hover:text-primary"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="w-10 text-center py-1 border-l border-r border-gray-300">
//                         {item.qty}
//                       </span>
//                       <button 
//                         onClick={() => handleIncrement(item)}
//                         className="px-3 py-1 text-lg font-medium text-text-light hover:text-primary"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
                    
//                     {/* Item Total Price */}
//                     <p className="text-lg font-semibold text-text-dark w-24 text-right">
//                       ${(item.price * item.qty).toFixed(2)}
//                     </p>
                    
//                     {/* Remove Button */}
//                     <button 
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 hover:text-red-700 p-1"
//                       title="Remove item"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary (Right Side) */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
//                 <h2 className="text-2xl font-semibold text-text-dark border-b pb-4 mb-4">
//                   Order Summary
//                 </h2>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-text-light">
//                     <span>Subtotal ({itemCount} items)</span>
//                     <span className="font-medium">${totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-text-light">
//                     <span>Shipping</span>
//                     <span className="font-medium">Free</span>
//                   </div>
//                   <div className="border-t pt-4 mt-4 flex justify-between text-text-dark text-xl font-bold">
//                     <span>Total</span>
//                     <span>${totalPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleCheckout}
//                   className="w-full mt-6 bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover transition-colors"
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;







import { useContext } from 'react'; // 1. Make sure useContext is imported
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // 2. Import the AuthContext
import { Trash2, ChevronRight, Plus, Minus } from 'react-feather';

const CartPage = () => {
  const { 
    cartItems, 
    updateQty, 
    removeFromCart, 
    totalPrice, 
    itemCount 
  } = useContext(CartContext);
  
  const { user } = useContext(AuthContext); // 3. Get the user from the AuthContext
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Now this 'if (user)' check will work correctly
    if (user) {
      navigate('/checkout'); 
    } else {
      navigate('/login?redirect=/checkout'); 
    }
  };
  
  const handleDecrement = (item) => {
    const newQty = item.qty - 1;
    if (newQty >= 1) {
      updateQty(item._id, newQty);
    }
  };
  
  const handleIncrement = (item) => {
    const newQty = item.qty + 1;
    updateQty(item._id, newQty);
  };

  return (
    <div className="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-text-light mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-text-dark font-medium">Shopping Cart</span>
        </div>

        <h1 className="text-4xl font-bold text-text-dark text-center mb-8">
          Your Shopping Cart
        </h1>

        {/* --- Empty Cart View --- */}
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-text-dark">Your cart is empty.</h2>
            <p className="text-text-light mt-2 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary-hover transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // --- Cart with Items View ---
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List (Left Side) */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-text-dark border-b pb-4">
                Cart Items ({itemCount})
              </h2>
              
             {cartItems.map(item => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-6">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <img 
                      src={`https://placehold.co/100x100/5c6ac4/white?text=${item.name}`}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <Link to={`/product/${item._id}`} className="text-lg font-semibold text-text-dark hover:text-primary">
                        {item.name}
                      </Link>
                      <p className="text-text-light text-sm">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button 
                        onClick={() => handleDecrement(item)}
                        className="px-3 py-1 text-lg font-medium text-text-light hover:text-primary"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center py-1 border-l border-r border-gray-300">
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        className="px-3 py-1 text-lg font-medium text-text-light hover:text-primary"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Item Total Price */}
                    <p className="text-lg font-semibold text-text-dark w-24 text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary (Right Side) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-semibold text-text-dark border-b pb-4 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-text-light">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between text-text-dark text-xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;


