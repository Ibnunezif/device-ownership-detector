import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ children, user, requiredRoles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    const isPublicPath = publicPaths?.includes(location?.pathname);

    if (!user && !isPublicPath) {
      navigate('/login', { 
        state: { from: location?.pathname },
        replace: true 
      });
      return;
    }

    if (user && requiredRoles?.length > 0) {
      const hasRequiredRole = requiredRoles?.includes(user?.role);
      
      if (!hasRequiredRole) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }

    if (user && isPublicPath) {
      const dashboardPath = user?.role === 'student' ?'/student-dashboard' 
        : user?.role === 'security' ?'/security-scan' :'/student-dashboard';
      
      navigate(dashboardPath, { replace: true });
    }
  }, [user, location?.pathname, navigate, requiredRoles]);

  return <>{children}</>;
};

export default AuthenticationGuard;