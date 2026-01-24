import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = ({ disabled }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 md:mt-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="px-2 md:px-4 bg-background text-muted-foreground font-caption">
            Don't have an account?
          </span>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <Button
          variant="outline"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => navigate('/register')}
          disabled={disabled}
        >
          Create New Account
        </Button>
      </div>

      <p className="mt-4 text-xs md:text-sm text-muted-foreground">
        Register as a student to access the system
      </p>
    </div>
  );
};

export default RegistrationPrompt;