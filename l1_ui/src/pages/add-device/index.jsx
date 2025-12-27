import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import StatusIndicator from '../../components/ui/StatusIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import DeviceInfoForm from './components/DeviceInfoForm';
import DevicePhotoUpload from './components/DevicePhotoUpload';
import RegistrationSuccessModal from './components/RegistrationSuccessModal';

const AddDevice = () => {
  const navigate = useNavigate();
  const [user] = useState({
    id: 'STU001',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    role: 'student',
    studentId: 'STU2024001'
  });

  const [formData, setFormData] = useState({
    brand: '',
    deviceType: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    description: ''
  });

  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredDevice, setRegisteredDevice] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Add Device', path: '/add-device' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
    if (errors?.photos) {
      setErrors(prev => ({
        ...prev,
        photos: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.brand) {
      newErrors.brand = 'Please select a device brand';
    }

    if (!formData?.deviceType) {
      newErrors.deviceType = 'Please select a device type';
    }

    if (!formData?.model || formData?.model?.trim()?.length < 2) {
      newErrors.model = 'Please enter a valid device model';
    }

    if (!formData?.serialNumber || formData?.serialNumber?.trim()?.length < 5) {
      newErrors.serialNumber = 'Serial number must be at least 5 characters';
    }

    if (photos?.length === 0) {
      newErrors.photos = 'Please upload at least one device photo';
    }

    if (formData?.purchaseDate && formData?.warrantyExpiry) {
      const purchase = new Date(formData.purchaseDate);
      const warranty = new Date(formData.warrantyExpiry);
      if (warranty < purchase) {
        newErrors.warrantyExpiry = 'Warranty expiry cannot be before purchase date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const deviceData = {
        id: `DEV${Date.now()}`,
        ...formData,
        photos: photos?.map(p => p?.preview),
        status: 'ACTIVE',
        registeredAt: new Date()?.toISOString(),
        qrCode: `QR${Date.now()}`,
        owner: user
      };

      setRegisteredDevice(deviceData);
      setShowSuccessModal(true);

      setFormData({
        brand: '',
        deviceType: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyExpiry: '',
        description: ''
      });
      setPhotos([]);
      setErrors({});

    } catch (error) {
      setSubmitError('Failed to register device. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/student-dashboard');
  };

  return (
    <AuthenticationGuard user={user} requiredRoles={['student']}>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation user={user} />

        <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NavigationBreadcrumb items={breadcrumbItems} />

            <div className="mb-6 md:mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Plus" size={24} color="var(--color-primary)" />
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Register New Device
                </h1>
              </div>
              <p className="text-sm md:text-base text-muted-foreground ml-13 md:ml-15">
                Add your electronic device to the security system for theft protection
              </p>
            </div>

            {submitError && (
              <div className="mb-6">
                <StatusIndicator
                  status="error"
                  title="Registration Failed"
                  message={submitError}
                  onClose={() => setSubmitError('')}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8 space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Icon name="Info" size={20} color="var(--color-primary)" />
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Device Information
                  </h2>
                </div>

                <DeviceInfoForm
                  formData={formData}
                  errors={errors}
                  onChange={handleFormChange}
                />
              </div>

              <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8 space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Icon name="Camera" size={20} color="var(--color-primary)" />
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Device Photos
                  </h2>
                </div>

                <DevicePhotoUpload
                  photos={photos}
                  onPhotosChange={handlePhotosChange}
                  error={errors?.photos}
                />
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 md:p-5">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-semibold text-foreground">
                      Important Registration Guidelines
                    </h3>
                    <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure serial number matches the device label exactly</li>
                      <li>Upload clear photos showing device from multiple angles</li>
                      <li>Include photos of any unique identifiers or custom modifications</li>
                      <li>Keep your device information up-to-date for accurate verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  iconName="X"
                  iconPosition="left"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="Shield"
                  iconPosition="left"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering Device...' : 'Register Device'}
                </Button>
              </div>
            </form>
          </div>
        </main>

        <RegistrationSuccessModal
          isOpen={showSuccessModal}
          deviceData={registeredDevice}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </AuthenticationGuard>
  );
};

export default AddDevice;