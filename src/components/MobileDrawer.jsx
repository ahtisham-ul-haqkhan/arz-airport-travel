'use client';

import React from 'react';
import { Phone, Mail, X, MessageCircle } from 'lucide-react';
import CONFIG from '@/config/config';

export default function MobileDrawer({ isOpen, onClose, onWhatsApp }) {
  const handleLinkClick = (e, targetId) => {
    onClose();
  };

  return (
    <>
      <div
        className={`mobile-drawer-overlay ${isOpen ? 'active' : ''}`}
        id="mobileDrawerOverlay"
        onClick={onClose}
      />
      <aside
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        id="mobileDrawer"
        style={{ background: '#FFFFFF', borderLeft: '1px solid var(--border-light)' }}
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="pb-3 border-bottom border-light mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <img src="/assets/logo/logo.png" alt="ARZ Logo" className="rounded-circle drawer-logo-img" />
              <div>
                <div className="brand-main-name-light drawer-brand-name">ARZ</div>
                <div className="brand-sub-name-light drawer-brand-sub">Airport Travel</div>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary rounded-circle p-1"
              id="closeDrawerBtn"
              aria-label="Close Menu"
              onClick={onClose}
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Contact Box in Mobile Sidenav */}
          <div className="drawer-contact-info-card mt-3 p-3 rounded-3">
            <a
              href={`tel:${CONFIG.phoneRaw}`}
              className="drawer-contact-row text-decoration-none d-flex align-items-center gap-2 mb-2"
            >
              <Phone size={16} style={{ color: 'var(--blue-primary)' }} />
              <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                {CONFIG.phoneNumber}
              </span>
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="drawer-contact-row text-decoration-none d-flex align-items-center gap-2"
            >
              <Mail size={16} style={{ color: 'var(--blue-primary)' }} />
              <span className="text-secondary" style={{ fontSize: '0.84rem', wordBreak: 'break-all' }}>
                {CONFIG.email}
              </span>
            </a>
          </div>
        </div>

        <nav className="d-flex flex-column gap-2 mb-4">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Home
          </a>
          <a
            href="#vehicle"
            onClick={(e) => handleLinkClick(e, 'vehicle')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            The Vehicle
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleLinkClick(e, 'gallery')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Gallery
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleLinkClick(e, 'pricing')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Airport Transfers
          </a>
          <a
            href="#why"
            onClick={(e) => handleLinkClick(e, 'why')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Why Choose Us
          </a>
          <a
            href="#reviews"
            onClick={(e) => handleLinkClick(e, 'reviews')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Reviews
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="mobile-nav-link text-dark py-2 px-3 rounded text-decoration-none fw-semibold"
          >
            Contact
          </a>
        </nav>

        <div className="mt-auto d-flex flex-column gap-2 pt-3 border-top border-light">
          <a
            href={`tel:${CONFIG.phoneRaw}`}
            className="btn btn-outline-dark rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
          >
            <Phone size={16} style={{ color: 'var(--blue-primary)' }} />
            <span>Call {CONFIG.phoneNumber}</span>
          </a>
          <a
            href={`mailto:${CONFIG.email}`}
            className="btn btn-outline-primary rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
            style={{ borderColor: 'var(--blue-border)', background: 'var(--blue-light)' }}
          >
            <Mail size={16} style={{ color: 'var(--blue-primary)' }} />
            <span>Email Us</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onWhatsApp('Hello ARZ Airport Travel, I would like to book a private taxi journey.');
            }}
            className="btn-whatsapp-light rounded-pill py-2 w-100"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </button>
          <a
            href="#contact"
            onClick={onClose}
            className="btn-primary-blue rounded-pill py-2 text-center"
          >
            <span>Book Your Ride</span>
          </a>
        </div>
      </aside>
    </>
  );
}
