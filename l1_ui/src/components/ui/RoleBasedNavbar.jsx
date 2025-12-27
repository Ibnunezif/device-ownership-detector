import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavbar = ({ userRole = 'student', onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const navigationItems = {
    student: [
      { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard', tooltip: 'View your devices' },
      { label: 'Add Device', path: '/add-device', icon: 'Plus', tooltip: 'Register new device' },
    ],
    security: [
      { label: 'Dashboard', path: '/security-dashboard', icon: 'LayoutDashboard', tooltip: 'Security overview' },
      { label: 'Scan Device', path: '/security-scan', icon: 'Scan', tooltip: 'Verify device ownership' },
    ],
    admin: [
      { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard', tooltip: 'System overview' },
      { label: 'Stolen Devices', path: '/stolen-devices', icon: 'AlertTriangle', tooltip: 'Manage stolen devices' },
      { label: 'Logs', path: '/logs', icon: 'FileText', tooltip: 'View audit logs' },
      { 
        label: 'More', 
        icon: 'MoreHorizontal',
        dropdown: [
          { label: 'Device Detail', path: '/device-detail', icon: 'Info' },
          { label: 'Settings', path: '/settings', icon: 'Settings' },
          { label: 'Help', path: '/help', icon: 'HelpCircle' },
        ]
      },
    ],
  };

  const currentNavItems = navigationItems?.[userRole] || navigationItems?.student;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderNavItem = (item, isMobile = false) => {
    if (item?.dropdown) {
      return (
        <div key={item?.label} className="relative" ref={dropdownRef}>
          <button
            onClick={() => toggleDropdown(item?.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth hover:bg-muted ${
              isMobile ? 'w-full justify-start' : ''
            }`}
            title={item?.tooltip}
          >
            <Icon name={item?.icon} size={20} />
            <span className="font-caption font-semibold">{item?.label}</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-smooth ${activeDropdown === item?.label ? 'rotate-180' : ''}`}
            />
          </button>
          {activeDropdown === item?.label && (
            <div className={`${
              isMobile 
                ? 'mt-2 ml-4 space-y-1' :'absolute top-full left-0 mt-2 bg-card rounded-md shadow-warm-md py-2 min-w-[200px] z-1001'
            }`}>
              {item?.dropdown?.map((dropdownItem) => (
                <button
                  key={dropdownItem?.path}
                  onClick={() => handleNavigation(dropdownItem?.path)}
                  className={`flex items-center gap-3 px-4 py-2 w-full text-left transition-smooth hover:bg-muted ${
                    isActivePath(dropdownItem?.path) ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={dropdownItem?.icon} size={18} />
                  <span className="font-caption">{dropdownItem?.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item?.path}
        onClick={() => handleNavigation(item?.path)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth hover:bg-muted ${
          isActivePath(item?.path) ? 'bg-primary text-primary-foreground' : 'text-foreground'
        } ${isMobile ? 'w-full justify-start' : ''}`}
        title={item?.tooltip}
      >
        <Icon name={item?.icon} size={20} />
        <span className="font-caption font-semibold">{item?.label}</span>
      </button>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-card shadow-warm z-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => handleNavigation('/admin-dashboard')}
                className="flex items-center gap-3 transition-smooth hover:opacity-80"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="Shield" size={24} color="var(--color-primary)" />
                </div>
                <span className="font-heading text-xl font-bold text-primary hidden sm:block">
                  PC Owner Detector
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-2">
                {currentNavItems?.map((item) => renderNavItem(item))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                <Icon name="User" size={16} />
                <span className="caption text-muted-foreground capitalize">{userRole}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="LogOut"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-1050 lg:hidden pt-16">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {currentNavItems?.map((item) => renderNavItem(item, true))}
            </div>
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
                <Icon name="User" size={18} />
                <span className="caption text-muted-foreground capitalize">{userRole}</span>
              </div>
              <Button
                variant="destructive"
                fullWidth
                iconName="LogOut"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleBasedNavbar;