import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      id: 'scans-today',
      label: 'Scans Today',
      value: metrics?.scansToday,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: '+12%',
      trendUp: true
    },
    {
      id: 'scans-per-hour',
      label: 'Scans/Hour',
      value: metrics?.scansPerHour,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: '+8%',
      trendUp: true
    },
    {
      id: 'approval-rate',
      label: 'Approval Rate',
      value: `${metrics?.approvalRate}%`,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: '+2%',
      trendUp: true
    },
    {
      id: 'avg-response',
      label: 'Avg Response',
      value: `${metrics?.avgResponseTime}s`,
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      trend: '-0.1s',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-card transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={20} className={metric?.color} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              metric?.trendUp ? 'text-success' : 'text-error'
            }`}>
              <Icon name={metric?.trendUp ? 'TrendingUp' : 'TrendingDown'} size={14} />
              <span>{metric?.trend}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric?.value}</p>
            <p className="text-sm text-muted-foreground">{metric?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;