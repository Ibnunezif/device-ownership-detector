// src/api/httpClient.js
import axios from 'axios';

export const API_BASE_URL = 'https://pc-ownership-backend-api.onrender.com/api';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
