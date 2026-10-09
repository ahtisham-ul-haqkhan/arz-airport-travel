'use client';

import React, { useEffect } from 'react';
import { FileCheck, X, MessageCircle, Send } from 'lucide-react';

export default function BookingSummaryModal({
  isOpen,
  data,
  onClose,
  onConfirm,
  onWhatsApp,
}) {
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
      id="bookingSummaryModal"
      tabIndex="-1"
      style={{
        background: 'rgba(15,23,42,0.6)',
        display: 'block',
      }}
      role="dialog"
      onClick={(e) => {
        if (e.target.id === 'bookingSummaryModal') onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white border border-light rounded-4 shadow-lg">
          <div className="modal-header border-bottom border-light p-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FileCheck size={22} style={{ color: 'var(--blue-primary)' }} />
              <h5 className="modal-title fw-bold text-main mb-0">Booking Enquiry Summary</h5>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary close-summary-modal rounded-circle p-1"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <div className="modal-body p-4" id="summaryModalContent">
            <div
              className="booking-summary-box p-3"
              style={{
                background: '#081124',
                borderRadius: 12,
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
                <span className="badge bg-warning text-dark fw-bold text-uppercase px-2 py-1">
                  {data.journeyType}
                </span>
                <span className="text-white-50 small">
                  Enquiry Ref: <strong style={{ color: '#D4AF37' }}>{data.refId}</strong>
                </span>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12">
                  <div className="small text-white-50">From (Pickup):</div>
                  <div className="fw-bold text-white fs-6">📍 {data.pickupLoc}</div>
                </div>
                <div className="col-12">
                  <div className="small text-white-50">To (Destination):</div>
                  <div className="fw-bold text-white fs-6">🏁 {data.dropoffLoc}</div>
                </div>
              </div>

              <div
                className="row g-2 mb-3 py-2"
                style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}
              >
                <div className="col-6">
                  <div className="small text-white-50">Pickup Date &amp; Time:</div>
                  <div className="fw-semibold text-white">
                    {data.pickupDate} at {data.pickupTime}
                  </div>
                </div>
                {data.returnDate ? (
                  <div className="col-6">
                    <div className="small text-white-50">Return Date &amp; Time:</div>
                    <div className="fw-semibold text-white">
                      {data.returnDate} at {data.returnTime}
                    </div>
                  </div>
                ) : (
                  <div className="col-6">
                    <div className="small text-white-50">Trip Format:</div>
                    <div className="fw-semibold text-white">Direct Transfer</div>
                  </div>
                )}
              </div>

              <div className="row g-2 mb-3">
                <div className="col-4">
                  <div className="small text-white-50">Vehicle:</div>
                  <div className="fw-semibold small" style={{ color: '#D4AF37' }}>
                    {data.vehicleName}
                  </div>
                </div>
                <div className="col-4">
                  <div className="small text-white-50">Passengers:</div>
                  <div className="fw-semibold text-white">👥 {data.passengers}</div>
                </div>
                <div className="col-4">
                  <div className="small text-white-50">Luggage:</div>
                  <div className="fw-semibold text-white">🧳 {data.luggage} bags</div>
                </div>
              </div>

              <div className="p-2 border-top border-secondary pt-2">
                <div className="small text-white-50">Passenger Contact:</div>
                <div className="text-white fw-semibold">
                  {data.fullName} &bull; {data.phone}
                </div>
                <div className="text-white-50 small">{data.email}</div>
                {data.notes && data.notes !== 'None specified' && (
                  <div className="mt-2 small text-light fst-italic">
                    Special Requests: &quot;{data.notes}&quot;
                  </div>
                )}
              </div>
            </div>

            <div
              className="alert alert-info mt-3 py-2 small d-flex align-items-center gap-2"
              style={{
                background: 'rgba(16, 31, 61, 0.9)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                color: '#CAD5E2',
              }}
            >
              <span>ℹ️</span>
              <div>
                This is a <strong>booking enquiry request</strong>. Our team calculates the exact fixed price and assigns
                professional drivers upon confirmation.
              </div>
            </div>
          </div>

          <div className="modal-footer border-top border-light p-3 d-flex flex-wrap justify-content-between gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary close-summary-modal"
              onClick={onClose}
            >
              Back / Edit
            </button>
            <div className="d-flex gap-2 modal-action-group">
              <button
                type="button"
                className="btn-whatsapp-light"
                id="btnSendWhatsAppBooking"
                onClick={onWhatsApp}
              >
                <MessageCircle size={16} />
                <span>Send via WhatsApp</span>
              </button>
              <button
                type="button"
                className="btn-primary-blue"
                id="btnConfirmEnquiry"
                onClick={onConfirm}
              >
                <span>Confirm &amp; Send Request</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
