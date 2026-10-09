'use client';

import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Car,
  MapPin,
  Flag,
  Calendar,
  Clock,
  CalendarCheck,
  Clock4,
  User,
  Mail,
  Phone,
  FileText,
  Info,
  ChevronRight,
} from 'lucide-react';

const stokeAreas = [
  'Stoke-on-Trent (Hanley City Centre)',
  'Newcastle-under-Lyme',
  'Trentham',
  'Longton',
  'Fenton',
  'Tunstall',
  'Burslem',
  'Keele',
  'Biddulph',
  'Kidsgrove',
  'Stone',
  'Leek',
  'Uttoxeter',
  'Cheadle',
  'Stoke-on-Trent Railway Station',
  'Other Stoke-on-Trent / Staffordshire Address',
];

const airportChips = [
  { label: 'Heathrow (LHR)', val: 'Heathrow Airport (LHR)' },
  { label: 'Gatwick (LGW)', val: 'Gatwick Airport (LGW)' },
  { label: 'Manchester (MAN)', val: 'Manchester Airport (MAN)' },
  { label: 'Birmingham (BHX)', val: 'Birmingham Airport (BHX)' },
  { label: 'Stansted (STN)', val: 'Stansted Airport (STN)' },
  { label: 'Luton (LTN)', val: 'Luton Airport (LTN)' },
];

