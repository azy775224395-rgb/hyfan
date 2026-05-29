
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  jsonLd?: any;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, type = 'website', jsonLd }) => {
  const siteName = "متجر حيفان للطاقة المتجددة";
  const defaultImage = "https://res.cloudinary.com/dxzqizvzw/image/upload/v1779763149/%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A2%D9%A6_%D9%A0%D9%A5%D9%A3%D9%A8%D9%A3%D9%A8_rmvnti.png";
  const currentUrl = window.location.href;
  const fullTitle = `${title} | ${siteName}`;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      <link rel="canonical" href={currentUrl} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
