import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://pc-ownership-backend-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: intercept requests or responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
