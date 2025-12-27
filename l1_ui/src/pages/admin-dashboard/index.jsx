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


  const mockDevices = [
  {
    id: 'DEV001',
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah.johnson@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ce68c-1763293773878.png",
    ownerAvatarAlt: 'Professional headshot of young woman with brown hair wearing blue blazer smiling at camera',
    ownerType: 'student',
    brand: 'Dell',
    serialNumber: 'DL-2024-XPS-8901',
    deviceImage: "https://images.unsplash.com/photo-1595859318210-4d8019c7d5d5",
    deviceImageAlt: 'Silver Dell XPS laptop with black keyboard on white desk surface',
    status: 'ACTIVE',
    lastScan: '12/26/2025 3:45 PM',
    lastScanLocation: 'Library - Floor 2',
    registeredDate: '09/15/2025'
  },
  {
    id: 'DEV002',
    ownerName: 'Michael Chen',
    ownerEmail: 'michael.chen@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    ownerAvatarAlt: 'Professional headshot of Asian man with short black hair wearing gray suit and glasses',
    ownerType: 'student',
    brand: 'HP',
    serialNumber: 'HP-2024-ENVY-4567',
    deviceImage: "https://images.unsplash.com/photo-1682019654168-f1fe9968a50d",
    deviceImageAlt: 'Black HP Envy laptop with silver trim open on wooden desk',
    status: 'STOLEN',
    lastScan: '12/20/2025 10:30 AM',
    lastScanLocation: 'Main Gate - Exit',
    registeredDate: '09/10/2025'
  },
  {
    id: 'DEV003',
    ownerName: 'Emily Rodriguez',
    ownerEmail: 'emily.rodriguez@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    ownerAvatarAlt: 'Professional headshot of Hispanic woman with long dark hair wearing white blouse',
    ownerType: 'faculty',
    brand: 'Lenovo',
    serialNumber: 'LN-2024-THINK-2345',
    deviceImage: "https://images.unsplash.com/photo-1497171090531-fa6297066879",
    deviceImageAlt: 'Black Lenovo ThinkPad laptop with red trackpoint on office desk',
    status: 'ACTIVE',
    lastScan: '12/27/2025 9:15 AM',
    lastScanLocation: 'Computer Lab - Building A',
    registeredDate: '08/25/2025'
  },
  {
    id: 'DEV004',
    ownerName: 'James Wilson',
    ownerEmail: 'james.wilson@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a184de25-1763292715446.png",
    ownerAvatarAlt: 'Professional headshot of African American man with short hair wearing navy suit',
    ownerType: 'student',
    brand: 'Apple',
    serialNumber: 'AP-2024-MBPR-6789',
    deviceImage: "https://images.unsplash.com/photo-1599647058468-cba74d8e3f35",
    deviceImageAlt: 'Silver MacBook Pro with glowing Apple logo on dark background',
    status: 'BLOCKED',
    lastScan: '12/25/2025 2:20 PM',
    lastScanLocation: 'Cafeteria - Main Building',
    registeredDate: '09/05/2025'
  },
  {
    id: 'DEV005',
    ownerName: 'Sophia Martinez',
    ownerEmail: 'sophia.martinez@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c56710a9-1763300346689.png",
    ownerAvatarAlt: 'Professional headshot of young woman with curly brown hair wearing green sweater',
    ownerType: 'student',
    brand: 'Asus',
    serialNumber: 'AS-2024-VIVO-3456',
    deviceImage: "https://images.unsplash.com/photo-1612499810017-b70bf0de17b9",
    deviceImageAlt: 'Gray Asus VivoBook laptop with colorful screen display on white surface',
    status: 'ACTIVE',
    lastScan: '12/27/2025 11:00 AM',
    lastScanLocation: 'Student Center - Lounge',
    registeredDate: '09/20/2025'
  },
  {
    id: 'DEV006',
    ownerName: 'David Thompson',
    ownerEmail: 'david.thompson@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0329d19-1763292144023.png",
    ownerAvatarAlt: 'Professional headshot of Caucasian man with blonde hair wearing checkered shirt',
    ownerType: 'staff',
    brand: 'Acer',
    serialNumber: 'AC-2024-ASPIRE-7890',
    deviceImage: "https://images.unsplash.com/photo-1645454516446-3d1f16fe95e5",
    deviceImageAlt: 'Black Acer Aspire laptop with blue backlit keyboard on dark desk',
    status: 'ACTIVE',
    lastScan: '12/26/2025 4:30 PM',
    lastScanLocation: 'Administration Office',
    registeredDate: '08/30/2025'
  },
  {
    id: 'DEV007',
    ownerName: 'Olivia Brown',
    ownerEmail: 'olivia.brown@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_134763617-1763296028962.png",
    ownerAvatarAlt: 'Professional headshot of woman with red hair wearing black turtleneck',
    ownerType: 'student',
    brand: 'Dell',
    serialNumber: 'DL-2024-INSP-1234',
    deviceImage: "https://images.unsplash.com/photo-1682426526537-9c80bcd1fd8b",
    deviceImageAlt: 'Silver Dell Inspiron laptop with touchscreen display on modern desk',
    status: 'STOLEN',
    lastScan: '12/22/2025 1:15 PM',
    lastScanLocation: 'Parking Lot - Zone B',
    registeredDate: '09/12/2025'
  },
  {
    id: 'DEV008',
    ownerName: 'Ethan Davis',
    ownerEmail: 'ethan.davis@university.edu',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13b6f8537-1763295903462.png",
    ownerAvatarAlt: 'Professional headshot of young man with brown hair wearing casual blue shirt',
    ownerType: 'student',
    brand: 'HP',
    serialNumber: 'HP-2024-PAVIL-5678',
    deviceImage: "https://images.unsplash.com/photo-1691973171931-b095945dc8e8",
    deviceImageAlt: 'Silver HP Pavilion laptop with colorful display on wooden table',
    status: 'ACTIVE',
    lastScan: '12/27/2025 8:45 AM',
    lastScanLocation: 'Lecture Hall - Room 301',
    registeredDate: '09/18/2025'
  }];


  const metrics = [
  {
    title: 'Total Devices',
    value: '1,247',
    trend: 'up',
    trendValue: '+12.5%',
    description: 'vs last month',
    icon: 'Laptop',
    iconColor: 'var(--color-primary)'
  },
  {
    title: 'Active Devices',
    value: '1,189',
    trend: 'up',
    trendValue: '+8.3%',
    description: 'currently active',
    icon: 'CheckCircle',
    iconColor: 'var(--color-success)'
  },
  {
    title: 'Stolen Alerts',
    value: '23',
    trend: 'down',
    trendValue: '-15.2%',
    description: 'vs last month',
    icon: 'AlertTriangle',
    iconColor: 'var(--color-error)'
  },
  {
    title: 'Recent Scans',
    value: '456',
    trend: 'up',
    trendValue: '+23.1%',
    description: 'last 24 hours',
    icon: 'Scan',
    iconColor: 'var(--color-secondary)'
  }];


  useEffect(() => {
    const stolenDevices = mockDevices?.filter((d) => d?.status === 'STOLEN');
    if (stolenDevices?.length > 0) {
      setAlerts([
      {
        id: 'alert-1',
        type: 'error',
        title: 'Stolen Device Alert',
        message: `${stolenDevices?.length} stolen ${stolenDevices?.length === 1 ? 'device' : 'devices'} detected. Immediate action required.`,
        action: {
          label: 'View Stolen Devices',
          onClick: () => navigate('/stolen-devices')
        }
      }]
      );
    }
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

  const filteredDevices = mockDevices?.filter((device) => {
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      const matchesSearch =
      device?.ownerName?.toLowerCase()?.includes(searchLower) ||
      device?.ownerEmail?.toLowerCase()?.includes(searchLower) ||
      device?.serialNumber?.toLowerCase()?.includes(searchLower) ||
      device?.brand?.toLowerCase()?.includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (filters?.status !== 'all' && device?.status !== filters?.status) return false;
    if (filters?.brand !== 'all' && device?.brand !== filters?.brand) return false;
    if (filters?.ownerType !== 'all' && device?.ownerType !== filters?.ownerType) return false;
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
  // localStorage.clear();

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