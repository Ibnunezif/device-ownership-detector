import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StatusManagementPanel = ({ currentStatus, onStatusUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [justification, setJustification] = useState('');
  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active', description: 'Device is in normal use' },
    { value: 'STOLEN', label: 'Stolen', description: 'Device has been reported stolen' },
    { value: 'BLOCKED', label: 'Blocked', description: 'Device access is restricted' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedStatus !== currentStatus && !justification?.trim()) {
      newErrors.justification = 'Justification is required for status changes';
    }
    
    if (justification?.trim() && justification?.trim()?.length < 10) {
      newErrors.justification = 'Justification must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onStatusUpdate({
        newStatus: selectedStatus,
        justification: justification?.trim(),
        timestamp: new Date()?.toISOString()
      });
      setIsEditing(false);
      setJustification('');
      setErrors({});
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedStatus(currentStatus);
    setJustification('');
    setErrors({});
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-accent/10 flex items-center justify-center">
            <Icon name="Settings" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
              Status Management
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Update device status and add notes
            </p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-md">
            <Icon 
              name={currentStatus === 'ACTIVE' ? 'CheckCircle' : currentStatus === 'STOLEN' ? 'AlertTriangle' : 'Ban'} 
              size={24} 
              className={
                currentStatus === 'ACTIVE' ? 'text-success' :
                currentStatus === 'STOLEN'? 'text-error' : 'text-warning'
              }
            />
            <div>
              <p className="caption text-muted-foreground">Current Status</p>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {currentStatus}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-md">
            <Icon name="Info" size={16} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Status changes require administrative justification and are logged in the audit trail.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Select
            label="New Status"
            description="Select the new device status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            required
          />

          <Input
            label="Justification"
            type="text"
            placeholder="Provide detailed reason for status change..."
            description="Minimum 10 characters required"
            value={justification}
            onChange={(e) => setJustification(e?.target?.value)}
            error={errors?.justification}
            required
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="default"
              iconName="Save"
              onClick={handleSubmit}
              className="sm:flex-1"
            >
              Update Status
            </Button>
            <Button
              variant="outline"
              iconName="X"
              onClick={handleCancel}
              className="sm:flex-1"
            >
              Cancel
            </Button>
          </div>

          {selectedStatus === 'STOLEN' && (
            <div className="flex items-start gap-2 p-3 bg-error/10 rounded-md">
              <Icon name="AlertTriangle" size={16} className="text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Warning:</span> Marking as stolen will trigger security alerts and notify all security personnel.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusManagementPanel;