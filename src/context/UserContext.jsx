import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.data);
    return res.data;
  };

  // Register function
  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    setUser(res.data.data);
    return res.data;
  };

  // Logout function
  const logout = async () => {
    await api.get('/auth/logout');
    setUser(null);
    // Clear guest data if they were a guest
    localStorage.removeItem('guestDay');
  };

  // Update progress
  const updateProgress = async (day) => {
    if (user) {
      const res = await api.put('/progress', { day });
      setUser(res.data.data);
    } else {
      // If guest, save to localStorage
      localStorage.setItem('guestDay', day);
    }
  };

  // Get guest's last read day (defaults to 1)
  const getGuestDay = () => {
    const day = localStorage.getItem('guestDay');
    return day ? parseInt(day) : 1;
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    updateProgress,
    getGuestDay,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);