import { registerApi, loginApi } from '../api/authApi';

/**
 * Register user
 * @param {Object} formData - Form data from registration form
 * @returns {Promise<Object>} - Response data from API
 */
export const registerUser = async (formData) => {
  // Map frontend form data to backend payload
  const payload = {
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    phone_number: formData.phone_number.trim(),
    university_id: formData.university_id.trim(),
    department: formData.department.trim(),
    batch: formData.batch.trim(),
    role: formData.role.toLowerCase(), // ensure lowercase role
    email: formData.email.trim(),
    password: formData.password
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
    password: formData.password
  });

  // ✅ Correct extraction based on backend response
  const { token, user } = response.data.data;

  // ✅ Store auth data
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));

  // ✅ Return normalized object to components
  return { token, user };
};



/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.clear();
};