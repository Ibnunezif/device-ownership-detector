import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const UpdateStatusModal = ({ device, onClose, onUpdate }) => {
  const [status, setStatus] = useState(device?.recoveryStatus || 'STOLEN');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: 'STOLEN', label: 'Stolen' },
    { value: 'RECOVERED', label: 'Recovered' },
    { value: 'INVESTIGATING', label: 'Investigating' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      onUpdate(device?.id, status, notes);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100 p-4">
      <div className="bg-card rounded-md shadow-warm-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
            Update Recovery Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div className="bg-muted/50 rounded-md p-4">
            <p className="caption text-muted-foreground mb-1">Device</p>
            <p className="font-caption font-semibold text-foreground">
              {device?.brand} {device?.model}
            </p>
            <p className="caption text-muted-foreground font-mono data-text">
              SN: {device?.serialNumber}
            </p>
          </div>

          <Select
            label="Recovery Status"
            required
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />

          <Input
            label="Notes"
            type="text"
            placeholder="Add recovery notes or updates..."
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            description="Optional: Provide details about the status change"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={loading}
              iconName="Save"
            >
              Update Status
            </Button>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatusModal;