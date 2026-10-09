'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setVisible(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-to-top-bold ${visible ? 'visible' : ''}`}
      id="backToTopBtn"
      onClick={scrollToTop}
      aria-label="Back to Top"
      title="Scroll to Top"
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  );
}
