import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StolenDeviceCard = ({ device, onViewDetails, onUpdateStatus, onViewScans }) => {
  const getStatusColor = (status) => {
    const colors = {
      STOLEN: 'bg-error text-error-foreground',
      RECOVERED: 'bg-success text-success-foreground',
      INVESTIGATING: 'bg-warning text-warning-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card rounded-md shadow-warm border-2 border-error/20 overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={device?.image}
              alt={device?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-1 truncate">
                  {device?.brand} {device?.model}
                </h3>
                <p className="caption text-muted-foreground mb-2">
                  Serial: <span className="font-mono data-text">{device?.serialNumber}</span>
                </p>
              </div>
              <span className={`${getStatusColor(device?.recoveryStatus)} px-3 py-1 rounded-md caption font-semibold whitespace-nowrap`}>
                {device?.recoveryStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground flex-shrink-0" />
                ${console.log(device.owner?.name)}
                <span className="caption text-foreground truncate">{device.owner?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-error flex-shrink-0" />
                <span className="caption text-foreground">Reported: {formatDate(device?.theftDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="caption text-foreground truncate">{device?.lastLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="AlertTriangle" size={16} className="text-error flex-shrink-0" />
                <span className="caption text-foreground">{device?.scanAttempts} scan attempts</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => onViewDetails(device?.id)}
              >
                Details
              </Button>
              <Button
                variant="secondary"
                size="sm"
                iconName="RefreshCw"
                onClick={() => onUpdateStatus(device?.id)}
              >
                Update Status
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Activity"
                onClick={() => onViewScans(device?.id)}
              >
                View Scans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StolenDeviceCard;