import axios from 'axios';

const API_URL = '/api';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const user = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        // Set a cookie for middleware to access
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`;
      }
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  },

  logout: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      // Remove the cookie
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
};
