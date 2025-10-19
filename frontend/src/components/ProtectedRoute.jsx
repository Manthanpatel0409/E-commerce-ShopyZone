import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or message while checking auth
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to login
    // We pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the child component (the protected page)
  return children;
};

export default ProtectedRoute;