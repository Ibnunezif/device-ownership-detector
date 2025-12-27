import React from 'react';
import Icon from '../../../components/AppIcon';

const RequiredPermissionsCard = ({ requiredRole, requiredPermissions = [] }) => {
  const rolePermissions = {
    admin: {
      icon: 'ShieldCheck',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      label: 'Administrator',
      permissions: [
        'Manage all devices across the system',
        'Mark devices as stolen or blocked',
        'View comprehensive audit logs',
        'Export system reports and data',
        'Manage user accounts and roles',
        'Configure system settings'
      ]
    },
    security: {
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Security Personnel',
      permissions: [
        'Scan and verify device ownership',
        'View device status information',
        'Report security incidents',
        'Access scan history',
        'Verify student credentials'
      ]
    },
    student: {
      icon: 'User',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      label: 'Student',
      permissions: [
        'Register personal devices',
        'View own device list',
        'Update device information',
        'Generate device QR codes',
        'View personal scan history'
      ]
    }
  };

  const roleInfo = rolePermissions?.[requiredRole] || rolePermissions?.admin;
  const displayPermissions = requiredPermissions?.length > 0 ? requiredPermissions : roleInfo?.permissions;

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className={`${roleInfo?.bgColor} p-2 md:p-3 rounded-md`}>
          <Icon name={roleInfo?.icon} size={24} color={`var(--color-${requiredRole === 'admin' ? 'primary' : requiredRole === 'security' ? 'warning' : 'secondary'})`} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
            Required Role
          </h2>
          <p className={`${roleInfo?.color} font-caption font-semibold text-sm md:text-base`}>
            {roleInfo?.label}
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        <p className="text-sm md:text-base text-muted-foreground">
          This resource requires the following permissions:
        </p>
        <ul className="space-y-2 md:space-y-3">
          {displayPermissions?.map((permission, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Icon name="CheckCircle" size={18} color="var(--color-success)" />
              </div>
              <span className="text-sm md:text-base text-foreground leading-relaxed flex-1 min-w-0">
                {permission}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequiredPermissionsCard;