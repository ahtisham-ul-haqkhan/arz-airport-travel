'use client';

import React from 'react';
import {
  Check,
  UserCheck,
  Clock,
  Sparkles,
  Receipt,
  Plane,
  MessageCircle,
} from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="why-section-light" id="why">
      <div className="container-xl">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <Check size={14} />
            <span>Reliable &amp; Professional</span>
          </div>
          <h2 className="section-title-light">
            Why Ride with <span className="text-blue-accent">ARZ Airport Travel</span>
          </h2>
          <p className="section-subtitle-light">
            You receive direct, attentive care from an experienced, DBS-checked professional UK private hire chauffeur.
          </p>
        </div>

        <div className="row g-2 g-md-4">
          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <UserCheck size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Direct Driver Care</h3>
              <p className="text-muted small mb-0">
                No automated dispatch centers or confusion. You deal directly with your reliable driver for clear
                communication.
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <Clock size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Punctual Pickups</h3>
              <p className="text-muted small mb-0">
                We plan routes in advance using live traffic data so you never have to worry about missing an
                appointment or flight.
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <Sparkles size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Spotless Car</h3>
              <p className="text-muted small mb-0">
                Our vehicle is valeted, sanitised, and kept in pristine mechanical condition for every passenger.
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <Receipt size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Fixed Quotations</h3>
              <p className="text-muted small mb-0">
                Transparent fixed pricing agreed before departure. No hidden meter surges or unexpected charges.
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <Plane size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Flight Monitoring</h3>
              <p className="text-muted small mb-0">
                We track your inbound flight to accommodate delays, giving you peace of mind from departure to arrival.
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="why-card-light">
              <div className="why-icon-light">
                <MessageCircle size={24} />
              </div>
              <h3 className="h5 fw-bold text-main mb-2">Fast WhatsApp Support</h3>
              <p className="text-muted small mb-0">
                Quick quotes and instant journey updates directly via WhatsApp for effortless travel planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
