import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notif, setNotif] = useState({ message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotif({ message, type });
  };

  const hideNotification = () => setNotif({ message: "", type: "" });

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        message={notif.message}
        type={notif.type}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};
