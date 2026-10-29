'use client';

import React, { useState, useEffect } from 'react';
import {
  PlaneTakeoff,
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  Car,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  ChevronDown,
  Sparkles,
  Accessibility,
  UserCheck,
  Ticket,
  Train,
} from 'lucide-react';
import CONFIG from '@/config/config';

const stokeAreas = [
  'Stoke-on-Trent (Hanley City Centre)',
  'Newcastle-under-Lyme',
  'Trentham',
  'Longton',
  'Fenton',
  'Tunstall',
  'Burslem',
  'Keele',
  'Biddulph',
  'Kidsgrove',
  'Stone',
  'Leek',
  'Stoke-on-Trent Railway Station',
  'Staffordshire Address',
];

const popularDestinations = [
  'Manchester Airport (MAN)',
  'London Heathrow Airport (LHR)',
  'Birmingham Airport (BHX)',
  'East Midlands Airport (EMA)',
  'London Gatwick Airport (LGW)',
  'Liverpool John Lennon Airport (LPL)',
  'London Stansted Airport (STN)',
  'London Luton Airport (LTN)',
];

export default function HeroSection({ onWhatsApp, showToast }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [fullName, setFullName] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setMinDate(formatted);
    setPickupDate(formatted);

    // Default time: 2 hours from now
    const future = new Date(today.getTime() + 2 * 60 * 60 * 1000);
    const hours = String(future.getHours()).padStart(2, '0');
    const mins = String(future.getMinutes()).padStart(2, '0');
    setPickupTime(`${hours}:${mins}`);
  }, []);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();

    const pickup = pickupLocation.trim();
    const dropoff = destination.trim();

    if (!pickup || !dropoff) {
      if (showToast) {
        showToast('Please enter both a pickup location and destination for your quote.', 'error');
      } else {
        alert('Please enter both a pickup location and destination for your quote.');
      }
      return;
    }

    const nameStr = fullName.trim();
    const message =
      `Hello ARZ Airport Travel, I would like to get an instant quote from your website:\n\n` +
      (nameStr ? `👤 Name: ${nameStr}\n` : '') +
      `📍 Pickup: ${pickup}\n` +
      `✈️ Destination: ${dropoff}\n` +
      `📅 Date: ${pickupDate || 'Flexible'}\n` +
      `⏰ Time: ${pickupTime || 'Flexible'}\n` +
      `👥 Passengers: ${passengers}\n\n` +
      `Please let me know your fixed price quote and vehicle availability. Thank you!`;

    if (showToast) {
      showToast('Opening WhatsApp with your quote request...', 'success');
    }

    onWhatsApp(message);
  };

  return (
    <section className="hero-section-executive" id="hero">
      {/* Background Ambience & Gradient Layers */}
      <div className="hero-executive-overlay" aria-hidden="true" />

      <div className="container-xl hero-executive-content">
        <div className="row align-items-center g-4 g-xl-5">
          {/* ================================================================ */}
          {/* Hero Left Column: Brand Message & Key Value Props */}
          {/* ================================================================ */}
          <div className="col-lg-6 col-xl-7">
            {/* Top Luxury Pill Badge */}
            <div className="hero-luxury-badge">
              <span className="badge-star">★</span>
              <span>Taxi &amp; Minibus to All Major UK Airports</span>
            </div>

            {/* Display Headline */}
            <h1 className="hero-luxury-title mb-3">
              Airport Transfers <br />
              <span className="hero-blue-gradient">Stoke-on-Trent</span>{' '}
              <span className="hero-title-247">24/7</span>
            </h1>

            {/* Lead Subtitle (Original Content Preserved) */}
            <p className="hero-luxury-subtitle mb-4">
              Premium 24/7 airport transfers &amp; private hire taxi across Stoke-on-Trent, Staffordshire &amp; UK
              nationwide — specializing in direct journeys to{' '}
              <strong className="text-white">Manchester, Heathrow, Birmingham &amp; East Midlands airports</strong>, with wheelchair accessible
              vehicles available.
            </p>

            {/* CTA Group: Book Your Ride & WhatsApp Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4 mb-xl-5 hero-cta-group">
              <a href="#booking" className="btn-primary-blue-bold">
                <span>Book Your Ride</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={() =>
                  onWhatsApp(
                    'Hello ARZ Airport Travel, I would like to book a private taxi journey.'
                  )
                }
                className="btn-whatsapp-bold"
                title="Chat on WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" className="me-1">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.15c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.13.11-3.28-.78-2.6-1.07-4.26-3.7-4.39-3.87-.13-.18-1.06-1.41-1.06-2.69s.67-1.91.91-2.17c.24-.26.53-.32.71-.32.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.75 1.83.82 1.97.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.3-.13.58.17.28.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.92.28.14.47.22.54.34.07.11.07.67-.17 1.35z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href={`tel:${CONFIG.phoneRaw}`}
                className="btn-hero-phone"
                title={`Call ARZ Airport Travel on ${CONFIG.phoneNumber}`}
              >
                <PhoneCall size={18} strokeWidth={2.5} className="text-primary" />
                <span>{CONFIG.phoneNumber}</span>
              </a>
            </div>

            {/* Feature Highlights Grid (Responsive 6 Cards - Dark Glassmorphism) */}
            <div className="row g-2 g-md-3 pt-3 border-top border-white border-opacity-15">
              {/* 1. Personal Driver */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <UserCheck size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Personal Driver
                    </div>
                    <div className="hero-feature-sub-executive">
                      Licensed &amp; DBS Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Airport Transfers */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <PlaneTakeoff size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Airport Transfers
                    </div>
                    <div className="hero-feature-sub-executive">
                      Manchester, Heathrow, BHX &amp; EMA
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Party Bookings */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <Sparkles size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Party Bookings
                    </div>
                    <div className="hero-feature-sub-executive">
                      Events &amp; Nights Out
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Theme Parks */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <Ticket size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Theme Parks
                    </div>
                    <div className="hero-feature-sub-executive">
                      Alton Towers &amp; Parks
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Train Stations */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <Train size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Train Stations
                    </div>
                    <div className="hero-feature-sub-executive">
                      Stoke, Crewe &amp; Rail
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Wheelchair Access */}
              <div className="col-6 col-md-4">
                <div className="hero-feature-card-executive">
                  <div className="feature-icon-box-executive">
                    <Accessibility size={19} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="hero-feature-title-executive">
                      Wheelchair Access
                    </div>
                    <div className="hero-feature-sub-executive">
                      Ramp &amp; Safety Spec
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* Hero Right Column: Instant Price Quote Floating Card */}
          {/* ================================================================ */}
          <div className="col-lg-6 col-xl-5">
            <div className="hero-quote-card">
              {/* Card Header with Icon */}
              <div className="d-flex align-items-center gap-3 mb-3 pb-1">
                <div className="quote-header-icon">
                  <PlaneTakeoff size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="quote-header-title mb-0">Instant Price Quote</h2>
                  <p className="quote-header-subtitle mb-0">Fixed, transparent quotes in seconds</p>
                </div>
              </div>

              {/* Datalist Options for Quick Autocomplete */}
              <datalist id="heroPickupSuggestions">
                {stokeAreas.map((area, idx) => (
                  <option key={idx} value={area} />
                ))}
              </datalist>

              <datalist id="heroDestinationSuggestions">
                {popularDestinations.map((dest, idx) => (
                  <option key={idx} value={dest} />
                ))}
              </datalist>

              {/* Instant Quote Form */}
              <form onSubmit={handleQuoteSubmit}>
                {/* Row 1: Pickup & Destination */}
                <div className="row g-2 g-sm-3 mb-2">
                  {/* Pickup Location */}
                  <div className="col-12 col-sm-6">
                    <div className="quote-field-group">
                      <label className="quote-field-label" htmlFor="heroPickup">
                        PICKUP LOCATION
                      </label>
                      <div className="quote-input-wrapper">
                        <MapPin size={17} className="quote-input-icon" />
                        <input
                          id="heroPickup"
                          type="text"
                          className="quote-input"
                          placeholder="Cheltenham, Gloucester..."
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          list="heroPickupSuggestions"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="col-12 col-sm-6">
                    <div className="quote-field-group">
                      <label className="quote-field-label" htmlFor="heroDestination">
                        DESTINATION
                      </label>
                      <div className="quote-input-wrapper">
                        <PlaneTakeoff size={17} className="quote-input-icon" />
                        <input
                          id="heroDestination"
                          type="text"
                          className="quote-input"
                          placeholder="LHR, LGW, Birmingham..."
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          list="heroDestinationSuggestions"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Date, Time & Passengers */}
                <div className="row g-2 g-sm-3 mb-2">
                  {/* Date */}
                  <div className="col-6 col-sm-4">
                    <div className="quote-field-group">
                      <label className="quote-field-label" htmlFor="heroDate">
                        DATE
                      </label>
                      <div className="quote-input-wrapper">
                        <Calendar size={17} className="quote-input-icon" />
                        <input
                          id="heroDate"
                          type="date"
                          className="quote-input"
                          min={minDate}
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="col-6 col-sm-4">
                    <div className="quote-field-group">
                      <label className="quote-field-label" htmlFor="heroTime">
                        TIME
                      </label>
                      <div className="quote-input-wrapper">
                        <Clock size={17} className="quote-input-icon" />
                        <input
                          id="heroTime"
                          type="time"
                          className="quote-input"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="col-12 col-sm-4">
                    <div className="quote-field-group">
                      <label className="quote-field-label" htmlFor="heroPassengers">
                        PASSENGERS
                      </label>
                      <div className="quote-input-wrapper">
                        <Users size={17} className="quote-input-icon" />
                        <select
                          id="heroPassengers"
                          className="quote-select"
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8 (Minibus)</option>
                        </select>
                        <ChevronDown size={16} className="quote-select-chevron" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Your Name */}
                <div className="quote-field-group mb-3">
                  <label className="quote-field-label" htmlFor="heroFullName">
                    YOUR NAME
                  </label>
                  <div className="quote-input-wrapper">
                    <User size={17} className="quote-input-icon" />
                    <input
                      id="heroFullName"
                      type="text"
                      className="quote-input"
                      placeholder="e.g. John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="btn-get-quote shimmer-effect"
                  title="Get Instant Price Quote"
                >
                  <span>Get My Quote</span>
                  <ArrowRight size={19} strokeWidth={2.5} />
                </button>
              </form>

              {/* Quote Trust Guarantee Footer */}
              <div className="quote-trust-footer mt-3">
                <span>FIXED PRICES</span>
                <span className="dot">•</span>
                <span>24/7 SERVICE</span>
                <span className="dot">•</span>
                <span>LICENSED DRIVERS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
