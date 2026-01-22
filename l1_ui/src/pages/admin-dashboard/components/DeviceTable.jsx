import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DeviceTable = ({ devices, onDeviceClick, onBulkAction, selectedDevices, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const getStatusColor = (status) => {
    const colors = {
      APPROVED: 'text-success bg-success/10',
      STOLEN: 'text-error bg-error/10',
      BLOCKED: 'text-warning bg-warning/10'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted';
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(devices?.map(d => d?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectDevice = (deviceId, checked) => {
    if (checked) {
      onSelectionChange([...selectedDevices, deviceId]);
    } else {
      onSelectionChange(selectedDevices?.filter(id => id !== deviceId));
    }
  };

  const sortedDevices = [...devices]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedDevices?.length === devices?.length && devices?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  indeterminate={selectedDevices?.length > 0 && selectedDevices?.length < devices?.length}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('ownerName')}
                  className="flex items-center gap-2 font-caption font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Owner
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('brand')}
                  className="flex items-center gap-2 font-caption font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Device Details
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 font-caption font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Status
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('lastScan')}
                  className="flex items-center gap-2 font-caption font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Last Scan
                  <Icon name="ArrowUpDown" size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-caption font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedDevices?.map((device) => (
              <tr key={device?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedDevices?.includes(device?.id)}
                    onChange={(e) => handleSelectDevice(device?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={device?.ownerAvatar}
                      alt={device?.ownerAvatarAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-caption font-semibold text-foreground">{device?.ownerName}</p>
                      <p className="caption text-muted-foreground">{device?.ownerEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={device?.deviceImage}
                      alt={device?.deviceImageAlt}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-caption font-semibold text-foreground">{device?.brand}</p>
                      <p className="caption text-muted-foreground data-text">{device?.serialNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full caption font-semibold ${getStatusColor(device?.status)}`}>
    
                    <Icon name={device?.status === 'APPROVED' ? 'CheckCircle' : device?.status === 'STOLEN' ? 'AlertTriangle' : 'Ban'} size={14} />
                    {device?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="caption text-foreground">{device?.lastScan}</p>
                  <p className="caption text-muted-foreground">{device?.lastScanLocation}</p>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onDeviceClick(device?.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedDevices?.map((device) => (
          <div key={device?.id} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Checkbox
                checked={selectedDevices?.includes(device?.id)}
                onChange={(e) => handleSelectDevice(device?.id, e?.target?.checked)}
              />
              <Image
                src={device?.ownerAvatar}
                alt={device?.ownerAvatarAlt}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-caption font-semibold text-foreground mb-1">{device?.ownerName}</p>
                <p className="caption text-muted-foreground mb-2">{device?.ownerEmail}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full caption font-semibold ${getStatusColor(device?.status)}`}>
                  <Icon name={device?.status === 'ACTIVE' ? 'CheckCircle' : device?.status === 'STOLEN' ? 'AlertTriangle' : 'Ban'} size={12} />
                  {device?.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-3 pl-10">
              <Image
                src={device?.deviceImage}
                alt={device?.deviceImageAlt}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-caption font-semibold text-foreground">{device?.brand}</p>
                <p className="caption text-muted-foreground data-text">{device?.serialNumber}</p>
              </div>
            </div>
            
            <div className="pl-10 mb-3">
              <p className="caption text-muted-foreground mb-1">Last Scan</p>
              <p className="caption text-foreground">{device?.lastScan}</p>
              <p className="caption text-muted-foreground">{device?.lastScanLocation}</p>
            </div>
            
            <div className="pl-10">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Eye"
                onClick={() => onDeviceClick(device?.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceTable;