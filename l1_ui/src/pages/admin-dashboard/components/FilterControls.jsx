import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFilterChange, onReset, resultCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'PENDING', label: 'PENDING' },
    { value: 'BLOCKED', label: 'Blocked' }
  ];

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'Dell', label: 'Dell' },
    { value: 'HP', label: 'HP' },
    { value: 'Lenovo', label: 'Lenovo' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Asus', label: 'Asus' },
    { value: 'Acer', label: 'Acer' }
  ];

  const ownerTypeOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'student', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'staff', label: 'Staff' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-caption font-semibold text-foreground text-base md:text-lg">
          Filter Devices
        </h3>
        <div className="flex items-center gap-2">
          <span className="caption text-muted-foreground">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by name, email, serial..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={brandOptions}
          value={filters?.brand}
          onChange={(value) => onFilterChange('brand', value)}
          placeholder="Filter by brand"
        />

        <Select
          options={ownerTypeOptions}
          value={filters?.ownerType}
          onChange={(value) => onFilterChange('ownerType', value)}
          placeholder="Filter by owner type"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          type="date"
          label="From Date"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="To Date"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;