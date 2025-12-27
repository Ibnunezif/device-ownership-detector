import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import AlertNotificationBanner from '../../components/ui/AlertNotificationBanner';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AccessDeniedCard from './components/AccessDeniedCard';
import RequiredPermissionsCard from './components/RequiredPermissionsCard';
import ContactSupportCard from './components/ContactSupportCard';
import SystemGuidelinesCard from './components/SystemGuidelinesCard';
import NavigationActions from './components/NavigationActions';

const UnauthorizedAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);
  const [userRole, setUserRole] = useState('student');
  const [attemptedResource, setAttemptedResource] = useState('');
  const [requiredRole, setRequiredRole] = useState('admin');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'student';
    setUserRole(storedRole);

    const resourcePath = location?.state?.attemptedPath || location?.state?.resource || 'Protected Resource';
    setAttemptedResource(resourcePath);

    const required = location?.state?.requiredRole || 'admin';
    setRequiredRole(required);

    const timestamp = new Date()?.toISOString();
    console.log(`[${timestamp}] Unauthorized access attempt logged:`, {
      user: storedRole,
      attempted: resourcePath,
      required: required
    });

    setAlerts([
      {
        id: 'unauthorized-access',
        type: 'error',
        title: 'Access Denied',
        message: `You attempted to access a resource that requires ${required} permissions. Your current role (${storedRole}) does not have sufficient privileges.`,
      }
    ]);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/admin-dashboard', icon: 'Home' },
    { label: 'Unauthorized Access', icon: 'ShieldAlert' }
  ];

  return (
    <>
      <Helmet>
        <title>Access Denied - PC Owner Detector</title>
        <meta name="description" content="You do not have permission to access this resource. Contact support for assistance with access requests." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedNavbar userRole={userRole} onLogout={handleLogout} />
        
        <AlertNotificationBanner 
          alerts={alerts} 
          onDismiss={handleDismissAlert}
          autoHideDuration={0}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
            <BreadcrumbNavigation items={breadcrumbItems} />

            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <AccessDeniedCard 
                userRole={userRole}
                attemptedResource={attemptedResource}
              />

              <RequiredPermissionsCard 
                requiredRole={requiredRole}
              />

              <NavigationActions 
                userRole={userRole}
                onLogout={handleLogout}
              />

              <ContactSupportCard 
                onContactClick={handleContactSupport}
              />

              <SystemGuidelinesCard />
            </div>

            <footer className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-10 border-t border-border">
              <div className="text-center space-y-3 md:space-y-4">
                <p className="text-sm md:text-base text-muted-foreground">
                  PC Owner Detector - Campus Device Security System
                </p>
                <p className="caption text-xs md:text-sm text-muted-foreground">
                  &copy; {new Date()?.getFullYear()} Educational Institution. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                  <button className="text-secondary hover:underline transition-smooth">
                    Privacy Policy
                  </button>
                  <button className="text-secondary hover:underline transition-smooth">
                    Terms of Service
                  </button>
                  <button className="text-secondary hover:underline transition-smooth">
                    Acceptable Use Policy
                  </button>
                  <button className="text-secondary hover:underline transition-smooth">
                    Contact Support
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default UnauthorizedAccess;