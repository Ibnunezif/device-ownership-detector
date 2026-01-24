import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'STOLEN', label: 'Stolen' },
    { value: 'PENDING', label: 'Recovered' },
    { value: 'BLOCKED', label: 'Blocked' },
    { value: 'APPROVED', label: 'Approved' }
  ];

  const deviceTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'phone', label: 'Phone' }
  ];

  return (
    <div className="bg-card rounded-md shadow-warm p-4 md:p-6 mb-6">
      <h3 className="font-caption font-semibold text-foreground text-base md:text-lg mb-4">
        Filter Stolen Devices
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by serial number..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Select status"
        />

        <Select
          options={deviceTypeOptions}
          value={filters?.deviceType}
          onChange={(value) => onFilterChange('deviceType', value)}
          placeholder="Select device type"
        />

        <Input
          type="date"
          placeholder="Theft date from"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;