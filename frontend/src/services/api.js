import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors. request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export const stocksAPI = {
  getAll: (params) => api.get('/stocks', { params }),
  getOne: (id) => api.get('/stocks/' + id),
  seed: () => api.get('/stocks/seed'),
};

export const portfolioAPI = {
  get: () => api.get('/portfolio'),
  getTransactions: () => api.get('/portfolio/transactions'),
};

export const paymentAPI = {
  buyStock: (data) => api.post('/payment/buy', data),
  sellStock: (data) => api.post('/payment/sell', data),
};

export const watchlistAPI = {
  get: () => api.get('/watchlist'),
  add: (stockId, notes, targetPrice) => api.post('/watchlist/add', { stockId, notes, targetPrice }),
  remove: (stockId) => api.delete('/watchlist/remove/' + stockId),
  update: (stockId, data) => api.put('/watchlist/update/' + stockId, data),
  check: (stockId) => api.get('/watchlist/check/' + stockId),
};

export default api;