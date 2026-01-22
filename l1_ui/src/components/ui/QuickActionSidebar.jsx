import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionSidebar = ({ 
  userRole = 'admin',
  actions = [],
  onActionClick,
  position = 'right'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const defaultActions = {
    admin: [
      { id: 'mark-stolen', label: 'Mark as Stolen', icon: 'AlertTriangle', variant: 'destructive' },
      { id: 'verify-device', label: 'Verify Device', icon: 'CheckCircle', variant: 'success' },
      { id: 'block-device', label: 'Block Device', icon: 'Ban', variant: 'warning' },
      { id: 'export-data', label: 'Export Data', icon: 'Download', variant: 'outline' },
      { id: 'send-alert', label: 'Send Alert', icon: 'Bell', variant: 'secondary' },
    ],
    security: [
      { id: 'scan-device', label: 'Scan Device', icon: 'Scan', variant: 'default' },
      { id: 'report-issue', label: 'Report Issue', icon: 'Flag', variant: 'warning' },
      { id: 'view-history', label: 'View History', icon: 'History', variant: 'outline' },
    ],
    student: [
      { id: 'add-device', label: 'Add Device', icon: 'Plus', variant: 'default' },
      { id: 'view-devices', label: 'My Devices', icon: 'Laptop', variant: 'outline' },
    ],
  };

  const currentActions = actions?.length > 0 ? actions : (defaultActions?.[userRole] || defaultActions?.admin);

  useEffect(() => {
    if (isMobileExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileExpanded]);

  const handleActionClick = (actionId) => {
    if (onActionClick) {
      onActionClick(actionId);
    }
    setIsMobileExpanded(false);
  };

  return (
    <>
      <aside
        className={`hidden lg:block fixed ${position === 'right' ? 'right-0' : 'left-0'} top-20 h-[calc(100vh-5rem)] bg-card shadow-warm-md transition-smooth z-50 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h3 className="font-caption font-semibold text-foreground">Quick Actions</h3>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? 'ChevronLeft' : 'ChevronRight'} 
                size={20} 
              />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {currentActions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant || 'outline'}
                fullWidth
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => handleActionClick(action?.id)}
                className={isCollapsed ? 'justify-center px-2' : ''}
              >
                {!isCollapsed && action?.label}
              </Button>
            ))}
          </div>
        </div>
      </aside>
      <button
        onClick={() => setIsMobileExpanded(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-warm-lg flex items-center justify-center z-50 hover:scale-110 transition-smooth"
        aria-label="Open quick actions"
      >
        <Icon name="Zap" size={24} />
      </button>
      {isMobileExpanded && (
        <div className="lg:hidden fixed inset-0 bg-background z-1100">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-caption font-semibold text-foreground text-lg">Quick Actions</h3>
              <button
                onClick={() => setIsMobileExpanded(false)}
                className="p-2 rounded-md hover:bg-muted transition-smooth"
                aria-label="Close quick actions"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant={action?.variant || 'outline'}
                  fullWidth
                  size="lg"
                  iconName={action?.icon}
                  iconPosition="left"
                  onClick={() => handleActionClick(action?.id)}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionSidebar;