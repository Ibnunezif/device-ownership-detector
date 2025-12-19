import axiosInstance from './axiosInstance';

// Send device registration
export const registerDevice = async (formData) => {
  try {
    const response = await axiosInstance.post('/registrations', formData);
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};
