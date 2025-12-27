import React from 'react';
import Icon from '../../../components/AppIcon';

const AccessDeniedCard = ({ userRole, attemptedResource }) => {
  const roleInfo = {
    student: {
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      icon: 'User',
      label: 'Student'
    },
    security: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'Shield',
      label: 'Security Personnel'
    },
    admin: {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: 'ShieldCheck',
      label: 'Administrator'
    }
  };

  const currentRole = roleInfo?.[userRole] || roleInfo?.student;

  return (
    <div className="bg-card rounded-lg shadow-warm-lg p-6 md:p-8 lg:p-10 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-error/10 rounded-full flex items-center justify-center">
          <Icon name="ShieldAlert" size={48} color="var(--color-error)" className="md:w-14 md:h-14 lg:w-16 lg:h-16" />
        </div>

        <div className="space-y-2 md:space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-error">
            Access Denied
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
            You don't have permission to access this resource
          </p>
        </div>

        <div className={`${currentRole?.bgColor} ${currentRole?.color} rounded-md px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 w-full max-w-md`}>
          <Icon name={currentRole?.icon} size={24} className="flex-shrink-0" />
          <div className="text-left flex-1 min-w-0">
            <p className="caption text-xs md:text-sm opacity-80">Your Current Role</p>
            <p className="font-caption font-semibold text-sm md:text-base">{currentRole?.label}</p>
          </div>
        </div>

        {attemptedResource && (
          <div className="bg-muted rounded-md px-4 py-3 md:px-6 md:py-4 w-full max-w-md">
            <p className="caption text-xs md:text-sm text-muted-foreground mb-1">Attempted Access</p>
            <p className="font-caption font-semibold text-sm md:text-base text-foreground break-words">
              {attemptedResource}
            </p>
          </div>
        )}

        <div className="bg-warning/10 border border-warning/20 rounded-md p-4 md:p-5 w-full">
          <div className="flex gap-3">
            <Icon name="Info" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
            <div className="text-left flex-1 min-w-0">
              <p className="font-caption font-semibold text-sm md:text-base text-warning mb-2">
                Why am I seeing this?
              </p>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                This page or feature requires different permissions than your current role provides. The PC Owner Detector system uses role-based access control to ensure security and proper device management workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedCard;