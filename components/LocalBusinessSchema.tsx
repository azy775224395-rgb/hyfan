
import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "أبو إيفان للطاقة المتجددة",
    "image": "https://res.cloudinary.com/dxzqizvzw/image/upload/v1779209369/IMG_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9_%D9%A1%D9%A9%D9%A2%D9%A5%D9%A4%D9%A2_kji9am.png",
    "logo": "https://res.cloudinary.com/dxzqizvzw/image/upload/v1779209369/IMG_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9_%D9%A1%D9%A9%D9%A2%D9%A5%D9%A4%D9%A2_kji9am.png",
    "url": "https://hyfn-czzv.onrender.com/",
    "telephone": "+967784400333",
    "priceRange": "$$",
    "description": "شركة رائدة في مجال الطاقة الشمسية في اليمن، توفر ألواح طاقة شمسية، بطاريات جل، انفرترات، وأجهزة منزلية موفرة للطاقة مع شحن لجميع المحافظات.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "خط الهناجر امام فكة المرور",
      "addressLocality": "عدن",
      "addressRegion": "محافظة عدن",
      "postalCode": "00967",
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.8000,
      "longitude": 45.0333
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+967784400333",
      "contactType": "customer service",
      "contactOption": "TollFree",
      "areaServed": "YE",
      "availableLanguage": "Arabic"
    },
    "areaServed": [
      { "@type": "City", "name": "Sana'a" },
      { "@type": "City", "name": "Aden" },
      { "@type": "City", "name": "Taiz" },
      { "@type": "City", "name": "Ibb" },
      { "@type": "City", "name": "Hodeidah" },
      { "@type": "Country", "name": "Yemen" }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577192150477",
      "https://www.instagram.com/moose.3433085?igsh=MnZ0bGN2NWJ2OHBx"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hyfn-czzv.onrender.com/#/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
