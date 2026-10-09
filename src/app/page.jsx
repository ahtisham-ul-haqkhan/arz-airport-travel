'use client';

import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import MobileDrawer from '@/components/MobileDrawer';
import HeroSection from '@/components/HeroSection';
import VehicleShowcase from '@/components/VehicleShowcase';
import GallerySection, { fleetPhotos } from '@/components/GallerySection';
import FleetLightbox from '@/components/FleetLightbox';
import AirportPricesSection from '@/components/AirportPricesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import FaqSection from '@/components/FaqSection';
import BookingSection from '@/components/BookingSection';
import BookingSummaryModal from '@/components/BookingSummaryModal';
import BookingSuccessModal from '@/components/BookingSuccessModal';
import Footer from '@/components/Footer';
import MobileStickyCta from '@/components/MobileStickyCta';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import BackToTopButton from '@/components/BackToTopButton';
import LegalModals from '@/components/LegalModals';
import ToastContainer from '@/components/ToastContainer';
import CONFIG from '@/config/config';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [airportPreset, setAirportPreset] = useState('');
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [legalModal, setLegalModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // WhatsApp dispatch helper
  const openWhatsApp = useCallback((customText) => {
    const text =
      customText ||
      'Hello ARZ Airport Travel, I have an enquiry about your private hire chauffeur services.';
    const cleanNumber = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Lightbox handlers
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigateLightbox = (direction) => {
    let next = lightboxIndex + direction;
    if (next < 0) next = fleetPhotos.length - 1;
    if (next >= fleetPhotos.length) next = 0;
    setLightboxIndex(next);
  };

  // Booking handlers
  const handleSelectAirport = (destinationString) => {
    setAirportPreset(destinationString);
    showToast(`Selected destination: ${destinationString}`, 'info');
  };

  const handleOpenSummary = (payload) => {
    setSummaryData(payload);
    setSummaryModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!summaryData) return;

    try {
      const stored = JSON.parse(localStorage.getItem('zet_enquiries') || '[]');
      stored.unshift(summaryData);
      localStorage.setItem('zet_enquiries', JSON.stringify(stored));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    setSuccessData(summaryData);
    setSummaryModalOpen(false);
    setSuccessModalOpen(true);
    showToast(
      `Enquiry (Ref: ${summaryData.refId}) confirmed! Our team will contact you shortly.`,
      'success'
    );
  };

  const handleSendWhatsAppFromSummary = () => {
    if (!summaryData) return;
    const p = summaryData;
    let text = `*ARZ Airport Travel - New Booking Enquiry*\n`;
    text += `Reference: ${p.refId}\n\n`;
    text += `*Journey Type:* ${p.journeyType}\n`;
    text += `*Pickup:* ${p.pickupLoc}\n`;
    text += `*Destination:* ${p.dropoffLoc}\n`;
    text += `*Pickup Time:* ${p.pickupDate} at ${p.pickupTime}\n`;
    if (p.returnDate) {
      text += `*Return Time:* ${p.returnDate} at ${p.returnTime}\n`;
    }
    text += `*Vehicle Preference:* ${p.vehicleName}\n`;
    text += `*Passengers:* ${p.passengers} | *Luggage:* ${p.luggage} bags\n`;
    text += `*Client Name:* ${p.fullName}\n`;
    text += `*Contact Phone:* ${p.phone}\n`;
    text += `*Email:* ${p.email}\n`;
    if (p.notes && p.notes !== 'None specified') {
      text += `*Special Instructions:* ${p.notes}\n`;
    }
    text += `\nPlease provide availability and our fixed quotation. Thank you!`;

    setSummaryModalOpen(false);
    openWhatsApp(text);
  };

  return (
    <>
      {/* Top Header & Navigation */}
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Offcanvas Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onWhatsApp={openWhatsApp}
      />

      {/* Main Page Content */}
      <main>
        <HeroSection onWhatsApp={openWhatsApp} />

        <VehicleShowcase onWhatsApp={openWhatsApp} />

        <GallerySection onOpenLightbox={handleOpenLightbox} />

        <AirportPricesSection
          onSelectAirport={handleSelectAirport}
          onWhatsApp={openWhatsApp}
        />

        <WhyChooseUs />

        <HowItWorks />

        <ReviewsSection />

        <ContactSection onWhatsApp={openWhatsApp} showToast={showToast} />

        <FaqSection />

        <BookingSection
          destinationPreset={airportPreset}
          onOpenSummary={handleOpenSummary}
          showToast={showToast}
        />
      </main>

      {/* Luxury Footer */}
      <Footer
        onWhatsApp={openWhatsApp}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
      />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCta />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget onWhatsApp={openWhatsApp} />

      {/* Floating Back to Top Button */}
      <BackToTopButton />

      {/* Vehicle Lightbox Modal */}
      <FleetLightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigateLightbox}
      />

      {/* Booking Summary Modal */}
      <BookingSummaryModal
        isOpen={summaryModalOpen}
        data={summaryData}
        onClose={() => setSummaryModalOpen(false)}
        onConfirm={handleConfirmBooking}
        onWhatsApp={handleSendWhatsAppFromSummary}
      />

      {/* Booking Success Confirmation Modal */}
      <BookingSuccessModal
        isOpen={successModalOpen}
        data={successData}
        onClose={() => setSuccessModalOpen(false)}
        onWhatsApp={() =>
          openWhatsApp(
            `Hello ARZ Airport Travel, I recently submitted enquiry ${successData?.refId}. Could you please confirm pricing?`
          )
        }
      />

      {/* Legal Modals (Privacy & Terms) */}
      <LegalModals activeModal={legalModal} onClose={() => setLegalModal(null)} />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
