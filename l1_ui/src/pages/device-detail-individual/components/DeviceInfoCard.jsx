import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DeviceInfoCard = ({ device }) => {
  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-success text-success-foreground',
      PENDING: 'bg-error text-error-foreground',
      BLOCKED: 'bg-warning text-warning-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      ACTIVE: 'CheckCircle',
      PENDING: 'Clock',
      BLOCKED: 'Ban'
    };
    return icons?.[status] || 'Info';
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-1/3">
          <div className="aspect-[3/4] rounded-md overflow-hidden bg-muted">
            <Image
              src={device?.image}
              alt={device?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                {device?.brand} {device?.model}
              </h2>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-caption font-semibold text-sm ${getStatusColor(device?.status)}`}>
                <Icon name={getStatusIcon(device?.status)} size={16} />
                {device?.status}
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Serial Number: <span className="font-data text-foreground">{device?.serialNumber}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Owner</p>
                  <p className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
                    {device?.ownerName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={20} color="var(--color-secondary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Email</p>
                  <p className="text-sm md:text-base text-foreground line-clamp-1">
                    {device?.ownerEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={20} color="var(--color-accent)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm md:text-base text-foreground">
                    {device?.ownerPhone}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Registered</p>
                  <p className="text-sm md:text-base text-foreground">
                    {new Date(device.registeredDate)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={20} color="var(--color-secondary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Department :</p>
                  <p className="text-sm md:text-base text-foreground line-clamp-2">
                    {device?.department}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Hash" size={20} color="var(--color-accent)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="caption text-muted-foreground mb-1">Device ID</p>
                  <p className="text-sm md:text-base font-data text-foreground">
                    {device?.deviceId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {device?.notes && (
            <div className="pt-4 border-t border-border">
              <p className="caption text-muted-foreground mb-2">Administrative Notes</p>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {device?.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceInfoCard;