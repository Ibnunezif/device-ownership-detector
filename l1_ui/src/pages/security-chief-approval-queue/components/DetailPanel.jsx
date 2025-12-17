import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DetailPanel = ({ registration, onClose, onApprove, onReject, onRegenerateId }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!registration) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg border border-border">
        <div className="text-center">
          <Icon name="FileSearch" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">Select a registration to view details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'photos', label: 'Photos', icon: 'Image' },
    { id: 'history', label: 'History', icon: 'History' }
  ];

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">Registration Details</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getRiskBadgeColor(registration?.riskLevel)}`}>
            {registration?.riskLevel?.charAt(0)?.toUpperCase() + registration?.riskLevel?.slice(1)} Risk
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
          aria-label="Close details panel"
        />
      </div>
      <div className="flex border-b border-border bg-muted/20">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            {tab?.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Student Information</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Image
                    src={registration?.studentPhoto}
                    alt={registration?.studentPhotoAlt}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{registration?.studentName}</p>
                    <p className="text-xs text-muted-foreground data-text">{registration?.studentId}</p>
                    <p className="text-xs text-muted-foreground mt-1">{registration?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Department</p>
                    <p className="text-sm font-medium text-foreground">{registration?.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Year</p>
                    <p className="text-sm font-medium text-foreground">{registration?.year}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Device Information</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Brand</p>
                    <p className="text-sm font-medium text-foreground">{registration?.deviceBrand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Model</p>
                    <p className="text-sm font-medium text-foreground">{registration?.deviceModel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Serial Number</p>
                    <p className="text-sm font-medium text-foreground data-text">{registration?.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Device Type</p>
                    <p className="text-sm font-medium text-foreground">{registration?.deviceType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Registration ID</p>
                  <p className="text-sm font-medium text-foreground data-text">{registration?.registrationId}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Submission Details</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Submitted At</p>
                    <p className="text-sm font-medium text-foreground">
                      {registration?.submittedAt?.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">SLA Status</p>
                    <p className={`text-sm font-medium ${
                      registration?.slaStatus === 'within' ? 'text-success' : 'text-error'
                    }`}>
                      {registration?.slaStatus === 'within' ? 'Within SLA' : 'SLA Breach'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {registration?.riskFactors && registration?.riskFactors?.length > 0 && (
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {registration?.riskFactors?.map((factor, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 rounded-md bg-warning/5 border border-warning/20">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <p className="text-sm text-foreground">{factor}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Student Photo</h4>
              <Image
                src={registration?.studentPhoto}
                alt={registration?.studentPhotoAlt}
                className="w-full h-64 object-cover rounded-lg border border-border"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Device Photo</h4>
              <Image
                src={registration?.devicePhoto}
                alt={registration?.devicePhotoAlt}
                className="w-full h-64 object-cover rounded-lg border border-border"
              />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {registration?.approvalHistory?.map((entry, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    entry?.action === 'approved' ? 'bg-success/10 text-success' :
                    entry?.action === 'rejected'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={entry?.action === 'approved' ? 'Check' : entry?.action === 'rejected' ? 'X' : 'Clock'} 
                      size={16} 
                    />
                  </div>
                  {index < registration?.approvalHistory?.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm font-medium text-foreground">{entry?.action?.charAt(0)?.toUpperCase() + entry?.action?.slice(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">by {entry?.by}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {entry?.timestamp?.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {entry?.notes && (
                    <p className="text-sm text-foreground mt-2 p-2 rounded bg-muted/50">{entry?.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/30">
        <Button
          variant="outline"
          iconName="CreditCard"
          onClick={() => onRegenerateId(registration?.id)}
        >
          Regenerate ID
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            iconName="X"
            onClick={() => onReject([registration?.id])}
          >
            Reject
          </Button>
          <Button
            variant="success"
            iconName="Check"
            onClick={() => onApprove([registration?.id])}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;