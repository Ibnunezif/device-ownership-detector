import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Device Approved',
      message: 'Laptop registration #12345 has been approved',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pending Approval',
      message: '3 devices awaiting security chief approval',
      timestamp: new Date(Date.now() - 600000),
      read: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Scanner Disconnected',
      message: 'Scanner #2 lost connection at Gate B',
      timestamp: new Date(Date.now() - 900000),
      read: true
    }
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 focus-ring"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-md shadow-modal z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-accent hover:text-accent/80 transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors duration-200 cursor-pointer ${
                    !notification?.read ? 'bg-accent/5' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification?.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      name={getNotificationIcon(notification?.type)}
                      size={20}
                      className={getNotificationColor(notification?.type)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {notification?.title}
                        </p>
                        {!notification?.read && (
                          <span className="flex-shrink-0 w-2 h-2 mt-1 rounded-full bg-accent" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTimestamp(notification?.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button
                onClick={handleClearAll}
                className="w-full text-sm text-error hover:text-error/80 transition-colors duration-200"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;