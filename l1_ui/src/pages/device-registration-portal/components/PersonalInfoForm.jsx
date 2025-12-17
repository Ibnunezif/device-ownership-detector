import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ formData, onUpdate, onNext }) => {
  const [localData, setLocalData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    enrollmentYear: '',
    ...formData
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const mockStudentData = {
      studentId: 'STU2023001',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      department: 'computer-science',
      enrollmentYear: '2023'
    };
    
    setLocalData(prev => ({
      ...prev,
      ...mockStudentData
    }));
  }, []);

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' }
  ];

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' }
  ];

  const handleChange = (field, value) => {
    setLocalData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};

    if (!localData?.studentId?.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!localData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!localData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(localData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!localData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(localData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!localData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!localData?.enrollmentYear) {
      newErrors.enrollmentYear = 'Enrollment year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsValidating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsValidating(false);
    onUpdate(localData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Student Information</h3>
            <p className="text-xs text-muted-foreground">
              Your details have been pre-populated from the student information system. Please verify and update if necessary.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Student ID"
          type="text"
          value={localData?.studentId}
          onChange={(e) => handleChange('studentId', e?.target?.value)}
          error={errors?.studentId}
          required
          disabled
          description="Auto-populated from student system"
        />

        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={localData?.fullName}
          onChange={(e) => handleChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@university.edu"
          value={localData?.email}
          onChange={(e) => handleChange('email', e?.target?.value)}
          error={errors?.email}
          required
          description="University email address"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={localData?.phone}
          onChange={(e) => handleChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Select
          label="Department"
          options={departmentOptions}
          value={localData?.department}
          onChange={(value) => handleChange('department', value)}
          error={errors?.department}
          required
          searchable
        />

        <Select
          label="Enrollment Year"
          options={yearOptions}
          value={localData?.enrollmentYear}
          onChange={(value) => handleChange('enrollmentYear', value)}
          error={errors?.enrollmentYear}
          required
        />
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <Icon name="Clock" size={16} className="inline mr-2" />
          Estimated time: 2 minutes
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="ArrowRight"
          iconPosition="right"
          loading={isValidating}
        >
          Continue to Device Details
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;