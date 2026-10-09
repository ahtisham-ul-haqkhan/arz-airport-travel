import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/light.css';
import '../styles/animations.css';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.arzairporttravel.co.uk'),
  alternates: {
    canonical: 'https://www.arzairporttravel.co.uk',
  },
  title: 'Airport Transfers Stoke-on-Trent | ARZ Airport Travel | Wheelchair Accessible Taxi',
  description:
    'Reliable, comfortable and punctual wheelchair accessible airport transfers & private hire taxi across Stoke-on-Trent, Newcastle-under-Lyme, Staffordshire & UK nationwide. Direct transfers to Manchester, Heathrow, Gatwick & Birmingham airports.',
  keywords:
    'Airport Transfers Stoke-on-Trent, Wheelchair Accessible Taxi Stoke, Manchester Airport Taxi Stoke, Heathrow Airport Transfer Staffordshire, Private Hire Taxi Newcastle-under-Lyme, ARZ Airport Travel, Stoke to Manchester Airport taxi, 8 seater minibus Stoke-on-Trent',
  authors: [{ name: 'ARZ Airport Travel' }],
  robots: 'index, follow',
  other: {
    'geo.region': 'GB-STS',
    'geo.placename': 'Stoke-on-Trent',
  },
  icons: {
    icon: '/assets/favicon.svg',
    shortcut: '/assets/logo/logo.png',
    apple: '/assets/logo/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.arzairporttravel.co.uk',
    title: 'Airport Transfers Stoke-on-Trent | ARZ Airport Travel',
    description:
      'Wheelchair accessible private hire taxi & UK airport transfers from Stoke-on-Trent & Staffordshire. Book online or chat on WhatsApp.',
    images: [
      {
        url: '/assets/images/car-images/ford-minibus-front.jpeg',
        width: 1200,
        height: 630,
        alt: 'ARZ Airport Travel Wheelchair Accessible 8 Seater Minibus Taxi Stoke-on-Trent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airport Transfers Stoke-on-Trent | ARZ Airport Travel',
    description:
      'Wheelchair accessible private hire taxi & UK airport transfers from Stoke-on-Trent & Staffordshire. 24/7 fixed fares.',
    images: ['/assets/images/car-images/ford-minibus-front.jpeg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TaxiService',
      name: 'ARZ Airport Travel',
      legalName: 'ARZ Airport Travel',
      description:
        'Council licensed private hire operator in Stoke-on-Trent & Newcastle-under-Lyme. Fully insured private hire with public liability, wheelchair accessible minibus, and enhanced DBS-checked professional drivers.',
      image: 'https://www.arzairporttravel.co.uk/assets/logo/logo.png',
      telephone: '+447828533942',
      url: 'https://www.arzairporttravel.co.uk',
      priceRange: '££',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Stoke-on-Trent',
        addressRegion: 'Staffordshire',
        addressCountry: 'UK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.0027,
        longitude: -2.1794,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+447828533942',
          contactType: 'customer service',
          areaServed: 'GB',
          availableLanguage: ['English', 'Urdu', 'Hindi'],
        },
      ],
      areaServed: [
        'Stoke-on-Trent',
        'Newcastle-under-Lyme',
        'Staffordshire',
        'Hanley',
        'Trentham',
        'Longton',
        'Fenton',
        'Burslem',
        'Tunstall',
        'Keele',
        'Manchester Airport (MAN)',
        'Heathrow Airport (LHR)',
        'Birmingham Airport (BHX)',
        'Gatwick Airport (LGW)',
        'East Midlands Airport (EMA)',
        'Liverpool Airport (LPL)',
      ],
      serviceType: [
        'Airport Transfers',
        'Wheelchair Accessible Taxi',
        'Private Hire Taxi',
        '8 Seater Minibus Hire',
        'Long Distance UK Taxi',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Fixed Airport Transfer Fares',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Manchester Airport (MAN) Transfer',
            price: '80.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'Birmingham Airport (BHX) Transfer',
            price: '90.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'East Midlands Airport (EMA) Transfer',
            price: '90.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'Liverpool John Lennon Airport (LPL) Transfer',
            price: '95.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'London Heathrow Airport (LHR) Transfer',
            price: '280.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'London Gatwick Airport (LGW) Transfer',
            price: '325.00',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'Southampton Cruise Terminal (SOU) Transfer',
            price: '360.00',
            priceCurrency: 'GBP',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I book a taxi ride?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can submit your pickup, destination, and timing via our booking form above, or click the WhatsApp chat button for instant enquiry assistance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I book an airport transfer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide dedicated airport transfers covering Heathrow, Gatwick, Manchester, Birmingham, Stansted, and Luton with flight tracking assistance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I book a return journey?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, simply select "Return Journey" on the booking form to specify both your departure and return dates/times.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the passenger and luggage capacity?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our vehicle comfortably accommodates up to 8 passengers and up to 11 standard suitcases in the luggage area.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I receive my fixed quotation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Upon submitting your enquiry, your driver will review the route and provide a fixed price quote directly via WhatsApp, phone, or email.',
          },
        },
        {
          '@type': 'Question',
          name: 'What payment methods are accepted?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We accept contactless card payments (Visa, Mastercard, Amex, Apple Pay), bank transfer for pre-booked trips, and cash.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
