import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  if (!items || items?.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        {items?.map((item, index) => {
          const isLast = index === items?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-muted-foreground"
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className="
                    text-muted-foreground hover:text-foreground
                    transition-smooth font-medium
                    hover:underline focus:outline-none
                    focus:ring-2 focus:ring-ring focus:ring-offset-2
                    rounded px-1
                  "
                >
                  {item?.label}
                </button>
              ) : (
                <span 
                  className={`
                    font-medium px-1
                    ${isLast 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                    }
                  `}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;