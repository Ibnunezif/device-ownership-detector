import apiClient from './apiClient';

export const registerApi = (payload) => {
  return apiClient.post('/auth/register', payload);
};

export const loginApi = (payload) => {
  return apiClient.post('/auth/login', payload);
};
