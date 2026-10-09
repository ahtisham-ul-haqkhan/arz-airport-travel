'use client';

import React, { useState } from 'react';
import {
  Car,
  Users,
  Zap,
  CreditCard,
  Accessibility,
  ArrowRight,
  MessageCircle,
  Luggage,
} from 'lucide-react';

const vehicleImages = [
  {
    id: 1,
    src: '/assets/images/car-images/ford-voyager-side.jpeg',
    alt: 'Wheelchair Accessible 8 Seater Minibus Taxi Stoke-on-Trent for Airport Transfers',
  },
  {
    id: 2,
    src: '/assets/images/car-images/ford-minibus-front.jpeg',
    alt: 'Private Hire Ford Minibus Taxi Stoke-on-Trent to Manchester and London Heathrow Airports',
  },
  {
    id: 3,
    src: '/assets/images/car-images/seat-alhambra-mpv.png',
    alt: 'Executive Private Hire Car Stoke-on-Trent for Birmingham and East Midlands Airport Travel',
  },
];

export default function VehicleShowcase({ onWhatsApp }) {
  const [activeImage, setActiveImage] = useState(vehicleImages[0]);
  const [fade, setFade] = useState(false);

  const handleThumbClick = (img) => {
    if (img.id === activeImage.id) return;
    setFade(true);
    setTimeout(() => {
      setActiveImage(img);
      setFade(false);
    }, 180);
  };

  return (
    <section className="vehicle-showcase-section" id="vehicle">
      <div className="container-xl">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <Car size={14} />
            <span>Your Ride</span>
          </div>
          <h2 className="section-title-light">
            Meet <span className="text-blue-accent">Our Vehicle</span>
          </h2>
          <p className="section-subtitle-light">
            Travel in comfort and style in our pristine wheelchair accessible vehicle, maintained to immaculate British
            private hire standards.
          </p>
        </div>

        <div className="vehicle-detail-card p-4 p-lg-5">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="vehicle-gallery">
                <div className="vehicle-gallery-main rounded-4 overflow-hidden shadow-sm border border-light">
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className="w-100"
                    id="vehicleMainImg"
                    style={{
                      transition: 'opacity 0.2s ease',
                      opacity: fade ? 0 : 1,
                    }}
                  />
                </div>
                <div className="vehicle-gallery-thumbs">
                  {vehicleImages.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      className={`vehicle-thumb ${activeImage.id === img.id ? 'active' : ''}`}
                      onClick={() => handleThumbClick(img)}
                      aria-label={img.alt}
                    >
                      <img src={img.src} alt={img.alt} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="h3 fw-bold text-main mb-3">Impeccable Comfort &amp; Full Accessibility</h3>
              <p className="text-muted mb-4">
                Whether you are heading to Heathrow for an international flight, attending an important London
                business meeting, or travelling with family and wheelchair access requirements, enjoy a tranquil,
                smooth ride with our dedicated private hire vehicle.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="vehicle-feature-pill">
                  <Users size={16} style={{ color: 'var(--blue-primary)' }} />
                  <span>Up to 8 Passengers</span>
                </span>
                <span className="vehicle-feature-pill">
                  <Luggage size={16} style={{ color: 'var(--blue-primary)' }} />
                  <span>Up to 11 Suitcases</span>
                </span>
                <span className="vehicle-feature-pill">
                  <Zap size={16} style={{ color: 'var(--blue-primary)' }} />
                  <span>On-board Phone Chargers</span>
                </span>
                <span className="vehicle-feature-pill">
                  <CreditCard size={16} style={{ color: 'var(--blue-primary)' }} />
                  <span>Card &amp; Cash Accepted</span>
                </span>
                <span className="vehicle-feature-pill">
                  <Accessibility size={16} style={{ color: 'var(--blue-primary)' }} />
                  <span>Wheelchair Accessible Ramp</span>
                </span>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-3 vehicle-cta-group">
                <a href="#contact" className="btn-primary-blue">
                  <span>Book This Vehicle</span>
                  <ArrowRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={() =>
                    onWhatsApp(
                      'Hello, I would like to check availability for the wheelchair accessible taxi.'
                    )
                  }
                  className="btn-outline-blue"
                >
                  <MessageCircle size={16} />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
