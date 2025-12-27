import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import { registerUser } from '../../../services/authService';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    studentId: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [statusMessage, setStatusMessage] = useState(null);

  const roleOptions = [
    { value: 'STUDENT', label: 'Student', description: 'Register your devices for security' },
    { value: 'SECURITY', label: 'Security Personnel', description: 'Scan and verify devices' },
    { value: 'ADMIN', label: 'Administrator', description: 'Manage devices and users' }
  ];

  const mockStudentIds = ['STU2024001', 'STU2024002', 'STU2024003', 'STU2024004', 'STU2024005'];

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };

    if (password?.length >= 8) score++;
    if (password?.length >= 12) score++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z0-9]/?.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-error' },
      1: { label: 'Weak', color: 'bg-error' },
      2: { label: 'Fair', color: 'bg-warning' },
      3: { label: 'Good', color: 'bg-success' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };

    return { score, ...strengthMap?.[score] };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateStudentId = (studentId) => {
    return mockStudentIds?.includes(studentId);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));

    if (field === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (field === 'role' && value !== 'STUDENT') {
      setFormData(prev => ({ ...prev, studentId: '' }));
      setErrors(prev => ({ ...prev, studentId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength?.score < 2) {
      newErrors.password = 'Password is too weak. Use a mix of letters, numbers, and symbols';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (formData?.role === 'STUDENT') {
      if (!formData?.studentId?.trim()) {
        newErrors.studentId = 'Student ID is required for student registration';
      } else if (!validateStudentId(formData?.studentId)) {
        newErrors.studentId = 'Invalid Student ID. Please contact administration';
      }
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Frontend validation
  if (!validateForm()) {
    setStatusMessage({
      type: 'error',
      title: 'Validation Error',
      message: 'Please correct the errors in the form before submitting'
    });
    return;
  }

  setLoading(true);
  setStatusMessage(null);

  try {
    // 2. Call service → API → backend
    await registerUser(formData);

    // 3. Success message
    setStatusMessage({
      type: 'success',
      title: 'Registration Successful',
      message: `Welcome ${formData.name}! Your account has been created successfully`
    });

    // 4. Redirect after short delay (UX-friendly)
    setTimeout(() => {
      navigate('/login');
    }, 2000);

  } catch (error) {
    // 5. Backend error handling
    setStatusMessage({
      type: 'error',
      title: 'Registration Failed',
      message:
        error.response?.data?.message ||
        'Unable to register. Please try again later.'
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {statusMessage && (
          <StatusIndicator
            status={statusMessage?.type}
            title={statusMessage?.title}
            message={statusMessage?.message}
            onClose={() => setStatusMessage(null)}
          />
        )}

        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
          disabled={loading}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@institution.edu"
          description="Use your institutional email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={loading}
        />

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>

          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password Strength:</span>
                <span className={`font-medium ${
                  passwordStrength?.score <= 1 ? 'text-error' :
                  passwordStrength?.score === 2 ? 'text-warning': 'text-success'
                }`}>
                  {passwordStrength?.label}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                  style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use 8+ characters with uppercase, lowercase, numbers, and symbols
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <Select
          label="Select Your Role"
          description="Choose the role that best describes your position"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          placeholder="Select a role"
          required
          disabled={loading}
        />

        {formData?.role === 'STUDENT' && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <Input
              label="Student ID"
              type="text"
              placeholder="Enter your student ID (e.g., STU2024001)"
              description="Your institutional student identification number"
              value={formData?.studentId}
              onChange={(e) => handleInputChange('studentId', e?.target?.value?.toUpperCase())}
              error={errors?.studentId}
              required
              disabled={loading}
            />
            <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-md">
              <p className="text-xs text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-1" />
                Valid Student IDs: STU2024001, STU2024002, STU2024003, STU2024004, STU2024005
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => window.open('/terms', '_blank')}
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => window.open('/privacy', '_blank')}
                >
                  Privacy Policy
                </button>
              </span>
            }
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName="UserPlus"
          iconPosition="left"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium transition-smooth"
              disabled={loading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;