// src/services/api.js
import axios from 'axios';

// Base URL for API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://uaaa-server-oc3p.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized or 403 Forbidden
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin') {
        // Redirect to login page if not already there
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/admin';
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuthenticated', 'true');
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  },
  
  logout: async () => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove local credentials even if logout API fails
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      return { success: false, error: error.response?.data };
    }
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get profile' };
    }
  }
};

// Feedback API calls
export const feedbackAPI = {
  submitFeedback: async (data) => {
    try {
      const response = await api.post('/feedback', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to submit feedback' };
    }
  },
  
  getFeedbacks: async (params = {}) => {
    try {
      const response = await api.get('/feedback', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get feedbacks' };
    }
  },
  
  getFeedback: async (id) => {
    try {
      const response = await api.get(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get feedback' };
    }
  },
  
  getFeedbackStats: async () => {
    try {
      const response = await api.get('/feedback/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get feedback stats' };
    }
  }
};

// Admin API calls
export const adminAPI = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get dashboard stats' };
    }
  }
};

export default api;