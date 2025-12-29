import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ children, requiredRoles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = (() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    const isPublicPath = publicPaths.includes(location.pathname);

    // ❌ Not logged in
    if (!user && !isPublicPath) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true
      });
      return;
    }

    // ❌ Logged in but wrong role
    if (user && requiredRoles.length > 0) {
      const role = user.role.toUpperCase();
      const allowedRoles = requiredRoles.map(r => r.toUpperCase());

      if (!allowedRoles.includes(role)) {
        navigate('/unauthorized', { replace: true });
        return;
      }
    }

    // ❌ Logged in but visiting login/register
    if (user && isPublicPath) {
      const role = user.role.toUpperCase();

      const dashboardPath =
        role === 'STUDENT'
          ? '/student-dashboard'
          : role === 'SECURITY'
          ? '/security-scan'
          : '/admin-dashboard';

      navigate(dashboardPath, { replace: true });
    }
  }, [user, location.pathname, navigate, requiredRoles]);

  return <>{children}</>;
};

export default AuthenticationGuard;
