
import React from 'react';

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  brand?: string;
  sku: string;
  ratingValue?: number;
  reviewCount?: number;
}

const ProductSchema: React.FC<ProductSchemaProps> = ({
  name,
  description,
  image,
  price,
  currency,
  brand = "Haifan Energy",
  sku,
  ratingValue,
  reviewCount
}) => {
  // Calculate price validity (1 year from now)
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];

  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": [image],
    "description": description,
    "sku": sku,
    "mpn": sku,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": currency,
      "price": price,
      "priceValidUntil": priceValidUntil,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": currency
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "YE"
        }
      }
    }
  };

  // Only add AggregateRating if data exists
  if (ratingValue && reviewCount && reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": ratingValue.toFixed(1),
      "reviewCount": reviewCount
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ProductSchema;
