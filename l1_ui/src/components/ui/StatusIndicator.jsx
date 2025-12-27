import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  status = 'info',
  message,
  title,
  showIcon = true,
  onClose,
  className = ''
}) => {
  const statusConfig = {
    success: {
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20',
      icon: 'CheckCircle2'
    },
    warning: {
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20',
      icon: 'AlertTriangle'
    },
    error: {
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20',
      icon: 'XCircle'
    },
    info: {
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      borderColor: 'border-primary/20',
      icon: 'Info'
    },
    alert: {
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
      borderColor: 'border-accent/20',
      icon: 'AlertCircle'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.info;

  return (
    <div 
      className={`
        ${config?.bgColor} ${config?.borderColor}
        border rounded-md p-4 transition-smooth
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start space-x-3">
        {showIcon && (
          <div className={`flex-shrink-0 ${config?.textColor}`}>
            <Icon name={config?.icon} size={20} />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-semibold ${config?.textColor} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className="text-sm text-foreground">
              {message}
            </p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={`
              flex-shrink-0 ${config?.textColor} 
              hover:opacity-70 transition-smooth
            `}
            aria-label="Close notification"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;