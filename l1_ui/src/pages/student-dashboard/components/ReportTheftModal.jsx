import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportTheftModal = ({ device, onClose, onConfirm }) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    await onConfirm({
      deviceId: device?.id,
      location,
      description,
      reportedAt: new Date()?.toISOString()
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-elevation-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-5 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-error/10 rounded-md p-2">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              Report Device Theft
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-5 lg:p-6">
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Device Information
                </p>
                <p className="text-sm text-muted-foreground">
                  {device?.name} - {device?.brand}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Serial: {device?.serialNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Input
              label="Last Known Location"
              type="text"
              placeholder="e.g., Library, Cafeteria, Classroom 301"
              value={location}
              onChange={(e) => setLocation(e?.target?.value)}
              required
              description="Where was the device last seen?"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Details
              </label>
              <textarea
                className="w-full min-h-[120px] px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                placeholder="Provide any additional information about the theft (time, circumstances, witnesses, etc.)"
                value={description}
                onChange={(e) => setDescription(e?.target?.value)}
                required
              />
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">
                  Important Notice
                </p>
                <p className="text-xs text-foreground">
                  Filing a false theft report is a serious offense. This report will be reviewed by security personnel and may involve campus authorities. Please ensure all information provided is accurate.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              loading={isSubmitting}
              iconName="AlertTriangle"
              iconPosition="left"
              className="flex-1"
            >
              Submit Theft Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportTheftModal;