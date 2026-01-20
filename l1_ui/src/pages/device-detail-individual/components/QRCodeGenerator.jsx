import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeGenerator = ({ deviceInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use the barcode value for both QR and 1D barcode
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    deviceInfo.barcode
  )}`;

  const barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
    deviceInfo.barcode
  )}&code=Code128&translate-esc=true`;

  const downloadImage = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    setIsGenerating(true);

    setTimeout(() => {
      downloadImage(qrCodeUrl, `device-qr-${deviceInfo.id}.png`);
      downloadImage(barcodeUrl, `device-barcode-${deviceInfo.id}.png`);

      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Device Label - ${deviceInfo.id}</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
            .label { border: 2px solid #000; padding: 20px; max-width: 400px; text-align: center; }
            h1 { font-size: 22px; margin-bottom: 8px; }
            .device-info { font-size: 14px; margin-bottom: 12px; }
            img { max-width: 100%; margin: 10px 0; }
            .device-id { font-family: monospace; font-size: 15px; font-weight: bold; margin-top: 8px; }
            .footer { font-size: 11px; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="label">
            <h1>PC Owner Detector</h1>
            <div class="device-info">
              <strong>${deviceInfo.brand} ${deviceInfo.model}</strong><br/>
              Owner: ${deviceInfo.owner?.name || 'N/A'}
            </div>

            <img src="${qrCodeUrl}" alt="QR Code" />
            <img src="${barcodeUrl}" alt="Barcode" />

            <div class="device-id">ID: ${deviceInfo.id}</div>

            <div class="footer">Scan to verify device ownership</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="QrCode" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            QR & Barcode Label
          </h3>
          <p className="text-muted-foreground">Generate printable device identification</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-6">
        {/* PREVIEW */}
        <div className="w-full max-w-xs space-y-4">
          {/* QR */}
          <div className="aspect-square bg-muted rounded-lg p-4 flex items-center justify-center">
            <img src={qrCodeUrl} alt={`QR code for device ${deviceInfo.id}`} className="w-full h-full object-contain" />
          </div>

          {/* BARCODE */}
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
            <img src={barcodeUrl} alt={`Barcode for device ${deviceInfo.id}`} className="w-full object-contain" />
          </div>
        </div>

        {/* DEVICE ID */}
        <div className="w-full max-w-xs text-center p-3 bg-muted rounded-md">
          <p className="caption text-muted-foreground mb-1">Device ID</p>
          <p className="font-data text-foreground">{deviceInfo.id}</p>
        </div>

        {/* ACTIONS */}
        <div className="w-full max-w-xs space-y-3">
          <Button fullWidth iconName="Download" onClick={handleDownload} loading={isGenerating}>
            Download QR & Barcode
          </Button>
          <Button variant="outline" fullWidth iconName="Printer" onClick={handlePrint}>
            Print Label
          </Button>

          {showSuccess && (
            <div className="flex items-center gap-2 p-3 bg-success/10 rounded-md">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <p className="text-sm">Download completed successfully</p>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="w-full max-w-xs">
          <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-md">
            <Icon name="Info" size={16} className="text-secondary mt-0.5" />
            <p className="text-sm">
              Attach this label to the device for fast scanning and ownership verification by security personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
