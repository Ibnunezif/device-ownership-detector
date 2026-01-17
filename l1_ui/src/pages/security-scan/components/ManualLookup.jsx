import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ManualLookup = ({ onLookupSuccess, loading }) => {
  const [barcode, setBarcode] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = async () => {
    if (!barcode?.trim()) return;

    setIsSearching(true);
    try {
      await onLookupSuccess(barcode.trim(), 'MANUAL');
      setBarcode('');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && barcode?.trim()) {
      handleLookup();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-md flex items-center justify-center">
          <Icon name="Search" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Manual Lookup
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            Enter device barcode for verification
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Device Barcode"
          type="text"
          placeholder="Enter barcode (e.g., ugr/30030/14SN-S26-2025-000900)"
          value={barcode}
          onChange={(e) => setBarcode(e?.target?.value)}
          onKeyPress={handleKeyPress}
          description="Scan or type the barcode printed on the device tag"
        />

        <Button
          variant="secondary"
          iconName="Search"
          iconPosition="left"
          onClick={handleLookup}
          disabled={!barcode?.trim() || isSearching || loading}
          loading={isSearching || loading}
          fullWidth
        >
          {isSearching || loading ? 'Verifying...' : 'Lookup Device'}
        </Button>

        <div className="bg-muted/50 rounded-md p-3 md:p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Manual Lookup Guidelines:</p>
              <p>• Use the full barcode printed on the device tag</p>
              <p>• Remove extra spaces when typing manually</p>
              <p>• Use QR scanner or barcode scanner when possible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualLookup;
