// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//   const [formData, setFormData] = useState({
//     address: '',
//     city: '',
//     postalCode: '',
//     country: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In the next step, we'll save this to CartContext
//     console.log('Shipping Address:', formData);
//     // For now, just navigate to a placeholder payment page
//     navigate('/payment'); 
//   };

//   return (
//     <div className="bg-background-light py-12">
//       <div className="container mx-auto px-6 max-w-lg">
//         <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
//           <h1 className="text-3xl font-bold text-center text-text-dark mb-6">
//             Shipping Address
//           </h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-text-light mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 required
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="123 Main St"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text-light mb-1">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 required
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="Ahmedabad"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text-light mb-1">Postal Code</label>
//               <input
//                 type="text"
//                 name="postalCode"
//                 required
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 placeholder="380001"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-text-light mb-1">Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 required
//                 value={formData.country}
//                 onChange={handleChange}
//                 placeholder="India"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover transition-colors"
//             >
//               Continue to Payment
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;








import { useState, useContext } from 'react'; // 1. Import useContext
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // 2. Import CartContext

const CheckoutPage = () => {
    const { shippingAddress, setShippingAddress } = useContext(CartContext); // 3. Get context
    const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 4. Save the shipping address to the global context
    setShippingAddress(formData);
    // 5. Navigate to the final order review page
    navigate('/placeorder'); 
  };

  return (
    <div className="bg-background-light py-12">
      <div className="container mx-auto px-6 max-w-lg">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-text-dark mb-6">
            Shipping Address
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Ahmedabad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="380001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Country</label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;