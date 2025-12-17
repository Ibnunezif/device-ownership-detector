import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ registrationId, onClose }) => {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/security-staff-scanner-dashboard');
  };

  const handleNewRegistration = () => {
    onClose();
    window.location?.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
            <Icon name="CheckCircle" size={32} />
          </div>
          
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Registration Submitted!
          </h2>
          
          <p className="text-sm text-muted-foreground mb-6">
            Your device registration has been successfully submitted for approval.
          </p>

          <div className="w-full bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Registration ID</span>
              <span className="text-sm font-semibold text-foreground data-text">{registrationId}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                <Icon name="Clock" size={12} />
                Pending Approval
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Time</span>
              <span className="text-sm font-medium text-foreground">24-48 hours</span>
            </div>
          </div>

          <div className="w-full bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Icon name="Mail" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-foreground mb-1">Email Notification</h4>
                <p className="text-xs text-muted-foreground">
                  You will receive an email at your registered address once your registration is approved. The email will include instructions for collecting your device ID card.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Button
              variant="default"
              iconName="LayoutDashboard"
              iconPosition="left"
              onClick={handleViewDashboard}
              fullWidth
            >
              View Dashboard
            </Button>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={handleNewRegistration}
              fullWidth
            >
              Register Another Device
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;