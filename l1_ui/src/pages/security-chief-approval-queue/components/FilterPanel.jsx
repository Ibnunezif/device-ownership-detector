import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters, onResetFilters, onSavePreset }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' }
  ];

  const deviceTypeOptions = [
    { value: 'all', label: 'All Device Types' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'tablet', label: 'Tablet' }
  ];

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'normal', label: 'Normal' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const savedPresets = [
    { value: 'high-risk', label: 'High Risk Devices' },
    { value: 'urgent-only', label: 'Urgent Approvals' },
    { value: 'cs-department', label: 'CS Department' },
    { value: 'sla-breach', label: 'SLA Breach' }
  ];

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName, filters);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        />
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Saved Presets
            </label>
            <Select
              options={[{ value: '', label: 'Select a preset...' }, ...savedPresets]}
              value=""
              onChange={(value) => console.log('Load preset:', value)}
              placeholder="Load saved filter preset"
            />
          </div>

          <div className="border-t border-border pt-4">
            <Select
              label="Department"
              options={departmentOptions}
              value={filters?.department}
              onChange={(value) => onFilterChange('department', value)}
            />
          </div>

          <Select
            label="Device Type"
            options={deviceTypeOptions}
            value={filters?.deviceType}
            onChange={(value) => onFilterChange('deviceType', value)}
          />

          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => onFilterChange('riskLevel', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => onFilterChange('dateRange', value)}
          />

          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="From"
                type="date"
                value={filters?.dateFrom}
                onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
              />
              <Input
                label="To"
                type="date"
                value={filters?.dateTo}
                onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">
              Additional Filters
            </label>
            <Checkbox
              label="SLA Breach Only"
              checked={filters?.slaBreachOnly}
              onChange={(e) => onFilterChange('slaBreachOnly', e?.target?.checked)}
            />
            <Checkbox
              label="High Value Devices (&gt;$1000)"
              checked={filters?.highValueOnly}
              onChange={(e) => onFilterChange('highValueOnly', e?.target?.checked)}
            />
            <Checkbox
              label="Flagged Students"
              checked={filters?.flaggedOnly}
              onChange={(e) => onFilterChange('flaggedOnly', e?.target?.checked)}
            />
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            {!showSavePreset ? (
              <Button
                variant="outline"
                iconName="Save"
                fullWidth
                onClick={() => setShowSavePreset(true)}
              >
                Save Current Filters
              </Button>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Enter preset name"
                  value={presetName}
                  onChange={(e) => setPresetName(e?.target?.value)}
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setShowSavePreset(false);
                      setPresetName('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    onClick={handleSavePreset}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                iconName="RotateCcw"
                fullWidth
                onClick={onResetFilters}
              >
                Reset
              </Button>
              <Button
                variant="default"
                iconName="Check"
                fullWidth
                onClick={onApplyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;