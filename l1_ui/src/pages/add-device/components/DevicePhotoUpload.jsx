import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DevicePhotoUpload = ({ photos, onPhotosChange, error }) => {
  const fileInputRef = useRef();

  // Handle files selected via input or drag & drop
  const handleFiles = (files) => {
    const newPhotos = [...photos];
    Array.from(files).forEach((file) => {
      // Optional: validate file type
      if (file.type.startsWith('image/')) {
        newPhotos.push(file);
      }
    });
    onPhotosChange(newPhotos);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleRemovePhoto = (index) => {
    const updated = [...photos];
    updated.splice(index, 1);
    onPhotosChange(updated);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
          error ? 'border-red-500' : 'border-gray-300 hover:border-primary'
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Icon name="Camera" size={32} color="var(--color-primary)" />
        <p className="text-sm text-muted-foreground mt-2">
          Drag & drop photos here, or click to select
        </p>
        <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG. Max 5MB each.</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleInputChange}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {photos?.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
          {photos.map((photo, index) => {
            const preview = typeof photo === 'string' ? photo : URL.createObjectURL(photo);
            return (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`device-${index}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DevicePhotoUpload;