export default function BookingSection({
  destinationPreset,
  onOpenSummary,
  showToast,
}) {
  const [journeyType, setJourneyType] = useState('oneway');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custNotes, setCustNotes] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setMinDate(formatted);
    setPickupDate(formatted);

    // Default time 2 hours from now
    const future = new Date(today.getTime() + 2 * 60 * 60 * 1000);
    const hours = String(future.getHours()).padStart(2, '0');
    const mins = String(future.getMinutes()).padStart(2, '0');
    setPickupTime(`${hours}:${mins}`);
  }, []);

  useEffect(() => {
    if (destinationPreset) {
      setDropoffLocation(destinationPreset);
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [destinationPreset]);

  const handlePhoneChange = (e) => {
    setCustPhone(e.target.value.replace(/[^0-9+]/g, ''));
  };

  const changePassengers = (delta) => {
    setPassengers((prev) => Math.max(1, Math.min(8, prev + delta)));
  };

  const changeLuggage = (delta) => {
    setLuggage((prev) => Math.max(0, Math.min(11, prev + delta)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupLocation.trim() || !dropoffLocation.trim()) {
      showToast('Please enter both a pickup location and destination.', 'error');
      return;
    }

    if (!pickupDate || !pickupTime) {
      showToast('Please select a pickup date and time.', 'error');
      return;
    }

    if (journeyType === 'return' && (!returnDate || !returnTime)) {
      showToast('Please select your return date and time.', 'error');
      return;
    }

    if (!custName.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!custEmail.trim() || !emailRegex.test(custEmail.trim())) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const sanitizedPhone = custPhone.replace(/[\s\-\(\)]/g, '');
    if (!custPhone.trim() || sanitizedPhone.length < 10) {
      showToast('Please enter a valid UK contact number.', 'error');
      return;
    }

    const payload = {
      refId: 'ZET-' + Math.floor(100000 + Math.random() * 900000),
      journeyType: journeyType === 'return' ? 'Return Journey' : 'One Way Journey',
      pickupLoc: pickupLocation.trim(),
      dropoffLoc: dropoffLocation.trim(),
      pickupDate,
      pickupTime,
      returnDate: journeyType === 'return' ? returnDate : null,
      returnTime: journeyType === 'return' ? returnTime : null,
      passengers,
      luggage,
      vehicleName: 'Wheelchair Accessible Private Hire Vehicle',
      fullName: custName.trim(),
      email: custEmail.trim(),
      phone: custPhone.trim(),
      notes: custNotes.trim() || 'None specified',
      submittedAt: new Date().toLocaleString('en-GB'),
    };

    onOpenSummary(payload);
  };

  return (
    <section className="booking-section-light" id="booking">
      <div className="container-xl">
        <div className="booking-card-light">
          <div className="row align-items-center mb-4">
            <div className="col-md-7">
              <div className="section-badge-light mb-2">
                <Navigation size={14} />
                <span>Online Taxi Enquiry</span>
              </div>
              <h2 className="h3 fw-bold text-main mb-1">Book Your Ride</h2>
              <p className="text-muted small mb-0">
                Fill out your pickup, destination, and travel schedule below to receive a fixed guaranteed quotation.
              </p>
            </div>
            <div className="col-md-5 text-md-end mt-3 mt-md-0">
              {/* Journey Type Switcher */}
              <div className="booking-type-toggle-light" role="tablist">
                <button
                  type="button"
                  className={`booking-type-btn-light ${journeyType === 'oneway' ? 'active' : ''}`}
                  id="btnOneWay"
                  onClick={() => setJourneyType('oneway')}
                >
                  One Way
                </button>
                <button
                  type="button"
                  className={`booking-type-btn-light ${journeyType === 'return' ? 'active' : ''}`}
                  id="btnReturn"
                  onClick={() => {
                    setJourneyType('return');
                    if (!returnDate && pickupDate) setReturnDate(pickupDate);
                  }}
                >
                  Return Journey
                </button>
              </div>
            </div>
          </div>

          {/* Single Taxi Banner */}
          <div className="single-vehicle-banner mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="brand-crest-light" style={{ width: 40, height: 40, background: '#FFFFFF' }}>
                <Car size={20} />
              </div>
              <div>
                <div className="fw-bold text-main small">Wheelchair Accessible Private Hire Vehicle</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Direct owner-chauffeur service &bull; Up to 8 Passengers &bull; 11 Suitcases
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary px-3 py-2 rounded-pill">Dedicated Private Hire</span>
            </div>
          </div>

          <form id="bookingForm" onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              {/* Pickup Location */}
              <div className="col-md-6">
                <label htmlFor="pickupLocation" className="form-label-light">
                  <span>Pickup Location (Stoke-on-Trent Area)</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <MapPin size={18} />
                  </div>
                  <select
                    className="form-select-light"
                    id="pickupLocation"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Stoke-on-Trent Pickup Area...
                    </option>
                    {stokeAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Stoke Pickup Chips */}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="text-muted" style={{ fontSize: '0.74rem', alignSelf: 'center' }}>
                    Stoke Areas:
                  </span>
                  <button
                    type="button"
                    className="airport-chip-light"
                    onClick={() => setPickupLocation('Stoke-on-Trent (Hanley City Centre)')}
                  >
                    Hanley
                  </button>
                  <button
                    type="button"
                    className="airport-chip-light"
                    onClick={() => setPickupLocation('Newcastle-under-Lyme')}
                  >
                    Newcastle
                  </button>
                  <button
                    type="button"
                    className="airport-chip-light"
                    onClick={() => setPickupLocation('Trentham')}
                  >
                    Trentham
                  </button>
                  <button
                    type="button"
                    className="airport-chip-light"
                    onClick={() => setPickupLocation('Longton')}
                  >
                    Longton
                  </button>
                  <button
                    type="button"
                    className="airport-chip-light"
                    onClick={() => setPickupLocation('Keele')}
                  >
                    Keele
                  </button>
                </div>
              </div>

              {/* Destination */}
              <div className="col-md-6">
                <label htmlFor="dropoffLocation" className="form-label-light">
                  <span>Destination</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <Flag size={18} />
                  </div>
                  <input
                    type="text"
                    className="form-control-light"
                    id="dropoffLocation"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Address, City, UK Postcode or Terminal"
                    required
                  />
                </div>

                {/* Quick Airport Selector Chips */}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="text-muted" style={{ fontSize: '0.74rem', alignSelf: 'center' }}>
                    Popular UK Airports:
                  </span>
                  {airportChips.map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      className="airport-chip-light"
                      onClick={() => setDropoffLocation(chip.val)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup Date */}
              <div className="col-sm-6 col-lg-3">
                <label htmlFor="pickupDate" className="form-label-light">
                  <span>Pickup Date</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    className="form-control-light"
                    id="pickupDate"
                    min={minDate}
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      if (returnDate && returnDate < e.target.value) {
                        setReturnDate(e.target.value);
                      }
                    }}
                    required
                  />
                </div>
              </div>

              {/* Pickup Time */}
              <div className="col-sm-6 col-lg-3">
                <label htmlFor="pickupTime" className="form-label-light">
                  <span>Pickup Time</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <Clock size={18} />
                  </div>
                  <input
                    type="time"
                    className="form-control-light"
                    id="pickupTime"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Conditional Return Date & Time */}
              {journeyType === 'return' && (
                <div className="col-12 return-trip-row active" id="returnTripFields">
                  <div
                    className="row g-3 w-100 p-3 mt-1"
                    style={{
                      background: 'var(--blue-light)',
                      border: '1.5px dashed var(--blue-border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div className="col-12">
                      <span className="badge bg-primary text-white fw-bold">Return Trip Schedule</span>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="returnDate" className="form-label-light">
                        <span>Return Date</span> <span className="text-danger">*</span>
                      </label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="input-icon-left-light">
                          <CalendarCheck size={18} />
                        </div>
                        <input
                          type="date"
                          className="form-control-light"
                          id="returnDate"
                          min={pickupDate || minDate}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="returnTime" className="form-label-light">
                        <span>Return Time</span> <span className="text-danger">*</span>
                      </label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="input-icon-left-light">
                          <Clock4 size={18} />
                        </div>
                        <input
                          type="time"
                          className="form-control-light"
                          id="returnTime"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Passengers & Luggage Counters */}
              <div className="col-sm-6 col-lg-3">
                <label className="form-label-light">
                  <span>Passengers (Max 8)</span>
                </label>
                <div className="counter-box-light">
                  <button
                    type="button"
                    className="counter-btn-light"
                    onClick={() => changePassengers(-1)}
                    disabled={passengers <= 1}
                    aria-label="Decrease passenger count"
                  >
                    -
                  </button>
                  <div className="counter-value-light" id="passCountDisplay">
                    {passengers}
                  </div>
                  <button
                    type="button"
                    className="counter-btn-light"
                    onClick={() => changePassengers(1)}
                    disabled={passengers >= 8}
                    aria-label="Increase passenger count"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <label className="form-label-light">
                  <span>Luggage Bags (Max 11)</span>
                </label>
                <div className="counter-box-light">
                  <button
                    type="button"
                    className="counter-btn-light"
                    onClick={() => changeLuggage(-1)}
                    disabled={luggage <= 0}
                    aria-label="Decrease luggage count"
                  >
                    -
                  </button>
                  <div className="counter-value-light" id="luggageCountDisplay">
                    {luggage}
                  </div>
                  <button
                    type="button"
                    className="counter-btn-light"
                    onClick={() => changeLuggage(1)}
                    disabled={luggage >= 11}
                    aria-label="Increase luggage count"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Passenger Details: Name, Email, Phone */}
              <div className="col-md-4 mt-3">
                <label htmlFor="custName" className="form-label-light">
                  <span>Full Name</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    className="form-control-light"
                    id="custName"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. John Smith"
                    maxLength={50}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4 mt-3">
                <label htmlFor="custEmail" className="form-label-light">
                  <span>Email Address</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    className="form-control-light"
                    id="custEmail"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    placeholder="john@example.co.uk"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4 mt-3">
                <label htmlFor="custPhone" className="form-label-light">
                  <span>UK Contact Number</span> <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    className="form-control-light"
                    id="custPhone"
                    value={custPhone}
                    onChange={handlePhoneChange}
                    placeholder="07123456789 or +44..."
                    inputMode="numeric"
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="col-12 mt-3">
                <label htmlFor="custNotes" className="form-label-light">
                  <span>Special Instructions or Flight Details (Optional)</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                  <div className="input-icon-left-light" style={{ alignSelf: 'flex-start', top: 12 }}>
                    <FileText size={18} />
                  </div>
                  <textarea
                    className="form-control-light"
                    id="custNotes"
                    value={custNotes}
                    onChange={(e) => setCustNotes(e.target.value)}
                    rows={2}
                    placeholder="Flight number, terminal, baby/child booster seat, meet & greet or pickup notes..."
                    maxLength={500}
                  />
                </div>
              </div>

              {/* Bottom Disclaimer & Button */}
              <div className="col-12 mt-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <Info size={18} style={{ color: 'var(--blue-primary)', flexShrink: 0 }} />
                  <span>
                    This enquiry form sends your details directly to your driver. You will receive a fixed, guaranteed
                    quotation.
                  </span>
                </div>

                <button type="submit" className="btn-primary-blue flex-shrink-0" id="submitBookingBtn">
                  <span>Request My Booking</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
