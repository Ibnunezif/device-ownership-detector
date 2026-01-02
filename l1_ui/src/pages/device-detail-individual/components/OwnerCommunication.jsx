import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OwnerCommunication = ({ ownerInfo, notificationHistory }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendMessage = () => {
    if (validateForm()) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setShowMessageForm(false);
        setMessage('');
        setSubject('');
        setErrors({});
      }, 1500);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${ownerInfo?.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${ownerInfo?.email}`;
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-accent/10 flex items-center justify-center">
          <Icon name="MessageSquare" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
            Owner Communication
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Contact device owner directly
          </p>
        </div>
      </div>
      {!showMessageForm ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Phone"
              onClick={handleCall}
            >
              Call
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Mail"
              onClick={handleEmail}
            >
              Email
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Send"
              onClick={() => setShowMessageForm(true)}
            >
              Message
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-caption font-semibold text-foreground mb-3">
              Notification History
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notificationHistory?.map((notification) => (
                <div key={notification?.id} className="p-3 bg-muted rounded-md">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={notification?.type === 'email' ? 'Mail' : notification?.type === 'sms' ? 'MessageSquare' : 'Bell'} 
                        size={16} 
                        className="text-secondary flex-shrink-0"
                      />
                      <span className="caption text-muted-foreground capitalize">
                        {notification?.type}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(notification.timestamp)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {notification?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            label="Subject"
            type="text"
            placeholder="Enter message subject..."
            value={subject}
            onChange={(e) => setSubject(e?.target?.value)}
            error={errors?.subject}
            required
          />

          <div>
            <label className="block text-sm font-caption font-semibold text-foreground mb-2">
              Message <span className="text-error">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
            />
            {errors?.message && (
              <p className="text-xs text-error mt-1">{errors?.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              iconName="Send"
              onClick={handleSendMessage}
              loading={isSending}
              className="sm:flex-1"
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              iconName="X"
              onClick={() => {
                setShowMessageForm(false);
                setMessage('');
                setSubject('');
                setErrors({});
              }}
              className="sm:flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerCommunication;