import React from 'react';

const DevicePhotoUpload = ({ photos, onPhotosChange, error }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // max 4 photos
    const formattedFiles = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    onPhotosChange(formattedFiles);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-2"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {photos.map((photo, idx) => (
          <img
            key={idx}
            src={photo.preview}
            alt={`Device ${idx + 1}`}
            className="w-24 h-24 object-cover rounded-md border"
          />
        ))}
      </div>
    </div>
  );
};

export default DevicePhotoUpload;
