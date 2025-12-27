import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ items = [], maxItems = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  if (!items || items?.length === 0) return null;

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const shouldTruncate = items?.length > maxItems;
  const displayItems = shouldTruncate && !isExpanded
    ? [items?.[0], { label: '...', isEllipsis: true }, ...items?.slice(-1)]
    : items;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {displayItems?.map((item, index) => {
          const isLast = index === displayItems?.length - 1;
          const isEllipsis = item?.isEllipsis;

          return (
            <li key={index} className="flex items-center gap-2">
              {isEllipsis ? (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="px-2 py-1 text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
                  aria-label="Show all breadcrumb items"
                >
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              ) : (
                <>
                  {item?.icon && (
                    <Icon 
                      name={item?.icon} 
                      size={16} 
                      className={isLast ? 'text-foreground' : 'text-muted-foreground'}
                    />
                  )}
                  {isLast ? (
                    <span className="font-caption font-semibold text-foreground">
                      {item?.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item?.path)}
                      className="font-caption text-muted-foreground hover:text-foreground transition-smooth hover:underline"
                    >
                      {item?.label}
                    </button>
                  )}
                </>
              )}
              {!isLast && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;