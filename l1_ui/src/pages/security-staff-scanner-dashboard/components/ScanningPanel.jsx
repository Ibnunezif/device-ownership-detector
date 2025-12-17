import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ScanningPanel = ({ onScanComplete, scannerConnected }) => {
  const [scanMode, setScanMode] = useState('barcode');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [manualSearchQuery, setManualSearchQuery] = useState('');
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scanMode === 'barcode' && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [scanMode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'F1') {
        e?.preventDefault();
        setScanMode('manual');
      } else if (e?.key === 'F2') {
        e?.preventDefault();
        setScanMode('camera');
      } else if (e?.key === 'Escape') {
        e?.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (scanMode === 'camera' && !cameraActive) {
      startCamera();
    } else if (scanMode !== 'camera' && cameraActive) {
      stopCamera();
    }
  }, [scanMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef?.current && videoRef?.current?.srcObject) {
      const tracks = videoRef?.current?.srcObject?.getTracks();
      tracks?.forEach(track => track?.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleBarcodeSubmit = (e) => {
    e?.preventDefault();
    if (barcodeInput?.trim()) {
      onScanComplete({
        method: 'barcode',
        data: barcodeInput?.trim(),
        timestamp: new Date()
      });
      setBarcodeInput('');
    }
  };

  const handleCameraCapture = () => {
    const mockBarcodeData = `DEV${Math.floor(Math.random() * 100000)}`;
    onScanComplete({
      method: 'camera',
      data: mockBarcodeData,
      timestamp: new Date()
    });
  };

  const handleManualSearch = (e) => {
    e?.preventDefault();
    if (manualSearchQuery?.trim()) {
      onScanComplete({
        method: 'manual',
        data: manualSearchQuery?.trim(),
        timestamp: new Date()
      });
      setManualSearchQuery('');
    }
  };

  const handleClear = () => {
    setBarcodeInput('');
    setManualSearchQuery('');
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Device Scanning</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={scanMode === 'barcode' ? 'default' : 'outline'}
            size="sm"
            iconName="Scan"
            onClick={() => setScanMode('barcode')}
          >
            Barcode (F1)
          </Button>
          <Button
            variant={scanMode === 'camera' ? 'default' : 'outline'}
            size="sm"
            iconName="Camera"
            onClick={() => setScanMode('camera')}
          >
            Camera (F2)
          </Button>
          <Button
            variant={scanMode === 'manual' ? 'default' : 'outline'}
            size="sm"
            iconName="Search"
            onClick={() => setScanMode('manual')}
          >
            Manual
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {scanMode === 'barcode' && (
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                scannerConnected 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                <Icon name={scannerConnected ? 'Wifi' : 'WifiOff'} size={16} />
                <span>
                  {scannerConnected 
                    ? 'Zebra DS9208 Scanner Ready' :'Scanner Disconnected'}
                </span>
              </div>
            </div>

            <form onSubmit={handleBarcodeSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border p-8">
                <div className="text-center max-w-md w-full">
                  <Icon name="Scan" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Ready to Scan
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Position barcode under scanner or enter manually below
                  </p>
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Scan or type barcode number..."
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e?.target?.value)}
                    className="text-center text-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="CheckCircle"
                  disabled={!barcodeInput?.trim()}
                >
                  Verify Device
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  iconName="X"
                  onClick={handleClear}
                >
                  Clear (ESC)
                </Button>
              </div>
            </form>
          </div>
        )}

        {scanMode === 'camera' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-muted/30 rounded-lg border border-border overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <div className="text-center">
                    <Icon name="Camera" size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-foreground">Initializing camera...</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-accent rounded-lg"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Button
                variant="default"
                fullWidth
                iconName="Camera"
                onClick={handleCameraCapture}
                disabled={!cameraActive}
              >
                Capture Barcode
              </Button>
              <Button
                variant="outline"
                iconName="RotateCw"
                onClick={() => {
                  stopCamera();
                  startCamera();
                }}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {scanMode === 'manual' && (
          <div className="flex-1 flex flex-col">
            <form onSubmit={handleManualSearch} className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg border border-border p-8">
                <div className="text-center max-w-md w-full">
                  <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Manual Device Search
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Search by serial number, student ID, or device name
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter search query..."
                    value={manualSearchQuery}
                    onChange={(e) => setManualSearchQuery(e?.target?.value)}
                    className="mb-4"
                  />
                  <Input
                    type="text"
                    placeholder="Student ID (optional)"
                    className="mb-4"
                  />
                  <Input
                    type="text"
                    placeholder="Department (optional)"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="Search"
                  disabled={!manualSearchQuery?.trim()}
                >
                  Search Device
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  iconName="X"
                  onClick={() => setManualSearchQuery('')}
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Keyboard Shortcuts: F1 (Barcode) | F2 (Camera) | ESC (Clear)</span>
          <span>Response Time: &lt;1s</span>
        </div>
      </div>
    </div>
  );
};

export default ScanningPanel;