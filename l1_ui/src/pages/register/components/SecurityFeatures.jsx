import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const features = [
    {
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted using industry-standard protocols'
    },
    {
      icon: 'ShieldCheck',
      title: 'Institutional Verification',
      description: 'Student IDs are verified against institutional databases'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information with third parties'
    },
    {
      icon: 'Bell',
      title: 'Real-Time Alerts',
      description: 'Instant notifications for any suspicious device activity'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          Why Choose PC Owner Detector?
        </h2>
        <p className="text-sm text-muted-foreground">
          Trusted by institutions worldwide for device security
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-md transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-foreground leading-relaxed">
              By registering, you agree to comply with institutional security policies and device registration requirements. Your account will be subject to verification by campus security personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;