import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const stocksAPI = {
  getAll: (params) => api.get('/stocks', { params }),
  getOne: (id) => api.get(`/stocks/${id}`),
  seed: () => api.post('/stocks/seed'),
};

export const portfolioAPI = {
  get: () => api.get('/portfolio'),
  getTransactions: () => api.get('/portfolio/transactions'),
};

export const paymentAPI = {
  buyStock: (data) => api.post('/payment/buy', data),
  sellStock: (data) => api.post('/payment/sell', data),
};

export default api;