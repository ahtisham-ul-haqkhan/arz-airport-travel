'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fleetPhotos } from './GallerySection';

export default function FleetLightbox({ isOpen, currentIndex, onClose, onNavigate }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentPhoto = fleetPhotos[currentIndex] || fleetPhotos[0];

  return (
    <div
      className={`fleet-lightbox-modal ${isOpen ? 'active' : ''}`}
      id="fleetLightboxModal"
      aria-hidden={!isOpen}
      role="dialog"
      onClick={(e) => {
        if (e.target.id === 'fleetLightboxModal') onClose();
      }}
    >
      <div className="fleet-lightbox-content position-relative">
        <button
          type="button"
          className="fleet-lightbox-close"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>

        {fleetPhotos.length > 1 && (
          <>
            <button
              type="button"
              className="btn btn-dark position-absolute start-0 top-50 translate-middle-y rounded-circle p-2 ms-2 opacity-75 hover-opacity-100"
              style={{ zIndex: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(-1);
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </button>
            <button
              type="button"
              className="btn btn-dark position-absolute end-0 top-50 translate-middle-y rounded-circle p-2 me-2 opacity-75 hover-opacity-100"
              style={{ zIndex: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(1);
              }}
              aria-label="Next Photo"
            >
              <ChevronRight size={24} color="#FFFFFF" />
            </button>
          </>
        )}

        <div className="fleet-lightbox-img-wrap">
          <img src={currentPhoto.src} id="fleetLightboxImg" alt={currentPhoto.alt} />
        </div>
      </div>
    </div>
  );
}
