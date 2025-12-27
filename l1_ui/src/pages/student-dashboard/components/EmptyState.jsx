import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddDevice }) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-sm border border-border p-8 md:p-12 lg:p-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-primary/10 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-6">
          <Icon name="Laptop" size={40} className="text-primary" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
          No Devices Registered Yet
        </h3>
        
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Start protecting your devices by registering them in our system. Add your first device to get started with our security tracking service.
        </p>
        
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddDevice}
        >
          Register Your First Device
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;