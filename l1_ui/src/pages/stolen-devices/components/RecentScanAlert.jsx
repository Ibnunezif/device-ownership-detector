import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentScanAlert = ({ scan, onEscalate, onViewDetails }) => {
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="bg-error/10 border-2 border-error rounded-md p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={20} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-caption font-semibold text-foreground text-base md:text-lg mb-1">
            Stolen Device Scan Detected
          </h4>
          <p className="caption text-muted-foreground">
            {formatTimeAgo(scan?.timestamp)}
          </p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Laptop" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="caption text-foreground">
            <span className="font-semibold">{scan?.deviceBrand} {scan?.deviceModel}</span> (SN: {scan?.serialNumber})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="caption text-foreground">{scan?.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="User" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="caption text-foreground">Scanned by: {scan?.scannedBy}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="destructive"
          size="sm"
          iconName="AlertCircle"
          onClick={() => onEscalate(scan?.id)}
        >
          Escalate
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          onClick={() => onViewDetails(scan?.deviceId)}
        >
          View Device
        </Button>
      </div>
    </div>
  );
};

export default RecentScanAlert;