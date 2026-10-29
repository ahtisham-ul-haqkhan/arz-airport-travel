import React from 'react';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, MessageCircle, Home, Clock, ShieldCheck, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Thank You | ARZ Airport Travel | Airport Transfers Stoke-on-Trent',
  description: 'Thank you for your enquiry with ARZ Airport Travel. Our team will review your travel details and contact you shortly with your fixed price quote.',
  robots: 'noindex, follow',
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', background: 'linear-gradient(180deg, #f0f4fa 0%, #ffffff 100%)', paddingTop: '130px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '48px 36px',
              boxShadow: '0 20px 45px rgba(27, 42, 74, 0.08)',
              border: '1px solid rgba(27, 42, 74, 0.08)',
              textAlign: 'center',
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                width: '88px',
                height: '88px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16a34a',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.25)',
              }}
            >
              <CheckCircle2 size={52} strokeWidth={2.4} />
            </div>

            <span
              style={{
                display: 'inline-block',
                background: '#e0f2fe',
                color: '#0284c7',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '999px',
                marginBottom: '16px',
              }}
            >
              Enquiry Received
            </span>

            <h1
              style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
                fontWeight: 800,
                color: '#1a2332',
                marginBottom: '14px',
                lineHeight: 1.25,
              }}
            >
              Thank You for Contacting <span style={{ color: '#0d6efd' }}>ARZ Airport Travel</span>!
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#64748b',
                lineHeight: 1.65,
                maxWidth: '600px',
                margin: '0 auto 28px',
              }}
            >
              We have received your transfer enquiry. Our licensed driver will review your route and contact you shortly with your guaranteed fixed price quote and vehicle availability.
            </p>

            {/* Feature reassurance badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                background: '#f8fafc',
                padding: '18px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                marginBottom: '32px',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="#0d6efd" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a2332' }}>Fast Response</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Within 10-15 mins</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#16a34a" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a2332' }}>Fixed Price</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>No hidden surges</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={20} color="#f59e0b" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a2332' }}>DBS Verified</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Licensed operator</div>
                </div>
              </div>
            </div>

            {/* Need immediate response */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem', marginBottom: '14px' }}>
                Need an urgent airport pickup or instant booking?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                <a
                  href="https://wa.me/447828533942?text=Hello%20ARZ%20Airport%20Travel%2C%20I%20have%20just%20submitted%20an%20enquiry%20on%20your%20website%20and%20need%20an%20urgent%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '12px 24px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.95rem',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                    border: 'none',
                    textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>

                <a
                  href="tel:+447828533942"
                  className="btn"
                  style={{
                    background: '#0d6efd',
                    color: '#ffffff',
                    fontWeight: 700,
                    padding: '12px 24px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.95rem',
                    boxShadow: '0 8px 20px rgba(13, 110, 253, 0.25)',
                    border: 'none',
                    textDecoration: 'none',
                  }}
                >
                  <PhoneCall size={18} /> Call +44 7828 533942
                </a>
              </div>
            </div>

            <hr style={{ borderColor: '#e2e8f0', margin: '24px 0' }} />

            <div>
              <Link
                href="/"
                style={{
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <Home size={16} /> Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
