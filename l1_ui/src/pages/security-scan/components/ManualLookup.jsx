import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ManualLookup = ({ onLookupSuccess }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = () => {
    if (!serialNumber?.trim()) {
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      onLookupSuccess(serialNumber?.trim());
      setIsSearching(false);
      setSerialNumber('');
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && serialNumber?.trim()) {
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
            Enter serial number for verification
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Device Serial Number"
          type="text"
          placeholder="Enter serial number (e.g., SN123456789)"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e?.target?.value?.toUpperCase())}
          onKeyPress={handleKeyPress}
          description="Enter the device serial number found on the device label"
        />

        <Button
          variant="secondary"
          iconName="Search"
          iconPosition="left"
          onClick={handleLookup}
          disabled={!serialNumber?.trim() || isSearching}
          loading={isSearching}
          fullWidth
        >
          {isSearching ? 'Searching...' : 'Lookup Device'}
        </Button>

        <div className="bg-muted/50 rounded-md p-3 md:p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Manual Lookup Guidelines:</p>
              <p>• Serial numbers are case-insensitive</p>
              <p>• Remove spaces and special characters</p>
              <p>• Verify serial number matches device label</p>
              <p>• Use QR scanner for faster verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualLookup;