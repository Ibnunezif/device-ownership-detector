import React from 'react';
import Icon from '../../../components/AppIcon';

const ScanHistory = ({ history }) => {
  if (!history || history?.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-md flex items-center justify-center">
            <Icon name="History" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
              Scan History
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Recent verification records
            </p>
          </div>
        </div>
        <div className="text-center py-8 md:py-12">
          <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-sm md:text-base text-muted-foreground">
            No scan history available
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mt-2 font-caption">
            Start scanning devices to build verification history
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    const icons = {
      ACTIVE: { name: 'CheckCircle2', color: 'text-success' },
      STOLEN: { name: 'AlertTriangle', color: 'text-error' },
      BLOCKED: { name: 'XCircle', color: 'text-warning' }
    };
    return icons?.[status] || icons?.ACTIVE;
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-md flex items-center justify-center">
          <Icon name="History" size={20} className="text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Scan History
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            Session verification records ({history?.length})
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {history?.map((scan, index) => {
          const statusIcon = getStatusIcon(scan?.status);
          return (
            <div
              key={index}
              className="bg-muted/50 rounded-md p-3 md:p-4 hover:bg-muted transition-smooth"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                    scan?.status === 'ACTIVE' ? 'bg-success/10' :
                    scan?.status === 'STOLEN'? 'bg-error/10' : 'bg-warning/10'
                  }`}>
                    <Icon name={statusIcon?.name} size={16} className={statusIcon?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-foreground truncate">
                      {scan?.ownerName}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground font-caption">
                      {scan?.brand} • {scan?.serialNumber}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-caption">
                        {new Date(scan.timestamp)?.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${statusIcon?.color} bg-current/10 whitespace-nowrap`}>
                  {scan?.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanHistory;