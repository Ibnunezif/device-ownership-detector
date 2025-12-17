import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveScanningFeed = () => {
  const [scans, setScans] = useState([
  {
    id: 1,
    timestamp: new Date('2025-12-17T12:43:15'),
    location: 'Main Gate A',
    studentName: 'Sarah Johnson',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6185dcb-1763301626674.png",
    studentPhotoAlt: 'Professional headshot of young woman with brown hair wearing blue blazer and white shirt',
    deviceType: 'Laptop',
    deviceBrand: 'Dell XPS 15',
    serialNumber: 'DL2024XPS789456',
    verificationStatus: 'verified',
    scanMethod: 'barcode',
    securityStaff: 'Officer Martinez'
  },
  {
    id: 2,
    timestamp: new Date('2025-12-17T12:42:48'),
    location: 'Library Entrance',
    studentName: 'Michael Chen',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    studentPhotoAlt: 'Professional headshot of Asian man with black hair wearing gray suit and glasses',
    deviceType: 'Tablet',
    deviceBrand: 'iPad Pro',
    serialNumber: 'AP2024PRO123789',
    verificationStatus: 'verified',
    scanMethod: 'camera',
    securityStaff: 'Officer Thompson'
  },
  {
    id: 3,
    timestamp: new Date('2025-12-17T12:42:22'),
    location: 'Engineering Block',
    studentName: 'Emily Rodriguez',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1a587b058-1763294420326.png",
    studentPhotoAlt: 'Professional headshot of Hispanic woman with long dark hair wearing red blouse',
    deviceType: 'Laptop',
    deviceBrand: 'MacBook Pro',
    serialNumber: 'MB2024PRO456123',
    verificationStatus: 'flagged',
    scanMethod: 'manual',
    securityStaff: 'Officer Davis',
    anomalyReason: 'Device not registered in system'
  },
  {
    id: 4,
    timestamp: new Date('2025-12-17T12:41:55'),
    location: 'Main Gate B',
    studentName: 'James Wilson',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_19e63152b-1763296064836.png",
    studentPhotoAlt: 'Professional headshot of African American man with short hair wearing navy blue shirt',
    deviceType: 'Laptop',
    deviceBrand: 'HP Pavilion',
    serialNumber: 'HP2024PAV789012',
    verificationStatus: 'verified',
    scanMethod: 'barcode',
    securityStaff: 'Officer Martinez'
  },
  {
    id: 5,
    timestamp: new Date('2025-12-17T12:41:30'),
    location: 'Student Center',
    studentName: 'Aisha Patel',
    studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc96d634-1763295460493.png",
    studentPhotoAlt: 'Professional headshot of Indian woman with black hair wearing green traditional attire',
    deviceType: 'Laptop',
    deviceBrand: 'Lenovo ThinkPad',
    serialNumber: 'LN2024THK345678',
    verificationStatus: 'alert',
    scanMethod: 'barcode',
    securityStaff: 'Officer Lee',
    anomalyReason: 'Device marked as stolen in system'
  }]
  );

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const newScan = {
        id: Date.now(),
        timestamp: new Date(),
        location: ['Main Gate A', 'Main Gate B', 'Library Entrance', 'Engineering Block', 'Student Center']?.[Math.floor(Math.random() * 5)],
        studentName: 'New Student',
        studentPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1676f3645-1763292819923.png",
        studentPhotoAlt: 'Professional headshot of student in formal attire',
        deviceType: 'Laptop',
        deviceBrand: 'Generic Brand',
        serialNumber: `GN2024${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
        verificationStatus: Math.random() > 0.8 ? 'flagged' : 'verified',
        scanMethod: ['barcode', 'camera', 'manual']?.[Math.floor(Math.random() * 3)],
        securityStaff: ['Officer Martinez', 'Officer Thompson', 'Officer Davis', 'Officer Lee']?.[Math.floor(Math.random() * 4)]
      };

      setScans((prev) => [newScan, ...prev]?.slice(0, 10));
    }, 8000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Verified'
        };
      case 'flagged':
        return {
          icon: 'AlertTriangle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Flagged'
        };
      case 'alert':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Alert'
        };
      default:
        return {
          icon: 'HelpCircle',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          label: 'Unknown'
        };
    }
  };

  const getScanMethodIcon = (method) => {
    switch (method) {
      case 'barcode':
        return 'Scan';
      case 'camera':
        return 'Camera';
      case 'manual':
        return 'Keyboard';
      default:
        return 'HelpCircle';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="card-elevated bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            <Icon name="Activity" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Live Scanning Feed</h2>
            <p className="text-sm text-muted-foreground">Real-time device verification activity</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-ring ${
            autoRefresh ?
            'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`
            }>

            <Icon name={autoRefresh ? 'Pause' : 'Play'} size={16} />
            <span>{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Staff
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {scans?.map((scan) => {
              const statusConfig = getStatusConfig(scan?.verificationStatus);
              return (
                <tr key={scan?.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground data-text">
                      {formatTimestamp(scan?.timestamp)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{scan?.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={scan?.studentPhoto}
                          alt={scan?.studentPhotoAlt}
                          className="w-full h-full object-cover" />

                      </div>
                      <span className="text-sm font-medium text-foreground">{scan?.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{scan?.deviceBrand}</span>
                      <span className="text-xs text-muted-foreground data-text">{scan?.serialNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Icon name={getScanMethodIcon(scan?.scanMethod)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground capitalize">{scan?.scanMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig?.bgColor}`}>
                      <Icon name={statusConfig?.icon} size={14} className={statusConfig?.color} />
                      <span className={`text-xs font-medium ${statusConfig?.color}`}>
                        {statusConfig?.label}
                      </span>
                    </div>
                    {scan?.anomalyReason &&
                    <p className="text-xs text-error mt-1">{scan?.anomalyReason}</p>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{scan?.securityStaff}</span>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </div>);

};

export default LiveScanningFeed;