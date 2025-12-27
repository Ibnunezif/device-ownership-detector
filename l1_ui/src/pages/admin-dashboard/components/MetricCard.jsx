import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, trend, trendValue, icon, iconColor, description }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 transition-smooth hover:shadow-warm-md">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="caption text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground data-text">
            {value}
          </h3>
        </div>
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon name={icon} size={24} color={iconColor} />
        </div>
      </div>
      
      {(trend || description) && (
        <div className="flex items-center gap-2 flex-wrap">
          {trend && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              <Icon name={getTrendIcon()} size={16} />
              <span className="caption font-semibold">{trendValue}</span>
            </div>
          )}
          {description && (
            <p className="caption text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricCard;