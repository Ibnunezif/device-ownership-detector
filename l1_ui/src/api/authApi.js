import apiClient from './apiClient';

export const registerApi = (payload) => {
  return apiClient.post('/user/register', payload);
};

export const loginApi = (payload) => {
  return apiClient.post('/user/login', payload);
};
