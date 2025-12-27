import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction) => {
    const currentIndex = photos?.findIndex(p => p?.id === selectedPhoto?.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % photos?.length 
      : (currentIndex - 1 + photos?.length) % photos?.length;
    setSelectedPhoto(photos?.[newIndex]);
  };

  return (
    <>
      <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-secondary/10 flex items-center justify-center">
            <Icon name="Image" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
              Photo Gallery
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {photos?.length} {photos?.length === 1 ? 'photo' : 'photos'} available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos?.map((photo) => (
            <button
              key={photo?.id}
              onClick={() => openLightbox(photo)}
              className="group relative aspect-square rounded-md overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-smooth"
            >
              <Image
                src={photo?.url}
                alt={photo?.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-smooth"
                />
              </div>
              {photo?.isPrimary && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-caption font-semibold">
                  Primary
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-1100 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Close lightbox"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>

          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-4 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Previous photo"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-4 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Next photo"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>

          <div className="max-w-4xl w-full">
            <Image
              src={selectedPhoto?.url}
              alt={selectedPhoto?.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-sm md:text-base">
                {selectedPhoto?.caption}
              </p>
              <p className="text-white/60 text-xs md:text-sm mt-1">
                Uploaded: {new Date(selectedPhoto.uploadedDate)?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;