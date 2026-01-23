import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeGenerator = ({ value, deviceInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // CODE 128 barcode (supports ALL characters)
  const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(
    value
  )}&scale=3&height=10&includetext=true&textxalign=center`;

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = barcodeUrl;
      link.download = `device-barcode-${value}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Device Barcode - ${value}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              text-align: center;
              border: 2px solid #000;
              padding: 30px;
              max-width: 420px;
            }
            h1 {
              font-size: 22px;
              margin-bottom: 10px;
            }
            .device-info {
              margin: 15px 0;
              font-size: 14px;
            }
            img {
              margin: 20px 0;
              max-width: 100%;
            }
            .device-id {
              font-family: monospace;
              font-size: 14px;
              font-weight: bold;
              margin-top: 10px;
              word-break: break-all;
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
            <img src="${barcodeUrl}" alt="Device Barcode" />
            <div class="device-id">${value}</div>
            <p style="font-size:12px;margin-top:15px;">
              Scan barcode to verify device ownership
            </p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="Barcode" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
            Barcode Label
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Generate printable device identification
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs bg-muted rounded-lg p-4 flex items-center justify-center">
          <img
            src={barcodeUrl}
            alt={`Barcode for ${value}`}
            className="w-full object-contain"
          />
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="text-center p-3 bg-muted rounded-md">
            <p className="caption text-muted-foreground mb-1">Barcode Value</p>
            <p className="text-sm md:text-base font-data text-foreground break-all">
              {value}
            </p>
          </div>

          <Button
            variant="default"
            fullWidth
            iconName="Download"
            onClick={handleDownload}
            loading={isGenerating}
          >
            Download Barcode
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
                Barcode downloaded successfully!
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-xs">
          <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-md">
            <Icon name="Info" size={16} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Attach this barcode label to the device for fast and reliable scanning by security personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
