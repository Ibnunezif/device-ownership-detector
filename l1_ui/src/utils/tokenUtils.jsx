import {jwtDecode} from 'jwt-decode';

export const getDecodedToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  return jwtDecode(token);
};

export const getUserRole = () => {
  return getDecodedToken()?.role || null;
};
