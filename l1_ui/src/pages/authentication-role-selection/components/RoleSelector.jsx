import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ availableRoles, onRoleSelect, isLoading }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roleOptions = availableRoles?.map(role => ({
    value: role?.id,
    label: role?.name,
    description: role?.description
  }));

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  const getRoleIcon = (roleId) => {
    const iconMap = {
      'student': 'GraduationCap',
      'security-staff': 'Shield',
      'security-chief': 'ShieldCheck',
      'admin': 'Settings'
    };
    return iconMap?.[roleId] || 'User';
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-success/10">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Authentication Successful</h3>
        <p className="text-sm text-muted-foreground">Select your role to continue</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Select Role"
          description="Choose the role you want to access"
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
          placeholder="Choose your role"
          required
          disabled={isLoading}
        />

        {selectedRole && (
          <div className="p-4 rounded-md bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Icon name={getRoleIcon(selectedRole)} size={24} className="text-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {roleOptions?.find(r => r?.value === selectedRole)?.label}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {roleOptions?.find(r => r?.value === selectedRole)?.description}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={!selectedRole || isLoading}
          loading={isLoading}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>
      </form>
    </div>
  );
};

export default RoleSelector;