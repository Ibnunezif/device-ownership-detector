import React, { useState, useEffect } from 'react';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ScannerStatusIndicator from '../../components/ui/ScannerStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuickActions from '../../components/ui/QuickActions';
import ScanningPanel from './components/ScanningPanel';
import VerificationResultsPanel from './components/VerificationResultsPanel';
import RecentScansTable from './components/RecentScansTable';
import PerformanceMetrics from './components/PerformanceMetrics';
import ShiftInformation from './components/ShiftInformation';
import BulkVerificationMode from './components/BulkVerificationMode';

const SecurityStaffScannerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scannerConnected, setScannerConnected] = useState(true);
  const [currentResult, setCurrentResult] = useState(null);
  const [bulkModeActive, setBulkModeActive] = useState(false);
  const [bulkQueue, setBulkQueue] = useState([]);
  const [recentScans, setRecentScans] = useState([
  {
    id: 1,
    timestamp: new Date(Date.now() - 120000),
    studentName: 'Sarah Johnson',
    studentId: 'STU2024001',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1228d9324-1763295791913.png",
    studentPhotoAlt: 'Professional headshot of young woman with brown hair wearing blue blazer',
    deviceType: 'Laptop',
    brand: 'Dell',
    model: 'XPS 15',
    serialNumber: 'DL2024XPS001',
    barcode: 'DEV2024001',
    method: 'barcode',
    status: 'approved',
    department: 'Computer Science',
    registrationDate: '01/15/2024',
    expiryDate: '01/15/2025',
    lastVerified: '12/17/2024 10:30 AM'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 300000),
    studentName: 'Michael Chen',
    studentId: 'STU2024002',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    studentPhotoAlt: 'Professional headshot of Asian man with black hair wearing gray suit',
    deviceType: 'MacBook Pro',
    brand: 'Apple',
    model: 'MacBook Pro 16"',
    serialNumber: 'AP2024MBP002',
    barcode: 'DEV2024002',
    method: 'camera',
    status: 'pending',
    department: 'Engineering',
    registrationDate: '12/10/2024',
    expiryDate: '12/10/2025',
    lastVerified: '12/17/2024 10:15 AM'
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 480000),
    studentName: 'Emily Rodriguez',
    studentId: 'STU2024003',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    studentPhotoAlt: 'Professional headshot of Hispanic woman with long dark hair wearing white blouse',
    deviceType: 'Laptop',
    brand: 'HP',
    model: 'Pavilion 14',
    serialNumber: 'HP2024PAV003',
    barcode: 'DEV2024003',
    method: 'manual',
    status: 'denied',
    department: 'Business',
    registrationDate: '11/20/2024',
    expiryDate: '11/20/2025',
    lastVerified: '12/17/2024 10:00 AM'
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 600000),
    studentName: 'David Kim',
    studentId: 'STU2024004',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_14b09e9c3-1763295378718.png",
    studentPhotoAlt: 'Professional headshot of Asian man with short black hair wearing navy blazer',
    deviceType: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad X1',
    serialNumber: 'LN2024TPX004',
    barcode: 'DEV2024004',
    method: 'barcode',
    status: 'approved',
    department: 'Mathematics',
    registrationDate: '10/05/2024',
    expiryDate: '10/05/2025',
    lastVerified: '12/17/2024 09:45 AM'
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 720000),
    studentName: 'Jessica Martinez',
    studentId: 'STU2024005',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
    studentPhotoAlt: 'Professional headshot of Hispanic woman with curly brown hair wearing red sweater',
    deviceType: 'MacBook Air',
    brand: 'Apple',
    model: 'MacBook Air M2',
    serialNumber: 'AP2024MBA005',
    barcode: 'DEV2024005',
    method: 'barcode',
    status: 'stolen',
    department: 'Arts',
    registrationDate: '09/15/2024',
    expiryDate: '09/15/2025',
    lastVerified: '12/17/2024 09:30 AM'
  }]
  );

  const [performanceMetrics, setPerformanceMetrics] = useState({
    scansToday: 247,
    scansPerHour: 28,
    approvalRate: 94,
    avgResponseTime: 0.8
  });

  const [shiftData, setShiftData] = useState({
    shiftName: 'Morning Shift',
    startTime: '08:00 AM',
    endTime: '04:00 PM',
    location: 'Main Gate - Building A',
    staffId: 'SEC2024001',
    timeRemaining: '3h 17m',
    status: 'active'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setScannerConnected(Math.random() > 0.05);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleScanComplete = (scanData) => {
    const mockResult = {
      ...scanData,
      id: Date.now(),
      studentName: 'Sarah Johnson',
      studentId: 'STU2024001',
      studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1228d9324-1763295791913.png",
      studentPhotoAlt: 'Professional headshot of young woman with brown hair wearing blue blazer',
      deviceType: 'Laptop',
      brand: 'Dell',
      model: 'XPS 15',
      serialNumber: 'DL2024XPS001',
      barcode: scanData?.data,
      status: Math.random() > 0.2 ? 'approved' : Math.random() > 0.5 ? 'pending' : 'denied',
      department: 'Computer Science',
      registrationDate: '01/15/2024',
      expiryDate: '01/15/2025',
      lastVerified: new Date()?.toLocaleString()
    };

    setCurrentResult(mockResult);

    if (bulkModeActive) {
      setBulkQueue((prev) => [...prev, mockResult]);
    } else {
      setRecentScans((prev) => [mockResult, ...prev?.slice(0, 49)]);
      setPerformanceMetrics((prev) => ({
        ...prev,
        scansToday: prev?.scansToday + 1,
        scansPerHour: Math.round((prev?.scansToday + 1) / 8)
      }));
    }
  };

  const handleClearResult = () => {
    setCurrentResult(null);
  };

  const handleViewDetails = (scan) => {
    setCurrentResult(scan);
  };

  const handleProcessBulkQueue = (selectedIds) => {
    const processedScans = bulkQueue?.filter((item) => selectedIds?.includes(item?.id));
    setRecentScans((prev) => [...processedScans, ...prev?.slice(0, 50 - processedScans?.length)]);
    setBulkQueue((prev) => prev?.filter((item) => !selectedIds?.includes(item?.id)));
    setPerformanceMetrics((prev) => ({
      ...prev,
      scansToday: prev?.scansToday + processedScans?.length,
      scansPerHour: Math.round((prev?.scansToday + processedScans?.length) / 8)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div
        className={`transition-all duration-200 ${
        sidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar-width'}`
        }>

        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Scanner Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Real-time device verification and monitoring
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden lg:block">
                  <ScannerStatusIndicator />
                </div>
                <NotificationCenter />
                <QuickActions context="scanner" />
              </div>
            </div>

            <ShiftInformation shiftData={shiftData} />
          </div>
        </header>

        <main className="p-6 space-y-6">
          <PerformanceMetrics metrics={performanceMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <ScanningPanel
                onScanComplete={handleScanComplete}
                scannerConnected={scannerConnected} />

            </div>
            <div className="lg:col-span-2">
              <VerificationResultsPanel
                currentResult={currentResult}
                onClear={handleClearResult} />

            </div>
          </div>

          <BulkVerificationMode
            isActive={bulkModeActive}
            onToggle={() => setBulkModeActive(!bulkModeActive)}
            queue={bulkQueue}
            onProcessQueue={handleProcessBulkQueue} />


          <RecentScansTable
            scans={recentScans}
            onViewDetails={handleViewDetails} />

        </main>

        <footer className="border-t border-border bg-card mt-12">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} Smart PC Tracker. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span>System Status: Online</span>
                <span>Last Sync: {new Date()?.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>);

};

export default SecurityStaffScannerDashboard;