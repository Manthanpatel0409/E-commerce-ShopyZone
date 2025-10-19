import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ChevronRight } from 'react-feather';

const API_URL = 'http://localhost:5000/api';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); // State to manage quantity
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found or an error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // Re-run this effect if the ID changes

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, Number(qty));
      alert(`${qty} x ${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="bg-background-light">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-text-light mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={16} className="mx-1" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-text-dark font-medium">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div>
            <img
            //   src={`https://placehold.co/600x600/5c6ac4/white?text=${product.name}`}
            src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md border border-gray-200"
            />
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-text-dark mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-text-light leading-relaxed mb-6">
              {product.description}
            </p>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-text-dark">Category:</span>
                <span className="text-text-light">{product.category}</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span className="font-semibold text-text-dark">Availability:</span>
                <span className={product.stockCount > 0 ? 'text-green-600' : 'text-red-500'}>
                  {product.stockCount > 0 ? `${product.stockCount} In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {/* Add to Cart Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg font-medium text-text-light hover:text-primary"
                >
                  -
                </button>
                <input 
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  min="1"
                  max={product.stockCount}
                  className="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                />
                <button 
                  onClick={() => setQty(q => Math.min(product.stockCount, q + 1))}
                  className="px-4 py-2 text-lg font-medium text-text-light hover:text-primary"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={product.stockCount === 0}
                className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-hover transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;