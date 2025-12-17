import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberDevice: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeyDown = (e) => {
    setCapsLockOn(e?.getModifierState('CapsLock'));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your university username"
          value={formData?.username}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={error?.field === 'username' ? error?.message : ''}
        />
      </div>
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          required
          disabled={isLoading}
          error={error?.field === 'password' ? error?.message : ''}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
        {capsLockOn && (
          <div className="flex items-center gap-2 mt-2 text-xs text-warning">
            <Icon name="AlertTriangle" size={14} />
            <span>Caps Lock is on</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember this device"
          name="rememberDevice"
          checked={formData?.rememberDevice}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          type="button"
          className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;