// src/services/authService.js
import { registerApi, loginApi } from '../api/authApi';

/**
 * Register user
 * @param {Object} formData - Form data from registration form
 * @returns {Promise<Object>} - Response data from API
 */
export const registerUser = async (formData) => {
  const payload = {
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    phone_number: formData.phone_number.trim(),
    university_id: formData.university_id.trim(),
    department: formData.department.trim(),
    batch: formData.batch.trim(),
    role: formData.role.toLowerCase(),
    email: formData.email.trim(),
    password: formData.password,
  };

  const response = await registerApi(payload);
  return response.data;
};

/**
 * Login user
 */
export const loginUser = async (formData) => {
  const response = await loginApi({
    email: formData.email,
    password: formData.password,
  });

  // backend: { data: { token, user } }
  const { token, user } = response.data.data;

  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { token, user };
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.clear();
};
