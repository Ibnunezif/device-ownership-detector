import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ScanTimeline = ({ scans }) => {
  const [expandedScan, setExpandedScan] = useState(null);

  const getResultColor = (result) => {
    const colors = {
      VERIFIED: 'text-success',
      SUSPICIOUS: 'text-warning',
      STOLEN: 'text-error',
      CLEARED: 'text-secondary'
    };
    return colors?.[result] || 'text-muted-foreground';
  };

  const getResultIcon = (result) => {
    const icons = {
      VERIFIED: 'CheckCircle',
      SUSPICIOUS: 'AlertCircle',
      STOLEN: 'AlertTriangle',
      CLEARED: 'Shield'
    };
    return icons?.[result] || 'Info';
  };

  const toggleExpand = (scanId) => {
    setExpandedScan(expandedScan === scanId ? null : scanId);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="History" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
            Scan Timeline
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {scans?.length} security {scans?.length === 1 ? 'scan' : 'scans'} recorded
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {scans?.map((scan, index) => (
          <div key={scan?.id} className="relative">
            {index !== scans?.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
            )}
            
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                scan?.result === 'VERIFIED' ? 'bg-success/10' :
                scan?.result === 'SUSPICIOUS' ? 'bg-warning/10' :
                scan?.result === 'STOLEN'? 'bg-error/10' : 'bg-secondary/10'
              }`}>
                <Icon 
                  name={getResultIcon(scan?.result)} 
                  size={20} 
                  className={getResultColor(scan?.result)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <button
                  onClick={() => toggleExpand(scan?.id)}
                  className="w-full text-left bg-muted hover:bg-muted/80 rounded-md p-3 md:p-4 transition-smooth"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-caption font-semibold text-sm md:text-base ${getResultColor(scan?.result)}`}>
                        {scan?.result}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        by {scan?.scannerName}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(scan.timestamp)?.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm md:text-base text-foreground line-clamp-1">
                      {scan?.location}
                    </p>
                    <Icon 
                      name={expandedScan === scan?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={20} 
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </div>
                </button>

                {expandedScan === scan?.id && (
                  <div className="mt-3 bg-background rounded-md p-3 md:p-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="caption text-muted-foreground mb-1">Scanner ID</p>
                        <p className="text-sm md:text-base font-data text-foreground">
                          {scan?.scannerId}
                        </p>
                      </div>
                      <div>
                        <p className="caption text-muted-foreground mb-1">Scanner Role</p>
                        <p className="text-sm md:text-base text-foreground">
                          {scan?.scannerRole}
                        </p>
                      </div>
                      <div>
                        <p className="caption text-muted-foreground mb-1">Scan Method</p>
                        <p className="text-sm md:text-base text-foreground">
                          {scan?.scanMethod}
                        </p>
                      </div>
                      <div>
                        <p className="caption text-muted-foreground mb-1">Verification Time</p>
                        <p className="text-sm md:text-base text-foreground">
                          {scan?.verificationTime}
                        </p>
                      </div>
                    </div>

                    {scan?.notes && (
                      <div className="pt-3 border-t border-border">
                        <p className="caption text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {scan?.notes}
                        </p>
                      </div>
                    )}

                    {scan?.actionTaken && (
                      <div className="flex items-start gap-2 p-2 bg-muted rounded-md">
                        <Icon name="Info" size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Action Taken:</span> {scan?.actionTaken}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanTimeline;