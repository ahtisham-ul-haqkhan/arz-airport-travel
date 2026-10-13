'use client';

import React, { useState } from 'react';
import {
  PlaneTakeoff,
  Plane,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Anchor,
  PlaneLanding,
  ShieldCheck,
  Luggage,
  CreditCard,
  Users,
} from 'lucide-react';

const airportData = [
  {
    id: 'man',
    code: 'MAN',
    name: 'Manchester Airport',
    price: '£75',
    type: 'Single / One-Way',
    carFare: '£75',
    minibusFare: '£100',
    destinationString: 'Manchester Airport (MAN)',
    waText: 'Hello, I need a fixed quote for Manchester Airport (MAN) - Car £75 / Minibus £100.',
  },
  {
    id: 'lpl',
    code: 'LPL',
    name: 'Liverpool John Lennon',
    price: '£85',
    type: 'Single / One-Way',
    carFare: '£85',
    minibusFare: '£125',
    destinationString: 'Liverpool Airport (LPL)',
    waText: 'Hello, I need a fixed quote for Liverpool Airport (LPL) - Car £85 / Minibus £125.',
  },
  {
    id: 'ema',
    code: 'EMA',
    name: 'East Midlands Airport',
    price: '£85',
    type: 'Single / One-Way',
    carFare: '£85',
    minibusFare: '£110',
    destinationString: 'East Midlands Airport (EMA)',
    waText: 'Hello, I need a fixed quote for East Midlands Airport (EMA) - Car £85 / Minibus £110.',
  },
  {
    id: 'lgw',
    code: 'LGW',
    name: 'London Gatwick Airport',
    price: '£325',
    type: 'Single / One-Way',
    carFare: '£325',
    minibusFare: '£355',
    destinationString: 'Gatwick Airport (LGW)',
    waText: 'Hello, I need a fixed quote for Gatwick Airport (LGW) - Car £325 / Minibus £355.',
  },
  {
    id: 'lhr',
    code: 'LHR',
    name: 'London Heathrow Airport',
    price: '£260',
    type: 'Single / One-Way',
    carFare: '£260',
    minibusFare: '£305',
    destinationString: 'Heathrow Airport (LHR)',
    waText: 'Hello, I need a fixed quote for Heathrow Airport (LHR) - Car £260 / Minibus £305.',
  },
  {
    id: 'bhx',
    code: 'BHX',
    name: 'Birmingham Airport',
    price: '£95',
    type: 'Single / One-Way',
    carFare: '£95',
    minibusFare: '£125',
    destinationString: 'Birmingham Airport (BHX)',
    waText: 'Hello, I need a fixed quote for Birmingham Airport (BHX) - Car £95 / Minibus £125.',
  },
  {
    id: 'sou',
    code: 'SOU',
    name: 'Southampton Cruise Terminal',
    price: '£360',
    type: 'Single / One-Way',
    isCruise: true,
    carFare: '£360',
    meetGreet: 'Included',
    destinationString: 'Southampton Cruise Terminal (SOU)',
    waText: 'Hello, I need a fixed quote for Southampton Cruise Terminal starting from £360.',
  },
];

