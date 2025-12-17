import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, trend, trendValue, icon, status = 'default', onClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div
      onClick={onClick}
      className={`card-elevated bg-card p-6 border ${onClick ? 'cursor-pointer hover:shadow-modal' : ''} transition-all duration-200`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusColor()}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;