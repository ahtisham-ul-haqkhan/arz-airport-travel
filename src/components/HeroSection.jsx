'use client';

import React from 'react';
import {
  PlaneTakeoff,
  ArrowRight,
  UserCheck,
  Sparkles,
  Ticket,
  Train,
  Accessibility,
} from 'lucide-react';
import CONFIG from '@/config/config';

export default function HeroSection({ onWhatsApp }) {
  return (
    <section className="hero-section-light" id="hero">
      <div className="container-xl">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Hero Left Column */}
          <div className="col-lg-7">
            <div className="hero-badge-bold">
              <PlaneTakeoff size={17} strokeWidth={2.5} />
              <span>Taxi &amp; Minibus to All Major UK Airports</span>
            </div>

            <h1 className="display-3 hero-title-bold mb-3">
              Airport Transfers <br />
              <span className="text-blue-accent-gradient">Stoke-on-Trent</span>
            </h1>

            <p className="lead hero-subtitle-bold mb-4" style={{ maxWidth: 580, fontSize: '1.05rem', lineHeight: 1.55 }}>
              Premium 24/7 airport transfers &amp; private hire taxi across Stoke-on-Trent, Staffordshire &amp; UK
              nationwide — specializing in direct journeys to{' '}
              <strong>Manchester, Heathrow, Birmingham &amp; East Midlands airports</strong>, with wheelchair accessible
              vehicles available.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-4 mb-lg-5 hero-cta-group">
              <a href="#contact" className="btn-primary-blue-bold">
                <span>Book Your Ride</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={() => onWhatsApp('Hello ARZ Airport Travel, I would like to book a private taxi journey.')}
                className="btn-whatsapp-bold"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" className="me-1">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.15c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.13.11-3.28-.78-2.6-1.07-4.26-3.7-4.39-3.87-.13-.18-1.06-1.41-1.06-2.69s.67-1.91.91-2.17c.24-.26.53-.32.71-.32.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.75 1.83.82 1.97.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.3-.13.58.17.28.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.92.28.14.47.22.54.34.07.11.07.67-.17 1.35z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Feature Highlights Grid (Responsive 6 Cards) */}
            <div className="row g-2 g-md-3 pt-3 border-top border-2 border-light">
              {/* 6. Personal Driver */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <UserCheck size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Personal Driver
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Licensed &amp; DBS Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Airport Transfers */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <PlaneTakeoff size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Airport Transfers
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Manchester, Heathrow, BHX &amp; EMA
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Party Bookings */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <Sparkles size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Party Bookings
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Events &amp; Nights Out
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Theme Parks */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <Ticket size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Theme Parks
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Alton Towers &amp; Parks
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Train Station Transfers */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <Train size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Train Stations
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Stoke, Crewe &amp; Rail
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Wheelchair Access */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-bold">
                  <div className="feature-icon-wrapper-bold text-primary">
                    <Accessibility size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="fw-extrabold text-dark" style={{ fontSize: '0.85rem' }}>
                      Wheelchair Access
                    </div>
                    <div className="text-muted fw-semibold" style={{ fontSize: '0.74rem' }}>
                      Ramp &amp; Safety Spec
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Executive Car Photo Card */}
          <div className="col-lg-5">
            <div className="hero-light-car-card hero-car-card-bold">
              <div className="hero-status-tag">
                <span className="pulse-dot-green"></span>
                <span>Available Now &bull; {CONFIG.phoneNumber}</span>
              </div>
              <img
                src="/assets/images/car-images/ford-minibus-front.jpeg"
                alt="ARZ Airport Travel black Ford minibus private hire taxi"
                style={{ height: 380, objectFit: 'cover', objectPosition: 'center 45%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
