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
  Star,
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

          {/* Google Reviews Badge */}
          <div className="google-reviews-banner">
            {/* Google "G" logo */}
            <svg className="g-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="stars">★★★★★</span>
            <span className="rating-text">5.0</span>
            <span className="reviews-count">· 26 Google Reviews</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="arz-stats-strip mb-5">
          <div className="arz-stat-item">
            <div className="arz-stat-number">26</div>
            <div className="arz-stat-label">Google Reviews</div>
          </div>
          <div className="arz-stat-item">
            <div className="arz-stat-number">5.0★</div>
            <div className="arz-stat-label">Average Rating</div>
          </div>
          <div className="arz-stat-item">
            <div className="arz-stat-number">24/7</div>
            <div className="arz-stat-label">Service Available</div>
          </div>
          <div className="arz-stat-item">
            <div className="arz-stat-number">6+</div>
            <div className="arz-stat-label">UK Airports Covered</div>
          </div>
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
