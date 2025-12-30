import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import QRScanner from './components/QRScanner';
import ManualLookup from './components/ManualLookup';
import ScanResult from './components/ScanResult';
import ScanHistory from './components/ScanHistory';

const SecurityScan = () => {
 const storedUser = JSON.parse(localStorage.getItem('user'));
 const [user, setUser] = useState(storedUser);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const mockDevices = [
  {
    serialNumber: 'SNAB12CD34EF',
    brand: 'Dell',
    status: 'ACTIVE',
    deviceImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c410f9f3-1765654512131.png",
    deviceImageAlt: 'Silver Dell laptop with black keyboard on white desk with modern office background',
    ownerName: 'Sarah Johnson',
    studentId: 'STU2024001',
    ownerEmail: 'sarah.johnson@student.edu',
    ownerPhone: '+1 (555) 123-4567',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ce68c-1763293773878.png",
    ownerAvatarAlt: 'Professional headshot of young woman with long brown hair wearing blue blazer',
    registeredAt: '2024-09-15T10:30:00Z'
  },
  {
    serialNumber: 'SNGH56IJ78KL',
    brand: 'HP',
    status: 'STOLEN',
    deviceImage: "https://images.unsplash.com/photo-1586353833664-f3312a1129b3",
    deviceImageAlt: 'Black HP laptop with silver logo on dark wooden desk in dimly lit room',
    ownerName: 'Michael Chen',
    studentId: 'STU2024002',
    ownerEmail: 'michael.chen@student.edu',
    ownerPhone: '+1 (555) 234-5678',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_148d49299-1763293795533.png",
    ownerAvatarAlt: 'Professional headshot of Asian man with short black hair wearing navy suit',
    registeredAt: '2024-08-20T14:15:00Z'
  },
  {
    serialNumber: 'SNMN90OP12QR',
    brand: 'Lenovo',
    status: 'ACTIVE',
    deviceImage: "https://images.unsplash.com/photo-1497171090531-fa6297066879",
    deviceImageAlt: 'Gray Lenovo ThinkPad laptop with red trackpoint on modern white desk with coffee cup',
    ownerName: 'Emily Rodriguez',
    studentId: 'STU2024003',
    ownerEmail: 'emily.rodriguez@student.edu',
    ownerPhone: '+1 (555) 345-6789',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1402ef150-1763296666361.png",
    ownerAvatarAlt: 'Professional headshot of Hispanic woman with curly dark hair wearing white blouse',
    registeredAt: '2024-10-05T09:45:00Z'
  },
  {
    serialNumber: 'SNST34UV56WX',
    brand: 'Apple',
    status: 'BLOCKED',
    deviceImage: "https://images.unsplash.com/photo-1610567177617-501bb5264cb1",
    deviceImageAlt: 'Silver MacBook Pro with glowing Apple logo on minimalist white desk setup',
    ownerName: 'David Kim',
    studentId: 'STU2024004',
    ownerEmail: 'david.kim@student.edu',
    ownerPhone: '+1 (555) 456-7890',
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a41f60e-1763294900500.png",
    ownerAvatarAlt: 'Professional headshot of young Asian man with glasses wearing gray sweater',
    registeredAt: '2024-07-12T16:20:00Z'
  }];


  const breadcrumbItems = [
  { label: 'Security', path: '/security-scan' },
  { label: 'Device Scan', path: '/security-scan' }];


  const handleScanSuccess = (serialNumber) => {
    const device = mockDevices?.find((d) => d?.serialNumber === serialNumber) || {
      ...mockDevices?.[Math.floor(Math.random() * mockDevices?.length)],
      serialNumber: serialNumber
    };

    const result = {
      ...device,
      timestamp: new Date()?.toISOString()
    };

    setScanResult(result);
    setScanHistory((prev) => [result, ...prev]?.slice(0, 10));
  };

  const handleClearResult = () => {
    setScanResult(null);
  };

  useEffect(() => {
    document.title = 'Security Scan - PC Owner Detector';
  }, []);

  return (
    <AuthenticationGuard requiredRoles={['SECURITY_STAFF']}>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation user={user} />
        
        <main className="pt-20">
          <div className="mx-4 lg:mx-6 py-4 md:py-6 lg:py-8">
            <NavigationBreadcrumb items={breadcrumbItems} />

            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Device Security Scan
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Verify device ownership and security status through QR scanning or manual lookup
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
              <div className="space-y-4 md:space-y-6">
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  isScanning={isScanning}
                  setIsScanning={setIsScanning} />

                <ManualLookup onLookupSuccess={handleScanSuccess} />
              </div>

              <div className="space-y-4 md:space-y-6">
                {scanResult ?
                <ScanResult result={scanResult} onClearResult={handleClearResult} /> :

                <div className="bg-card rounded-lg shadow-elevation-md p-8 md:p-12 lg:p-16 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">

                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />

                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      Ready to Scan
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Start camera or enter serial number to verify device
                    </p>
                  </div>
                }
              </div>
            </div>

            <ScanHistory history={scanHistory} />
          </div>
        </main>
      </div>
    </AuthenticationGuard>);

};

export default SecurityScan;