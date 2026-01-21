import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import AlertNotificationBanner from '../../components/ui/AlertNotificationBanner';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import MetricCard from './components/MetricCard';
import DeviceTable from './components/DeviceTable';
import FilterControls from './components/FilterControls';
import BulkActionBar from './components/BulkActionBar';
import Button from '../../components/ui/Button';
import { getDevices,markDeviceAsStolen, verifyDevice, updateDevice  } from '../../services/deviceService';
import { getDashboardMetrics } from '../../api/dashboardApi';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    brand: 'all',
    ownerType: 'all',
    dateFrom: '',
    dateTo: ''
  });


  const breadcrumbItems = [
  { label: 'Home', path: '/admin-dashboard', icon: 'Home' },
  { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' }];


const [devices, setDevices] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [metrics, setMetrics] = useState([]);
const [metricsLoading, setMetricsLoading] = useState(false);


const mapBackendDeviceToUI = (device) => ({
  id: device.id,

  ownerName: device.owner?.name || 'Unknown',
  ownerEmail: device.owner?.email || 'N/A',
  ownerAvatar: device.owner?.image || null,
  ownerAvatarAlt: device.owner?.name || 'Owner avatar',

  ownerType: device.owner?.department ? 'student' : 'staff',

  brand: device.brand,
  serialNumber: device.serial_number,

  deviceImage: device.device_photo || null,
  deviceImageAlt: device.brand,

  status: device.status.toUpperCase(),

  lastScan: '—',
  lastScanLocation: '—',

  registeredDate: new Date(device.createdAt).toLocaleDateString()
});

const mapMetricsToCards = (metric) => [
  {
    title: 'Total Devices',
    value: metric.totalDevices,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Registered devices in the system',
    icon: 'Laptop',         // Laptop icon represents devices/computers
    iconColor: 'var(--color-primary)'
  },
  {
    title: 'Total Gates',
    value: metric.totalGates,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Active access gates',
    icon: 'LogIn',          // LogIn icon can represent gates/access points
    iconColor: 'var(--color-success)'
  },
  {
    title: 'Total Libraries',
    value: metric.totalLibraries,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Active libraries',
    icon: 'BookOpen',       // BookOpen icon represents libraries
    iconColor: 'var(--color-secondary)'
  },
  {
    title: 'Total Movements',
    value: metric.totalMovements,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Device movements in/out',
    icon: 'Repeat',         // Repeat / Swap icon represents movements/transactions
    iconColor: 'var(--color-accent)'
  },
  {
    title: 'Students',
    value: metric.roles?.students ?? 0,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Registered student users',
    icon: 'User',           // Single user represents students
    iconColor: 'var(--color-primary)'
  },
  {
    title: 'Admins',
    value: metric.roles?.admins ?? 0,
    trend: 'up',
    trendValue: '(--)%',
    description: 'System administrators',
    icon: 'Shield',         // Shield icon represents admin/security role
    iconColor: 'var(--color-warning)'
  },
  {
    title: 'Security Staff',
    value: metric.roles?.securityStaff ?? 0,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Security personnel',
    icon: 'Users',          // Users icon represents a team / staff
    iconColor: 'var(--color-success)'
  },
  {
    title: 'Security Chiefs',
    value: metric.roles?.securityChiefs ?? 0,
    trend: 'up',
    trendValue: '(--)%',
    description: 'Security chiefs / managers',
    icon: 'Star',           // Star icon represents leadership or chief role
    iconColor: 'var(--color-error)'
  }
];






useEffect(() => {
   const fetchMetrics = async () => {
    try {
      const metricData = await getDashboardMetrics(); // returns object
      const mappedMetrics = mapMetricsToCards(metricData); // convert to array
      setMetrics(mappedMetrics);
    } catch (err) {
      console.error(err);
    }
  };
  fetchMetrics();
  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError('');

      const { devices } = await getDevices({
        page: 1,
        limit: 10
      });

      const mappedDevices = devices.map(mapBackendDeviceToUI);
      setDevices(mappedDevices);

      const stolenDevices = mappedDevices.filter(d => d.status === 'STOLEN');
      if (stolenDevices.length > 0) {
        setAlerts([
          {
            id: 'alert-1',
            type: 'error',
            title: 'Stolen Device Alert',
            message: `${stolenDevices.length} stolen ${
              stolenDevices.length === 1 ? 'device' : 'devices'
            } detected. Immediate action required.`,
            action: {
              label: 'View Stolen Devices',
              onClick: () => navigate('/stolen-devices')
            }
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  fetchDevices();
}, [navigate]);


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      brand: 'all',
      ownerType: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

const filteredDevices = devices?.filter((device) => {
  if (filters?.search) {
    const searchLower = filters?.search.toLowerCase();
    const matchesSearch =
      device?.ownerName?.toLowerCase()?.includes(searchLower) ||
      device?.ownerEmail?.toLowerCase()?.includes(searchLower) ||
      device?.serialNumber?.toLowerCase()?.includes(searchLower) ||
      device?.brand?.toLowerCase()?.includes(searchLower);
    if (!matchesSearch) return false;
  }

  if (filters?.status !== 'all' && device?.status.toLowerCase() !== filters?.status.toLowerCase()) return false;
  if (filters?.brand !== 'all' && device?.brand.toLowerCase() !== filters?.brand.toLowerCase()) return false;
  if (filters?.ownerType !== 'all' && device?.ownerType.toLowerCase() !== filters?.ownerType.toLowerCase()) return false;

  return true;
});


  const handleDeviceClick = (deviceId) => {
    navigate(`/device-detail?id=${deviceId}`);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on ${selectedDevices?.length} devices`);
    setAlerts([
    {
      id: `bulk-${Date.now()}`,
      type: 'success',
      title: 'Bulk Action Completed',
      message: `Successfully performed ${action} on ${selectedDevices?.length} ${selectedDevices?.length === 1 ? 'device' : 'devices'}.`
    }]
    );
    setSelectedDevices([]);
  };

  const handleQuickAction = (actionId) => {
    const actionRoutes = {
      'mark-stolen': '/stolen-devices',
      'verify-device': '/admin-dashboard',
      'export-data': '/admin-dashboard',
      'send-alert': '/admin-dashboard'
    };

    if (actionRoutes?.[actionId]) {
      navigate(actionRoutes?.[actionId]);
    }
  };

 const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');

  // Optional: clear everything
  localStorage.clear();

  navigate('/login', { replace: true });
};


  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter((alert) => alert?.id !== alertId));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavbar userRole="admin" onLogout={handleLogout} />
      <AlertNotificationBanner alerts={alerts} onDismiss={handleDismissAlert} />
      <QuickActionSidebar userRole="admin" onActionClick={handleQuickAction} />
      <main className="pt-16 lg:pr-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <BreadcrumbNavigation items={breadcrumbItems} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive device management and system statistics
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                iconName="FileText"
                onClick={() => navigate('/logs')}>

                View Logs
              </Button>
              <Button
                variant="default"
                iconName="Download"
                onClick={() => console.log('Export report')}>

                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsLoading && (
            <p className="text-center text-muted-foreground">
              Loading dashboard metrics...
            </p>
          )}

            {metrics?.map((metric, index) =>
            <MetricCard key={index} {...metric} />
            )}
          </div>

          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            resultCount={filteredDevices?.length} />


          <div className="mb-20 lg:mb-6">
            {loading && (
  <p className="text-center py-6 text-muted-foreground">
    Loading devices...
  </p>
)}

{error && (
  <p className="text-center py-6 text-error">
    {error}
  </p>
)}

            <DeviceTable
              devices={filteredDevices}
              onDeviceClick={handleDeviceClick}
              selectedDevices={selectedDevices}
              onSelectionChange={setSelectedDevices}
              onBulkAction={handleBulkAction} />
          </div>

          <BulkActionBar
            selectedCount={selectedDevices?.length}
            onAction={handleBulkAction}
            onClearSelection={() => setSelectedDevices([])} />

        </div>
      </main>
    </div>);

};

export default AdminDashboard;