export default function AirportPricesSection({ onSelectAirport, onWhatsApp }) {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (item, e) => {
    // If clicked directly on the buttons, let button handler work
    if (e.target.closest('button') || e.target.closest('a')) return;
    setActiveCardId(item.id);
    onSelectAirport(item.destinationString);
  };

  return (
    <section className="airport-prices-section" id="pricing">
      <div className="container-xl">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge-light mb-2">
            <PlaneTakeoff size={15} style={{ color: 'var(--blue-primary)' }} />
            <span>Transparent Airport Fares</span>
          </div>
          <h2 className="section-title-light">
            Fixed UK <span className="text-blue-accent">Airport Transfer Prices</span>
          </h2>
          <p className="section-subtitle-light" style={{ maxWidth: 680, margin: '0 auto' }}>
            Guaranteed fixed rates from Stoke-on-Trent, Newcastle-under-Lyme, Staffordshire &amp; UK nationwide. Flight
            tracking &amp; terminal meet &amp; greet included.
          </p>
        </div>

        {/* Airport Cards Grid (7 Selected Destinations) */}
        <div className="row g-2 g-sm-3 g-lg-4 justify-content-center">
          {airportData.map((item) => (
            <div key={item.id} className="col-6 col-lg-4">
              <div
                className={`airport-price-card-vip ${activeCardId === item.id ? 'card-active' : ''}`}
                onClick={(e) => handleCardClick(item, e)}
              >
                <div>
                  <div className="airport-card-header-vip">
                    {item.isCruise ? (
                      <span
                        className="airport-iata-chip"
                        style={{ background: '#ECFDF5', borderColor: '#A7F3D0', color: '#047857' }}
                      >
                        <Anchor size={14} />
                        <span>{item.code}</span>
                      </span>
                    ) : (
                      <span className="airport-iata-chip">
                        <Plane size={14} />
                        <span>{item.code}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="airport-name-title-vip">{item.name}</h3>
                  <div className="airport-price-hero-box">
                    <div>
                      <div className="airport-price-sublabel">Starting From</div>
                      <div className="airport-price-number">{item.price}</div>
                    </div>
                    <div className="text-end text-muted small fw-semibold">{item.type}</div>
                  </div>
                  <ul className="airport-card-features-list">
                    <li className="feat-highlight">
                      <CheckCircle size={14} />
                      <span>{item.isCruise ? 'Port & Terminal Chauffeur' : 'Flight Landing Tracked'}</span>
                    </li>
                    {item.isCruise ? (
                      <>
                        <li>
                          <span className="fare-label">Fixed Transfer Rate:</span>{' '}
                          <strong className="fare-price">{item.carFare}</strong>
                        </li>
                        <li>
                          <span className="fare-label">Meet &amp; Greet:</span>{' '}
                          <strong className="fare-price">{item.meetGreet}</strong>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <span className="fare-label">Car (1-3 passengers):</span>{' '}
                          <strong className="fare-price">{item.carFare}</strong>
                        </li>
                        <li>
                          <span className="fare-label">Minibus (4-8 passengers):</span>{' '}
                          <strong className="fare-price">{item.minibusFare}</strong>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="airport-card-actions">
                  <button
                    type="button"
                    className="btn-airport-book"
                    onClick={() => {
                      setActiveCardId(item.id);
                      onSelectAirport(item.destinationString);
                    }}
                  >
                    <span>Book Ride</span>
                    <ArrowRight size={15} />
                  </button>
                  <button
                    type="button"
                    className="btn-airport-wa"
                    title="Instant WhatsApp Quote"
                    onClick={() => onWhatsApp(item.waText)}
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Larger Groups Banner */}
        <div
          className="p-3 px-4 rounded-4 mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
          style={{
            background: 'rgba(37, 99, 235, 0.05)',
            border: '1px solid rgba(37, 99, 235, 0.15)',
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle p-2 bg-primary text-white flex-shrink-0"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={20} />
            </div>
            <div>
              <div className="fw-bold text-main small">Travelling in a Larger Party?</div>
              <div className="text-muted small">
                We can also access more vehicles upon request for larger groups!
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-medium text-nowrap align-self-start align-self-md-center"
            onClick={() =>
              onWhatsApp('Hello, I have a larger group and need to enquire about multiple vehicles.')
            }
          >
            Enquire for Larger Groups
          </button>
        </div>

        {/* Trust Ribbon Guarantee */}
        <div className="airport-trust-ribbon">
          <div className="row g-4 align-items-center text-center text-md-start">
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle p-2 bg-primary text-white flex-shrink-0"
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <PlaneLanding size={20} />
                </div>
                <div>
                  <div className="fw-bold text-main small">Flight Tracking</div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    No fee for flight delays
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle p-2 bg-success text-white flex-shrink-0"
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="fw-bold text-main small">Guaranteed Fare</div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    No surge meters
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle p-2 bg-primary text-white flex-shrink-0"
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Luggage size={20} />
                </div>
                <div>
                  <div className="fw-bold text-main small">11 Suitcases</div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    Generous boot space
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle p-2 bg-dark text-white flex-shrink-0"
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CreditCard size={20} />
                </div>
                <div>
                  <div className="fw-bold text-main small">Card &amp; Cash</div>
                  <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                    Contactless in car
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
