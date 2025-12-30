import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { ProfileProvider} from './context/ProfileContext'
import { NotificationProvider } from './context/NotificationContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationProvider>
      <ProfileProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
      </ProfileProvider>
      </NotificationProvider>
    </AuthContextProvider>
  </React.StrictMode>
);