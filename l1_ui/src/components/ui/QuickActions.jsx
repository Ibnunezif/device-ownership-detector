import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const QuickActions = ({ context = 'dashboard', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActionsForContext = () => {
    switch (context) {
      case 'scanner':
        return [
          {
            id: 'quick-scan',
            label: 'Quick Scan',
            icon: 'Scan',
            shortcut: 'Ctrl+S',
            action: () => console.log('Quick scan initiated')
          },
          {
            id: 'manual-entry',
            label: 'Manual Entry',
            icon: 'Keyboard',
            shortcut: 'Ctrl+M',
            action: () => console.log('Manual entry opened')
          },
          {
            id: 'view-history',
            label: 'View History',
            icon: 'History',
            shortcut: 'Ctrl+H',
            action: () => console.log('History opened')
          }
        ];
      case 'approval':
        return [
          {
            id: 'approve-all',
            label: 'Approve Selected',
            icon: 'CheckCircle',
            shortcut: 'Ctrl+A',
            action: () => console.log('Approve all selected')
          },
          {
            id: 'reject-all',
            label: 'Reject Selected',
            icon: 'XCircle',
            shortcut: 'Ctrl+R',
            action: () => console.log('Reject all selected')
          },
          {
            id: 'filter',
            label: 'Filter Queue',
            icon: 'Filter',
            shortcut: 'Ctrl+F',
            action: () => console.log('Filter opened')
          }
        ];
      case 'management':
        return [
          {
            id: 'add-device',
            label: 'Add Device',
            icon: 'Plus',
            shortcut: 'Ctrl+N',
            action: () => console.log('Add device opened')
          },
          {
            id: 'export-data',
            label: 'Export Data',
            icon: 'Download',
            shortcut: 'Ctrl+E',
            action: () => console.log('Export initiated')
          },
          {
            id: 'bulk-update',
            label: 'Bulk Update',
            icon: 'Edit',
            shortcut: 'Ctrl+B',
            action: () => console.log('Bulk update opened')
          }
        ];
      default:
        return [
          {
            id: 'new-registration',
            label: 'New Registration',
            icon: 'Plus',
            shortcut: 'Ctrl+N',
            action: () => console.log('New registration opened')
          },
          {
            id: 'search',
            label: 'Search Devices',
            icon: 'Search',
            shortcut: 'Ctrl+K',
            action: () => console.log('Search opened')
          },
          {
            id: 'reports',
            label: 'Generate Report',
            icon: 'FileText',
            shortcut: 'Ctrl+R',
            action: () => console.log('Reports opened')
          }
        ];
    }
  };

  const actions = getActionsForContext();

  const handleActionClick = (action) => {
    action?.action();
    setIsExpanded(false);
  };

  const handleKeyboardShortcut = (e) => {
    if (e?.ctrlKey || e?.metaKey) {
      const action = actions?.find(a => 
        a?.shortcut?.toLowerCase()?.includes(e?.key?.toLowerCase())
      );
      if (action) {
        e?.preventDefault();
        action?.action();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [actions]);

  return (
    <>
      <div className={`hidden lg:flex items-center gap-2 ${className}`}>
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="quick-action-button"
            title={`${action?.label} (${action?.shortcut})`}
          >
            <Icon name={action?.icon} size={18} />
            <span>{action?.label}</span>
          </button>
        ))}
      </div>
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-modal transition-transform duration-200 active:scale-95 focus-ring"
          aria-label="Quick actions"
          aria-expanded={isExpanded}
        >
          <Icon name={isExpanded ? 'X' : 'Zap'} size={24} />
        </button>

        {isExpanded && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsExpanded(false)}
              aria-hidden="true"
            />
            <div className="fixed bottom-24 right-6 z-50 bg-popover border border-border rounded-md shadow-modal p-2 space-y-1">
              {actions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={() => handleActionClick(action)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200 focus-ring"
                >
                  <Icon name={action?.icon} size={20} />
                  <span className="flex-1 text-left">{action?.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {action?.shortcut}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuickActions;