import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import AlertNotificationBanner from '../../components/ui/AlertNotificationBanner';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import DeviceInfoCard from './components/DeviceInfoCard';
import ScanTimeline from './components/ScanTimeline';
import StatusManagementPanel from './components/StatusManagementPanel';
import PhotoGallery from './components/PhotoGallery';
import QRCodeGenerator from './components/QRCodeGenerator';
import OwnerCommunication from './components/OwnerCommunication';
import { getDeviceById } from '../../services/deviceService';

const DeviceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole] = useState('admin');
  const [alerts, setAlerts] = useState([]);
  const [deviceData, setDeviceData] = useState(null);
  const deviceId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const forDefault=null;
     const mockDevice = {
    deviceId: "DEV-2024-8472",
    brand: "Dell",
    model: "XPS 15 9520",
    serialNumber: "SN8472KL9234",
    status: "ACTIVE",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1700e7724-1764665273480.png",
    imageAlt: "Silver Dell XPS 15 laptop with sleek aluminum chassis and thin bezels on dark wooden desk",
    ownerName: "Sarah Mitchell",
    ownerEmail: "sarah.mitchell@university.edu",
    ownerPhone: "+1 (555) 234-5678",
    registeredDate: "2024-09-15T10:30:00Z",
    lastLocation: "Engineering Building, Room 304",
    notes: "Device registered during fall semester orientation. Owner is a Computer Science senior with clean security record.",
    photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1667250572758-abde0af79b88",
      alt: "Front view of silver Dell XPS 15 laptop showing full keyboard and touchpad on wooden surface",
      caption: "Front view - Primary identification photo",
      uploadedDate: "2024-09-15T10:30:00Z",
      isPrimary: true
    },
    {
      id: 2,
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1033f5cac-1765659974448.png",
      alt: "Close-up of Dell laptop serial number sticker showing alphanumeric code on bottom panel",
      caption: "Serial number verification",
      uploadedDate: "2024-09-15T10:32:00Z",
      isPrimary: false
    },
    {
      id: 3,
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1700e7724-1764665273480.png",
      alt: "Side profile of Dell XPS laptop showing slim design and port configuration on aluminum body",
      caption: "Side profile showing ports",
      uploadedDate: "2024-09-15T10:33:00Z",
      isPrimary: false
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1595873881249-41665315cbe6",
      alt: "Dell laptop screen displaying Windows desktop with university wallpaper and application icons",
      caption: "Screen and display condition",
      uploadedDate: "2024-09-15T10:35:00Z",
      isPrimary: false
    }],

    scans: [
    {
      id: 1,
      result: "VERIFIED",
      scannerName: "Officer James Wilson",
      scannerId: "SEC-2847",
      scannerRole: "Security Personnel",
      location: "Main Library Entrance",
      timestamp: "2024-12-27T09:15:00Z",
      scanMethod: "QR Code Scan",
      verificationTime: "2.3 seconds",
      notes: "Routine security check. Device ownership verified successfully. No issues detected.",
      actionTaken: "Granted building access"
    },
    {
      id: 2,
      result: "VERIFIED",
      scannerName: "Officer Maria Garcia",
      scannerId: "SEC-2891",
      scannerRole: "Security Personnel",
      location: "Student Center, 2nd Floor",
      timestamp: "2024-12-26T14:30:00Z",
      scanMethod: "Manual ID Entry",
      verificationTime: "5.1 seconds",
      notes: "Device left unattended briefly. Owner returned during verification process.",
      actionTaken: "Reminded owner about security protocols"
    },
    {
      id: 3,
      result: "CLEARED",
      scannerName: "Officer Robert Chen",
      scannerId: "SEC-2756",
      scannerRole: "Security Personnel",
      location: "Engineering Building Lobby",
      timestamp: "2024-12-25T11:45:00Z",
      scanMethod: "QR Code Scan",
      verificationTime: "1.8 seconds",
      notes: "Random security sweep. All documentation in order.",
      actionTaken: null
    },
    {
      id: 4,
      result: "VERIFIED",
      scannerName: "Officer David Thompson",
      scannerId: "SEC-2634",
      scannerRole: "Security Personnel",
      location: "Campus Cafeteria",
      timestamp: "2024-12-24T16:20:00Z",
      scanMethod: "QR Code Scan",
      verificationTime: "2.1 seconds",
      notes: "Evening patrol verification. Device in active use by registered owner.",
      actionTaken: null
    },
    {
      id: 5,
      result: "VERIFIED",
      scannerName: "Officer Jennifer Lee",
      scannerId: "SEC-2912",
      scannerRole: "Security Personnel",
      location: "Computer Lab A-203",
      timestamp: "2024-12-23T10:00:00Z",
      scanMethod: "Manual ID Entry",
      verificationTime: "4.5 seconds",
      notes: "Lab access verification. Student ID cross-referenced with device registration.",
      actionTaken: "Lab access granted"
    }],

    notificationHistory: [
    {
      id: 1,
      type: "email",
      message: "Device registration confirmed - Welcome to PC Owner Detector system",
      timestamp: "2024-09-15T10:35:00Z"
    },
    {
      id: 2,
      type: "sms",
      message: "Security scan completed at Main Library - Status: VERIFIED",
      timestamp: "2024-12-27T09:16:00Z"
    },
    {
      id: 3,
      type: "email",
      message: "Monthly security report: Your device has been scanned 5 times this month",
      timestamp: "2024-12-01T08:00:00Z"
    },
    {
      id: 4,
      type: "notification",
      message: "Reminder: Update your contact information if changed",
      timestamp: "2024-11-15T12:00:00Z"
    }]

  };
    const fetchDevice = async () => {
      try {
        const data = await getDeviceById(deviceId); // using your service
        // Map backend response to your component structure
        setDeviceData({
          deviceId: data?.deviceId ?? mockDevice.deviceId,
          brand: data?.brand ?? mockDevice.brand,
          model: data?.model ?? mockDevice.model,
          serialNumber: data?.serialNumber ?? mockDevice.serialNumber ,
          status: data?.status ?? mockDevice.status,
          image: data?.deviceImage ?? mockDevice.image,
          imageAlt: data?.deviceImageAlt ?? mockDevice.imageAlt,
          ownerName: data?.owner?.name ?? mockDevice.ownerName,
          ownerEmail: data?.owner?.email ?? mockDevice.ownerEmail,
          ownerPhone: data?.owner?.phone ?? mockDevice.ownerPhone,
          registeredDate: data?.createdAt ?? mockDevice.registeredDate,
          lastLocation: data?.lastLocation ?? mockDevice.lastLocation,
          notes: data?.notes ?? mockDevice.notes,
          photos: data?.photos?.length
            ? data.photos.map(photo => ({
                id: photo.id ?? Date.now(),
                url: photo.url ?? 'in future',
                alt: photo.alt ?? 'in future',
                caption: photo.caption ?? 'in future',
                uploadedDate: photo.uploadedDate ?? 'in future',
                isPrimary: photo.isPrimary ?? false
              }))
            : [],
          scans: data?.scans?.length
            ? data.scans.map(scan => ({
                id: scan.id ?? Date.now(),
                result: scan.result ?? 'in future',
                scannerName: scan.scannerName ?? 'in future',
                scannerId: scan.scannerId ?? 'in future',
                scannerRole: scan.scannerRole ?? 'in future',
                location: scan.location ?? 'in future',
                timestamp: scan.timestamp ?? 'in future',
                scanMethod: scan.scanMethod ?? 'in future',
                verificationTime: scan.verificationTime ?? 'in future',
                notes: scan.notes ?? 'in future',
                actionTaken: scan.actionTaken ?? null
              }))
            : [],
          notificationHistory: data?.notificationHistory?.length
            ? data.notificationHistory.map(note => ({
                id: note.id ?? Date.now(),
                type: note.type ?? 'in future',
                message: note.message ?? 'in future',
                timestamp: note.timestamp ?? 'in future'
              }))
            : []
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

  const handleLogout = () => navigate('/login');

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
      notes: `${prev?.notes}\n\nStatus Update (${new Date()?.toLocaleString()}): ${updateData?.justification}`
    }));
  };

  const handleQuickAction = (actionId) => {
    const actionMessages = {
      'mark-stolen': { type: 'warning', message: 'Opening status management panel to mark device as stolen' },
      'verify-device': { type: 'success', message: 'Device verification process initiated' },
      'export-data': { type: 'info', message: 'Exporting device data and scan history' },
      'send-alert': { type: 'info', message: 'Opening communication panel to send alert' }
    };

    const action = actionMessages?.[actionId];
    if (action) {
      setAlerts([{ id: Date.now(), type: action?.type, message: action?.message }]);
    }
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter((alert) => alert?.id !== alertId));
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
              <StatusManagementPanel currentStatus={deviceData?.status} onStatusUpdate={handleStatusUpdate} />
              <QRCodeGenerator
                deviceId={deviceData?.deviceId}
                deviceInfo={{ brand: deviceData?.brand, model: deviceData?.model, ownerName: deviceData?.ownerName }}
              />
            </div>

            <PhotoGallery photos={deviceData?.photos} />
            <ScanTimeline scans={deviceData?.scans} />
            <OwnerCommunication
              ownerInfo={{ name: deviceData?.ownerName, email: deviceData?.ownerEmail, phone: deviceData?.ownerPhone }}
              notificationHistory={deviceData?.notificationHistory}
            />
          </div>
        </div>
      </div>
      <QuickActionSidebar userRole={userRole} onActionClick={handleQuickAction} position="right" />
    </div>
  );
};

export default DeviceDetail;
