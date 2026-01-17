// src/api/dashboardApi.js
import httpClient from './httpClient';

export const getDashboardMetrics = async () => {
  try {
    const response = await httpClient.get('/movements/dashboard');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard metrics:', error);
    throw error;
  }
};
