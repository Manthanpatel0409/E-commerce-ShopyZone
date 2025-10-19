import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Truck, Shield, MessageSquare } from 'react-feather';

const API_URL = 'http://localhost:5000/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the 4 most recent products to feature
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        // Get the last 4 products added
        setFeaturedProducts(response.data.slice(-4)); 
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-background-light">
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Discover Your Next Favorite Thing
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Browse our curated collection of high-quality products, designed to enhance your lifestyle.
          </p>
          <Link
            to="/products"
            className="bg-white text-primary font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* --- "Why Choose Us" Section --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-bold text-text-dark mb-2">Fast Shipping</h3>
            <p className="text-text-light">Get your orders delivered to your doorstep in no time.</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-bold text-text-dark mb-2">Secure Payments</h3>
            <p className="text-text-light">Shop with confidence using our secure payment gateway.</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-bold text-text-dark mb-2">24/7 Support</h3>
            <p className="text-text-light">Our support team is always here to help you.</p>
          </div>
        </div>
      </section>

      {/* --- Featured Products Section --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-text-dark mb-12">
            Featured Products
          </h2>
          {loading ? (
            <p className="text-center">Loading featured products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="text-primary font-semibold text-lg hover:underline"
            >
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Sign up to get exclusive offers, the latest news, and a special discount on your first order.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;