import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'critical',
      title: 'Stolen Device Detected',
      message: 'Device serial MB2024PRO456123 flagged as stolen was scanned at Engineering Block',
      timestamp: new Date('2025-12-17T12:41:30'),
      location: 'Engineering Block',
      acknowledged: false,
      actionRequired: true
    },
    {
      id: 2,
      severity: 'high',
      title: 'Scanner Offline',
      message: 'Barcode scanner at Main Gate C has lost connection',
      timestamp: new Date('2025-12-17T12:38:15'),
      location: 'Main Gate C',
      acknowledged: false,
      actionRequired: true
    },
    {
      id: 3,
      severity: 'medium',
      title: 'High Scan Volume',
      message: 'Scanning activity at Library Entrance exceeded threshold (85 scans/hour)',
      timestamp: new Date('2025-12-17T12:35:00'),
      location: 'Library Entrance',
      acknowledged: true,
      actionRequired: false
    },
    {
      id: 4,
      severity: 'low',
      title: 'System Update Available',
      message: 'New security patch v2.4.1 is ready for installation',
      timestamp: new Date('2025-12-17T12:30:00'),
      location: 'System',
      acknowledged: false,
      actionRequired: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          icon: 'AlertOctagon',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'Critical'
        };
      case 'high':
        return {
          icon: 'AlertTriangle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'High'
        };
      case 'medium':
        return {
          icon: 'AlertCircle',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          label: 'Medium'
        };
      case 'low':
        return {
          icon: 'Info',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Low'
        };
      default:
        return {
          icon: 'Bell',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Unknown'
        };
    }
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev =>
      prev?.map(alert =>
        alert?.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alert?.acknowledged;
    if (filter === 'actionRequired') return alert?.actionRequired;
    return alert?.severity === filter;
  });

  const unacknowledgedCount = alerts?.filter(a => !a?.acknowledged)?.length;

  return (
    <div className="card-elevated bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-error/10 text-error">
            <Icon name="Bell" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Security Alerts</h2>
            <p className="text-sm text-muted-foreground">
              {unacknowledgedCount} unacknowledged alert{unacknowledgedCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground focus-ring"
          >
            <option value="all">All Alerts</option>
            <option value="unacknowledged">Unacknowledged</option>
            <option value="actionRequired">Action Required</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-success opacity-50" />
            <p className="text-sm text-muted-foreground">No alerts to display</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => {
            const severityConfig = getSeverityConfig(alert?.severity);
            return (
              <div
                key={alert?.id}
                className={`p-4 rounded-lg border ${severityConfig?.borderColor} ${
                  alert?.acknowledged ? 'opacity-60' : severityConfig?.bgColor
                } transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${severityConfig?.bgColor} flex-shrink-0`}>
                    <Icon name={severityConfig?.icon} size={20} className={severityConfig?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{alert?.title}</h3>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${severityConfig?.bgColor} ${severityConfig?.color}`}>
                            {severityConfig?.label}
                          </span>
                          {alert?.actionRequired && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-error/10 text-error">
                              Action Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground mb-2">{alert?.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="MapPin" size={12} />
                            <span>{alert?.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            <span>{formatTimestamp(alert?.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      {alert?.acknowledged && (
                        <div className="flex items-center gap-1 text-xs text-success">
                          <Icon name="CheckCircle" size={14} />
                          <span>Acknowledged</span>
                        </div>
                      )}
                    </div>
                    {!alert?.acknowledged && (
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Check"
                          onClick={() => handleAcknowledge(alert?.id)}
                        >
                          Acknowledge
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => handleDismiss(alert?.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertPanel;