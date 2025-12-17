import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import SSOIntegration from './components/SSOIntegration';
import RoleSelector from './components/RoleSelector';
import TwoFactorAuth from './components/TwoFactorAuth';
import SystemStatus from './components/SystemStatus';
import SecurityNotice from './components/SecurityNotice';

const AuthenticationRoleSelection = () => {
  const navigate = useNavigate();
  const [authStep, setAuthStep] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const mockUsers = [
    {
      username: 'john.security',
      password: 'Security@2024',
      roles: [
        {
          id: 'security-staff',
          name: 'Security Staff',
          description: 'Access scanner dashboard and device verification',
          route: '/security-staff-scanner-dashboard'
        }
      ],
      require2FA: false
    },
    {
      username: 'sarah.chief',
      password: 'Chief@2024',
      roles: [
        {
          id: 'security-chief',
          name: 'Security Chief',
          description: 'Approve registrations and monitor security operations',
          route: '/security-chief-approval-queue'
        }
      ],
      require2FA: true
    },
    {
      username: 'admin.user',
      password: 'Admin@2024',
      roles: [
        {
          id: 'admin',
          name: 'System Administrator',
          description: 'Full system access and configuration management',
          route: '/device-management-console'
        },
        {
          id: 'security-chief',
          name: 'Security Chief',
          description: 'Approve registrations and monitor security operations',
          route: '/security-chief-approval-queue'
        }
      ],
      require2FA: true
    },
    {
      username: 'student.demo',
      password: 'Student@2024',
      roles: [
        {
          id: 'student',
          name: 'Student',
          description: 'Register and manage your devices',
          route: '/device-registration-portal'
        }
      ],
      require2FA: false
    }
  ];

  const handleLogin = (formData) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const user = mockUsers?.find(
        u => u?.username === formData?.username && u?.password === formData?.password
      );

      if (!user) {
        setError({
          field: 'password',
          message: 'Invalid username or password. Please try again.'
        });
        setIsLoading(false);
        return;
      }

      setAuthenticatedUser(user);

      if (user?.require2FA) {
        setAuthStep('2fa');
      } else if (user?.roles?.length > 1) {
        setAuthStep('role-selection');
      } else {
        navigate(user?.roles?.[0]?.route);
        localStorage.setItem('userRole', user?.roles?.[0]?.id);
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleSSOLogin = (providerId) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const user = mockUsers?.[0];
      setAuthenticatedUser(user);

      if (user?.require2FA) {
        setAuthStep('2fa');
      } else if (user?.roles?.length > 1) {
        setAuthStep('role-selection');
      } else {
        navigate(user?.roles?.[0]?.route);
        localStorage.setItem('userRole', user?.roles?.[0]?.id);
      }

      setIsLoading(false);
    }, 2000);
  };

  const handleVerify2FA = (code) => {
    setIsLoading(true);

    setTimeout(() => {
      if (code === '123456') {
        if (authenticatedUser?.roles?.length > 1) {
          setAuthStep('role-selection');
        } else {
          navigate(authenticatedUser?.roles?.[0]?.route);
          localStorage.setItem('userRole', authenticatedUser?.roles?.[0]?.id);
        }
      } else {
        setError({
          field: '2fa',
          message: 'Invalid verification code. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResend2FA = () => {
    console.log('Resending 2FA code...');
  };

  const handleRoleSelect = (roleId) => {
    setIsLoading(true);

    setTimeout(() => {
      const selectedRole = authenticatedUser?.roles?.find(r => r?.id === roleId);
      if (selectedRole) {
        localStorage.setItem('userRole', roleId);
        navigate(selectedRole?.route);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-foreground/10">
              <Icon name="Shield" size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart PC Tracker</h1>
              <p className="text-sm opacity-90">Enterprise Security Management</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Secure Device Management for Educational Institutions
              </h2>
              <p className="text-lg opacity-90">
                Streamline campus security operations with automated device registration, real-time verification, and comprehensive monitoring.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: 'Scan', label: 'Barcode Scanning', value: '10K+ scans/day' },
                { icon: 'Shield', label: 'Security Verified', value: '99.9% uptime' },
                { icon: 'Users', label: 'Active Users', value: '5,000+' },
                { icon: 'CheckCircle', label: 'Devices Tracked', value: '15,000+' }
              ]?.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <Icon name={stat?.icon} size={24} className="opacity-90" />
                  <div>
                    <div className="text-2xl font-bold">{stat?.value}</div>
                    <div className="text-sm opacity-75">{stat?.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm opacity-75">
            <span>© {new Date()?.getFullYear()} Smart PC Tracker</span>
            <span>•</span>
            <a href="#" className="hover:opacity-100 transition-opacity duration-200">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:opacity-100 transition-opacity duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="Shield" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Smart PC Tracker</h1>
            </div>
            <p className="text-sm text-muted-foreground">Enterprise Security Management</p>
          </div>

          <div className="bg-card rounded-lg shadow-card p-8 space-y-6">
            {authStep === 'login' && (
              <>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access your security dashboard
                  </p>
                </div>

                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={error}
                />

                <SSOIntegration
                  onSSOLogin={handleSSOLogin}
                  isLoading={isLoading}
                />
              </>
            )}

            {authStep === '2fa' && (
              <TwoFactorAuth
                onVerify={handleVerify2FA}
                onResend={handleResend2FA}
                isLoading={isLoading}
                method="email"
              />
            )}

            {authStep === 'role-selection' && authenticatedUser && (
              <RoleSelector
                availableRoles={authenticatedUser?.roles}
                onRoleSelect={handleRoleSelect}
                isLoading={isLoading}
              />
            )}
          </div>

          {authStep === 'login' && (
            <div className="space-y-6">
              <SystemStatus />
              <SecurityNotice />
            </div>
          )}

          {error && authStep === 'login' && (
            <div className="p-4 rounded-md bg-error/10 border border-error/20">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">Authentication Failed</p>
                  <p className="text-xs text-muted-foreground">
                    {error?.message || 'Please check your credentials and try again.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact IT Support at{' '}
              <a href="mailto:support@university.edu" className="text-accent hover:text-accent/80 transition-colors duration-200">
                support@university.edu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationRoleSelection;