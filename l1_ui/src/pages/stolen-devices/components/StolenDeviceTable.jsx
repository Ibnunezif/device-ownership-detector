import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StolenDeviceTable = ({ devices, onViewDetails, onUpdateStatus, onViewScans }) => {
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left p-4 caption font-semibold text-foreground">Device</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Owner</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Owner Profile</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Department</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Device Type</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Status</th>
            <th className="text-left p-4 caption font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices?.map((device) => (
            <tr key={device?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={device?.image}
                      alt={device?.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="caption font-semibold text-foreground truncate">
                      {device?.brand} {device?.model}
                    </p>
                    <p className="caption text-muted-foreground text-xs font-mono data-text truncate">
                      {device?.serialNumber}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <p className="caption text-foreground">{device.owner}</p>
              </td>
              <td className="p-4">
                                <img
                src={device?.ownerImage}
                alt={device?.imageAlt || 'Owner image'}
                className="w-12 h-12 rounded-full object-cover"
              />
          </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-muted-foreground flex-shrink-0" />
                  <p className="caption text-foreground truncate max-w-[200px]">{device?.department}</p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={14} className="text-error flex-shrink-0" />
                  <p className="caption text-foreground font-semibold">{device?.deviceType}</p>
                </div>
              </td>
              <td className="p-4">
                <span className={`${getStatusColor(device?.recoveryStatus)} px-3 py-1 rounded-md caption font-semibold whitespace-nowrap inline-block`}>
                  {device?.recoveryStatus}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button
  variant="ghost"
  size="xs"
  iconName="Eye"
  title="View device details"
  onClick={() => onViewDetails(device?.id)}
/>

<Button
  variant="ghost"
  size="xs"
  iconName="RefreshCw"
  title="Update recovery status"
  onClick={() => onUpdateStatus(device?.id)}
/>

<Button
  variant="ghost"
  size="xs"
  iconName="Activity"
  title="View scan activity"
  onClick={() => onViewScans(device?.id)}
/>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StolenDeviceTable;