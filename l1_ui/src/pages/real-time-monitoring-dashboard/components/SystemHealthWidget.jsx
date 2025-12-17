import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthWidget = () => {
  const [healthMetrics, setHealthMetrics] = useState({
    systemUptime: 99.8,
    apiResponseTime: 145,
    databaseConnections: 87,
    activeScannersCount: 12,
    totalScannersCount: 15,
    cpuUsage: 42,
    memoryUsage: 68,
    diskUsage: 54,
    networkLatency: 23
  });

  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthMetrics(prev => ({
        ...prev,
        apiResponseTime: Math.floor(Math.random() * 50) + 120,
        cpuUsage: Math.floor(Math.random() * 20) + 35,
        memoryUsage: Math.floor(Math.random() * 15) + 60,
        networkLatency: Math.floor(Math.random() * 10) + 18
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds?.critical) return { status: 'critical', color: 'text-error', bgColor: 'bg-error/10' };
    if (value >= thresholds?.warning) return { status: 'warning', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'healthy', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const systemComponents = [
    {
      id: 'scanners',
      name: 'Scanner Network',
      icon: 'Scan',
      status: healthMetrics?.activeScannersCount === healthMetrics?.totalScannersCount ? 'healthy' : 'warning',
      value: `${healthMetrics?.activeScannersCount}/${healthMetrics?.totalScannersCount}`,
      description: 'Active scanners online',
      details: [
        { label: 'Main Gate A', status: 'online', lastSeen: '2 min ago' },
        { label: 'Main Gate B', status: 'online', lastSeen: '1 min ago' },
        { label: 'Library Entrance', status: 'online', lastSeen: '3 min ago' },
        { label: 'Engineering Block', status: 'online', lastSeen: '1 min ago' },
        { label: 'Student Center', status: 'online', lastSeen: '4 min ago' },
        { label: 'Main Gate C', status: 'offline', lastSeen: '45 min ago' }
      ]
    },
    {
      id: 'database',
      name: 'Database',
      icon: 'Database',
      status: healthMetrics?.databaseConnections < 90 ? 'healthy' : 'warning',
      value: `${healthMetrics?.databaseConnections}%`,
      description: 'Connection pool usage',
      details: [
        { label: 'Active Connections', value: '87/100' },
        { label: 'Query Response Time', value: '12ms avg' },
        { label: 'Last Backup', value: '2 hours ago' }
      ]
    },
    {
      id: 'api',
      name: 'API Services',
      icon: 'Server',
      status: healthMetrics?.apiResponseTime < 200 ? 'healthy' : 'warning',
      value: `${healthMetrics?.apiResponseTime}ms`,
      description: 'Average response time',
      details: [
        { label: 'Authentication Service', status: 'healthy', responseTime: '98ms' },
        { label: 'Device Verification', status: 'healthy', responseTime: '145ms' },
        { label: 'Student Information', status: 'healthy', responseTime: '112ms' },
        { label: 'Notification Service', status: 'healthy', responseTime: '76ms' }
      ]
    },
    {
      id: 'resources',
      name: 'System Resources',
      icon: 'Activity',
      status: Math.max(healthMetrics?.cpuUsage, healthMetrics?.memoryUsage) < 80 ? 'healthy' : 'warning',
      value: `${healthMetrics?.cpuUsage}%`,
      description: 'CPU utilization',
      details: [
        { label: 'CPU Usage', value: `${healthMetrics?.cpuUsage}%`, status: healthMetrics?.cpuUsage < 80 ? 'healthy' : 'warning' },
        { label: 'Memory Usage', value: `${healthMetrics?.memoryUsage}%`, status: healthMetrics?.memoryUsage < 80 ? 'healthy' : 'warning' },
        { label: 'Disk Usage', value: `${healthMetrics?.diskUsage}%`, status: healthMetrics?.diskUsage < 80 ? 'healthy' : 'warning' },
        { label: 'Network Latency', value: `${healthMetrics?.networkLatency}ms`, status: healthMetrics?.networkLatency < 50 ? 'healthy' : 'warning' }
      ]
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'healthy':
        return { icon: 'CheckCircle', color: 'text-success', bgColor: 'bg-success/10' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning', bgColor: 'bg-warning/10' };
      case 'critical':
        return { icon: 'XCircle', color: 'text-error', bgColor: 'bg-error/10' };
      default:
        return { icon: 'HelpCircle', color: 'text-muted-foreground', bgColor: 'bg-muted' };
    }
  };

  return (
    <div className="card-elevated bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10 text-success">
            <Icon name="Activity" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">System Health</h2>
            <p className="text-sm text-muted-foreground">
              Uptime: {healthMetrics?.systemUptime}% | All systems operational
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {systemComponents?.map((component) => {
          const statusConfig = getStatusConfig(component?.status);
          const isExpanded = expandedSection === component?.id;

          return (
            <div key={component?.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : component?.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${statusConfig?.bgColor}`}>
                    <Icon name={component?.icon} size={20} className={statusConfig?.color} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-foreground">{component?.name}</h3>
                    <p className="text-xs text-muted-foreground">{component?.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name={statusConfig?.icon} size={16} className={statusConfig?.color} />
                    <span className={`text-sm font-medium ${statusConfig?.color}`}>
                      {component?.value}
                    </span>
                  </div>
                  <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    className="text-muted-foreground"
                  />
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 bg-muted/20 border-t border-border">
                  <div className="space-y-2">
                    {component?.details?.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground">{detail?.label}</span>
                        <div className="flex items-center gap-2">
                          {detail?.status && (
                            <span
                              className={`w-2 h-2 rounded-full ${
                                detail?.status === 'online' || detail?.status === 'healthy' ?'bg-success' :'bg-error'
                              }`}
                            />
                          )}
                          <span className="text-sm font-medium text-foreground data-text">
                            {detail?.value || detail?.responseTime || detail?.lastSeen}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealthWidget;