import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoCaptureForm = ({ formData, onUpdate, onNext, onBack }) => {
  const [localData, setLocalData] = useState({
    ownerPhoto: null,
    devicePhoto: null,
    ...formData
  });

  const [activeCamera, setActiveCamera] = useState(null);
  const [stream, setStream] = useState(null);
  const [captureMode, setCaptureMode] = useState('owner');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, [stream]);

  const startCamera = async (mode) => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      
      setStream(mediaStream);
      setActiveCamera(mode);
      setCaptureMode(mode);
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Unable to access camera. Please check permissions or use file upload.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
      setActiveCamera(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const canvas = canvasRef?.current;
    const video = videoRef?.current;
    
    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    
    const ctx = canvas?.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    canvas?.toBlob((blob) => {
      const file = new File([blob], `${captureMode}-photo.jpg`, { type: 'image/jpeg' });
      handlePhotoUpdate(captureMode, file);
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const handleFileUpload = (mode, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      handlePhotoUpdate(mode, file);
    }
  };

  const handlePhotoUpdate = (mode, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLocalData(prev => ({
        ...prev,
        [`${mode}Photo`]: e?.target?.result
      }));
    };
    reader?.readAsDataURL(file);
  };

  const removePhoto = (mode) => {
    setLocalData(prev => ({
      ...prev,
      [`${mode}Photo`]: null
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!localData?.ownerPhoto || !localData?.devicePhoto) {
      alert('Please capture or upload both owner and device photos');
      return;
    }

    onUpdate(localData);
    onNext();
  };

  const PhotoCaptureCard = ({ mode, title, description, photo }) => {
    const isOwner = mode === 'owner';
    const icon = isOwner ? 'User' : 'Laptop';

    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <Icon name={icon} size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        {photo ? (
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={photo}
                alt={`${title} showing clear view for identification purposes`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconName="Camera"
                iconPosition="left"
                onClick={() => startCamera(mode)}
                fullWidth
              >
                Retake
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                iconName="Trash2"
                onClick={() => removePhoto(mode)}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {activeCamera === mode ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-video bg-black rounded-lg"
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    iconName="Camera"
                    iconPosition="left"
                    onClick={capturePhoto}
                    fullWidth
                  >
                    Capture Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconName="X"
                    onClick={stopCamera}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  iconName="Camera"
                  iconPosition="left"
                  onClick={() => startCamera(mode)}
                  fullWidth
                >
                  Open Camera
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(mode, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id={`file-${mode}`}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    iconName="Upload"
                    iconPosition="left"
                    fullWidth
                  >
                    Upload from File
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Camera" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Photo Requirements</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Owner photo: Clear face photo with good lighting</li>
              <li>• Device photo: Show device with visible serial number if possible</li>
              <li>• Both photos will be printed on your device ID card</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhotoCaptureCard
          mode="owner"
          title="Owner Photo"
          description="Your photo for identification"
          photo={localData?.ownerPhoto}
        />
        <PhotoCaptureCard
          mode="device"
          title="Device Photo"
          description="Clear photo of your device"
          photo={localData?.devicePhoto}
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="default"
          iconName="ArrowRight"
          iconPosition="right"
          disabled={!localData?.ownerPhoto || !localData?.devicePhoto}
        >
          Continue to Review
        </Button>
      </div>
    </form>
  );
};

export default PhotoCaptureForm;