import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Add one item of this product to the cart
    addToCart(product, 1);
    // Optional: Show a confirmation message
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group">
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden">
          {/* We use a placeholder image for now */}
          <img 
            // src={`https://placehold.co/600x400/5c6ac4/white?text=${product.name}`}
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-text-dark mb-1 h-14">
          {product.name}
        </h3>
        <p className="text-sm text-text-light mb-3">{product.category}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCart}
            className="bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-primary-hover transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;