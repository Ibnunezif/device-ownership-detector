import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'j', description: 'Move down in queue' },
    { key: 'k', description: 'Move up in queue' },
    { key: 'a', description: 'Approve selected registration' },
    { key: 'r', description: 'Reject selected registration' },
    { key: 'Space', description: 'View registration details' },
    { key: 'Esc', description: 'Close detail panel' },
    { key: 'Ctrl + A', description: 'Select all registrations' },
    { key: 'Ctrl + F', description: 'Focus search field' },
    { key: '?', description: 'Show keyboard shortcuts' }
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-popover rounded-lg border border-border shadow-modal max-w-md w-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Icon name="Keyboard" size={20} className="text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              aria-label="Close shortcuts modal"
            />
          </div>
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {shortcuts?.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{shortcut?.description}</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">
                  {shortcut?.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyboardShortcutsModal;