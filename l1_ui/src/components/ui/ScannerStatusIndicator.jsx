import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ScannerStatusIndicator = ({ className = '' }) => {
  const [status, setStatus] = useState('connected');
  const [scanCount, setScanCount] = useState(0);
  const [lastScanTime, setLastScanTime] = useState(null);

  useEffect(() => {
    const checkScannerConnection = () => {
      const isConnected = Math.random() > 0.1;
      setStatus(isConnected ? 'connected' : 'disconnected');
    };

    const interval = setInterval(checkScannerConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleManualScan = () => {
    setStatus('scanning');
    setScanCount(prev => prev + 1);
    setLastScanTime(new Date());
    
    setTimeout(() => {
      setStatus('connected');
    }, 1500);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: 'Wifi',
          text: 'Scanner Ready',
          className: 'scanner-status-indicator connected'
        };
      case 'disconnected':
        return {
          icon: 'WifiOff',
          text: 'Scanner Offline',
          className: 'scanner-status-indicator disconnected'
        };
      case 'scanning':
        return {
          icon: 'Scan',
          text: 'Scanning...',
          className: 'scanner-status-indicator scanning'
        };
      default:
        return {
          icon: 'Wifi',
          text: 'Unknown',
          className: 'scanner-status-indicator'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className={config?.className}>
        <Icon name={config?.icon} size={16} />
        <span>{config?.text}</span>
      </div>
      {status === 'connected' && (
        <button
          onClick={handleManualScan}
          className="w-full px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 focus-ring"
        >
          <Icon name="Scan" size={16} className="inline mr-2" />
          Manual Scan
        </button>
      )}
      {scanCount > 0 && (
        <div className="text-xs text-muted-foreground px-2">
          <div>Total Scans: {scanCount}</div>
          {lastScanTime && (
            <div>Last: {lastScanTime?.toLocaleTimeString()}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScannerStatusIndicator;