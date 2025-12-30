import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  const { dispatch } = useAuthContext();

  const register = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare FormData only for allowed fields
      const data = new FormData();
      const allowedFields = [
        "first_name",
        "last_name",
        "phone_number",
        "university_id",
        "department",
        "batch",
        "email",
        "password"
      ];

      allowedFields.forEach((key) => {
        if (formData[key] !== undefined) data.append(key, formData[key]);
      });

      // Optional: include profile_picture if API allows it
      if (formData.profile_picture) {
        data.append("profile_picture", formData.profile_picture);
      }

      const response = await fetch(
        'https://pc-ownership-backend-api.onrender.com/api/user/register',
        {
          method: 'POST',
          body: data,
        }
      );

      const json = await response.json();

      if (!response.ok) {
        // API returns validation errors
        if (json.errors) {
          setError(json.errors);
        } else {
          setError({ submit: json.message || "Registration failed" });
        }
        showNotification(json.message || "Registration failed", "error");
        setIsLoading(false);
        return;
      }

      // Success
      const { user, token } = json.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      dispatch({ type: 'LOGIN', payload: { ...user, token } });
      showNotification(json.message || "Registered successfully!", "success");

      setIsLoading(false);
      return { user, token };
    } catch (err) {
      console.error(err);
      setError({ submit: "Something went wrong" });
      showNotification("Something went wrong", "error");
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
