'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I book a taxi ride?',
    answer:
      'You can submit your pickup, destination, and timing via our booking form above, or click the WhatsApp chat button for instant enquiry assistance.',
  },
  {
    id: 2,
    question: 'Can I book an airport transfer?',
    answer:
      'Yes, we provide dedicated airport transfers covering Heathrow, Gatwick, Manchester, Birmingham, Stansted, and Luton with flight tracking assistance.',
  },
  {
    id: 3,
    question: 'Can I book a return journey?',
    answer:
      'Yes, simply select "Return Journey" on the booking form to specify both your departure and return dates/times.',
  },
  {
    id: 4,
    question: 'What is the passenger and luggage capacity?',
    answer:
      'Our vehicle comfortably accommodates up to 8 passengers and up to 11 standard suitcases in the luggage area.',
  },
  {
    id: 5,
    question: 'How do I receive my fixed quotation?',
    answer:
      'Upon submitting your enquiry, your driver will review the route and provide a fixed price quote directly via WhatsApp, phone, or email.',
  },
  {
    id: 6,
    question: 'What payment methods are accepted?',
    answer:
      'We accept contactless card payments (Visa, Mastercard, Amex, Apple Pay), bank transfer for pre-booked trips, and cash.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(1);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section-light" id="faq">
      <div className="container-xl">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <HelpCircle size={14} />
            <span>Clear Answers</span>
          </div>
          <h2 className="section-title-light">
            Frequently Asked <span className="text-blue-accent">Questions</span>
          </h2>
          <p className="section-subtitle-light">Everything you need to know about booking our private hire taxi.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="custom-accordion">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className={`faq-item-light ${isOpen ? 'active' : ''}`}>
                    <div
                      className="faq-header-light"
                      onClick={() => toggleItem(faq.id)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleItem(faq.id);
                        }
                      }}
                    >
                      <h3 className="h6 fw-bold text-main mb-0">{faq.question}</h3>
                      <ChevronDown
                        size={18}
                        style={{
                          color: 'var(--blue-primary)',
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.25s ease',
                        }}
                      />
                    </div>
                    {isOpen && (
                      <div className="faq-body-light">
                        <p className="text-muted small mb-0">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
