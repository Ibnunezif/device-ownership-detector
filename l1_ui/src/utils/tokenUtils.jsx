// utils/tokenUtils.js
import { jwtDecode } from 'jwt-decode';

export const getDecodedToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  return jwtDecode(token);
};

export const getToken = () => localStorage.getItem('authToken');

export const getUser = () => {
  const user = localStorage.getItem('user');

  // 🔒 Guard against ALL invalid cases
  if (!user || user === 'undefined' || user === 'null') {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (err) {
    console.error('Invalid user in localStorage:', user);
    localStorage.removeItem('user'); // self-heal
    return null;
  }
};

export const getUserRole = () => {
  const role = getUser()?.role;
  return role ? role.toUpperCase() : null;
};

export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
