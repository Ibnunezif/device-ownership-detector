import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VerificationResultsPanel = ({ currentResult, onClear }) => {
  if (!currentResult) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="ScanLine" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-lg font-medium text-foreground mb-2">
            Awaiting Scan
          </p>
          <p className="text-sm text-muted-foreground">
            Scan a device barcode to view verification results
          </p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return {
          bgColor: 'bg-success/10',
          textColor: 'text-success',
          borderColor: 'border-success',
          icon: 'CheckCircle',
          title: 'Device Approved',
          message: 'Device is registered and authorized for campus access'
        };
      case 'denied':
        return {
          bgColor: 'bg-error/10',
          textColor: 'text-error',
          borderColor: 'border-error',
          icon: 'XCircle',
          title: 'Access Denied',
          message: 'Device not registered or authorization expired'
        };
      case 'pending':
        return {
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
          borderColor: 'border-warning',
          icon: 'Clock',
          title: 'Pending Approval',
          message: 'Device registration awaiting Security Chief approval'
        };
      case 'stolen':
        return {
          bgColor: 'bg-error/10',
          textColor: 'text-error',
          borderColor: 'border-error',
          icon: 'AlertTriangle',
          title: 'ALERT: Stolen Device',
          message: 'This device has been reported as lost or stolen'
        };
      default:
        return {
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          borderColor: 'border-border',
          icon: 'HelpCircle',
          title: 'Unknown Status',
          message: 'Unable to verify device status'
        };
    }
  };

  const config = getStatusConfig(currentResult?.status);

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Verification Result</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
      <div className={`${config?.bgColor} border-2 ${config?.borderColor} rounded-lg p-6 mb-6`}>
        <div className="flex items-center gap-4 mb-4">
          <Icon name={config?.icon} size={48} className={config?.textColor} />
          <div>
            <h3 className={`text-xl font-bold ${config?.textColor}`}>
              {config?.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {config?.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Scan Method:</span>
            <span className="ml-2 font-medium text-foreground capitalize">
              {currentResult?.method}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Scan Time:</span>
            <span className="ml-2 font-medium text-foreground">
              {currentResult?.timestamp?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Student Information</h4>
          <div className="flex items-start gap-4">
            <Image
              src={currentResult?.studentPhoto}
              alt={currentResult?.studentPhotoAlt}
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
            <div className="flex-1 space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <span className="ml-2 font-medium text-foreground">
                  {currentResult?.studentName}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Student ID:</span>
                <span className="ml-2 font-medium text-foreground data-text">
                  {currentResult?.studentId}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <span className="ml-2 font-medium text-foreground">
                  {currentResult?.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Device Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Device Type:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.deviceType}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Brand:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.brand}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Model:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.model}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Serial Number:</span>
              <span className="ml-2 font-medium text-foreground data-text">
                {currentResult?.serialNumber}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Barcode:</span>
              <span className="ml-2 font-medium text-foreground data-text">
                {currentResult?.barcode}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Registration Details</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Registration Date:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.registrationDate}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Expiry Date:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.expiryDate}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Last Verified:</span>
              <span className="ml-2 font-medium text-foreground">
                {currentResult?.lastVerified}
              </span>
            </div>
          </div>
        </div>
      </div>
      {currentResult?.status === 'approved' && (
        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <Button
            variant="default"
            fullWidth
            iconName="LogIn"
          >
            Log Entry
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="LogOut"
          >
            Log Exit
          </Button>
        </div>
      )}
      {currentResult?.status === 'stolen' && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="danger"
            fullWidth
            iconName="AlertTriangle"
          >
            Report to Security Chief
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationResultsPanel;