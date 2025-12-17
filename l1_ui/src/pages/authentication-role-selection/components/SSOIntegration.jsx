import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SSOIntegration = ({ onSSOLogin, isLoading }) => {
  const ssoProviders = [
    {
      id: 'university-sso',
      name: 'University SSO',
      icon: 'Building2',
      description: 'Sign in with your university account',
      primary: true
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Mail',
      description: 'Sign in with Microsoft 365',
      primary: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="space-y-3">
        {ssoProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant={provider?.primary ? 'default' : 'outline'}
            fullWidth
            onClick={() => onSSOLogin(provider?.id)}
            disabled={isLoading}
            iconName={provider?.icon}
            iconPosition="left"
          >
            {provider?.name}
          </Button>
        ))}
      </div>
      <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 text-xs text-muted-foreground">
        <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
        <p>SSO authentication uses your existing university credentials. No separate password required.</p>
      </div>
    </div>
  );
};

export default SSOIntegration;