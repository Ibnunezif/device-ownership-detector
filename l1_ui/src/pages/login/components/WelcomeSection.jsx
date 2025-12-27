import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Secure Device Registration',
      description: 'Register your devices with advanced security protocols and QR code generation'
    },
    {
      icon: 'Scan',
      title: 'Quick Verification',
      description: 'Security personnel can instantly verify device ownership through scanning'
    },
    {
      icon: 'Bell',
      title: 'Theft Alerts',
      description: 'Immediate notifications when stolen devices are detected in the system'
    },
    {
      icon: 'BarChart3',
      title: 'Complete Audit Trail',
      description: 'Comprehensive logging and tracking of all device activities and scans'
    }
  ];

  return (
    <div className="space-y-8 lg:space-y-12">
      <div>
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={28} color="var(--color-primary)" className="md:w-8 md:h-8 lg:w-9 lg:h-9" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-serif">
            PC Owner Detector
          </h1>
        </div>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
          Comprehensive device security and tracking system for institutional environments
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-elevation-md transition-smooth"
          >
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
                  {feature?.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 md:p-5 lg:p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">
              Role-Based Access
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Students can register devices, security personnel can scan and verify, and administrators have complete oversight with audit capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;