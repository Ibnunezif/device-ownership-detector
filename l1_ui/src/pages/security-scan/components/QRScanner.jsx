import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, isScanning, setIsScanning }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const streamRef = useRef(null);
  const scanningRef = useRef(false);

  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState('');

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return stopCamera;
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        scanningRef.current = true;
        requestAnimationFrame(scanFrame);
      }

      setHasCamera(true);
      setCameraError('');
    } catch (err) {
      setHasCamera(false);
      setCameraError('Camera access denied or not available.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    scanningRef.current = false;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const scanFrame = () => {
    if (!scanningRef.current || !videoRef.current) return;

    const video = videoRef.current;
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanFrame);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if (qrCode?.data) {
      scanningRef.current = false;
      onScanSuccess(qrCode.data);
      setIsScanning(false);
      stopCamera();
      return;
    }

    requestAnimationFrame(scanFrame);
  };

  const handleManualScan = () => {
    const mockSerial =
      'SN' + Math.random().toString(36).substring(2, 12).toUpperCase();
    onScanSuccess(mockSerial);
    setIsScanning(false);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
          <Icon name="Scan" size={22} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">QR Code Scanner</h2>
          <p className="text-sm text-muted-foreground">
            Scan device QR code for verification
          </p>
        </div>
      </div>

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
              <div className="w-64 h-64 border-4 border-primary rounded-lg" />
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <Icon name="Camera" size={48} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              {cameraError || 'Camera ready'}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        {isScanning ? (
          <>
            <Button fullWidth onClick={handleManualScan}>
              Simulate Scan
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsScanning(false)}
            >
              Stop
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={() => setIsScanning(true)}>
            Start Scanning
          </Button>
        )}
      </div>

      <div className="bg-muted/50 rounded-md p-4 mt-6 text-sm text-muted-foreground">
        <p>• Ensure good lighting</p>
        <p>• Keep QR code centered</p>
        <p>• Manual scan available if QR is damaged</p>
      </div>
    </div>
  );
};

export default QRScanner;
