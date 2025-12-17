import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState('security-staff');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'security-staff';
    setUserRole(storedRole);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/security-staff-scanner-dashboard',
      icon: 'LayoutDashboard',
      requiredRole: ['security-staff', 'security-chief', 'admin'],
      tooltip: 'Main operational interface'
    },
    {
      label: 'Device Registration',
      path: '/device-registration-portal',
      icon: 'Laptop',
      requiredRole: ['security-staff', 'admin'],
      tooltip: 'Register new devices'
    },
    {
      label: 'Approvals',
      path: '/security-chief-approval-queue',
      icon: 'CheckCircle',
      requiredRole: ['security-chief'],
      tooltip: 'Review pending registrations'
    },
    {
      label: 'Device Management',
      path: '/device-management-console',
      icon: 'Settings',
      requiredRole: ['admin'],
      tooltip: 'Manage device lifecycle'
    },
    {
      label: 'Monitoring',
      path: '/real-time-monitoring-dashboard',
      icon: 'Activity',
      requiredRole: ['security-chief', 'admin'],
      tooltip: 'Real-time system monitoring'
    }
  ];

  const filteredNavigation = navigationItems?.filter(item => 
    item?.requiredRole?.includes(userRole)
  );

  const isActive = (path) => location?.pathname === path;

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-card shadow-card text-foreground"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleMobileToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-40 transition-all duration-200 ${
          isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar-width'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`sidebar-header ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-logo">
            <Icon name="Shield" size={isCollapsed ? 20 : 24} />
          </div>
          <span className="sidebar-brand-text">Smart PC Tracker</span>
        </div>

        <div className="px-3 py-4">
          <div className="scanner-status-indicator connected mb-4">
            <Icon name="Wifi" size={16} />
            {!isCollapsed && <span>Scanner Connected</span>}
          </div>

          <nav className="space-y-1" role="navigation" aria-label="Main navigation">
            {filteredNavigation?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 focus-ring ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={isCollapsed ? item?.tooltip : ''}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon name={item?.icon} size={20} />
                {!isCollapsed && <span>{item?.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-full px-3 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 focus-ring"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </button>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-3 mt-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 focus-ring"
            onClick={() => setIsMobileOpen(false)}
          >
            <Icon name="User" size={20} />
            {!isCollapsed && <span>Profile</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default RoleBasedSidebar;