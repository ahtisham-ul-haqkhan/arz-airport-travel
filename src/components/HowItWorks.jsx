'use client';

import React from 'react';
import { ArrowRightCircle, MapPin, Receipt, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-5 how-section-light" style={{ backgroundColor: 'var(--bg-alt)' }} id="how-it-works">
      <div className="container-xl py-4">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <ArrowRightCircle size={14} />
            <span>Simple Steps</span>
          </div>
          <h2 className="section-title-light">
            How It <span className="text-blue-accent">Works</span>
          </h2>
          <p className="section-subtitle-light">Booking your private hire taxi is quick and straightforward.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="how-step-card-light">
              <div className="how-step-number-light">01</div>
              <div className="brand-crest-light mb-3" style={{ width: 48, height: 48 }}>
                <MapPin size={22} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Step 1 — Tell Us Your Journey</h3>
              <p className="text-muted small mb-0">
                Enter your pickup location, destination, date, and time via our form or WhatsApp.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="how-step-card-light">
              <div className="how-step-number-light">02</div>
              <div className="brand-crest-light mb-3" style={{ width: 48, height: 48 }}>
                <Receipt size={22} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Step 2 — Receive Your Quote</h3>
              <p className="text-muted small mb-0">
                Get a competitive, fixed price quotation and confirmed availability promptly.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="how-step-card-light">
              <div className="how-step-number-light">03</div>
              <div className="brand-crest-light mb-3" style={{ width: 48, height: 48 }}>
                <ShieldCheck size={22} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Step 3 — Enjoy Your Ride</h3>
              <p className="text-muted small mb-0">
                Relax in comfortable seating with punctual door-to-door service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
