'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, X, MessageCircle } from 'lucide-react';

export default function BookingSuccessModal({ isOpen, data, onClose, onWhatsApp }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="modal"
      id="bookingSuccessModal"
      tabIndex="-1"
      style={{
        background: 'rgba(15,23,42,0.6)',
        display: 'block',
      }}
      role="dialog"
      onClick={(e) => {
        if (e.target.id === 'bookingSuccessModal') onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-white border border-light rounded-4 shadow-lg text-center p-4">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-circle p-1"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="my-3">
            <CheckCircle2 size={56} className="text-success mx-auto mb-3" />
            <h4 className="fw-bold text-main">Booking Enquiry Received!</h4>
            <p className="text-muted small">
              Thank you, <strong>{data.fullName}</strong>. Your travel request has been logged.
            </p>
            <div
              className="p-3 my-3 rounded-3"
              style={{ background: '#F8FAFC', border: '1px solid var(--border-light)' }}
            >
              <div className="text-muted small mb-1">Enquiry Reference Number</div>
              <div className="fw-bold fs-5 text-primary" id="successEnquiryRef">
                {data.refId}
              </div>
              <div className="text-muted small mt-2" id="successEnquiryDetails">
                {data.pickupLoc} ➔ {data.dropoffLoc} ({data.pickupDate} @ {data.pickupTime})
              </div>
            </div>
            <p className="text-muted small mb-4">
              Your driver will review your route and contact you promptly via WhatsApp / phone with your confirmed fixed
              quotation.
            </p>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="btn-whatsapp-light w-100 py-2"
                onClick={() => {
                  onClose();
                  onWhatsApp();
                }}
              >
                <MessageCircle size={18} />
                <span>Message Driver on WhatsApp</span>
              </button>
              <button type="button" className="btn btn-outline-secondary rounded-pill py-2" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
