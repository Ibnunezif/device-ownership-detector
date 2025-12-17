import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AdvancedSearchToolbar = ({ onSearch, onFilterChange, onSavePreset, savedPresets }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({
    deviceType: '',
    status: '',
    department: '',
    dateFrom: '',
    dateTo: '',
    verificationStatus: ''
  });

  const deviceTypeOptions = [
    { value: '', label: 'All Device Types' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'smartphone', label: 'Smartphone' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'lost', label: 'Lost' },
    { value: 'stolen', label: 'Stolen' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Business', label: 'Business' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Sciences', label: 'Sciences' }
  ];

  const verificationOptions = [
    { value: '', label: 'All Verification Status' },
    { value: 'verified-today', label: 'Verified Today' },
    { value: 'verified-week', label: 'Verified This Week' },
    { value: 'verified-month', label: 'Verified This Month' },
    { value: 'not-verified-30', label: 'Not Verified 30+ Days' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      deviceType: '',
      status: '',
      department: '',
      dateFrom: '',
      dateTo: '',
      verificationStatus: ''
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  const handleSavePreset = () => {
    const presetName = prompt('Enter preset name:');
    if (presetName) {
      onSavePreset({ name: presetName, filters, searchQuery });
    }
  };

  return (
    <div className="bg-card border border-border rounded-md p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by device ID, serial number, student name, or student ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName={isAdvancedOpen ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Advanced Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleSavePreset}
            iconName="Save"
          >
            Save Preset
          </Button>
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            iconName="X"
          >
            Clear
          </Button>
        </div>
      </div>
      {isAdvancedOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            label="Device Type"
            options={deviceTypeOptions}
            value={filters?.deviceType}
            onChange={(value) => handleFilterChange('deviceType', value)}
          />
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          <Select
            label="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => handleFilterChange('department', value)}
          />
          <Input
            type="date"
            label="Registration From"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            type="date"
            label="Registration To"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
          <Select
            label="Verification Status"
            options={verificationOptions}
            value={filters?.verificationStatus}
            onChange={(value) => handleFilterChange('verificationStatus', value)}
          />
        </div>
      )}
      {savedPresets && savedPresets?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Saved Presets:</span>
          {savedPresets?.map((preset, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => {
                setFilters(preset?.filters);
                setSearchQuery(preset?.searchQuery);
                onFilterChange(preset?.filters);
                onSearch(preset?.searchQuery);
              }}
            >
              {preset?.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchToolbar;