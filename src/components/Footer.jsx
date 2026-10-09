'use client';

import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
  Accessibility,
  Tag,
  UserCheck,
  Compass,
  ChevronRight,
  PlaneTakeoff,
  Plane,
  Headphones,
  MapPin,
  CreditCard,
  Smartphone,
  Wifi,
  Banknote,
  ArrowUp,
} from 'lucide-react';
import CONFIG from '@/config/config';

export default function Footer({ onWhatsApp, onOpenPrivacy, onOpenTerms }) {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer-advanced" id="footer">
      <div className="container-xl">
        {/* VIP CTA Banner Ribbon with 24/7 Live Status */}
        <div className="footer-vip-cta-banner">
          <div className="footer-vip-cta-text">
            <div className="footer-live-status-pill mb-2">
              <span className="live-pulse-dot"></span>
              <span>24/7 Dispatch Active &bull; Fixed Rates Guaranteed</span>
            </div>
            <h3>Need an Immediate Airport or Door-to-Door Transfer?</h3>
            <p>
              Book online now or connect directly with Driver Zafar via WhatsApp / Call for instant fixed rates &amp;
              booking confirmation.
            </p>
          </div>
          <div className="footer-vip-cta-actions">
            <a href={`tel:${CONFIG.phoneRaw}`} className="btn-footer-call">
              <PhoneCall size={18} />
              <span>Call {CONFIG.phoneNumber}</span>
            </a>
            <button
              type="button"
              onClick={() => onWhatsApp()}
              className="btn-footer-whatsapp border-0"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Driver</span>
            </button>
            <a href="#contact" className="btn-footer-book">
              <CalendarCheck size={18} />
              <span>Book Online</span>
            </a>
          </div>
        </div>

        {/* Main Footer Cards Grid (4 Columns) */}
        <div className="row g-4">
          {/* Col 1: Executive Brand & Trust Badges */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-glass-card-advanced h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="footer-logo-ring">
                  <img src="/assets/logo/logo.png" alt="ARZ Airport Travel Logo" className="footer-brand-logo" />
                </div>
                <div>
                  <div className="brand-main-name-light">ARZ</div>
                  <div className="brand-sub-name-light">Airport Travel</div>
                </div>
              </div>
              <p className="footer-brand-desc mb-4">
                Licensed by Stoke-on-Trent City Council &bull; Newcastle-under-Lyme Borough Council.
                Fully insured private hire vehicle with public liability and enhanced DBS-checked professional chauffeur. Delivering punctual 24/7 airport transfers across the UK.
              </p>
              <div className="footer-trust-badges-grid">
                <div className="trust-badge-pill">
                  <ShieldCheck className="trust-icon text-success" />
                  <span>Stoke Council Licensed</span>
                </div>
                <div className="trust-badge-pill">
                  <Accessibility className="trust-icon text-info" />
                  <span>Wheelchair Ramp &amp; Safety</span>
                </div>
                <div className="trust-badge-pill">
                  <Tag className="trust-icon text-warning" />
                  <span>Fully Insured &amp; Liability</span>
                </div>
                <div className="trust-badge-pill">
                  <UserCheck className="trust-icon text-primary" />
                  <span>Enhanced DBS Checked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-lg-2 col-sm-6">
            <div className="footer-glass-card-advanced h-100">
              <h4>
                <Compass className="footer-heading-icon" />
                <span>Navigation</span>
              </h4>
              <ul className="footer-link-pill-list">
                <li>
                  <a href="#hero">
                    <ChevronRight size={14} /> Home
                  </a>
                </li>
                <li>
                  <a href="#vehicle">
                    <ChevronRight size={14} /> Our Vehicle
                  </a>
                </li>
                <li>
                  <a href="#pricing">
                    <ChevronRight size={14} /> Airport Transfers
                  </a>
                </li>
                <li>
                  <a href="#pricing">
                    <ChevronRight size={14} /> Fixed Fares
                  </a>
                </li>
                <li>
                  <a href="#why">
                    <ChevronRight size={14} /> Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <ChevronRight size={14} /> Book Your Ride
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: UK Airports Covered */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-glass-card-advanced h-100">
              <h4>
                <PlaneTakeoff className="footer-heading-icon" />
                <span>Airports Covered</span>
              </h4>
              <div className="footer-airport-pills-grid">
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>Manchester (MAN)</span>
                </div>
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>London Heathrow (LHR)</span>
                </div>
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>Birmingham (BHX)</span>
                </div>
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>London Gatwick (LGW)</span>
                </div>
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>East Midlands (EMA)</span>
                </div>
                <div className="airport-pill">
                  <Plane className="airport-icon" size={14} />
                  <span>London Stansted (STN)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Direct 24/7 Support & Payment Methods */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-glass-card-advanced h-100 d-flex flex-column justify-content-between">
              <div>
                <h4>
                  <Headphones className="footer-heading-icon" />
                  <span>Direct Support</span>
                </h4>
                <div className="d-flex flex-column gap-2 mb-3">
                  <a href={`tel:${CONFIG.phoneRaw}`} className="footer-info-item-box text-decoration-none">
                    <PhoneCall size={20} style={{ color: '#60A5FA', flexShrink: 0 }} />
                    <div>
                      <div className="footer-info-label">Direct Hotline / Phone</div>
                      <div className="footer-info-val text-white">{CONFIG.phoneNumber}</div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => onWhatsApp()}
                    className="footer-info-item-box text-decoration-none border-0 text-start w-100"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', cursor: 'pointer' }}
                  >
                    <MessageCircle size={20} style={{ color: '#25D366', flexShrink: 0 }} />
                    <div>
                      <div className="footer-info-label">Instant Messaging</div>
                      <div className="footer-info-val text-success">WhatsApp Chat Support &rarr;</div>
                    </div>
                  </button>
                  <div className="footer-info-item-box">
                    <MapPin size={20} style={{ color: '#F59E0B', flexShrink: 0 }} />
                    <div>
                      <div className="footer-info-label">Base Location</div>
                      <div className="footer-info-val text-white-50" style={{ fontSize: '0.8rem' }}>
                        Stoke-on-Trent, Staffordshire &amp; UK Wide
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Badges */}
              <div className="footer-payments-block pt-2">
                <div className="footer-payments-title">Accepted Payment Methods</div>
                <div className="footer-payment-badges">
                  <span className="pay-badge">
                    <CreditCard size={14} /> Visa
                  </span>
                  <span className="pay-badge">
                    <CreditCard size={14} /> Mastercard
                  </span>
                  <span className="pay-badge">
                    <Smartphone size={14} /> Apple Pay
                  </span>
                  <span className="pay-badge">
                    <Smartphone size={14} /> Google Pay
                  </span>
                  <span className="pay-badge">
                    <Wifi size={14} /> Contactless
                  </span>
                  <span className="pay-badge">
                    <Banknote size={14} /> Cash
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Footer Bottom Bar */}
        <div className="footer-bottom-advanced">
          <div className="footer-copyright">
            &copy; <span id="currentYear">{year}</span> <strong>ARZ Airport Travel</strong>. All rights reserved. Licensed
            by Stoke-on-Trent City Council Private Hire Operator &bull; Fully Insured with Public Liability.
          </div>
          <div className="footer-bottom-links">
            <button
              type="button"
              className="btn btn-link p-0 text-white-50 text-decoration-none small hover-underline"
              onClick={onOpenPrivacy}
            >
              Privacy Policy
            </button>
            <span className="dot-sep">&bull;</span>
            <button
              type="button"
              className="btn btn-link p-0 text-white-50 text-decoration-none small hover-underline"
              onClick={onOpenTerms}
            >
              Terms of Private Hire
            </button>
            <span className="dot-sep">&bull;</span>
            <a href="#vehicle" className="text-white-50 text-decoration-none small">
              Wheelchair Accessibility
            </a>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-footer-scroll-top"
            title="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
