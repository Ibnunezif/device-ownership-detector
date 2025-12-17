import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecentScansTable = ({ scans, onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredScans = scans?.filter(scan => {
    const matchesSearch = scan?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         scan?.deviceType?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         scan?.serialNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = filterStatus === 'all' || scan?.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const configs = {
      approved: { bg: 'bg-success/10', text: 'text-success', label: 'Approved' },
      denied: { bg: 'bg-error/10', text: 'text-error', label: 'Denied' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
      stolen: { bg: 'bg-error/10', text: 'text-error', label: 'Stolen' }
    };
    const config = configs?.[status] || configs?.denied;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    const icons = {
      barcode: 'Scan',
      camera: 'Camera',
      manual: 'Search'
    };
    return icons?.[method] || 'HelpCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Scans</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'approved' ? 'success' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('approved')}
          >
            Approved
          </Button>
          <Button
            variant={filterStatus === 'denied' ? 'danger' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('denied')}
          >
            Denied
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by name, device, or serial number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Student</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Device</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Serial Number</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Method</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <Icon name="Search" size={48} className="mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No scans found</p>
                </td>
              </tr>
            ) : (
              filteredScans?.map((scan) => (
                <tr key={scan?.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-sm text-foreground">
                    {scan?.timestamp?.toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={scan?.studentPhoto}
                        alt={scan?.studentPhotoAlt}
                        className="w-8 h-8 rounded-full object-cover border border-border"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{scan?.studentName}</p>
                        <p className="text-xs text-muted-foreground data-text">{scan?.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-foreground">{scan?.deviceType}</p>
                    <p className="text-xs text-muted-foreground">{scan?.brand}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground data-text">
                    {scan?.serialNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name={getMethodIcon(scan?.method)} size={16} />
                      <span className="capitalize">{scan?.method}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(scan?.status)}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(scan)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredScans?.length} of {scans?.length} scans</span>
        <span>Last 50 verifications displayed</span>
      </div>
    </div>
  );
};

export default RecentScansTable;