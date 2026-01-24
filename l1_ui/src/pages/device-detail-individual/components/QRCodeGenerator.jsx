import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeGenerator = ({ value, deviceInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // QR Code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    value
  )}`;

  // CODE 128 Barcode
  const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(
    value
  )}&scale=3&height=10&includetext=true&textxalign=center`;

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
    }, 600);
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Device Label</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .label {
              border: 2px solid #000;
              padding: 20px;
              text-align: center;
              max-width: 400px;
            }
            img {
              max-width: 100%;
              margin: 10px 0;
            }
            .id {
              font-family: monospace;
              font-weight: bold;
              word-break: break-all;
            }
            .footer {
              font-size: 12px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="label">
            <h2>PC Owner Detector</h2>
            <p>
              <strong>${deviceInfo.brand} ${deviceInfo.model}</strong><br/>
              Owner: ${deviceInfo.owner?.name || 'N/A'}
            </p>
            <img src="${qrCodeUrl}" />
            <img src="${barcodeUrl}" />
            <div class="id">${value}</div>
            <div class="footer">Scan to verify device ownership</div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="QrCode" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold">QR & Barcode Label</h3>
          <p className="text-muted-foreground">
            Generate printable device identification
          </p>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-xs bg-muted rounded-lg p-4">
          <img src={qrCodeUrl} alt="QR Code" className="w-full" />
        </div>

        <div className="w-full max-w-xs bg-muted rounded-lg p-4">
          <img src={barcodeUrl} alt="Barcode" className="w-full" />
        </div>

        <div className="w-full max-w-xs text-center bg-muted rounded-md p-3">
          <p className="text-sm text-muted-foreground">Device ID</p>
          <p className="font-data break-all">{value}</p>
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
        <div className="w-full max-w-xs bg-secondary/10 rounded-md p-3 flex gap-2">
          <Icon name="Info" size={16} className="text-secondary mt-0.5" />
          <p className="text-sm">
            Attach this label to the device for fast scanning and ownership verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
