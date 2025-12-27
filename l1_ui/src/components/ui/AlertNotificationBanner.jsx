import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';


const AlertNotificationBanner = ({ 
  alerts = [],
  onDismiss,
  autoHideDuration = 0
}) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(new Set());

  useEffect(() => {
    const newAlerts = alerts?.filter(alert => !dismissedIds?.has(alert?.id));
    setVisibleAlerts(newAlerts);
  }, [alerts, dismissedIds]);

  useEffect(() => {
    if (autoHideDuration > 0 && visibleAlerts?.length > 0) {
      const timers = visibleAlerts?.map(alert => 
        setTimeout(() => handleDismiss(alert?.id), autoHideDuration)
      );
      return () => timers?.forEach(timer => clearTimeout(timer));
    }
  }, [visibleAlerts, autoHideDuration]);

  const handleDismiss = (alertId) => {
    setDismissedIds(prev => new Set([...prev, alertId]));
    if (onDismiss) {
      onDismiss(alertId);
    }
  };

  const getAlertStyles = (type) => {
    const styles = {
      error: {
        bg: 'bg-error',
        text: 'text-error-foreground',
        icon: 'AlertCircle',
      },
      warning: {
        bg: 'bg-warning',
        text: 'text-warning-foreground',
        icon: 'AlertTriangle',
      },
      success: {
        bg: 'bg-success',
        text: 'text-success-foreground',
        icon: 'CheckCircle',
      },
      info: {
        bg: 'bg-secondary',
        text: 'text-secondary-foreground',
        icon: 'Info',
      },
    };
    return styles?.[type] || styles?.info;
  };

  if (visibleAlerts?.length === 0) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-999">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 py-2">
          {visibleAlerts?.map((alert) => {
            const styles = getAlertStyles(alert?.type);
            return (
              <div
                key={alert?.id}
                className={`${styles?.bg} ${styles?.text} rounded-md shadow-warm-md animate-in slide-in-from-top-2 duration-300`}
              >
                <div className="flex items-start gap-3 px-4 py-3 sm:px-6">
                  <Icon 
                    name={styles?.icon} 
                    size={20} 
                    className="flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    {alert?.title && (
                      <h3 className="font-caption font-semibold text-sm sm:text-base mb-1">
                        {alert?.title}
                      </h3>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed">
                      {alert?.message}
                    </p>
                    {alert?.action && (
                      <button
                        onClick={alert?.action?.onClick}
                        className="mt-2 text-sm font-caption font-semibold underline hover:no-underline transition-smooth"
                      >
                        {alert?.action?.label}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDismiss(alert?.id)}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-smooth"
                    aria-label="Dismiss alert"
                  >
                    <Icon name="X" size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertNotificationBanner;