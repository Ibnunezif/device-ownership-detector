import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, isScanning, setIsScanning }) => {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState('');
  const streamRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setHasCamera(true);
      setCameraError('');
    } catch (error) {
      setHasCamera(false);
      setCameraError('Camera access denied. Please enable camera permissions.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    if (videoRef?.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleManualScan = () => {
    const mockSerialNumber = 'SN' + Math.random()?.toString(36)?.substring(2, 12)?.toUpperCase();
    onScanSuccess(mockSerialNumber);
    setIsScanning(false);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name="Scan" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
              QR Code Scanner
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Scan device QR code for verification
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
          {isScanning && hasCamera ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary rounded-lg relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <p className="text-sm md:text-base text-white bg-background/80 px-4 py-2 rounded-md font-caption">
                  Position QR code within frame
                </p>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
              <Icon name="Camera" size={48} className="text-muted-foreground mb-4" />
              <p className="text-sm md:text-base text-muted-foreground text-center mb-2">
                {cameraError || 'Camera ready to scan'}
              </p>
              {!isScanning && (
                <Button
                  variant="default"
                  iconName="Camera"
                  iconPosition="left"
                  onClick={() => setIsScanning(true)}
                  className="mt-4"
                >
                  Start Camera
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {isScanning ? (
            <>
              <Button
                variant="default"
                iconName="CheckCircle2"
                iconPosition="left"
                onClick={handleManualScan}
                fullWidth
              >
                Simulate Scan
              </Button>
              <Button
                variant="outline"
                iconName="X"
                iconPosition="left"
                onClick={() => setIsScanning(false)}
                fullWidth
              >
                Stop Camera
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              iconName="Camera"
              iconPosition="left"
              onClick={() => setIsScanning(true)}
              fullWidth
            >
              Start Scanning
            </Button>
          )}
        </div>

        <div className="bg-muted/50 rounded-md p-3 md:p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-muted-foreground space-y-1">
              <p>• Ensure good lighting for optimal scanning</p>
              <p>• Hold device steady and position QR code within frame</p>
              <p>• Use manual lookup if QR code is damaged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;