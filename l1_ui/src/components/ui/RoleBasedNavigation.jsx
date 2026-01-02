import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigation = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      roles: ['student', 'security', 'admin']
    },
    {
      label: 'Add Device',
      path: '/add-device',
      icon: 'Plus',
      roles: ['student']
    },
    {
      label: 'Security Scan',
      path: '/security-scan',
      icon: 'Scan',
      roles: ['security', 'admin']
    },
    {
      label: 'Login',
      path: '/login',
      icon: 'LogIn',
      roles: ['guest']
    },
    {
      label: 'Register',
      path: '/register',
      icon: 'UserPlus',
      roles: ['guest']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item =>
    item?.roles?.includes(user?.role || 'guest')
  );
  console.log('RoleBasedNavigation user:', user);


  const fullName = user ? `${user.first_name} ${user.last_name}` : 'User';

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    navigate('/login', { replace: true });
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-elevation-md">
        <div className="mx-4 lg:mx-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center transition-smooth">
                  <Icon name="Shield" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-semibold text-foreground font-serif">
                  PC Owner Detector
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                {filteredNavItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-md
                      transition-smooth font-medium text-sm
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                        : 'text-foreground hover:bg-muted hover:scale-[0.97]'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{fullName}</p>
                    <p className="text-xs text-muted-foreground capitalize font-caption">
                      {user?.role}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="LogOut"
                    iconPosition="left"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1010] md:hidden">
          <div
            className="absolute inset-0 bg-background"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-card shadow-elevation-lg">
            <div className="px-4 py-6 space-y-2">
              {filteredNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-md
                    transition-smooth font-medium text-sm
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}

              {user && (
                <div className="pt-4 mt-4 border-t border-border">
                  <div className="px-4 py-3 mb-2">
                    <p className="text-sm font-medium text-foreground">{fullName}</p>
                    <p className="text-xs text-muted-foreground capitalize font-caption">
                      {user?.role}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="LogOut"
                    iconPosition="left"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleBasedNavigation;
