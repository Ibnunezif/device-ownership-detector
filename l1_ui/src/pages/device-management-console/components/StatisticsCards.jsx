import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = ({ stats }) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Devices',
      value: stats?.total,
      icon: 'Laptop',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'active',
      label: 'Active Devices',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'inactive',
      label: 'Inactive Devices',
      value: stats?.inactive,
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      id: 'lost',
      label: 'Lost Devices',
      value: stats?.lost,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'stolen',
      label: 'Stolen Devices',
      value: stats?.stolen,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'synced',
      label: 'Sync Status',
      value: `${stats?.synced}/${stats?.total}`,
      icon: 'RefreshCw',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards?.map((card) => (
        <div key={card?.id} className="bg-card border border-border rounded-md p-4 hover:shadow-card transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-md ${card?.bgColor} flex items-center justify-center`}>
              <Icon name={card?.icon} size={20} className={card?.color} />
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{card?.value}</p>
          <p className="text-sm text-muted-foreground">{card?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;