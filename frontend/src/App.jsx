import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage'; // 1. Import the new page
import ProtectedRoute from './components/ProtectedRoute'; // 2. Import the protector
import PlaceOrderPage from './pages/PlaceOrderPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Note the dynamic :id */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route 
            path="/checkout" 
            element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} 
          />
          {/* 2. Add PlaceOrderPage route */}
          <Route 
            path="/placeorder" 
            element={<ProtectedRoute><PlaceOrderPage /></ProtectedRoute>} 
          />
          {/* 3. Add a simple Order Success/Detail page */}
          <Route 
            path="/order/:id" 
            element={<ProtectedRoute><div>Order Success Page!</div></ProtectedRoute>} 
          />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;