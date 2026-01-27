import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import { registerUser } from '../../../services/authService.js';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    university_id: '',
    department: '',
    batch: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [statusMessage, setStatusMessage] = useState(null);

  const roleOptions = [
    { value: 'student', label: 'Student', description: 'Register your devices for security' },
    { value: 'security', label: 'Security Personnel', description: 'Scan and verify devices' },
    { value: 'admin', label: 'Administrator', description: 'Manage devices and users' }
  ];

  const departmentOptions = [
    'Software Engineering',
    'Computer Science',
    'Information Systems',
    'Electrical Engineering'
  ];

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-error' },
      1: { label: 'Weak', color: 'bg-error' },
      2: { label: 'Fair', color: 'bg-warning' },
      3: { label: 'Good', color: 'bg-success' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };
    return { score, ...strengthMap[score] };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.edu\.et$/i;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));

    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    if (!formData.university_id.trim()) newErrors.university_id = 'University ID is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.batch.trim()) newErrors.batch = 'Batch is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid university email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (passwordStrength.score < 2) newErrors.password = 'Password is too weak';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatusMessage({ type: 'error', title: 'Validation Error', message: 'Please correct the errors in the form.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // Prepare payload according to backend structure
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone_number: formData.phone_number.trim(),
        university_id: formData.university_id.trim(),
        department: formData.department.trim(),
        batch: formData.batch.trim(),
        email: formData.email.trim(),
        password: formData.password
      };

      await registerUser(payload);

      setStatusMessage({ type: 'success', title: 'Registration Successful', message: `Welcome ${formData.first_name}! Your account has been created.` });
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      setStatusMessage({
        type: 'error',
        title: 'Registration Failed',
        message: error.response?.data?.message || 'Unable to register. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {statusMessage && <StatusIndicator status={statusMessage.type} title={statusMessage.title} message={statusMessage.message} onClose={() => setStatusMessage(null)} />}

        <Input label="First Name" type="text" placeholder="Enter first name" value={formData.first_name} onChange={e => handleInputChange('first_name', e.target.value)} error={errors.first_name} required disabled={loading} />

        <Input label="Last Name" type="text" placeholder="Enter last name" value={formData.last_name} onChange={e => handleInputChange('last_name', e.target.value)} error={errors.last_name} required disabled={loading} />

        <Input label="Phone Number" type="text" placeholder="+251912345678" value={formData.phone_number} onChange={e => handleInputChange('phone_number', e.target.value)} error={errors.phone_number} required disabled={loading} />

        <Input label="University ID" type="text" placeholder="ugr/30026/15" value={formData.university_id} onChange={e => handleInputChange('university_id', e.target.value)} error={errors.university_id} required disabled={loading} />

        <Select label="Department" options={departmentOptions.map(d => ({ value: d, label: d }))} value={formData.department} onChange={value => handleInputChange('department', value)} error={errors.department} placeholder="Select department" required disabled={loading} />

        <Input label="Batch" type="text" placeholder="2025" value={formData.batch} onChange={e => handleInputChange('batch', e.target.value)} error={errors.batch} required disabled={loading} />

        <Input label="University Email" type="email" placeholder="your.email@astu.edu.et" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} error={errors.email} required disabled={loading} />

        <div className="relative">
          <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create password" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} error={errors.password} required disabled={loading} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {formData.password && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Password Strength:</span>
              <span className={`font-medium ${passwordStrength.score <= 1 ? 'text-error' : passwordStrength.score === 2 ? 'text-warning' : 'text-success'}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: `${(passwordStrength.score / 5) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="relative">
          <Input label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} error={errors.confirmPassword} required disabled={loading} />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <Checkbox label={<span className="text-sm">I agree to the <button type="button" className="text-primary hover:underline font-medium" onClick={() => window.open('/terms', '_blank')}>Terms of Service</button> and <button type="button" className="text-primary hover:underline font-medium" onClick={() => window.open('/privacy', '_blank')}>Privacy Policy</button></span>} checked={formData.agreeToTerms} onChange={e => handleInputChange('agreeToTerms', e.target.checked)} error={errors.agreeToTerms} required disabled={loading} />

        <Button type="submit" variant="default" size="lg" fullWidth loading={loading} iconName="UserPlus" iconPosition="left" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/login')} className="text-primary hover:underline font-medium transition-smooth" disabled={loading}>Sign in here</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
