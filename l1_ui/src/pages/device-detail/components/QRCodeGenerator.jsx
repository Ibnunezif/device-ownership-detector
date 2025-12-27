import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeGenerator = ({ deviceId, deviceInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(deviceId)}`;

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `device-qr-${deviceId}.png`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Device QR Code - ${deviceId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              text-align: center;
              border: 2px solid #000;
              padding: 30px;
              max-width: 400px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .device-info {
              margin: 20px 0;
              font-size: 14px;
            }
            img {
              margin: 20px 0;
            }
            .device-id {
              font-family: monospace;
              font-size: 16px;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>PC Owner Detector</h1>
            <div class="device-info">
              <p><strong>${deviceInfo?.brand} ${deviceInfo?.model}</strong></p>
              <p>Owner: ${deviceInfo?.ownerName}</p>
            </div>
            <img src="${qrCodeUrl}" alt="Device QR Code" />
            <div class="device-id">ID: ${deviceId}</div>
            <p style="font-size: 12px; margin-top: 20px;">Scan to verify device ownership</p>
          </div>
        </body>
      </html>
    `);
    printWindow?.document?.close();
    setTimeout(() => {
      printWindow?.print();
    }, 500);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="QrCode" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
            QR Code Label
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Generate printable device identification
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs aspect-square bg-muted rounded-lg p-4 flex items-center justify-center">
          <img 
            src={qrCodeUrl} 
            alt={`QR code for device ${deviceId} - ${deviceInfo?.brand} ${deviceInfo?.model} owned by ${deviceInfo?.ownerName}`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="text-center p-3 bg-muted rounded-md">
            <p className="caption text-muted-foreground mb-1">Device ID</p>
            <p className="text-sm md:text-base font-data text-foreground">
              {deviceId}
            </p>
          </div>

          <Button
            variant="default"
            fullWidth
            iconName="Download"
            onClick={handleDownload}
            loading={isGenerating}
          >
            Download QR Code
          </Button>

          <Button
            variant="outline"
            fullWidth
            iconName="Printer"
            onClick={handlePrint}
          >
            Print Label
          </Button>

          {showSuccess && (
            <div className="flex items-center gap-2 p-3 bg-success/10 rounded-md animate-in slide-in-from-top-2 duration-300">
              <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
              <p className="text-sm text-foreground">
                QR code downloaded successfully!
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-xs">
          <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-md">
            <Icon name="Info" size={16} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Attach this QR code label to the device for quick scanning and verification by security personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;