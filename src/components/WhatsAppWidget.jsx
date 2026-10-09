'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import CONFIG from '@/config/config';

export default function WhatsAppWidget({ onWhatsApp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const chatRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        chatRef.current &&
        !chatRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSend = (text) => {
    const msg = (text || inputMessage).trim();
    if (!msg) return;
    onWhatsApp(msg);
    setInputMessage('');
    setIsOpen(false);
  };

  const handleChipClick = (intent) => {
    let msg = '';
    switch (intent) {
      case 'booking':
        msg = 'Hello ARZ Airport Travel, I would like to book a private taxi journey.';
        break;
      case 'airport':
        msg = 'Hello, I would like to request an airport transfer quote and availability.';
        break;
      case 'quote':
        msg = 'Hello, could you please provide a price quotation for a taxi journey?';
        break;
      case 'support':
        msg = 'Hello, I would like to speak to someone regarding a travel enquiry.';
        break;
      default:
        msg = 'Hello ARZ Airport Travel, I have an enquiry.';
    }
    handleSend(msg);
  };

  return (
    <aside className="wa-widget-container" id="whatsappWidget" aria-label="WhatsApp Widget">
      <div
        ref={chatRef}
        className={`wa-chat-window ${isOpen ? 'open' : ''}`}
        id="waChatWindow"
        role="dialog"
        aria-hidden={!isOpen}
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
        }}
      >
        <div className="wa-header" style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}>
          <div className="wa-header-left">
            <img
              src="/assets/logo/logo.png"
              alt="ARZ Airport Travel Logo"
              className="wa-avatar rounded-circle"
              style={{
                width: 42,
                height: 42,
                objectFit: 'cover',
                border: '2px solid #FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                flexShrink: 0,
              }}
            />
            <div className="wa-header-info">
              <h6 className="text-white fw-bold mb-0">ARZ Airport Travel</h6>
              <div className="wa-status-text">
                <span className="wa-status-indicator"></span>
                <span>Online Support &bull; {CONFIG.phoneNumber}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="wa-close-btn"
            id="waCloseBtn"
            aria-label="Close Chat"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="wa-chat-body" style={{ backgroundColor: '#F8FAFC' }}>
          <div
            className="wa-msg-bubble"
            style={{
              background: '#FFFFFF',
              color: 'var(--text-main)',
              border: '1px solid var(--border-light)',
            }}
          >
            <p className="mb-1">Hello! 👋 Welcome to ARZ Airport Travel.</p>
            <p className="mb-0">How can I help you today?</p>
            <div className="wa-msg-time text-muted">Just now</div>
          </div>

          <div className="wa-quick-replies">
            <button type="button" className="wa-chip" onClick={() => handleChipClick('booking')}>
              Book a Taxi
            </button>
            <button type="button" className="wa-chip" onClick={() => handleChipClick('airport')}>
              Airport Transfer
            </button>
            <button type="button" className="wa-chip" onClick={() => handleChipClick('quote')}>
              Get a Quote
            </button>
            <button type="button" className="wa-chip" onClick={() => handleChipClick('support')}>
              Speak to Driver
            </button>
          </div>
        </div>

        <div
          className="wa-chat-footer"
          style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}
        >
          <input
            type="text"
            className="wa-input"
            id="waMessageInput"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message here..."
            style={{ background: '#F1F5F9', color: 'var(--text-main)', borderColor: 'var(--border-light)' }}
          />
          <button
            type="button"
            className="wa-send-btn"
            id="waSendBtn"
            aria-label="Send WhatsApp message"
            onClick={() => handleSend()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="wa-trigger-btn"
        id="waTriggerBtn"
        aria-label="Open WhatsApp Chat"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.15c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.13.11-3.28-.78-2.6-1.07-4.26-3.7-4.39-3.87-.13-.18-1.06-1.41-1.06-2.69s.67-1.91.91-2.17c.24-.26.53-.32.71-.32.18 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.75 1.83.82 1.97.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.3-.13.58.17.28.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.92.28.14.47.22.54.34.07.11.07.67-.17 1.35z" />
        </svg>
      </button>
    </aside>
  );
}
