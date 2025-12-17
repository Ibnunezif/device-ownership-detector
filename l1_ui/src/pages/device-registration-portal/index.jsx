import React, { useState, useEffect } from 'react';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActions from '../../components/ui/QuickActions';
import RegistrationWizardSidebar from './components/RegistrationWizardSidebar';
import PersonalInfoForm from './components/PersonalInfoForm';
import DeviceDetailsForm from './components/DeviceDetailsForm';
import PhotoCaptureForm from './components/PhotoCaptureForm';
import ReviewSubmitForm from './components/ReviewSubmitForm';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const DeviceRegistrationPortal = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    enrollmentYear: '',
    deviceType: '',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    color: '',
    specifications: '',
    ownerPhoto: null,
    devicePhoto: null
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem('deviceRegistrationDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setFormData(draft?.formData);
      setCurrentStep(draft?.currentStep);
      setCompletedSteps(draft?.completedSteps);
    }
  }, []);

  useEffect(() => {
    if (currentStep > 1 || Object.keys(formData)?.some(key => formData?.[key])) {
      const draft = {
        formData,
        currentStep,
        completedSteps,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('deviceRegistrationDraft', JSON.stringify(draft));
    }
  }, [formData, currentStep, completedSteps]);

  const handleStepUpdate = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const handleNext = () => {
    if (!completedSteps?.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepClick = (stepId) => {
    if (completedSteps?.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const newRegistrationId = `REG${new Date()?.getFullYear()}${String(Math.floor(Math.random() * 10000))?.padStart(4, '0')}`;
    setRegistrationId(newRegistrationId);
    setShowSuccessModal(true);
    localStorage.removeItem('deviceRegistrationDraft');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setCurrentStep(1);
    setCompletedSteps([]);
    setFormData({
      studentId: '',
      fullName: '',
      email: '',
      phone: '',
      department: '',
      enrollmentYear: '',
      deviceType: '',
      brand: '',
      model: '',
      serialNumber: '',
      purchaseDate: '',
      color: '',
      specifications: '',
      ownerPhoto: null,
      devicePhoto: null
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <DeviceDetailsForm
            formData={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PhotoCaptureForm
            formData={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ReviewSubmitForm
            formData={formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={`transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar-width'
        }`}
      >
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <Icon name="FileText" size={24} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Device Registration Portal</h1>
                  <p className="text-xs text-muted-foreground">Register your device for campus access</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <QuickActions context="scanner" />
              <NotificationCenter />
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <RegistrationWizardSidebar
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    onStepClick={handleStepClick}
                  />
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="bg-card border border-border rounded-lg shadow-card p-6">
                  {renderStepContent()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showSuccessModal && (
        <SuccessModal
          registrationId={registrationId}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};

export default DeviceRegistrationPortal;