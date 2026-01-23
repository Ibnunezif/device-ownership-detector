import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import AlertNotificationBanner from '../../components/ui/AlertNotificationBanner';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import StolenDeviceCard from './components/StolenDeviceCard';
import StolenDeviceTable from './components/StolenDeviceTable';
import RecentScanAlert from './components/RecentScanAlert';
import FilterPanel from './components/FilterPanel';
import StatsCard from './components/StatsCard';
import UpdateStatusModal from './components/UpdateStatusModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import { getDevices, markDeviceAsStolen, verifyDevice } from '../../services/deviceService';
import { getDashboardMetrics } from '../../api/dashboardApi';

const StolenDevicesPage = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('table');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [stolenDevices, setStolenDevices] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    deviceType: 'all',
    dateFrom: ''
  });

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'layout-dashboard' },
    { label: 'Stolen Devices', icon: 'alert-triangle' }
  ];

  const normalizeDevices = (devices) =>
    (devices || []).map(d => ({
      id: d.id,
      owner: d.owner?.name || '-',
      brand: d.brand || '-',
      model: d.model || '-',
      serialNumber: d.serial_number || '-',
      recoveryStatus: (d.status || 'UNKNOWN').toUpperCase(),
      department: d.owner?.department || '-',
      deviceType: (d.device_type || '-').toLowerCase(),
      image: d.device_photo || '/placeholder-device.png',
      ownerImage: d.owner?.image || '/placeholder-avatar.png',
      theftDate: d.theftDate || null
    }));

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch stolen devices
      const devicesRes = await getDevices({ status: 'stolen' });
      const devices = normalizeDevices(devicesRes?.devices || []);
      setStolenDevices(devices);

      // Calculate device with maximum stolen count
      const stolenCountMap = devices.reduce((acc, device) => {
        const key = `${device.brand} ${device.model}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      let maxStolenDevice = { name: '-', count: 0 };
      for (const [deviceName, count] of Object.entries(stolenCountMap)) {
        if (count > maxStolenDevice.count) {
          maxStolenDevice = { name: deviceName, count };
        }
      }

      // Fetch metrics
      const metricsRes = await getDashboardMetrics();
      setStats([
        { title: 'Total Devices', value: devices.length, icon: 'smartphone', variant: 'default' },
        { title: 'Device with Max Stolen', value: maxStolenDevice.name, subtitle: `${maxStolenDevice.count} times`, icon: 'alert-triangle', variant: 'success' },
        { title: 'Total Movements', value: metricsRes?.totalMovements || 0, icon: 'activity', variant: 'warning' },
        { title: 'Security Staff', value: metricsRes?.roles?.securityStaff || 0, icon: 'shield', variant: 'error' }
      ]);

      setRecentScans(metricsRes?.recentScans || []);
    } catch (error) {
      setAlerts([{
        id: 'load-error',
        type: 'error',
        title: 'Data Load Failed',
        message: 'Unable to fetch stolen devices data.'
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (recentScans.length > 0) {
      setAlerts(recentScans.slice(0, 2).map(scan => ({
        id: `alert-${scan.id}`,
        type: 'error',
        title: 'Stolen Device Scan Alert',
        message: `${scan.deviceBrand} ${scan.deviceModel} (SN: ${scan.serialNumber}) was scanned at ${scan.location}`,
        action: { label: 'View Details', onClick: () => handleViewDetails(scan.deviceId) }
      })));
    }
  }, [recentScans]);

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handleResetFilters = () => setFilters({ search: '', status: 'all', deviceType: 'all', dateFrom: '' });
  const handleViewDetails = (deviceId) => navigate(`/device-detail?id=${deviceId}`);

  const handleUpdateStatus = async (deviceId, status, notes) => {
    try {
      await verifyDevice(deviceId, { status, notes });
      setAlerts(prev => [...prev, { id: `update-${Date.now()}`, type: 'success', title: 'Status Updated', message: `Device recovery status updated to ${status}` }]);
      await fetchData();
      setShowUpdateModal(false);
    } catch (error) {
      setAlerts(prev => [...prev, { id: `update-failed`, type: 'error', title: 'Update Failed', message: 'Could not update device status.' }]);
    }
  };

  const handleViewScans = (deviceId) => navigate(`/logs?deviceId=${deviceId}`);
  const handleQuickAction = async (actionId) => {
    try {
      switch (actionId) {
        case 'mark-stolen':
          if (!selectedDevice) return;
          await markDeviceAsStolen(selectedDevice.id);
          await fetchData();
          setSelectedDevice(null);
          setAlerts([{ id: `success-${Date.now()}`, type: 'success', title: 'Action Successful', message: 'Device marked as stolen.' }]);
          break;
        case 'export-data':
          setAlerts([{ id: `export-${Date.now()}`, type: 'success', title: 'Export Started', message: 'Stolen devices report is being generated...' }]);
          break;
        case 'send-alert':
          setAlerts([{ id: `sent-${Date.now()}`, type: 'info', title: 'Alert Sent', message: 'Security alert has been sent to all personnel' }]);
          break;
        default:
          break;
      }
    } catch (error) {
      setAlerts([{ id: `error-${Date.now()}`, type: 'error', title: 'Action Failed', message: error.message }]);
    }
  };

  const handleLogout = () => navigate('/login');

  // FILTER LOGIC
  const filteredDevices = stolenDevices.filter(device => {
    const matchesSearch =
      filters.search === '' ||
      [device?.serialNumber, device?.brand, device?.model].some(val =>
        val?.toLowerCase().includes(filters.search.toLowerCase())
      );

    const matchesStatus =
      filters.status === 'all' ||
      device?.recoveryStatus?.toUpperCase() === filters.status.toUpperCase();

    const matchesType =
      filters.deviceType === 'all' ||
      device?.deviceType?.toLowerCase() === filters.deviceType.toLowerCase();

    const matchesDate =
      !filters.dateFrom || new Date(device.theftDate) >= new Date(filters.dateFrom);

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavbar userRole="admin" onLogout={handleLogout} />
      <AlertNotificationBanner alerts={alerts} onDismiss={id => setAlerts(prev => prev.filter(a => a.id !== id))} autoHideDuration={5000} />

      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <BreadcrumbNavigation items={breadcrumbItems} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Stolen Devices</h1>
            <p className="text-base md:text-lg text-muted-foreground">Track and manage stolen device reports with recovery status</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="download" onClick={() => handleQuickAction('export-data')}>Export Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => <StatsCard key={index} {...stat} />)}
        </div>

        {recentScans.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4">Recent Scan Alerts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentScans.map(scan => <RecentScanAlert key={scan.id} scan={scan} onEscalate={() => {}} onViewDetails={handleViewDetails} />)}
            </div>
          </div>
        )}

        <FilterPanel filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />

        <div className="bg-card rounded-md shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">Stolen Devices List ({filteredDevices.length})</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode('table')} className={`p-2 rounded-md transition ${viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`} aria-label="Table view">
                <Icon name="table" size={20} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`} aria-label="Grid view">
                <Icon name="grid" size={20} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading devices...</div>
          ) : filteredDevices.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <Icon name="search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-caption font-semibold text-foreground text-lg mb-2">No devices found</h3>
              <p className="caption text-muted-foreground">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <>
              {viewMode === 'table' && <div className="hidden lg:block"><StolenDeviceTable devices={filteredDevices} onViewDetails={handleViewDetails} onUpdateStatus={handleUpdateStatus} onViewScans={handleViewScans} /></div>}
              <div className={viewMode === 'table' ? 'lg:hidden p-4 md:p-6 space-y-4' : 'p-4 md:p-6 grid grid-cols-1 gap-4'}>
                {filteredDevices.map(device => (
                  <StolenDeviceCard key={device.id} device={device} onViewDetails={handleViewDetails} onUpdateStatus={handleUpdateStatus} onViewScans={handleViewScans} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <QuickActionSidebar userRole="admin" onActionClick={handleQuickAction} />
      {showUpdateModal && selectedDevice && <UpdateStatusModal device={selectedDevice} onClose={() => setShowUpdateModal(false)} onUpdate={handleUpdateStatus} />}
    </div>
  );
};

export default StolenDevicesPage;
