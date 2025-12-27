import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-3 md:space-y-4 mb-6 md:mb-8">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center transition-smooth">
          <Icon name="Shield" size={40} color="var(--color-primary)" className="md:w-12 md:h-12" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          Create Your Account
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto px-4">
          Join PC Owner Detector to protect your devices and maintain institutional security
        </p>
      </div>

      <div className="flex items-center justify-center space-x-6 pt-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Zap" size={16} color="var(--color-primary)" />
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">Fast Setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={16} color="var(--color-accent)" />
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">Protected</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;