'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Immaculate car, perfectly on time for an early morning Heathrow transfer. Driver was polite, drove smoothly, and helped with all our heavy luggage. Highly recommend ARZ Airport Travel!',
    author: 'Edward Sterling',
    role: 'Heathrow Airport Passenger (London)',
  },
  {
    quote:
      'Booked a wheelchair accessible minibus for our family transfer from Manchester Airport. Effortless communication, generous luggage space, and our driver monitored our flight delay perfectly. Highly recommended!',
    author: 'Sarah Jenkins',
    role: 'Private Traveller (Cheshire)',
  },
  {
    quote:
      "ARZ Airport Travel has become our firm's primary chauffeur partner for Birmingham NEC conferences and corporate travel. Discreet, impeccably presented drivers and spotless premium vehicles.",
    author: 'David Ross',
    role: 'Corporate Operations Manager (Birmingham)',
  },
  {
    quote:
      'Booking via WhatsApp was rapid and straightforward. Received an instant price quote, confirmation, and our driver was waiting right at Gatwick arrivals with a welcome name board. Exemplary service.',
    author: 'Amira Patel',
    role: 'Frequent Airport Passenger (London)',
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const changeSlide = (newIndex) => {
    setFading(true);
    setTimeout(() => {
      let idx = newIndex;
      if (idx < 0) idx = testimonials.length - 1;
      if (idx >= testimonials.length) idx = 0;
      setCurrentIndex(idx);
      setFading(false);
    }, 220);
  };

  const nextSlide = () => changeSlide(currentIndex + 1);
  const prevSlide = () => changeSlide(currentIndex - 1);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 7000);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="testimonials-section-light" id="reviews">
      <div className="container-xl">
        <div className="text-center mb-5">
          <div className="section-badge-light">
            <Star size={14} />
            <span>Passenger Reviews</span>
          </div>
          <h2 className="section-title-light">
            What Clients <span className="text-blue-accent">Say</span>
          </h2>
          <p className="section-subtitle-light">Feedback from business travellers, airport passengers, and local UK residents.</p>

          {/* Google Reviews Badge */}
          <div className="google-reviews-banner">
            {/* Google "G" logo */}
            <svg className="g-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="stars">★★★★★</span>
            <span className="rating-text">5.0</span>
            <span className="reviews-count">· 26 Google Reviews</span>
          </div>
        </div>

        <div
          className="testimonial-card-light mx-auto"
          style={{ maxWidth: 820 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="d-flex justify-content-center gap-1 mb-3 text-warning">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>

          <p
            className="fs-5 text-main fst-italic mb-3"
            id="testimonialQuote"
            style={{
              transition: 'opacity 0.25s ease',
              opacity: fading ? 0 : 1,
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </p>

          <div
            className="fw-bold text-main"
            id="testimonialAuthor"
            style={{
              transition: 'opacity 0.25s ease',
              opacity: fading ? 0 : 1,
            }}
          >
            {current.author}
          </div>
          <div
            className="text-muted small"
            id="testimonialRole"
            style={{
              transition: 'opacity 0.25s ease',
              opacity: fading ? 0 : 1,
            }}
          >
            {current.role}
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-circle p-2"
              id="prevTestimonialBtn"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary rounded-circle p-2"
              id="nextTestimonialBtn"
              onClick={nextSlide}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
