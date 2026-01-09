import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccessModal = ({ isOpen, deviceData, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleAddAnother = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-elevation-2xl max-w-md w-full p-6 md:p-8 space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Device Registered Successfully!
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Your device has been added to the security system
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-caption">Device:</span>
            <span className="text-sm font-medium text-foreground">
              {deviceData?.brand} {deviceData?.model}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-caption">Serial Number:</span>
            <span className="text-sm font-medium text-foreground font-mono">
              {deviceData?.serial_number}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-caption">Status:</span>
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded text-xs font-medium">
              <Icon name="Shield" size={12} />
              <span>{deviceData?.status}</span>
            </span>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-foreground">
              A unique QR code has been generated for your device. Security personnel can scan this code to verify ownership.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            iconName="LayoutDashboard"
            iconPosition="left"
            onClick={handleViewDashboard}
          >
            View Dashboard
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={handleAddAnother}
          >
            Add Another Device
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;