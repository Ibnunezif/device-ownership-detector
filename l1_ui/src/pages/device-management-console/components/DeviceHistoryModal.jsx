import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceHistoryModal = ({ device, isOpen, onClose }) => {
  if (!isOpen || !device) return null;

  const historyEvents = [
    {
      id: 1,
      type: 'registration',
      action: 'Device Registered',
      description: `Device registered by ${device?.studentName}`,
      timestamp: device?.registrationDate,
      user: 'System',
      icon: 'Plus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'verification',
      action: 'Device Verified',
      description: `Scanned at ${device?.lastLocation}`,
      timestamp: device?.lastVerification,
      user: 'Security Staff',
      icon: 'CheckCircle',
      color: 'text-accent'
    },
    {
      id: 3,
      type: 'status_change',
      action: 'Status Updated',
      description: `Status changed to ${device?.status}`,
      timestamp: new Date(Date.now() - 172800000),
      user: 'Admin',
      icon: 'Edit',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'verification',
      action: 'Device Verified',
      description: 'Scanned at Main Gate',
      timestamp: new Date(Date.now() - 259200000),
      user: 'Security Staff',
      icon: 'CheckCircle',
      color: 'text-accent'
    },
    {
      id: 5,
      type: 'approval',
      action: 'Registration Approved',
      description: 'Device registration approved by Security Chief',
      timestamp: new Date(Date.now() - 345600000),
      user: 'Security Chief',
      icon: 'Shield',
      color: 'text-success'
    }
  ];

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-md shadow-modal max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Device History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Device ID: <span className="data-text font-medium">{device?.deviceId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Scan" size={20} className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Total Scans</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{device?.totalScans}</p>
            </div>
            <div className="bg-muted/50 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="MapPin" size={20} className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Last Location</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{device?.lastLocation}</p>
            </div>
            <div className="bg-muted/50 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Activity" size={20} className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </div>
              <p className="text-lg font-semibold text-foreground capitalize">{device?.status}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Activity Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {historyEvents?.map((event, index) => (
                  <div key={event?.id} className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center ${event?.color}`}>
                      <Icon name={event?.icon} size={16} />
                    </div>
                    <div className="bg-muted/30 rounded-md p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-foreground">{event?.action}</h4>
                        <span className="text-xs text-muted-foreground">{formatDateTime(event?.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="User" size={12} />
                        <span>By: {event?.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceHistoryModal;