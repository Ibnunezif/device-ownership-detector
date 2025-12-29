import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://pc-ownership-backend-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: response interceptor
axiosClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default axiosClient;
