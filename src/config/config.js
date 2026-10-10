/**
 * ARZ Airport Travel - Business Configuration
 * Centralized settings for branding, contact details, and fleet info.
 */

export const CONFIG = {
  // Brand Details
  businessName: "ARZ Airport Travel",
  tagline: "Your Journey. Our Priority.",
  shortDescription: "Premium private hire and airport transfers across the United Kingdom.",
  serviceArea: "United Kingdom",
  currency: "£",
  currencyCode: "GBP",
  country: "United Kingdom",

  // Contact Information
  phoneNumber: "+44 7828 533942",
  phoneRaw: "+447828533942",
  email: "arzairporttravel@gmail.com",
  address: "Stoke-on-Trent, Staffordshire, United Kingdom",
  operatingHours: "24/7 Pre-booked Service & Customer Enquiries",

  // WhatsApp Integration
  whatsappNumber: "447828533942",
  whatsappDisplayName: "ARZ Airport Dispatch",
  whatsappDefaultGreeting: "Hello! 👋 Welcome to ARZ Airport Travel. How can I help you today?",

  // Fleet Categories
  fleet: [
    {
      id: "standard",
      name: "Standard Saloon",
      category: "Standard Saloon",
      tagline: "Comfortable & Economical",
      passengers: 4,
      luggage: 2,
      handLuggage: 2,
      features: ["Air Conditioning", "Comfort Seating", "Complimentary Wi-Fi", "USB Charging"],
      description: "Ideal for everyday travel, solo travellers, and direct local transfers with premium comfort.",
      exampleModel: "Skoda Superb, VW Passat or similar saloon spec"
    },
    {
      id: "comfort",
      name: "Comfort Saloon",
      category: "Comfort",
      tagline: "Comfort & Punctuality",
      passengers: 4,
      luggage: 2,
      handLuggage: 2,
      features: ["Leather Interior", "Bottled Water & Mints", "Silent Cabin", "Rear Climate Control"],
      description: "Pristine travel designed for business, airport transfers, and special events.",
      exampleModel: "Comfort Saloon / Private Hire spec"
    },
    {
      id: "estate",
      name: "Estate Car",
      category: "Estate",
      tagline: "Extra Luggage Capacity",
      passengers: 4,
      luggage: 4,
      handLuggage: 3,
      features: ["Extended Boot Capacity", "Dual Zone Climate", "Tinted Privacy Glass", "Generous Legroom"],
      description: "Perfect for travellers with extra bags, sports equipment, or families needing dependable luggage space.",
      exampleModel: "Estate Car or similar"
    },
    {
      id: "mpv",
      name: "Luxury MPV",
      category: "MPV",
      tagline: "Spacious Group Travel",
      passengers: 6,
      luggage: 6,
      handLuggage: 4,
      features: ["Conference Seating", "Plush Leather Seats", "Panoramic Glass", "Multi-zone Climate"],
      description: "Generous room for group travel, family journeys, and airport transfers.",
      exampleModel: "VW Multivan, Ford Voyager or equivalent"
    },
    {
      id: "minibus",
      name: "Spacious Minibus",
      category: "Minibus",
      tagline: "Large Group & Event Travel",
      passengers: 8,
      luggage: 8,
      handLuggage: 8,
      features: ["High Capacity Luggage Area", "Captain Seats", "Wheelchair Accessible", "Privacy Glass"],
      description: "High-spec spacious group transport for wedding parties, events, and airport transfers.",
      exampleModel: "Ford Transit / Minibus spec (8 Seater)"
    }
  ],

  // Popular UK Airports Served
  airports: [
    { code: "LHR", name: "Heathrow Airport", terminalCount: "Terminals 2, 3, 4 & 5", city: "London" },
    { code: "LGW", name: "Gatwick Airport", terminalCount: "North & South Terminals", city: "London / Crawley" },
    { code: "MAN", name: "Manchester Airport", terminalCount: "Terminals 1, 2 & 3", city: "Manchester" },
    { code: "BHX", name: "Birmingham Airport", terminalCount: "Main Terminal", city: "Birmingham" },
    { code: "STN", name: "London Stansted Airport", terminalCount: "Main Terminal", city: "Essex / London" },
    { code: "LTN", name: "London Luton Airport", terminalCount: "Main Terminal", city: "Bedfordshire / London" }
  ],

  // Social Media & Web Presence
  socialLinks: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#"
  }
};

export default CONFIG;
