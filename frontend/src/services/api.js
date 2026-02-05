import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  // baseURL: API_URL,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newsAPI = {
  getNews: async (params = {}) => {
    const response = await api.get('/api/news/', { params });
    return response.data;
  },

  getArticle: async (id) => {
    const response = await api.get(`/api/news/${id}`);
    return response.data;
  },

  getTrending: async (limit = 10) => {
    const response = await api.get('/api/news/trending', { params: { limit } });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/api/news/categories');
    return response.data;
  },

  generateSummary: async (id) => {
    const response = await api.post(`/api/news/${id}/summarize`);
    return response.data;
  },
};

export default api;