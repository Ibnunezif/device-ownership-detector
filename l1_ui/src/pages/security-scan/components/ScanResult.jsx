import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ScanResult = ({ result, onClearResult }) => {
  if (!result) return null;

  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: {
        status: 'success',
        title: 'Device Verified',
        message: 'This device is registered and active',
        icon: 'CheckCircle2',
        bgColor: 'bg-success/10',
        textColor: 'text-success'
      },
      STOLEN: {
        status: 'error',
        title: 'STOLEN DEVICE ALERT',
        message: 'This device has been reported stolen. Contact security immediately.',
        icon: 'AlertTriangle',
        bgColor: 'bg-error/10',
        textColor: 'text-error'
      },
      BLOCKED: {
        status: 'warning',
        title: 'Device Blocked',
        message: 'This device has been blocked by administration',
        icon: 'XCircle',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning'
      }
    };
    return configs?.[status] || configs?.ACTIVE;
  };

  const statusConfig = getStatusConfig(result?.status);

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${statusConfig?.bgColor} rounded-md flex items-center justify-center`}>
            <Icon name={statusConfig?.icon} size={20} className={statusConfig?.textColor} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
              Scan Result
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Device verification details
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          iconName="X"
          size="sm"
          onClick={onClearResult}
        />
      </div>
      <StatusIndicator
        status={statusConfig?.status}
        title={statusConfig?.title}
        message={statusConfig?.message}
        onClose={onClearResult}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={result?.deviceImage}
              alt={result?.deviceImageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-muted/50 rounded-md p-3 md:p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-muted-foreground font-caption">Serial Number</span>
              <span className="text-xs md:text-sm font-medium text-foreground font-mono">{result?.serialNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-muted-foreground font-caption">Brand</span>
              <span className="text-xs md:text-sm font-medium text-foreground">{result?.brand}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-muted-foreground font-caption">Status</span>
              <span className={`text-xs md:text-sm font-medium ${statusConfig?.textColor}`}>
                {result?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-md p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Owner Information
            </h3>
            
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={result?.ownerAvatar}
                  alt={result?.ownerAvatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {result?.ownerName}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">
                  Student ID: {result?.studentId}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground break-all">{result?.ownerEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground">{result?.ownerPhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm text-muted-foreground font-caption">
                  Registered: {new Date(result.registeredAt)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {result?.status === 'STOLEN' && (
            <div className="bg-error/10 border border-error/20 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-error">
                    Security Action Required
                  </p>
                  <p className="text-xs text-foreground">
                    • Detain the individual with this device{'\n'}
                    • Contact campus security immediately{'\n'}
                    • Document the incident with photos{'\n'}
                    • Do not return the device to possessor
                  </p>
                  <Button
                    variant="destructive"
                    iconName="Phone"
                    iconPosition="left"
                    size="sm"
                    fullWidth
                    className="mt-3"
                  >
                    Call Security
                  </Button>
                </div>
              </div>
            </div>
          )}

          {result?.status === 'ACTIVE' && (
            <Button
              variant="success"
              iconName="CheckCircle2"
              iconPosition="left"
              fullWidth
            >
              Allow Entry
            </Button>
          )}
        </div>
      </div>
      <div className="bg-muted/50 rounded-md p-3 md:p-4">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground font-caption">Scan Timestamp</span>
          <span className="text-foreground font-medium">
            {new Date()?.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;