import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Devices',
      value: stats?.total,
      icon: 'Laptop',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      borderColor: 'border-primary/20'
    },
    {
      label: 'Active Devices',
      value: stats?.active,
      icon: 'CheckCircle2',
      bgColor: 'bg-success/10',
      iconColor: 'text-success',
      borderColor: 'border-success/20'
    },
    {
      label: 'Stolen Devices',
      value: stats?.stolen,
      icon: 'AlertTriangle',
      bgColor: 'bg-error/10',
      iconColor: 'text-error',
      borderColor: 'border-error/20'
    },
    {
      label: 'Blocked Devices',
      value: stats?.blocked,
      icon: 'Ban',
      bgColor: 'bg-warning/10',
      iconColor: 'text-warning',
      borderColor: 'border-warning/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`${stat?.bgColor} ${stat?.borderColor} border rounded-lg p-4 md:p-5 lg:p-6 transition-smooth hover:shadow-elevation-md`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${stat?.bgColor} rounded-md p-2.5 md:p-3`}>
              <Icon name={stat?.icon} size={20} className={stat?.iconColor} />
            </div>
            <span className={`text-2xl md:text-3xl lg:text-4xl font-bold ${stat?.iconColor}`}>
              {stat?.value}
            </span>
          </div>
          <p className="text-sm md:text-base font-medium text-foreground">
            {stat?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;