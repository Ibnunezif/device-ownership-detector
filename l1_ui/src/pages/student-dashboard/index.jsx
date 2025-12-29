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

const StudentDashboard = () => {
  const navigate = useNavigate();
const storedUser = JSON.parse(localStorage.getItem('user'));
const [user, setUser] = useState(storedUser);

  const [devices, setDevices] = useState([
  {
    id: 'DEV001',
    name: 'Dell XPS 15',
    brand: 'Dell',
    serialNumber: 'DXP15-2024-A7B9C',
    status: 'ACTIVE',
    image: "https://images.unsplash.com/photo-1518472803163-8d3a9e90792c",
    imageAlt: 'Silver Dell XPS 15 laptop with sleek aluminum body and black keyboard on modern white desk',
    registeredDate: '12/15/2024'
  },
  {
    id: 'DEV002',
    name: 'HP Pavilion Gaming',
    brand: 'HP',
    serialNumber: 'HPG-2024-X9Y2Z',
    status: 'ACTIVE',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a792af35-1765150928204.png",
    imageAlt: 'Black HP Pavilion gaming laptop with red backlit keyboard and angular design on gaming desk',
    registeredDate: '12/18/2024'
  },
  {
    id: 'DEV003',
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    serialNumber: 'MBP14-2024-K5L8M',
    status: 'STOLEN',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18056ae00-1766575101422.png",
    imageAlt: 'Space gray MacBook Pro 14 inch with Touch Bar and minimalist design on wooden workspace',
    registeredDate: '12/10/2024'
  },
  {
    id: 'DEV004',
    name: 'Lenovo ThinkPad X1',
    brand: 'Lenovo',
    serialNumber: 'LTX1-2024-P3Q6R',
    status: 'ACTIVE',
    image: "https://images.unsplash.com/photo-1497171090531-fa6297066879",
    imageAlt: 'Black Lenovo ThinkPad X1 Carbon with matte finish and red TrackPoint on professional office desk',
    registeredDate: '12/20/2024'
  },
  {
    id: 'DEV005',
    name: 'Asus ROG Strix',
    brand: 'Asus',
    serialNumber: 'AROG-2024-T7U9V',
    status: 'BLOCKED',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a792af35-1765150928204.png",
    imageAlt: 'Black Asus ROG Strix gaming laptop with RGB lighting and aggressive angular design on gaming setup',
    registeredDate: '12/22/2024'
  }]
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [notification, setNotification] = useState(null);

  const breadcrumbItems = [
  { label: 'Dashboard', path: '/student-dashboard' }];


  const calculateStats = () => {
    return {
      total: devices?.length,
      active: devices?.filter((d) => d?.status === 'ACTIVE')?.length,
      stolen: devices?.filter((d) => d?.status === 'STOLEN')?.length,
      blocked: devices?.filter((d) => d?.status === 'BLOCKED')?.length
    };
  };

  const filteredDevices = devices?.filter((device) => {
    const matchesSearch = searchTerm === '' ||
    device?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    device?.serialNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || device?.status === statusFilter;
    const matchesBrand = brandFilter === 'ALL' || device?.brand === brandFilter;

    return matchesSearch && matchesStatus && matchesBrand;
  });

  const handleViewDetails = (deviceId) => {
    navigate(`/device/${deviceId}`);
  };

  const handleReportTheft = (deviceId) => {
    const device = devices?.find((d) => d?.id === deviceId);
    setSelectedDevice(device);
    setShowReportModal(true);
  };

  const handleConfirmTheftReport = async (reportData) => {
    setDevices((prevDevices) =>
    prevDevices?.map((device) =>
    device?.id === reportData?.deviceId ?
    { ...device, status: 'STOLEN' } :
    device
    )
    );

    setShowReportModal(false);
    setSelectedDevice(null);

    setNotification({
      status: 'success',
      title: 'Theft Report Submitted',
      message: 'Your device has been marked as stolen. Security personnel have been notified and will begin monitoring for this device.'
    });

    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddDevice = () => {
    navigate('/add-device');
  };

  useEffect(() => {
    document.title = 'Student Dashboard - PC Owner Detector';
  }, []);

  return (
    <AuthenticationGuard requiredRoles={['STUDENT']}>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation user={user} />

        <main className="pt-20">
          <div className="mx-4 lg:mx-6 py-6 md:py-8">
            <div className="max-w-7xl mx-auto">
              <NavigationBreadcrumb items={breadcrumbItems} />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    My Devices
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Manage and monitor your registered devices
                  </p>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddDevice}>

                  Add New Device
                </Button>
              </div>

              {notification &&
              <div className="mb-6">
                  <StatusIndicator
                  status={notification?.status}
                  title={notification?.title}
                  message={notification?.message}
                  onClose={() => setNotification(null)} />

                </div>
              }

              <div className="mb-6 md:mb-8">
                <DashboardStats stats={calculateStats()} />
              </div>

              <div className="mb-6">
                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                  brandFilter={brandFilter}
                  onBrandChange={setBrandFilter} />

              </div>

              {filteredDevices?.length === 0 && devices?.length === 0 ?
              <EmptyState onAddDevice={handleAddDevice} /> :
              filteredDevices?.length === 0 ?
              <div className="bg-card rounded-lg shadow-elevation-sm border border-border p-8 md:p-12 text-center">
                  <div className="bg-muted/50 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    No Devices Found
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div> :

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                  {filteredDevices?.map((device) =>
                <DeviceCard
                  key={device?.id}
                  device={device}
                  onViewDetails={handleViewDetails}
                  onReportTheft={handleReportTheft} />

                )}
                </div>
              }
            </div>
          </div>
        </main>

        {showReportModal && selectedDevice &&
        <ReportTheftModal
          device={selectedDevice}
          onClose={() => {
            setShowReportModal(false);
            setSelectedDevice(null);
          }}
          onConfirm={handleConfirmTheftReport} />

        }
      </div>
    </AuthenticationGuard>);

};

export default StudentDashboard;