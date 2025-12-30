import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNotification } from '../context/NotificationContext';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const {showNotification} = useNotification();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://pc-ownership-backend-api.onrender.com/api/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );


      const json = await response.json();


      if (!response.ok) {
        if (json.errors) {
          showNotification(json.message, 'error');
          setError(json.errors);
        }
        setIsLoading(false);
        return;
      }

      // Success: store user and token separately
      const { user, token } = json.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Update auth context
      dispatch({ type: 'LOGIN', payload: { ...user, token } });
      showNotification(json.message, 'success');
      setIsLoading(false);
    } catch (err) {
      showNotification("Something went wrong", 'error');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
