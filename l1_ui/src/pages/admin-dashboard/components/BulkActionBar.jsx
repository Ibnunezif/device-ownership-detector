import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionBar = ({ selectedCount, onAction, onClearSelection }) => {
  const [bulkAction, setBulkAction] = React.useState('');

  const actionOptions = [
    { value: '', label: 'Select action...' },
    { value: 'mark-stolen', label: 'Mark as Stolen' },
    { value: 'mark-active', label: 'Mark as Active' },
    { value: 'mark-blocked', label: 'Mark as Blocked' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleApply = () => {
    if (bulkAction) {
      onAction(bulkAction);
      setBulkAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-warm-lg z-50 lg:left-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-caption font-bold text-primary data-text">{selectedCount}</span>
            </div>
            <div>
              <p className="font-caption font-semibold text-foreground">
                {selectedCount} {selectedCount === 1 ? 'device' : 'devices'} selected
              </p>
              <button
                onClick={onClearSelection}
                className="caption text-muted-foreground hover:text-foreground transition-smooth hover:underline"
              >
                Clear selection
              </button>
            </div>
          </div>

          <div className="flex-1 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select
              options={actionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              placeholder="Choose action"
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={handleApply}
                disabled={!bulkAction}
                iconName="Check"
                className="flex-1 sm:flex-none"
              >
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={onClearSelection}
                iconName="X"
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;