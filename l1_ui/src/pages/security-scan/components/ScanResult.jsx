import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ScanResult = ({ result, onClearResult }) => {
  if (!result) return null;

  // ✅ Normalize status once
  const status = result.status?.toUpperCase();

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

    return configs[status] || configs.ACTIVE;
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${statusConfig.bgColor} rounded-md flex items-center justify-center`}>
            <Icon
              name={statusConfig.icon}
              size={22}
              className={statusConfig.textColor}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Scan Result
            </h2>
            <p className="text-sm text-muted-foreground">
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

      {/* Status banner */}
      <StatusIndicator
        status={statusConfig.status}
        title={statusConfig.title}
        message={statusConfig.message}
      />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Device info */}
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={result.deviceImage}
              alt={result.deviceImageAlt || 'Device image'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-muted/50 rounded-md p-4 space-y-2">
            <InfoRow label="Serial Number" value={result.serialNumber} mono />
            <InfoRow label="Brand" value={result.brand} />
            <InfoRow
              label="Status"
              value={status}
              valueClass={statusConfig.textColor}
            />
          </div>
        </div>

        {/* Owner info */}
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-md p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">
              Owner Information
            </h3>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                <Image
                  src={result.ownerAvatar}
                  alt={result.ownerAvatarAlt || result.ownerName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{result.ownerName}</p>
                <p className="text-sm text-muted-foreground">
                  Student ID: {result.studentId}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <IconRow icon="MapPin" value={result.location || result.gateLocation} />
              <IconRow
                icon="Calendar"
                value={`Registered: ${new Date(result.registeredAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}`}
                muted
              />
            </div>
          </div>

          {/* 🚨 STOLEN ACTION */}
          {status === 'STOLEN' && (
            <div className="bg-error/10 border border-error/20 rounded-md p-4">
              <div className="flex space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-1" />
                <div>
                  <p className="font-semibold text-error mb-2">
                    Security Action Required
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Detain the individual with this device</li>
                    <li>Contact campus security immediately</li>
                    <li>Document the incident</li>
                    <li>Do not return the device</li>
                  </ul>

                  <Button
                    variant="destructive"
                    iconName="Phone"
                    size="sm"
                    fullWidth
                    className="mt-4"
                  >
                    Call Security
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ✅ ACTIVE ACTION */}
          {status === 'ACTIVE' && (
            <Button
              variant="success"
              iconName="CheckCircle2"
              fullWidth
            >
              Allow Entry
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted/50 rounded-md p-3 text-sm flex justify-between">
        <span className="text-muted-foreground">Scan Timestamp</span>
        <span className="font-medium">
          {new Date(result.timestamp || result.registeredAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

/* ---------- Small helpers ---------- */

const InfoRow = ({ label, value, mono, valueClass }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className={`text-sm font-medium ${mono ? 'font-mono' : ''} ${valueClass || ''}`}>
      {value || '—'}
    </span>
  </div>
);

const IconRow = ({ icon, value, muted }) => (
  <div className="flex items-center space-x-3">
    <Icon name={icon} size={16} className="text-muted-foreground" />
    <span className={`text-sm ${muted ? 'text-muted-foreground' : ''}`}>
      {value}
    </span>
  </div>
);

export default ScanResult;
