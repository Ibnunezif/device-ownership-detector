import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApprovalQueueTable = ({ 
  registrations, 
  selectedIds, 
  onSelectionChange, 
  onViewDetails,
  onApprove,
  onReject,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'urgent':
        return 'AlertTriangle';
      case 'flagged':
        return 'Flag';
      case 'verified':
        return 'CheckCircle';
      default:
        return 'Clock';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(registrations?.map(r => r?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds?.filter(selectedId => selectedId !== id));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  const allSelected = registrations?.length > 0 && selectedIds?.length === registrations?.length;
  const someSelected = selectedIds?.length > 0 && selectedIds?.length < registrations?.length;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  aria-label="Select all registrations"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('student')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  Student Details
                  <Icon name={getSortIcon('student')} size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('device')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  Device Information
                  <Icon name={getSortIcon('device')} size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('department')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  Department
                  <Icon name={getSortIcon('department')} size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('submitted')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  Submitted
                  <Icon name={getSortIcon('submitted')} size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('risk')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  Risk Level
                  <Icon name={getSortIcon('risk')} size={16} />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {registrations?.map((registration) => (
              <tr
                key={registration?.id}
                onMouseEnter={() => setHoveredRow(registration?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`transition-colors duration-200 ${
                  selectedIds?.includes(registration?.id)
                    ? 'bg-accent/5'
                    : hoveredRow === registration?.id
                    ? 'bg-muted/30' :''
                }`}
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedIds?.includes(registration?.id)}
                    onChange={(e) => handleSelectRow(registration?.id, e?.target?.checked)}
                    aria-label={`Select registration ${registration?.registrationId}`}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={registration?.studentPhoto}
                      alt={registration?.studentPhotoAlt}
                      className="w-10 h-10 rounded-full object-cover border-2 border-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {registration?.studentName}
                        </p>
                        {registration?.status === 'urgent' && (
                          <Icon name={getStatusIcon(registration?.status)} size={14} className="text-error" />
                        )}
                        {registration?.status === 'flagged' && (
                          <Icon name={getStatusIcon(registration?.status)} size={14} className="text-warning" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground data-text">
                        {registration?.studentId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {registration?.deviceBrand} {registration?.deviceModel}
                    </p>
                    <p className="text-xs text-muted-foreground data-text">
                      S/N: {registration?.serialNumber}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-foreground">{registration?.department}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-foreground">
                    {formatTimestamp(registration?.submittedAt)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getRiskBadgeColor(registration?.riskLevel)}`}>
                    {registration?.riskLevel?.charAt(0)?.toUpperCase() + registration?.riskLevel?.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(registration)}
                      aria-label="View details"
                    >
                      View
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      iconName="Check"
                      onClick={() => onApprove([registration?.id])}
                      aria-label="Approve registration"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      iconName="X"
                      onClick={() => onReject([registration?.id])}
                      aria-label="Reject registration"
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {registrations?.length === 0 && (
        <div className="px-4 py-12 text-center">
          <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No pending registrations found</p>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueueTable;