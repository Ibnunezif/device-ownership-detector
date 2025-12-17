import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewSubmitForm = ({ formData, onBack, onSubmit }) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit();
  };

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || 'N/A'}</span>
    </div>
  );

  const departmentLabels = {
    'computer-science': 'Computer Science',
    'electrical-engineering': 'Electrical Engineering',
    'mechanical-engineering': 'Mechanical Engineering',
    'business-administration': 'Business Administration',
    'mathematics': 'Mathematics',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology'
  };

  const deviceTypeLabels = {
    'laptop': 'Laptop',
    'desktop': 'Desktop Computer',
    'tablet': 'Tablet',
    'smartphone': 'Smartphone'
  };

  const brandLabels = {
    'apple': 'Apple',
    'dell': 'Dell',
    'hp': 'HP',
    'lenovo': 'Lenovo',
    'asus': 'ASUS',
    'acer': 'Acer',
    'microsoft': 'Microsoft',
    'samsung': 'Samsung',
    'other': 'Other'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Review Your Information</h3>
            <p className="text-xs text-muted-foreground">
              Please verify all details before submitting. You can go back to edit any section.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
              <Icon name="User" size={20} />
            </div>
            <h3 className="text-base font-semibold text-foreground">Personal Information</h3>
          </div>
          <div className="space-y-0">
            <InfoRow label="Student ID" value={formData?.studentId} />
            <InfoRow label="Full Name" value={formData?.fullName} />
            <InfoRow label="Email" value={formData?.email} />
            <InfoRow label="Phone" value={formData?.phone} />
            <InfoRow label="Department" value={departmentLabels?.[formData?.department]} />
            <InfoRow label="Enrollment Year" value={formData?.enrollmentYear} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
              <Icon name="Laptop" size={20} />
            </div>
            <h3 className="text-base font-semibold text-foreground">Device Details</h3>
          </div>
          <div className="space-y-0">
            <InfoRow label="Device Type" value={deviceTypeLabels?.[formData?.deviceType]} />
            <InfoRow label="Brand" value={brandLabels?.[formData?.brand]} />
            <InfoRow label="Model" value={formData?.model} />
            <InfoRow label="Serial Number" value={formData?.serialNumber} />
            <InfoRow label="Purchase Date" value={formData?.purchaseDate} />
            <InfoRow label="Color" value={formData?.color} />
            {formData?.specifications && (
              <InfoRow label="Specifications" value={formData?.specifications} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <Icon name="Camera" size={20} />
          </div>
          <h3 className="text-base font-semibold text-foreground">Captured Photos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Owner Photo</p>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {formData?.ownerPhoto ? (
                <Image
                  src={formData?.ownerPhoto}
                  alt="Student owner photo showing clear face for identification on device ID card"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Icon name="User" size={48} />
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Device Photo</p>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {formData?.devicePhoto ? (
                <Image
                  src={formData?.devicePhoto}
                  alt="Device photo showing laptop with visible serial number and identifying features"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Icon name="Laptop" size={48} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent">
            <Icon name="FileText" size={20} />
          </div>
          <h3 className="text-base font-semibold text-foreground">Terms and Conditions</h3>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto text-xs text-muted-foreground space-y-2">
          <p>By submitting this device registration, I acknowledge and agree to the following:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>All information provided is accurate and complete to the best of my knowledge</li>
            <li>I am the rightful owner of the registered device</li>
            <li>I will carry the issued device ID card at all times when bringing the device on campus</li>
            <li>I will present the device and ID card for verification when requested by security personnel</li>
            <li>I will immediately report any loss or theft of the device or ID card to campus security</li>
            <li>I understand that unauthorized devices may be confiscated pending verification</li>
            <li>I consent to the storage and processing of my personal information for security purposes</li>
            <li>I will notify the security office of any changes to device ownership or status</li>
            <li>Failure to comply with these terms may result in device access restrictions</li>
          </ul>
        </div>
        <Checkbox
          label="I have read and agree to the terms and conditions"
          checked={agreed}
          onChange={(e) => setAgreed(e?.target?.checked)}
          required
        />
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">What happens next?</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Your registration will be reviewed by the Security Chief</li>
              <li>• You will receive an email notification once approved (typically within 24-48 hours)</li>
              <li>• After approval, your device ID card will be generated and ready for pickup</li>
              <li>• Collect your ID card from the security office during business hours</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="success"
          iconName="CheckCircle"
          iconPosition="right"
          loading={isSubmitting}
          disabled={!agreed}
        >
          Submit Registration
        </Button>
      </div>
    </form>
  );
};

export default ReviewSubmitForm;