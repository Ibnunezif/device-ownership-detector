import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotice = () => {
  const securityFeatures = [
    {
      icon: 'Lock',
      text: 'AES-256 encryption for all data'
    },
    {
      icon: 'Shield',
      text: 'FERPA compliant data protection'
    },
    {
      icon: 'Clock',
      text: 'Automatic session timeout after 30 minutes'
    },
    {
      icon: 'AlertTriangle',
      text: 'Account locked after 5 failed attempts'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon name="ShieldCheck" size={18} />
        <span>Security Features</span>
      </div>
      <div className="space-y-2">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name={feature?.icon} size={14} className="flex-shrink-0 mt-0.5" />
            <span>{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-md bg-warning/10 border border-warning/20">
        <div className="flex items-start gap-2">
          <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground mb-1">Important Notice</p>
            <p className="text-xs text-muted-foreground">
              Never share your credentials. University IT will never ask for your password via email or phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;