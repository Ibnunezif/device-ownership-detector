import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      label: 'Pending Queue',
      value: metrics?.pendingCount,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Avg. Processing Time',
      value: metrics?.avgProcessingTime,
      icon: 'Timer',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Approved Today',
      value: metrics?.approvedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'SLA Compliance',
      value: `${metrics?.slaCompliance}%`,
      icon: 'TrendingUp',
      color: metrics?.slaCompliance >= 90 ? 'text-success' : 'text-error',
      bgColor: metrics?.slaCompliance >= 90 ? 'bg-success/10' : 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards?.map((metric, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-card transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {metric?.label}
            </span>
            <div className={`w-8 h-8 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
              <Icon name={metric?.icon} size={16} className={metric?.color} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${metric?.color}`}>
            {metric?.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;