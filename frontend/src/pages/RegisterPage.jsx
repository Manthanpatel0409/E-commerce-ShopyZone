import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/'); // Redirect to homepage after successful registration
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="bg-background-light py-12">
      <div className="container mx-auto px-6 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-text-dark mb-6">Create an Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-primary-hover transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="text-center text-text-light mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;