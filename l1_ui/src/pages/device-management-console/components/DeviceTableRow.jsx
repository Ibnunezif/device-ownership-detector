import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeviceTableRow = ({ device, onEdit, onViewHistory, onStatusChange, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: 'bg-success/10 text-success', label: 'Active', icon: 'CheckCircle' };
      case 'inactive':
        return { color: 'bg-muted text-muted-foreground', label: 'Inactive', icon: 'Circle' };
      case 'lost':
        return { color: 'bg-warning/10 text-warning', label: 'Lost', icon: 'AlertTriangle' };
      case 'stolen':
        return { color: 'bg-error/10 text-error', label: 'Stolen', icon: 'XCircle' };
      default:
        return { color: 'bg-muted text-muted-foreground', label: 'Unknown', icon: 'HelpCircle' };
    }
  };

  const statusConfig = getStatusConfig(device?.status);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <tr className={`border-b border-border hover:bg-muted/50 transition-colors duration-200 ${isSelected ? 'bg-accent/5' : ''}`}>
        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(device?.id, e?.target?.checked)}
            className="w-4 h-4 rounded border-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0"
            aria-label={`Select device ${device?.deviceId}`}
          />
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent hover:text-accent/80 transition-colors duration-200"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={20} />
          </button>
        </td>
        <td className="px-4 py-3">
          <span className="data-text text-sm font-medium text-foreground">{device?.deviceId}</span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={device?.studentPhoto}
              alt={device?.studentPhotoAlt}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-foreground">{device?.studentName}</div>
              <div className="text-xs text-muted-foreground">{device?.studentId}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-foreground">{device?.deviceType}</div>
          <div className="text-xs text-muted-foreground">{device?.brand} {device?.model}</div>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-muted-foreground">{device?.department}</span>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-muted-foreground">{formatDate(device?.registrationDate)}</span>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-muted-foreground">{formatDateTime(device?.lastVerification)}</span>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.color}`}>
            <Icon name={statusConfig?.icon} size={14} />
            {statusConfig?.label}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(device)}
              iconName="Edit"
              iconSize={16}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewHistory(device)}
              iconName="History"
              iconSize={16}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onStatusChange(device)}
              iconName="MoreVertical"
              iconSize={16}
              className="h-8 w-8"
            />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="10" className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Device Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serial Number:</span>
                    <span className="data-text font-medium text-foreground">{device?.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="text-foreground">{device?.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processor:</span>
                    <span className="text-foreground">{device?.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="text-foreground">{device?.ram}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Student Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{device?.studentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{device?.studentPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="text-foreground">{device?.department}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Verification History</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Scans:</span>
                    <span className="text-foreground">{device?.totalScans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Location:</span>
                    <span className="text-foreground">{device?.lastLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sync Status:</span>
                    <span className={`inline-flex items-center gap-1 ${device?.syncStatus === 'synced' ? 'text-success' : 'text-warning'}`}>
                      <Icon name={device?.syncStatus === 'synced' ? 'CheckCircle' : 'AlertCircle'} size={14} />
                      {device?.syncStatus === 'synced' ? 'Synced' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default DeviceTableRow;