import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onApproveSelected, onRejectSelected, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border border-border rounded-lg shadow-modal px-6 py-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-accent">{selectedCount}</span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {selectedCount} {selectedCount === 1 ? 'registration' : 'registrations'} selected
        </span>
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-2">
        <Button
          variant="success"
          size="sm"
          iconName="Check"
          onClick={onApproveSelected}
        >
          Approve Selected
        </Button>
        <Button
          variant="danger"
          size="sm"
          iconName="X"
          onClick={onRejectSelected}
        >
          Reject Selected
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClearSelection}
          aria-label="Clear selection"
        />
      </div>
    </div>
  );
};

export default BulkActionsBar;