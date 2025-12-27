import { registerApi, loginApi } from '../api/authApi';

/**
 * Register user
 */
export const registerUser = async (formData) => {
  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: formData.role,
    studentId:
      formData.role === 'STUDENT' ? formData.studentId : null
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

  const { token, user } = response.data;

  // Store both token and user
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));

  return response.data; // return both token & user
};


/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.clear();
};