'use client';

import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function LegalModals({ activeModal, onClose }) {
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div
      className="modal"
      id="legalModalBackdrop"
      tabIndex="-1"
      style={{
        background: 'rgba(15,23,42,0.6)',
        display: 'block',
      }}
      role="dialog"
      onClick={(e) => {
        if (e.target.id === 'legalModalBackdrop') onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white border border-light rounded-4 shadow-lg">
          <div className="modal-header border-bottom border-light p-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              {activeModal === 'privacy' ? (
                <>
                  <ShieldCheck size={22} style={{ color: 'var(--blue-primary)' }} />
                  <h5 className="modal-title fw-bold text-main mb-0">Privacy Policy</h5>
                </>
              ) : (
                <>
                  <FileText size={22} style={{ color: 'var(--blue-primary)' }} />
                  <h5 className="modal-title fw-bold text-main mb-0">Terms of Private Hire</h5>
                </>
              )}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-circle p-1"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {activeModal === 'privacy' ? (
              <div className="text-secondary small lh-lg">
                <h6 className="fw-bold text-dark mb-2">1. Introduction</h6>
                <p>
                  ARZ Airport Travel is committed to protecting your personal data and ensuring confidentiality. This
                  Privacy Policy describes how we collect, use, and protect information when you book or enquire about
                  our private hire taxi and airport transfer services.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">2. Data We Collect</h6>
                <p>
                  When you submit an enquiry or booking request, we collect your name, email address, UK contact number,
                  pickup/dropoff locations, and any travel notes or flight numbers you supply.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">3. How We Use Your Information</h6>
                <p>
                  Your information is solely used to confirm availability, calculate fixed pricing, communicate trip
                  details, and provide punctual chauffeur services. We do not sell, rent, or share personal data with
                  unauthorized third parties.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">4. Data Security</h6>
                <p>
                  All data is handled following UK Data Protection standards and GDPR guidelines. If you wish to review
                  or delete your records, you may contact us directly via email at arzairporttravel@gmail.com.
                </p>
              </div>
            ) : (
              <div className="text-secondary small lh-lg">
                <h6 className="fw-bold text-dark mb-2">1. Booking &amp; Quotations</h6>
                <p>
                  All journeys arranged with ARZ Airport Travel are pre-booked private hire services. Quotations
                  provided represent agreed fixed fares based on specified routes, pickup points, and passenger counts.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">2. Flight Tracking &amp; Delays</h6>
                <p>
                  We monitor inbound flight schedules for all booked UK airport collections. In the event of flight
                  delays, pickup schedules are adjusted accordingly at no additional penalty fee.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">3. Luggage &amp; Safety Compliance</h6>
                <p>
                  Passengers must ensure that the number of travellers and baggage does not exceed the legal capacity of
                  the vehicle. All vehicles are smoke-free and licensed under UK local authority standards.
                </p>

                <h6 className="fw-bold text-dark mt-3 mb-2">4. Payment Methods</h6>
                <p>
                  We accept contactless credit/debit cards (Visa, Mastercard, Amex, Apple Pay, Google Pay) in-vehicle,
                  as well as cash and verified direct bank transfers.
                </p>
              </div>
            )}
          </div>

          <div className="modal-footer border-top border-light p-3 d-flex justify-content-end">
            <button type="button" className="btn btn-primary-blue" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
