import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const NavigationActions = ({ userRole, onLogout }) => {
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    const routes = {
      admin: '/admin-dashboard',
      security: '/security-dashboard',
      student: '/student-dashboard'
    };
    return routes?.[userRole] || '/login';
  };

  const handleGoToDashboard = () => {
    navigate(getDashboardRoute());
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 md:p-8 max-w-2xl mx-auto">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">
        What would you like to do?
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="Home"
          iconPosition="left"
          onClick={handleGoToDashboard}
        >
          Go to Dashboard
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={handleGoBack}
        >
          Go Back
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          iconName="HelpCircle"
          iconPosition="left"
          onClick={() => navigate('/help')}
        >
          Get Help
        </Button>

        <Button
          variant="ghost"
          size="lg"
          fullWidth
          iconName="LogOut"
          iconPosition="left"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
        <p className="caption text-xs md:text-sm text-muted-foreground text-center leading-relaxed">
          If you need to switch roles or believe this is an error, please logout and contact your system administrator for assistance.
        </p>
      </div>
    </div>
  );
};

export default NavigationActions;