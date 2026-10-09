'use client';

import React from 'react';
import { Camera, Maximize2 } from 'lucide-react';

export const fleetPhotos = [
  {
    id: 0,
    src: '/assets/images/car-images/ford-voyager-side.jpeg',
    alt: '8-Seater Minibus Side View',
  },
  {
    id: 1,
    src: '/assets/images/car-images/ford-minibus-front.jpeg',
    alt: 'Minibus Front View',
  },
  {
    id: 2,
    src: '/assets/images/car-images/seat-alhambra-mpv.png',
    alt: 'SEAT Alhambra Car',
  },
  {
    id: 3,
    src: '/assets/images/car-images/WhatsApp Image 2026-10-06 at 11.26.45 PM.jpeg',
    alt: 'Wheelchair Access Ramp',
  },
  {
    id: 4,
    src: '/assets/images/car-images/WhatsApp Image 2026-10-07 at 12.55.59 AM.jpeg',
    alt: 'Clean Vehicle Interior',
  },
];

export default function GallerySection({ onOpenLightbox }) {
  return (
    <section className="fleet-gallery-section" id="gallery">
      <div className="container-xl">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="section-badge-light">
            <Camera size={14} />
            <span>Photo Gallery</span>
          </div>
          <h2 className="section-title-light">
            Our <span className="text-blue-accent">Vehicle Gallery</span>
          </h2>
          <p className="section-subtitle-light">
            Real photos of our taxi vehicles, 8-seater minibus, interior seating, and wheelchair access ramp.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="row g-3 g-md-4" id="fleetGrid">
          {fleetPhotos.map((photo, index) => (
            <div key={photo.id} className="col-6 col-md-4 col-lg-3">
              <div
                className="gallery-photo-card"
                onClick={() => onOpenLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenLightbox(index);
                }}
              >
                <img src={photo.src} alt={photo.alt} />
                <div className="gallery-photo-overlay">
                  <Maximize2 size={22} color="#FFFFFF" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
