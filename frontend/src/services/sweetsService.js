// src/services/sweetsService.js
import api from './api';

const sweetsService = {
  getAllSweets: () => api.get('/sweets'),
  searchSweets: (params) => api.get('/sweets/search', { params }),
  addSweet: (data) => api.post('/sweets', data),
  updateSweet: (id, data) => api.put(`/sweets/${id}`, data),
  deleteSweet: (id) => api.delete(`/sweets/${id}`),
  purchaseSweet: (id) => api.post(`/sweets/${id}/purchase`),
  restockSweet: (id, amount) => api.post(`/sweets/${id}/restock`, { amount }),
};

export default sweetsService;