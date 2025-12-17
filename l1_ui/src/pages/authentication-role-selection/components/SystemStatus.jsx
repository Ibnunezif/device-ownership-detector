import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [status, setStatus] = useState({
    ldap: 'connected',
    session: 'active',
    lastSync: new Date(Date.now() - 120000)
  });

  useEffect(() => {
    const checkStatus = () => {
      const isHealthy = Math.random() > 0.05;
      setStatus(prev => ({
        ...prev,
        ldap: isHealthy ? 'connected' : 'disconnected',
        session: 'active',
        lastSync: new Date()
      }));
    };

    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (type) => {
    const configs = {
      connected: {
        icon: 'CheckCircle',
        text: 'Connected',
        className: 'text-success'
      },
      disconnected: {
        icon: 'XCircle',
        text: 'Disconnected',
        className: 'text-error'
      },
      active: {
        icon: 'Activity',
        text: 'Active',
        className: 'text-success'
      }
    };
    return configs?.[type] || configs?.connected;
  };

  const formatLastSync = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const ldapConfig = getStatusConfig(status?.ldap);
  const sessionConfig = getStatusConfig(status?.session);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
        <div className="flex items-center gap-2">
          <Icon name="Database" size={16} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">LDAP Status</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name={ldapConfig?.icon} size={14} className={ldapConfig?.className} />
          <span className={`text-xs font-semibold ${ldapConfig?.className}`}>
            {ldapConfig?.text}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Session</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name={sessionConfig?.icon} size={14} className={sessionConfig?.className} />
          <span className={`text-xs font-semibold ${sessionConfig?.className}`}>
            {sessionConfig?.text}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
        <div className="flex items-center gap-2">
          <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Last Sync</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatLastSync(status?.lastSync)}
        </span>
      </div>
    </div>
  );
};

export default SystemStatus;