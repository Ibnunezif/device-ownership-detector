import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import WelcomeSection from './components/WelcomeSection';
import RegistrationPrompt from './components/RegistrationPrompt';
import StatusIndicator from '../../components/ui/StatusIndicator';
import { loginUser } from '../../services/authService';
import { getUserRole } from '../../utils/tokenUtils';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const role = getUserRole();
    if (role) {
      redirectBasedOnRole(role);
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'STUDENT':
        navigate('/student-dashboard', { replace: true });
        break;
      case 'SECURITY':
        navigate('/security-scan', { replace: true });
        break;
      case 'ADMIN':
        navigate('/admin-dashboard', { replace: true });
        break;
      default:
        navigate('/login', { replace: true });
    }
  };

 // ✅ Real login using backend + JWT
const handleLogin = async (formData) => {
  setLoading(true);
  setError('');

  try {
    const { token, user } = await loginUser(formData);

    setShowSuccessMessage(true);

    // Redirect based on role
    const role = user.role.toUpperCase();
    setTimeout(() => {
      redirectBasedOnRole(role);
    }, 1000);

  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.message || err.message || 'Invalid email or password'
    );
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <WelcomeSection />
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card border border-border rounded-lg shadow-elevation-lg p-6 md:p-8 lg:p-10 max-w-md mx-auto lg:max-w-none">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif mb-2">
                  Welcome Back
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Sign in to access your device management dashboard
                </p>
              </div>

              {showSuccessMessage && (
                <div className="mb-6">
                  <StatusIndicator
                    status="success"
                    title="Login Successful"
                    message="Redirecting to your dashboard..."
                  />
                </div>
              )}

              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />

              <RegistrationPrompt disabled={loading} />

              <div className="mt-6 md:mt-8 p-4 bg-muted/30 rounded-md">
                <p className="text-xs md:text-sm font-semibold text-foreground mb-2 font-caption">
                  Demo Credentials:
                </p>
                <div className="space-y-2 text-xs md:text-sm text-muted-foreground font-mono">
                  <div>
                    <span className="font-semibold">Student:</span> student@college.edu / student123
                  </div>
                  <div>
                    <span className="font-semibold">Security:</span> security@college.edu / security123
                  </div>
                  <div>
                    <span className="font-semibold">Admin:</span> admin@college.edu / admin123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;