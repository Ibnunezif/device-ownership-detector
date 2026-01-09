import axios from 'axios';

const API_BASE_URL = 'https://pc-ownership-backend-api.onrender.com/api';

export const getDeviceTypes = async () => {
  const token = localStorage.getItem('authToken');

  const response = await axios.get(`${API_BASE_URL}/device-type`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.data.deviceTypes;
};
