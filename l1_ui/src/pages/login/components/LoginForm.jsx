import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';



const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleChange}
          error={validationErrors?.email}
          required
          disabled={loading}
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
          error={validationErrors?.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-smooth"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={loading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3 flex items-start space-x-2">
          <Icon name="AlertCircle" size={18} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        disabled={loading}
        iconName="LogIn"
        iconPosition="right"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;