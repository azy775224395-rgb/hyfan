
import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "حيفان للطاقة المتجددة",
    "image": "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg",
    "url": "https://hyfn-czzv.onrender.com/",
    "telephone": "+967784400333",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع تعز",
      "addressLocality": "صنعاء",
      "addressRegion": "أمانة العاصمة",
      "postalCode": "00967",
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.3694,
      "longitude": 44.1910
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://www.facebook.com/hayfan.energy",
      "https://www.instagram.com/hayfan.energy"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
