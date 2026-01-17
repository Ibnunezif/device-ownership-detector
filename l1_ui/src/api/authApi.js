// src/api/authApi.js
import httpClient from './httpClient';

export const registerApi = (payload) => {
  return httpClient.post('/user/register', payload);
};

export const loginApi = (payload) => {
  return httpClient.post('/user/login', payload);
};
