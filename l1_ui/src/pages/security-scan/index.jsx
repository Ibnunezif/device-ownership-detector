import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import QRScanner from './components/QRScanner';
import ManualLookup from './components/ManualLookup';
import ScanResult from './components/ScanResult';
import ScanHistory from './components/ScanHistory';
import { scanDevice } from '../../services/scanService';

const SecurityScan = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user] = useState(storedUser);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // TODO: replace with real selected gate from UI or user profile
  const gateId = '694d948d01b7342d46a4f1f1';

  const breadcrumbItems = [
    { label: 'Security', path: '/security-scan' },
    { label: 'Device Scan', path: '/security-scan' },
  ];

  const handleScanSuccess = async (barcode, scanMethod = 'BARCODE') => {
    if (!barcode) return;

    setError('');
    setLoading(true);

    try {
      const result = await scanDevice({
        barcode,
        gateId,
        scanMethod, // 'BARCODE' | 'CAMERA' | 'MANUAL'
      });

      setScanResult(result);
      setScanHistory((prev) => [result, ...prev].slice(0, 10));
    } catch (err) {
      console.error('Scan error:', err);
      const status = err?.response?.status;

      const message =
        status === 403
          ? 'Access denied. Only security staff can scan devices.'
          : status === 404
          ? 'Device not found.'
          : status === 400
          ? err?.response?.data?.message ||
            'Validation failed. Check barcode or scan method.'
          : 'Unable to scan device. Please try again.';

      setError(message);
      setScanResult(null);
    } finally {
      setLoading(false);
      setIsScanning(false);
    }
  };

  const handleClearResult = () => {
    setScanResult(null);
    setError('');
  };

  useEffect(() => {
    document.title = 'Security Scan - Device Owner Detector';
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

            {error && (
              <div className="mb-4 bg-error/10 border border-error/30 text-error text-sm rounded-md px-4 py-3">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
              <div className="space-y-4 md:space-y-6">
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  isScanning={isScanning}
                  setIsScanning={setIsScanning}
                  loading={loading}
                />

                <ManualLookup
                  onLookupSuccess={handleScanSuccess}
                  loading={loading}
                />
              </div>

              <div className="space-y-4 md:space-y-6">
                {scanResult ? (
                  <ScanResult
                    result={scanResult}
                    onClearResult={handleClearResult}
                  />
                ) : (
                  <div className="bg-card rounded-lg shadow-elevation-md p-8 md:p-12 lg:p-16 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      Ready to Scan
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Start camera or enter barcode to verify device
                    </p>
                  </div>
                )}
              </div>
            </div>

            <ScanHistory history={scanHistory} />
          </div>
        </main>
      </div>
    </AuthenticationGuard>
  );
};

export default SecurityScan;
