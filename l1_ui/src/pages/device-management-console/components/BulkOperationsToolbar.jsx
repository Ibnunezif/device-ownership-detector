import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkOperationsToolbar = ({ selectedCount, onBulkStatusChange, onBulkDepartmentTransfer, onBulkExport, onSelectAll, onDeselectAll }) => {
  const [bulkAction, setBulkAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Bulk Action' },
    { value: 'activate', label: 'Activate Devices' },
    { value: 'deactivate', label: 'Deactivate Devices' },
    { value: 'mark-lost', label: 'Mark as Lost' },
    { value: 'mark-stolen', label: 'Mark as Stolen' },
    { value: 'transfer-department', label: 'Transfer Department' },
    { value: 'export-selected', label: 'Export Selected' },
    { value: 'export-all', label: 'Export All (Max 1000)' }
  ];

  const handleBulkAction = () => {
    if (!bulkAction) return;

    if (bulkAction === 'export-selected') {
      onBulkExport('selected');
      setBulkAction('');
      return;
    }

    if (bulkAction === 'export-all') {
      onBulkExport('all');
      setBulkAction('');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmBulkAction = () => {
    switch (bulkAction) {
      case 'activate': onBulkStatusChange('active');
        break;
      case 'deactivate': onBulkStatusChange('inactive');
        break;
      case 'mark-lost': onBulkStatusChange('lost');
        break;
      case 'mark-stolen': onBulkStatusChange('stolen');
        break;
      case 'transfer-department':
        onBulkDepartmentTransfer();
        break;
      default:
        break;
    }
    setShowConfirmation(false);
    setBulkAction('');
  };

  return (
    <>
      <div className="bg-card border border-border rounded-md p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSelectAll}
                iconName="CheckSquare"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDeselectAll}
                iconName="Square"
              >
                Deselect All
              </Button>
            </div>
            <div className="h-6 w-px bg-border" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} device{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Select
              options={bulkActionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              placeholder="Select action"
              className="flex-1 lg:w-64"
            />
            <Button
              variant="default"
              onClick={handleBulkAction}
              disabled={!bulkAction || (selectedCount === 0 && !bulkAction?.includes('export-all'))}
              iconName="Play"
            >
              Execute
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-sm">
            <Icon name="Info" size={14} className="text-accent" />
            <span className="text-muted-foreground">Bulk operations support up to 1,000 devices</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-sm">
            <Icon name="Shield" size={14} className="text-accent" />
            <span className="text-muted-foreground">All actions are logged in audit trail</span>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-md shadow-modal max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Bulk Action</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You are about to perform a bulk action on {selectedCount} device{selectedCount !== 1 ? 's' : ''}. This action cannot be undone. Are you sure you want to continue?
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowConfirmation(false);
                      setBulkAction('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={confirmBulkAction}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkOperationsToolbar;