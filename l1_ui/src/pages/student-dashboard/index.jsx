import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import StatusIndicator from '../../components/ui/StatusIndicator';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import DeviceCard from './components/DeviceCard';
import DashboardStats from './components/DashboardStats';
import SearchAndFilter from './components/SearchAndFilter';
import EmptyState from './components/EmptyState';
import ReportTheftModal from './components/ReportTheftModal';
import { getDevices } from '../../services/mYdeviceService';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user] = useState(storedUser);

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [brandFilter, setBrandFilter] = useState('ALL');

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [notification, setNotification] = useState(null);

  const breadcrumbItems = [{ label: 'Dashboard', path: '/student-dashboard' }];

  const mapBackendDeviceToUI = (device) => ({
    id: device.id,
    brand: device.brand,
    serialNumber: device.serial_number,
    model: device.model,
    status: device.status.toUpperCase(),
    deviceImage: device.device_photo,
    deviceImageAlt: device.brand,
    registeredDate: new Date(device.createdAt).toLocaleDateString()
  });

  useEffect(() => {
    document.title = 'Student Dashboard - PC Owner Detector';
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getDevices({ page: 1, limit: 10 });
        const mapped = response.devices.map(mapBackendDeviceToUI);

        setDevices(mapped);
      } catch (err) {
        console.error(err);
        setError('Failed to load devices');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      searchTerm === '' ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || device.status === statusFilter;

    const matchesBrand =
      brandFilter === 'ALL' || device.brand === brandFilter;

    return matchesSearch && matchesStatus && matchesBrand;
  });

  const calculateStats = () => ({
    total: devices.length,
    active: devices.filter(d => d.status === 'ACTIVE').length,
    stolen: devices.filter(d => d.status === 'STOLEN').length,
    blocked: devices.filter(d => d.status === 'BLOCKED').length
  });
    const handleDeviceClick = (deviceId) => {
    navigate(`/device-detail-individual?id=${deviceId}`);
  };


  return (
    <AuthenticationGuard requiredRoles={['STUDENT']}>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation user={user} />

        <main className="pt-20">
          <div className="mx-4 lg:mx-6 py-6">
            <div className="max-w-7xl mx-auto">
              <NavigationBreadcrumb items={breadcrumbItems} />

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold">My Devices</h1>
                  <p className="text-muted-foreground">
                    Manage and monitor your registered devices
                  </p>
                </div>

                <Button
                  iconName="Plus"
                  onClick={() => navigate('/add-device')}
                >
                  Add New Device
                </Button>
              </div>

              {notification && (
                <StatusIndicator {...notification} onClose={() => setNotification(null)} />
              )}

              <DashboardStats stats={calculateStats()} />

              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                brandFilter={brandFilter}
                onBrandChange={setBrandFilter}
              />

              {/* 🔁 RENDERING PRIORITY */}

              {loading && (
                <p className="text-center py-10 text-muted-foreground">
                  Loading devices...
                </p>
              )}

              {!loading && error && (
                <p className="text-center py-10 text-red-500">{error}</p>
              )}

              {!loading && !error && devices.length === 0 && (
                <EmptyState onAddDevice={() => navigate('/add-device')} />
              )}

              {!loading && !error && devices.length > 0 && filteredDevices.length === 0 && (
                <p className="text-center py-10 text-muted-foreground">
                  No devices match your filters
                </p>
              )}

              {!loading && !error && filteredDevices.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDevices.map(device => (
                    <DeviceCard
                      key={device.id}
                      device={device}
                      onViewDetails={handleDeviceClick}
                      onReportTheft={() => {
                        setSelectedDevice(device);
                        setShowReportModal(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {showReportModal && selectedDevice && (
          <ReportTheftModal
            device={selectedDevice}
            onClose={() => {
              setShowReportModal(false);
              setSelectedDevice(null);
            }}
          />
        )}
      </div>
    </AuthenticationGuard>
  );
};

export default StudentDashboard;
