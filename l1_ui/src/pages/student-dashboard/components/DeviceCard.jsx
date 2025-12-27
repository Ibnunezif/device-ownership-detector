import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceCard = ({ device, onViewDetails, onReportTheft }) => {
  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: {
        bgColor: 'bg-success/10',
        textColor: 'text-success',
        borderColor: 'border-success/20',
        icon: 'CheckCircle2',
        label: 'Active'
      },
      STOLEN: {
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        borderColor: 'border-error/20',
        icon: 'AlertTriangle',
        label: 'Stolen'
      },
      BLOCKED: {
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        borderColor: 'border-warning/20',
        icon: 'Ban',
        label: 'Blocked'
      }
    };
    return configs?.[status] || configs?.ACTIVE;
  };

  const statusConfig = getStatusConfig(device?.status);

  return (
    <div className="bg-card rounded-lg shadow-elevation-md hover:shadow-elevation-lg transition-smooth overflow-hidden border border-border">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
        <Image
          src={device?.image}
          alt={device?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 ${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-md px-3 py-1.5 flex items-center space-x-2`}>
          <Icon name={statusConfig?.icon} size={16} className={statusConfig?.textColor} />
          <span className={`text-xs font-semibold ${statusConfig?.textColor}`}>
            {statusConfig?.label}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 line-clamp-1">
          {device?.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Tag" size={16} />
            <span className="font-medium">Brand:</span>
            <span className="text-foreground">{device?.brand}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Hash" size={16} />
            <span className="font-medium">Serial:</span>
            <span className="text-foreground font-mono text-xs">{device?.serialNumber}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span className="font-medium">Registered:</span>
            <span className="text-foreground">{device?.registeredDate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(device?.id)}
            className="flex-1"
          >
            View Details
          </Button>
          
          {device?.status === 'ACTIVE' && (
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={() => onReportTheft(device?.id)}
              className="flex-1"
            >
              Report Theft
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;