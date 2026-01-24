import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import AlertNotificationBanner from '../../components/ui/AlertNotificationBanner';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import DeviceInfoCard from './components/DeviceInfoCard';
import ScanTimeline from './components/ScanTimeline';
import StatusManagementPanel from './components/StatusManagementPanel';
// import PhotoGallery from './components/PhotoGallery';
import QRCodeGenerator from './components/QRCodeGenerator';
import OwnerCommunication from './components/OwnerCommunication';
import { getDeviceByIndividual } from '../../services/deviceService';

const DeviceDetailIndividual = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole] = useState(JSON.parse(localStorage.getItem('user')).role);
  const [alerts, setAlerts] = useState([]);
  const [deviceData, setDeviceData] = useState(null);

  const deviceId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const data = await getDeviceByIndividual(deviceId);

        setDeviceData({
          deviceId: data?.id,
          brand: data?.brand,
          model: data?.model,
          serialNumber: data?.serial_number,
          status: data?.status,
          image: data?.device_photo,
          imageAlt: data?.device_type,
          ownerName: data?.owner?.name,
          ownerEmail: data?.owner?.email,
          ownerPhone: data?.owner?.phone,
          registeredDate: data?.createdAt,
          department: data?.owner?.department,
          barcode: data?.barcode,
        });
      } catch (err) {
        console.error(err);
        setAlerts([
          {
            id: Date.now(),
            type: 'error',
            message: 'Failed to fetch device details'
          }
        ]);
      }
    };

    if (deviceId) fetchDevice();
  }, [deviceId]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
    { label: 'Device Management', path: '/admin-dashboard' },
    { label: 'Device Details' }
  ];

  const handleLogout = () =>{ 
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login')
  };

  const handleStatusUpdate = (updateData) => {
    const newAlert = {
      id: Date.now(),
      type: updateData?.newStatus === 'STOLEN' ? 'error' : 'success',
      title: 'Status Updated',
      message: `Device status changed to ${updateData?.newStatus}. ${updateData?.justification}`
    };

    setAlerts([newAlert]);

    setDeviceData((prev) => ({
      ...prev,
      status: updateData?.newStatus,
      notes: `${prev?.notes}\n\nStatus Update (${new Date().toLocaleString()}): ${updateData?.justification}`
    }));
  };

  const handleQuickAction = (actionId) => {
    const actionMessages = {
      'mark-stolen': { type: 'warning', message: 'Opening status management panel to mark device as stolen' },
      'verify-device': { type: 'success', message: 'Device verification process initiated' },
      'export-data': { type: 'info', message: 'Exporting device data and scan history' },
      'send-alert': { type: 'info', message: 'Opening communication panel to send alert' }
    };

    const action = actionMessages[actionId];
    if (action) {
      setAlerts([{ id: Date.now(), type: action.type, message: action.message }]);
    }
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  if (!deviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading device details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavbar userRole={userRole} onLogout={handleLogout} />
      <AlertNotificationBanner alerts={alerts} onDismiss={handleDismissAlert} autoHideDuration={5000} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <BreadcrumbNavigation items={breadcrumbItems} maxItems={3} />

          <div className="space-y-6 lg:space-y-8">
            <DeviceInfoCard device={deviceData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <StatusManagementPanel
                currentStatus={deviceData.status}
                onStatusUpdate={handleStatusUpdate}
              />

              <QRCodeGenerator
                deviceId={deviceData?.deviceId}
                deviceInfo={{barcode: deviceData?.barcode, brand: deviceData?.brand, model: deviceData?.model, ownerName: deviceData?.ownerName }}
              />
            </div>
          </div>
        </div>
      </div>

      <QuickActionSidebar
        userRole={userRole}
        onActionClick={handleQuickAction}
        position="right"
      />
    </div>
  );
};

export default DeviceDetailIndividual;
