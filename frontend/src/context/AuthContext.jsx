import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this

const API_URL = 'http://localhost:5000/api';
export const AuthContext = createContext();

// A helper function to set the auth token for all axios requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs on app load to check for an existing token
    if (token) {
      setAuthToken(token);
      try {
        const decoded = jwtDecode(token);
        // We set the user from the token
        setUser(decoded.user);
      } catch (error) {
        // If token is invalid
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  // Register function
  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/users/register`, { name, email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    // The user will be set by the useEffect hook
  };

  // Login function
  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    // The user will be set by the useEffect hook
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};