import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const PlaceOrderPage = () => {
  const { cartItems, shippingAddress, totalPrice, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          ...item,
          product: item._id, // Ensure product ID is included
        })),
        shippingAddress,
        totalPrice,
      };

      const { data: createdOrder } = await axios.post(
        `${API_URL}/orders`, 
        orderData, 
        {
          headers: { 'x-auth-token': token }
        }
      );
      
      clearCart();
      // Redirect to a success page (we can build this later)
      navigate(`/order/${createdOrder._id}`);
      alert('Order placed successfully!');

    } catch (error) {
      console.error(error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Review Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
            <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
          </div>
          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center space-x-4">
                  <img src={`https://placehold.co/50x50`} alt={item.name} className="rounded" />
                  <Link to={`/product/${item._id}`} className="font-medium hover:underline">{item.name}</Link>
                </div>
                <span>{item.qty} x ${item.price.toFixed(2)} = <b>${(item.qty * item.price).toFixed(2)}</b></span>
              </div>
            ))}
          </div>
        </div>
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-2">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={placeOrderHandler}
            className="w-full mt-6 bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;