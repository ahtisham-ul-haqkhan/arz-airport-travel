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
            “{current.quote}”
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
