'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  User,
  HelpCircle,
  MessageSquare,
  Send,
} from 'lucide-react';
import CONFIG from '@/config/config';

export default function ContactSection({ onWhatsApp, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: value.replace(/[^0-9+]/g, '') }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please complete all required fields (Name, Email & Message).', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Optimistic UI: show success instantly, send in background, restore data if it fails
    const submitted = { ...formData };
    showToast('Thank you! Your travel enquiry has been sent successfully.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    try {
      const stored = JSON.parse(localStorage.getItem('zet_contact_messages') || '[]');
      stored.push({ ...submitted, date: new Date().toISOString() });
      localStorage.setItem('zet_contact_messages', JSON.stringify(stored));
    } catch (_) {}

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitted),
        keepalive: true,
      });

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        setFormData(submitted);
        showToast(
          result.error || 'Message could not be sent. Please try again or message via WhatsApp.',
          'error'
        );
      }
    } catch (err) {
      setFormData(submitted);
      showToast('Server connection error. Please try again or message via WhatsApp.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    const { name, email, phone, subject, message } = formData;

    if (!name.trim() && !message.trim()) {
      showToast('Please enter your name and message before sending via WhatsApp.', 'error');
      return;
    }

    const waText = `*Hello ARZ Airport Travel, I have an enquiry:*
👤 *Name:* ${name.trim() || 'Customer'}
📧 *Email:* ${email.trim() || 'Not provided'}
📞 *Phone:* ${phone.trim() || 'Not provided'}
📌 *Subject:* ${subject.trim() || 'General Enquiry'}

💬 *Message:*
${message.trim() || 'Hello, I would like to enquire about your taxi services.'}`;

    onWhatsApp(waText);
  };

  return (
    <section className="contact-section-light" id="contact">
      <div className="container-xl">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <PhoneCall size={14} />
            <span>Direct Contact</span>
          </div>
          <h2 className="section-title-light">
            Get in Touch with <span className="text-blue-accent">Your Driver</span>
          </h2>
          <p className="section-subtitle-light">
            Have a question or custom itinerary? Contact us directly by phone or WhatsApp.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="contact-card-light">
              <h3 className="h4 fw-bold text-main mb-4">Direct Contact Details</h3>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="brand-crest-light" style={{ width: 44, height: 44 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-muted small fw-medium">Telephone (Direct Call)</div>
                  <a href={`tel:${CONFIG.phoneRaw}`} className="fw-bold text-main fs-6">
                    {CONFIG.phoneNumber}
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="brand-crest-light"
                  style={{
                    width: 44,
                    height: 44,
                    background: 'rgba(37, 211, 102, 0.15)',
                    borderColor: '#25D366',
                    color: '#25D366',
                  }}
                >
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-muted small">WhatsApp Business</div>
                  <button
                    type="button"
                    onClick={() => onWhatsApp()}
                    className="btn btn-link p-0 fw-bold text-success fs-6 text-decoration-none"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="brand-crest-light" style={{ width: 44, height: 44 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-muted small">Email Enquiries</div>
                  <a href={`mailto:${CONFIG.email}`} className="fw-bold text-main fs-6">
                    {CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="brand-crest-light" style={{ width: 44, height: 44 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-muted small">Service Area</div>
                  <div className="fw-bold text-main fs-6">
                    Stoke-on-Trent &amp; Staffordshire &amp; Surrounding Areas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contact-card-light">
              <h3 className="h4 fw-bold text-main mb-2">Send a Message</h3>
              <p className="text-muted small mb-4">We respond quickly to all customer travel enquiries.</p>

              <form id="contactForm" onSubmit={handleSubmitEmail} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="contactName" className="form-label-light">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <div className="input-icon-left-light">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        className="form-control-light"
                        id="contactName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        maxLength={50}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contactEmail" className="form-label-light">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <div className="input-icon-left-light">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        className="form-control-light"
                        id="contactEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.co.uk"
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contactPhone" className="form-label-light">
                      Phone Number
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <div className="input-icon-left-light">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        className="form-control-light"
                        id="contactPhone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07... or +44..."
                        inputMode="numeric"
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contactSubject" className="form-label-light">
                      Subject
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <div className="input-icon-left-light">
                        <HelpCircle size={18} />
                      </div>
                      <input
                        type="text"
                        className="form-control-light"
                        id="contactSubject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Airport Transfer / Local Journey"
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="contactMessage" className="form-label-light">
                      Message <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative d-flex align-items-start">
                      <div className="input-icon-left-light" style={{ alignSelf: 'flex-start', top: 12 }}>
                        <MessageSquare size={18} />
                      </div>
                      <textarea
                        className="form-control-light"
                        id="contactMessage"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we assist with your travel?"
                        maxLength={500}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 d-flex flex-wrap gap-2 pt-2">
                    <button
                      type="submit"
                      className="btn-primary-blue flex-grow-1"
                      id="btnContactEmail"
                      disabled={isSubmitting}
                      style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                      <span>{isSubmitting ? 'Message Sent ✓' : 'Send Message via Email'}</span>
                      <Send size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-whatsapp-light flex-grow-1"
                      id="btnContactWhatsApp"
                      onClick={handleSendWhatsApp}
                    >
                      <MessageCircle size={16} />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
