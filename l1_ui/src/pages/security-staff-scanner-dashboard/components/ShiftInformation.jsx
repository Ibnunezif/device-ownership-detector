import React from 'react';
import Icon from '../../../components/AppIcon';

const ShiftInformation = ({ shiftData }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={20} className="text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Current Shift</p>
              <p className="text-sm font-semibold text-foreground">
                {shiftData?.shiftName} ({shiftData?.startTime} - {shiftData?.endTime})
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-border"></div>

          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={20} className="text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-semibold text-foreground">{shiftData?.location}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-border"></div>

          <div className="flex items-center gap-2">
            <Icon name="User" size={20} className="text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Staff ID</p>
              <p className="text-sm font-semibold text-foreground data-text">{shiftData?.staffId}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right mr-3">
            <p className="text-xs text-muted-foreground">Time Remaining</p>
            <p className="text-sm font-semibold text-foreground">{shiftData?.timeRemaining}</p>
          </div>
          <div className={`px-3 py-1 rounded-md text-xs font-medium ${
            shiftData?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}>
            {shiftData?.status === 'active' ? 'On Duty' : 'Off Duty'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftInformation;