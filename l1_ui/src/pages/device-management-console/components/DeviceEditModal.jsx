import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const DeviceEditModal = ({ device, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    serialNumber: '',
    color: '',
    processor: '',
    ram: '',
    status: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (device) {
      setFormData({
        deviceType: device?.deviceType || '',
        brand: device?.brand || '',
        model: device?.model || '',
        serialNumber: device?.serialNumber || '',
        color: device?.color || '',
        processor: device?.processor || '',
        ram: device?.ram || '',
        status: device?.status || '',
        department: device?.department || ''
      });
    }
  }, [device]);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'lost', label: 'Lost' },
    { value: 'stolen', label: 'Stolen' }
  ];

  const departmentOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Business', label: 'Business' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Sciences', label: 'Sciences' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.serialNumber?.trim()) newErrors.serialNumber = 'Serial number is required';
    if (!formData?.status) newErrors.status = 'Status is required';
    if (!formData?.department) newErrors.department = 'Department is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({ ...device, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-md shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Edit Device</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Device Type"
              type="text"
              value={formData?.deviceType}
              onChange={(e) => handleChange('deviceType', e?.target?.value)}
              placeholder="e.g., Laptop"
            />
            <Input
              label="Brand"
              type="text"
              value={formData?.brand}
              onChange={(e) => handleChange('brand', e?.target?.value)}
              placeholder="e.g., Dell"
            />
            <Input
              label="Model"
              type="text"
              value={formData?.model}
              onChange={(e) => handleChange('model', e?.target?.value)}
              placeholder="e.g., XPS 15"
            />
            <Input
              label="Serial Number"
              type="text"
              value={formData?.serialNumber}
              onChange={(e) => handleChange('serialNumber', e?.target?.value)}
              error={errors?.serialNumber}
              required
            />
            <Input
              label="Color"
              type="text"
              value={formData?.color}
              onChange={(e) => handleChange('color', e?.target?.value)}
              placeholder="e.g., Silver"
            />
            <Input
              label="Processor"
              type="text"
              value={formData?.processor}
              onChange={(e) => handleChange('processor', e?.target?.value)}
              placeholder="e.g., Intel Core i7"
            />
            <Input
              label="RAM"
              type="text"
              value={formData?.ram}
              onChange={(e) => handleChange('ram', e?.target?.value)}
              placeholder="e.g., 16GB"
            />
            <Select
              label="Status"
              options={statusOptions}
              value={formData?.status}
              onChange={(value) => handleChange('status', value)}
              error={errors?.status}
              required
            />
            <Select
              label="Department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleChange('department', value)}
              error={errors?.department}
              required
              className="md:col-span-2"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Save"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceEditModal;