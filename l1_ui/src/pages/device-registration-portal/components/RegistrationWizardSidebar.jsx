import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationWizardSidebar = ({ currentStep, completedSteps, onStepClick }) => {
  const steps = [
    {
      id: 1,
      title: "Personal Information",
      description: "Basic details and enrollment",
      icon: "User"
    },
    {
      id: 2,
      title: "Device Details",
      description: "Brand, model, and serial number",
      icon: "Laptop"
    },
    {
      id: 3,
      title: "Photo Capture",
      description: "Device and owner photo",
      icon: "Camera"
    },
    {
      id: 4,
      title: "Review & Submit",
      description: "Verify and complete registration",
      icon: "CheckCircle"
    }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (status) => {
    const baseClasses = "flex items-center gap-3 p-4 rounded-lg transition-all duration-200 cursor-pointer";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success/10 text-success hover:bg-success/20`;
      case 'active':
        return `${baseClasses} bg-primary text-primary-foreground shadow-card`;
      case 'pending':
        return `${baseClasses} bg-muted/50 text-muted-foreground hover:bg-muted`;
      default:
        return baseClasses;
    }
  };

  const getIconClasses = (status) => {
    const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success text-white`;
      case 'active':
        return `${baseClasses} bg-primary-foreground text-primary`;
      case 'pending':
        return `${baseClasses} bg-muted text-muted-foreground`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="h-full bg-card border-r border-border p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">Device Registration</h2>
        <p className="text-sm text-muted-foreground">Complete all steps to register your device</p>
      </div>
      <div className="space-y-3">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isClickable = completedSteps?.includes(step?.id) || step?.id === currentStep;

          return (
            <div
              key={step?.id}
              onClick={() => isClickable && onStepClick(step?.id)}
              className={getStepClasses(status)}
              role="button"
              tabIndex={isClickable ? 0 : -1}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              <div className={getIconClasses(status)}>
                {status === 'completed' ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium opacity-70">Step {step?.id}</span>
                  {status === 'active' && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-foreground opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold mb-0.5">{step?.title}</h3>
                <p className="text-xs opacity-80">{step?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Need Help?</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Contact security office for assistance with device registration
            </p>
            <p className="text-xs font-medium text-accent">security@university.edu</p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold">{completedSteps?.length}/{steps?.length} Steps</span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(completedSteps?.length / steps?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizardSidebar;