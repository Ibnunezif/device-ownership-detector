import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendValue, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    error: 'bg-error/10 border-error',
    success: 'bg-success/10 border-success',
    warning: 'bg-warning/10 border-warning'
  };

  const iconColors = {
    default: 'var(--color-primary)',
    error: 'var(--color-error)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)'
  };

  return (
    <div className={`${variantStyles?.[variant]} border rounded-md shadow-warm p-4 md:p-6`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="caption text-muted-foreground mb-1">{title}</p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {value}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 ${variant === 'default' ? 'bg-primary/10' : 'bg-white/50'}`}>
          <Icon name={icon} size={24} color={iconColors?.[variant]} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className={trend === 'up' ? 'text-error' : 'text-success'}
          />
          <span className={`caption font-semibold ${trend === 'up' ? 'text-error' : 'text-success'}`}>
            {trendValue}
          </span>
          <span className="caption text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;