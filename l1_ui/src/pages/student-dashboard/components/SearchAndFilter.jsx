import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SearchAndFilter = ({ searchTerm, onSearchChange, statusFilter, onStatusChange, brandFilter, onBrandChange }) => {
  const statusOptions = [
    { value: 'ALL', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'PENDING', label: 'PENDING' },
    { value: 'BLOCKED', label: 'Blocked' }
  ];

  const brandOptions = [
    { value: 'ALL', label: 'All Brands' },
    { value: 'Dell', label: 'Dell' },
    { value: 'HP', label: 'HP' },
    { value: 'Lenovo', label: 'Lenovo' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Asus', label: 'Asus' },
    { value: 'Acer', label: 'Acer' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-sm border border-border p-4 md:p-5 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by device name or serial number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusChange}
              placeholder="Filter by status"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              options={brandOptions}
              value={brandFilter}
              onChange={onBrandChange}
              placeholder="Filter by brand"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;