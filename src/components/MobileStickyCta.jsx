'use client';

import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import CONFIG from '@/config/config';

export default function MobileStickyCta() {
  return (
    <aside className="mobile-sticky-cta-light" aria-label="Mobile Action">
      <a href="#contact" className="btn-primary-blue flex-grow-1 text-center py-2">
        <span>Book Your Ride</span>
        <Calendar size={16} />
      </a>
      <a
        href={`tel:${CONFIG.phoneRaw}`}
        className="btn btn-outline-dark rounded-circle p-2"
        aria-label="Call Driver"
        title={`Call ${CONFIG.phoneNumber}`}
      >
        <Phone size={18} style={{ color: 'var(--blue-primary)' }} />
      </a>
    </aside>
  );
}
