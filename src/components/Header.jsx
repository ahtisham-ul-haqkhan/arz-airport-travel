'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, Menu } from 'lucide-react';
import CONFIG from '@/config/config';

export default function Header({ onOpenMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > 40);

      const sectionIds = ['hero', 'vehicle', 'gallery', 'pricing', 'why', 'reviews', 'contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header-wrapper fixed-top ${scrolled ? 'scrolled' : ''}`} id="siteHeader">
      {/* Sleek Top Contact Bar (Desktop & Mobile) */}
      <div className="header-top-bar">
        <div className="container-xl d-flex align-items-center justify-content-between py-1 px-3">
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <a href={`tel:${CONFIG.phoneRaw}`} className="top-contact-link" title="Call ARZ Airport Travel">
              <Phone className="top-icon" size={14} />
              <span className="fw-bold">{CONFIG.phoneNumber}</span>
            </a>
            <span className="top-bar-divider">•</span>
            <a href={`mailto:${CONFIG.email}`} className="top-contact-link" title="Email ARZ Airport Travel">
              <Mail className="top-icon" size={14} />
              <span>{CONFIG.email}</span>
            </a>
          </div>
          <div className="d-none d-md-flex align-items-center gap-3 top-bar-info">
            <span>
              <MapPin className="top-icon" size={14} /> Stoke-on-Trent &amp; UK Airports
            </span>
            <span className="top-bar-divider">•</span>
            <span className="badge-247">
              <Clock className="top-icon" size={14} /> 24/7 Available
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-main-nav">
        <div className="container-xl d-flex align-items-center justify-content-between py-2 px-3">
          {/* Brand Logo & Title */}
          <a
            href="#hero"
            className="d-flex align-items-center gap-2 gap-sm-3 text-decoration-none flex-shrink-0"
            aria-label="ARZ Airport Travel Homepage"
          >
            <img src="/assets/logo/logo.png" alt="ARZ Airport Travel Logo" className="header-logo-img" />
            <div>
              <div className="brand-main-name-light">ARZ</div>
              <div className="brand-sub-name-light">Airport Travel</div>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav-menu d-none d-lg-flex align-items-center gap-1 gap-xl-2" aria-label="Main Navigation">
            <a href="#hero" className={`nav-link-light ${activeSection === 'hero' ? 'active' : ''}`}>
              Home
            </a>
            <a href="#vehicle" className={`nav-link-light ${activeSection === 'vehicle' ? 'active' : ''}`}>
              The Vehicle
            </a>
            <a href="#gallery" className={`nav-link-light ${activeSection === 'gallery' ? 'active' : ''}`}>
              Gallery
            </a>
            <a href="#pricing" className={`nav-link-light ${activeSection === 'pricing' ? 'active' : ''}`}>
              Airport Transfers
            </a>
            <a href="#why" className={`nav-link-light ${activeSection === 'why' ? 'active' : ''}`}>
              Why Choose Us
            </a>
            <a href="#reviews" className={`nav-link-light ${activeSection === 'reviews' ? 'active' : ''}`}>
              Reviews
            </a>
            <a href="#contact" className={`nav-link-light ${activeSection === 'contact' ? 'active' : ''}`}>
              Contact
            </a>
          </nav>

          {/* Header Actions */}
          <div className="header-actions-desktop d-none d-lg-flex align-items-center gap-2 gap-xl-3">
            <a href={`tel:${CONFIG.phoneRaw}`} className="header-phone-pill-light" title="Direct Phone Call">
              <Phone size={15} style={{ color: 'var(--blue-primary)', flexShrink: 0 }} />
              <span className="fw-bold">{CONFIG.phoneNumber}</span>
            </a>
            <a
              href="#contact"
              className="btn-primary-blue-bold"
              id="headerBookBtn"
              style={{ padding: '9px 18px', fontSize: '0.88rem' }}
            >
              <span>Book Your Ride</span>
              <Calendar size={16} style={{ flexShrink: 0 }} />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="btn btn-outline-secondary d-lg-none p-2 border-0"
            id="mobileNavToggle"
            aria-label="Open menu"
            onClick={onOpenMobileMenu}
          >
            <Menu size={28} style={{ color: 'var(--text-main)' }} />
          </button>
        </div>
      </div>
    </header>
  );
}
