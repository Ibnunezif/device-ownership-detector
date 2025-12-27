import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemGuidelinesCard = () => {
  const guidelines = [
    {
      icon: 'Shield',
      title: 'Security First',
      description: 'All device data is protected with enterprise-grade encryption. Access controls ensure only authorized personnel can view sensitive information.'
    },
    {
      icon: 'Users',
      title: 'Role-Based Access',
      description: 'The system assigns permissions based on your role (Student, Security, or Administrator) to maintain proper security boundaries.'
    },
    {
      icon: 'FileText',
      title: 'Audit Logging',
      description: 'All system activities are logged for security monitoring and compliance. Unauthorized access attempts are automatically recorded.'
    },
    {
      icon: 'Lock',
      title: 'Data Privacy',
      description: 'Personal information is handled according to institutional privacy policies and FERPA regulations for educational records.'
    }
  ];

  const acceptableUse = [
    'Only access resources appropriate for your assigned role',
    'Report any suspicious device activity immediately',
    'Keep your login credentials secure and confidential',
    'Use the system only for legitimate campus security purposes',
    'Respect the privacy of device owners and their information',
    'Follow institutional policies for device registration and verification'
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="bg-primary/10 p-2 md:p-3 rounded-md">
          <Icon name="BookOpen" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          System Guidelines
        </h2>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3 md:mb-4">
            Security Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {guidelines?.map((guideline, index) => (
              <div key={index} className="bg-muted rounded-md p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-background p-2 rounded-md">
                    <Icon name={guideline?.icon} size={18} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-caption font-semibold text-sm md:text-base text-foreground mb-1">
                      {guideline?.title}
                    </p>
                    <p className="caption text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {guideline?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3 md:mb-4">
            Acceptable Use Policy
          </h3>
          <div className="bg-muted rounded-md p-4 md:p-5">
            <ul className="space-y-2 md:space-y-3">
              {acceptableUse?.map((policy, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                  </div>
                  <span className="text-sm md:text-base text-foreground leading-relaxed flex-1 min-w-0">
                    {policy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-error/5 border border-error/20 rounded-md p-4 md:p-5">
          <div className="flex gap-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-caption font-semibold text-sm md:text-base text-error mb-2">
                Policy Violations
              </p>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Unauthorized access attempts, misuse of system privileges, or violations of acceptable use policies may result in account suspension, disciplinary action, or legal consequences according to institutional policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemGuidelinesCard;