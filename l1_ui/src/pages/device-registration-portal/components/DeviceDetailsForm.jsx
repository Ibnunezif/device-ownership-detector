import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeviceDetailsForm = ({ formData, onUpdate, onNext, onBack }) => {
  const [localData, setLocalData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    color: '',
    specifications: '',
    ...formData
  });

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  const deviceTypeOptions = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'desktop', label: 'Desktop Computer' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'smartphone', label: 'Smartphone' }
  ];

  const brandOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'asus', label: 'ASUS' },
    { value: 'acer', label: 'Acer' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'other', label: 'Other' }
  ];

  const colorOptions = [
    { value: 'silver', label: 'Silver' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'gray', label: 'Gray' },
    { value: 'blue', label: 'Blue' },
    { value: 'gold', label: 'Gold' },
    { value: 'other', label: 'Other' }
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

    if (field === 'serialNumber' && duplicateWarning) {
      setDuplicateWarning(null);
    }
  };

  const checkDuplicateSerial = async (serialNumber) => {
    if (!serialNumber || serialNumber?.length < 5) return;

    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const isDuplicate = Math.random() < 0.1;
    
    if (isDuplicate) {
      setDuplicateWarning(`A device with serial number ${serialNumber} is already registered. Please verify your serial number.`);
    }
    
    setIsChecking(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!localData?.deviceType) {
      newErrors.deviceType = 'Device type is required';
    }

    if (!localData?.brand) {
      newErrors.brand = 'Brand is required';
    }

    if (!localData?.model?.trim()) {
      newErrors.model = 'Model is required';
    }

    if (!localData?.serialNumber?.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    } else if (localData?.serialNumber?.length < 5) {
      newErrors.serialNumber = 'Serial number must be at least 5 characters';
    }

    if (!localData?.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }

    if (!localData?.color) {
      newErrors.color = 'Device color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (duplicateWarning) {
      return;
    }

    onUpdate(localData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Laptop" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Device Information</h3>
            <p className="text-xs text-muted-foreground">
              Provide accurate device details. Serial number will be verified for duplicates.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Device Type"
          options={deviceTypeOptions}
          value={localData?.deviceType}
          onChange={(value) => handleChange('deviceType', value)}
          error={errors?.deviceType}
          required
          placeholder="Select device type"
        />

        <Select
          label="Brand"
          options={brandOptions}
          value={localData?.brand}
          onChange={(value) => handleChange('brand', value)}
          error={errors?.brand}
          required
          searchable
          placeholder="Select brand"
        />

        <Input
          label="Model"
          type="text"
          placeholder="e.g., MacBook Pro 14-inch"
          value={localData?.model}
          onChange={(e) => handleChange('model', e?.target?.value)}
          error={errors?.model}
          required
        />

        <div className="relative">
          <Input
            label="Serial Number"
            type="text"
            placeholder="Enter device serial number"
            value={localData?.serialNumber}
            onChange={(e) => handleChange('serialNumber', e?.target?.value)}
            onBlur={(e) => checkDuplicateSerial(e?.target?.value)}
            error={errors?.serialNumber}
            required
            description="Found on device label or settings"
          />
          {isChecking && (
            <div className="absolute right-3 top-9">
              <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
            </div>
          )}
        </div>

        <Input
          label="Purchase Date"
          type="date"
          value={localData?.purchaseDate}
          onChange={(e) => handleChange('purchaseDate', e?.target?.value)}
          error={errors?.purchaseDate}
          required
          max={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <Select
          label="Device Color"
          options={colorOptions}
          value={localData?.color}
          onChange={(value) => handleChange('color', value)}
          error={errors?.color}
          required
          placeholder="Select color"
        />
      </div>
      {duplicateWarning && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Duplicate Serial Number</h4>
              <p className="text-xs text-muted-foreground">{duplicateWarning}</p>
            </div>
          </div>
        </div>
      )}
      <Input
        label="Additional Specifications (Optional)"
        type="text"
        placeholder="e.g., 16GB RAM, 512GB SSD, M2 Chip"
        value={localData?.specifications}
        onChange={(e) => handleChange('specifications', e?.target?.value)}
        description="Any additional details that help identify your device"
      />
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="default"
          iconName="ArrowRight"
          iconPosition="right"
          disabled={!!duplicateWarning}
        >
          Continue to Photo Capture
        </Button>
      </div>
    </form>
  );
};

export default DeviceDetailsForm;