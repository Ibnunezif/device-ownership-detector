import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BulkVerificationMode = ({ isActive, onToggle, queue, onProcessQueue }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    if (selectedItems?.length === queue?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(queue?.map(item => item?.id));
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev?.includes(id)
        ? prev?.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleProcessSelected = () => {
    onProcessQueue(selectedItems);
    setSelectedItems([]);
  };

  if (!isActive) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Layers" size={24} className="text-accent" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Bulk Verification Mode</h3>
              <p className="text-sm text-muted-foreground">
                Process multiple devices simultaneously for faster verification
              </p>
            </div>
          </div>
          <Button
            variant="default"
            iconName="Play"
            onClick={onToggle}
          >
            Enable Bulk Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Layers" size={24} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Bulk Verification Queue</h3>
            <p className="text-sm text-muted-foreground">
              {queue?.length} devices in queue | {selectedItems?.length} selected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="CheckSquare"
            onClick={handleSelectAll}
          >
            {selectedItems?.length === queue?.length ? 'Deselect All' : 'Select All'}
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            onClick={handleProcessSelected}
            disabled={selectedItems?.length === 0}
          >
            Process Selected
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onToggle}
          >
            Exit Bulk Mode
          </Button>
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {queue?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No devices in queue</p>
            <p className="text-sm text-muted-foreground mt-1">
              Scan devices to add them to the bulk verification queue
            </p>
          </div>
        ) : (
          queue?.map((item) => (
            <div
              key={item?.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedItems?.includes(item?.id)
                  ? 'border-accent bg-accent/5' :'border-border hover:bg-muted/30'
              }`}
              onClick={() => handleSelectItem(item?.id)}
            >
              <div className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors duration-200 ${
                selectedItems?.includes(item?.id)
                  ? 'border-accent bg-accent' :'border-border'
              }`}>
                {selectedItems?.includes(item?.id) && (
                  <Icon name="Check" size={14} className="text-white" />
                )}
              </div>

              <Image
                src={item?.studentPhoto}
                alt={item?.studentPhotoAlt}
                className="w-12 h-12 rounded-lg object-cover border border-border"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item?.studentName}</p>
                <p className="text-xs text-muted-foreground">{item?.deviceType} - {item?.brand}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Serial</p>
                <p className="text-sm font-medium text-foreground data-text">{item?.serialNumber}</p>
              </div>

              <div className="text-xs text-muted-foreground">
                {item?.timestamp?.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BulkVerificationMode;