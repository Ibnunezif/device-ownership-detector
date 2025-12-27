import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeviceInfoForm = ({ formData, errors, onChange }) => {
  const deviceBrands = [
    { value: 'apple', label: 'Apple' },
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'asus', label: 'ASUS' },
    { value: 'acer', label: 'Acer' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'lg', label: 'LG' },
    { value: 'other', label: 'Other' }
  ];

  const deviceTypes = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'desktop', label: 'Desktop Computer' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'smartwatch', label: 'Smartwatch' },
    { value: 'camera', label: 'Camera' },
    { value: 'other', label: 'Other Electronic Device' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <Select
          label="Device Brand"
          placeholder="Select brand"
          required
          options={deviceBrands}
          value={formData?.brand}
          onChange={(value) => handleInputChange('brand', value)}
          error={errors?.brand}
          searchable
        />

        <Select
          label="Device Type"
          placeholder="Select device type"
          required
          options={deviceTypes}
          value={formData?.deviceType}
          onChange={(value) => handleInputChange('deviceType', value)}
          error={errors?.deviceType}
        />
      </div>
      <Input
        label="Device Model"
        type="text"
        placeholder="e.g., MacBook Pro 16-inch, Dell XPS 15"
        required
        value={formData?.model}
        onChange={(e) => handleInputChange('model', e?.target?.value)}
        error={errors?.model}
        description="Enter the exact model name or number"
      />
      <Input
        label="Serial Number"
        type="text"
        placeholder="e.g., C02XG0FDH7JY"
        required
        value={formData?.serialNumber}
        onChange={(e) => handleInputChange('serialNumber', e?.target?.value)}
        error={errors?.serialNumber}
        description="Usually found on the device label or in settings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <Input
          label="Purchase Date"
          type="date"
          value={formData?.purchaseDate}
          onChange={(e) => handleInputChange('purchaseDate', e?.target?.value)}
          error={errors?.purchaseDate}
          description="Optional: Helps with warranty tracking"
        />

        <Input
          label="Warranty Expiry"
          type="date"
          value={formData?.warrantyExpiry}
          onChange={(e) => handleInputChange('warrantyExpiry', e?.target?.value)}
          error={errors?.warrantyExpiry}
          description="Optional: For warranty management"
        />
      </div>
      <Input
        label="Additional Description"
        type="text"
        placeholder="Any distinguishing features, colors, or custom modifications"
        value={formData?.description}
        onChange={(e) => handleInputChange('description', e?.target?.value)}
        error={errors?.description}
        description="Optional: Add any unique identifiers"
      />
    </div>
  );
};

export default DeviceInfoForm;