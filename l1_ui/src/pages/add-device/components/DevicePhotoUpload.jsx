import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DevicePhotoUpload = ({ photos, onPhotosChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (imageFiles?.length === 0) {
      return;
    }

    const newPhotos = imageFiles?.slice(0, 4 - photos?.length)?.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file?.name
    }));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    const newPhotos = photos?.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Device Photos <span className="text-error">*</span>
          </label>
          <p className="text-xs text-muted-foreground font-caption">
            Upload up to 4 photos from different angles (Max 5MB each)
          </p>
        </div>
        <div className="text-xs text-muted-foreground font-caption">
          {photos?.length}/4 photos
        </div>
      </div>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 md:p-8 lg:p-10
          transition-smooth text-center
          ${dragActive 
            ? 'border-primary bg-primary/5' 
            : error 
            ? 'border-error bg-error/5' :'border-border bg-muted/30 hover:border-primary/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          capture="environment"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon 
                name="Upload" 
                size={24} 
                color="var(--color-primary)" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm md:text-base font-medium text-foreground">
              {dragActive ? 'Drop photos here' : 'Drag & drop photos here'}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              or
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Camera"
              iconPosition="left"
              onClick={triggerFileInput}
            >
              Browse Files
            </Button>
          </div>

          <p className="text-xs text-muted-foreground font-caption">
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>
      </div>
      {error && (
        <p className="text-xs text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
      {photos?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos?.map((photo, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border"
            >
              <Image
                src={photo?.preview}
                alt={`Device photo ${index + 1} showing ${photo?.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  iconName="Trash2"
                  onClick={() => removePhoto(index)}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                <p className="text-xs text-foreground truncate font-caption">
                  {photo?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevicePhotoUpload;