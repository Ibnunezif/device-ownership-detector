import axios from 'axios';

export const getDashboardMetrics = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Send GET request with Authorization header
    const response = await axios.get(
      'https://pc-ownership-backend-api.onrender.com/api/movements/dashboard',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return only the data object
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard metrics:', error);
    throw error;
  }
};