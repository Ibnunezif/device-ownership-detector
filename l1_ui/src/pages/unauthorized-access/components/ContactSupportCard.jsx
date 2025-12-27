import React from 'react';
import Icon from '../../../components/AppIcon';


const ContactSupportCard = ({ onContactClick }) => {
  const supportChannels = [
    {
      icon: 'Mail',
      label: 'Email Support',
      value: 'support@pcownerdetector.edu',
      description: 'Response within 24 hours',
      action: () => window.location.href = 'mailto:support@pcownerdetector.edu'
    },
    {
      icon: 'Phone',
      label: 'Phone Support',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9 AM - 5 PM EST',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: 'MessageSquare',
      label: 'Help Desk',
      value: 'Campus IT Center, Room 101',
      description: 'Walk-in support available',
      action: onContactClick
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="bg-secondary/10 p-2 md:p-3 rounded-md">
          <Icon name="HelpCircle" size={24} color="var(--color-secondary)" />
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Need Access?
        </h2>
      </div>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
        If you believe you should have access to this resource, please contact our support team. Include your student/employee ID and the specific resource you're trying to access.
      </p>
      <div className="space-y-3 md:space-y-4">
        {supportChannels?.map((channel, index) => (
          <button
            key={index}
            onClick={channel?.action}
            className="w-full bg-muted hover:bg-muted/80 rounded-md p-4 md:p-5 transition-smooth text-left group"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 bg-background p-2 rounded-md group-hover:bg-secondary/10 transition-smooth">
                <Icon name={channel?.icon} size={20} className="text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-caption font-semibold text-sm md:text-base text-foreground mb-1">
                  {channel?.label}
                </p>
                <p className="text-sm md:text-base text-foreground mb-1 break-words">
                  {channel?.value}
                </p>
                <p className="caption text-xs md:text-sm text-muted-foreground">
                  {channel?.description}
                </p>
              </div>
              <Icon name="ExternalLink" size={16} className="flex-shrink-0 text-muted-foreground group-hover:text-secondary transition-smooth mt-1" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 md:mt-8 bg-primary/5 border border-primary/10 rounded-md p-4 md:p-5">
        <div className="flex gap-3">
          <Icon name="Clock" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-caption font-semibold text-sm md:text-base text-foreground mb-2">
              Access Request Process
            </p>
            <ol className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <span className="flex-1 min-w-0">Contact support using any channel above</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <span className="flex-1 min-w-0">Provide your credentials and reason for access</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <span className="flex-1 min-w-0">Wait for administrator approval (typically 1-2 business days)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">4.</span>
                <span className="flex-1 min-w-0">Receive email notification when access is granted</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportCard;