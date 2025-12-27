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

const StolenDevicesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    deviceType: 'all',
    dateFrom: ''
  });

  const stolenDevices = [
  {
    id: 1,
    brand: "Dell",
    model: "XPS 15",
    serialNumber: "DL9876543210",
    owner: "Sarah Johnson",
    theftDate: "2025-12-15T10:30:00",
    lastLocation: "Library Building, 3rd Floor",
    scanAttempts: 3,
    recoveryStatus: "STOLEN",
    image: "https://images.unsplash.com/photo-1595859318210-4d8019c7d5d5",
    imageAlt: "Silver Dell XPS 15 laptop with black keyboard on white desk surface"
  },
  {
    id: 2,
    brand: "Apple",
    model: "MacBook Pro 16",
    serialNumber: "AP1234567890",
    owner: "Michael Chen",
    theftDate: "2025-12-20T14:15:00",
    lastLocation: "Student Center, Cafeteria",
    scanAttempts: 1,
    recoveryStatus: "INVESTIGATING",
    image: "https://images.unsplash.com/photo-1624505134344-a0a96e34e2c2",
    imageAlt: "Space gray Apple MacBook Pro with Touch Bar on wooden table"
  },
  {
    id: 3,
    brand: "HP",
    model: "Pavilion 14",
    serialNumber: "HP5678901234",
    owner: "Emily Rodriguez",
    theftDate: "2025-12-10T09:00:00",
    lastLocation: "Engineering Lab, Room 205",
    scanAttempts: 5,
    recoveryStatus: "STOLEN",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e78196af-1765649770574.png",
    imageAlt: "Silver HP Pavilion laptop with blue screen display on office desk"
  },
  {
    id: 4,
    brand: "Lenovo",
    model: "ThinkPad X1",
    serialNumber: "LN3456789012",
    owner: "David Kim",
    theftDate: "2025-11-28T16:45:00",
    lastLocation: "Parking Lot B",
    scanAttempts: 0,
    recoveryStatus: "RECOVERED",
    image: "https://images.unsplash.com/photo-1497171090531-fa6297066879",
    imageAlt: "Black Lenovo ThinkPad laptop with red trackpoint on conference table"
  },
  {
    id: 5,
    brand: "Asus",
    model: "ROG Strix",
    serialNumber: "AS7890123456",
    owner: "Jessica Martinez",
    theftDate: "2025-12-22T11:20:00",
    lastLocation: "Computer Science Building",
    scanAttempts: 2,
    recoveryStatus: "STOLEN",
    image: "https://images.unsplash.com/photo-1566626372918-e8ab16497256",
    imageAlt: "Black Asus ROG gaming laptop with RGB keyboard lighting on gaming desk"
  }];


  const recentScans = [
  {
    id: 1,
    deviceId: 1,
    deviceBrand: "Dell",
    deviceModel: "XPS 15",
    serialNumber: "DL9876543210",
    location: "Main Gate Security Checkpoint",
    scannedBy: "Officer James Wilson",
    timestamp: "2025-12-27T12:15:00"
  },
  {
    id: 2,
    deviceId: 3,
    deviceBrand: "HP",
    deviceModel: "Pavilion 14",
    serialNumber: "HP5678901234",
    location: "Dormitory Entrance",
    scannedBy: "Officer Maria Garcia",
    timestamp: "2025-12-27T11:30:00"
  }];


  const stats = [
  {
    title: "Total Stolen Devices",
    value: "12",
    icon: "AlertTriangle",
    variant: "error",
    trend: "up",
    trendValue: "+3"
  },
  {
    title: "Recovered This Month",
    value: "4",
    icon: "CheckCircle",
    variant: "success",
    trend: "down",
    trendValue: "-1"
  },
  {
    title: "Under Investigation",
    value: "5",
    icon: "Search",
    variant: "warning"
  },
  {
    title: "Recent Scan Attempts",
    value: "18",
    icon: "Activity",
    variant: "default",
    trend: "up",
    trendValue: "+6"
  }];


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

  const handleUpdateStatus = (deviceId) => {
    const device = stolenDevices?.find((d) => d?.id === deviceId);
    setSelectedDevice(device);
    setShowUpdateModal(true);
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

  const handleStatusUpdate = (deviceId, status, notes) => {
    const successAlert = {
      id: `update-${Date.now()}`,
      type: 'success',
      title: 'Status Updated',
      message: `Device recovery status has been updated to ${status}`
    };
    setAlerts((prev) => [...prev, successAlert]);
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
    const matchesSearch = device?.serialNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
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