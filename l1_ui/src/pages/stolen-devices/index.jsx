import React, { useState, useEffect } from 'react';
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

import { getDevices,markDeviceAsStolen, verifyDevice, blockDevice  } from '../../services/deviceService';
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
  { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
  { label: 'Stolen Devices', icon: 'AlertTriangle' }];


  useEffect(() => {
    if (recentScans?.length > 0) {
      const newAlerts = recentScans?.slice(0, 2)?.map((scan) => ({
        id: `alert-${scan?.id}`,
        type: 'error',
        title: 'Stolen Device Scan Alert',
        message: `${scan?.deviceBrand} ${scan?.deviceModel} (SN: ${scan?.serialNumber}) was scanned at ${scan?.location}`,
        action: {
          label: 'View Details',
          onClick: () => handleViewDetails(scan?.deviceId)
        }
      }));
      setAlerts(newAlerts);
    }
  }, []);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Get stolen devices
      const devicesRes = await getDevices({ status: 'stolen' });
      console.log(devicesRes.devices)
      const normalizedDevices = devicesRes.devices.map(d => ({
          id: d.id,
          owner: d.owner?.name,
          brand: d.brand,
          model: d.model,
          serialNumber: d.serial_number,
          recoveryStatus: d.status,
          department: d.owner?.department,
          deviceType: d.device_type,
          image: d.device_photo,
          ownerImage: d.owner?.image
        }));
        setStolenDevices(normalizedDevices);


      // 2. Get dashboard metrics
      const metricsRes = await getDashboardMetrics();      
          setStats([
          {
            title: 'Total Devices',
            value: metricsRes.totalDevices,
            icon: 'Smartphone',
            variant: 'default'
          },
          {
            title: 'Total Users',
            value: metricsRes.totalUsers,
            icon: 'Users',
            variant: 'success'
          },
          {
            title: 'Total Movements',
            value: metricsRes.totalMovements,
            icon: 'Activity',
            variant: 'warning'
          },
          {
            title: 'Security Staff',
            value: metricsRes.roles.securityStaff,
            icon: 'Shield',
            variant: 'error'
          }
          ]);


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
  };

  fetchData();
}, []);


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      deviceType: 'all',
      dateFrom: ''
    });
  };

  const handleViewDetails = (deviceId) => {
    navigate(`/device-detail?id=${deviceId}`);
  };

const handleUpdateStatus = async (deviceId, status, notes) => {
  try {
    await verifyDevice(deviceId, { status, notes });

    setAlerts(prev => [
      ...prev,
      {
        id: `update-${Date.now()}`,
        type: 'success',
        title: 'Status Updated',
        message: `Device recovery status updated to ${status}`
      }
    ]);

    const refreshed = await getDevices({ status: 'stolen' });
    setStolenDevices(refreshed.devices);

    setShowUpdateModal(false);
  } catch (error) {
    setAlerts(prev => [
      ...prev,
      {
        id: `update-failed`,
        type: 'error',
        title: 'Update Failed',
        message: 'Could not update device status.'
      }
    ]);
  }
};



  const handleViewScans = (deviceId) => {
    navigate(`/logs?deviceId=${deviceId}`);
  };

  const handleEscalate = (scanId) => {
    const newAlert = {
      id: `escalated-${Date.now()}`,
      type: 'warning',
      title: 'Alert Escalated',
      message: 'Security team has been notified and will respond immediately.'
    };
    setAlerts((prev) => [...prev, newAlert]);
  };
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'mark-stolen':navigate('/admin-dashboard');
        break;
      case 'export-data':
        const exportAlert = {
          id: `export-${Date.now()}`,
          type: 'success',
          title: 'Export Started',
          message: 'Stolen devices report is being generated...'
        };
        setAlerts((prev) => [...prev, exportAlert]);
        break;
      case 'send-alert':
        const alertSent = {
          id: `sent-${Date.now()}`,
          type: 'info',
          title: 'Alert Sent',
          message: 'Security alert has been sent to all personnel'
        };
        setAlerts((prev) => [...prev, alertSent]);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const filteredDevices = stolenDevices?.filter((device) => {
    const matchesSearch = device?.serial_number?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
    device?.brand?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
    device?.model?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesStatus = filters?.status === 'all' || device?.recoveryStatus === filters?.status;
    const matchesDate = !filters?.dateFrom || new Date(device.theftDate) >= new Date(filters.dateFrom);

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavbar userRole="admin" onLogout={handleLogout} />
      <AlertNotificationBanner
        alerts={alerts}
        onDismiss={(id) => setAlerts((prev) => prev?.filter((a) => a?.id !== id))}
        autoHideDuration={5000} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <BreadcrumbNavigation items={breadcrumbItems} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Stolen Devices
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Track and manage stolen device reports with recovery status
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => handleQuickAction('export-data')}>

                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats?.map((stat, index) =>
            <StatsCard key={index} {...stat} />
            )}
          </div>

          {recentScans?.length > 0 &&
          <div className="mb-6 md:mb-8">
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4">
                Recent Scan Alerts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recentScans?.map((scan) =>
              <RecentScanAlert
                key={scan?.id}
                scan={scan}
                onEscalate={handleEscalate}
                onViewDetails={handleViewDetails} />

              )}
              </div>
            </div>
          }

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters} />


          <div className="bg-card rounded-md shadow-warm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                Stolen Devices List ({filteredDevices?.length})
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-smooth ${
                  viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                  }
                  aria-label="Table view">

                  <Icon name="Table" size={20} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-smooth ${
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                  }
                  aria-label="Grid view">

                  <Icon name="Grid" size={20} />
                </button>
              </div>
            </div>

            {filteredDevices?.length === 0 ?
            <div className="p-8 md:p-12 text-center">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-caption font-semibold text-foreground text-lg mb-2">
                  No devices found
                </h3>
                <p className="caption text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div> :

            <>
                {viewMode === 'table' ?
              <div className="hidden lg:block">
                    <StolenDeviceTable
                  devices={filteredDevices}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={handleUpdateStatus}
                  onViewScans={handleViewScans} />

                  </div> :
              null}
                {viewMode === 'grid' || viewMode === 'table' ?
              <div className={viewMode === 'table' ? 'lg:hidden p-4 md:p-6 space-y-4' : 'p-4 md:p-6 grid grid-cols-1 gap-4'}>
                    {filteredDevices?.map((device) =>
                <StolenDeviceCard
                  key={device?.id}
                  device={device}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={handleUpdateStatus}
                  onViewScans={handleViewScans} />

                )}
                  </div> :
              null}
              </>
            }
          </div>
        </div>
      </div>
      <QuickActionSidebar
        userRole="admin"
        onActionClick={handleQuickAction} />

      {showUpdateModal && selectedDevice &&
      <UpdateStatusModal
        device={selectedDevice}
        onClose={() => setShowUpdateModal(false)}
        onUpdate={handleStatusUpdate} />

      }
    </div>);

};

export default StolenDevicesPage;