import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  isHomePage?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  isHomePage = false,
}) => {
  const siteTitle = " Zarrar Logistic | UK Courier & Freight Services";
  const fullTitle = title ? `${title} |  Zarrar Logistic` : siteTitle;
  const defaultDescription = "Zarrar Logistic provides fast, reliable same-day courier and freight services across the UK. Tailored logistics solutions for businesses and individuals.";
  const defaultKeywords = "UK courier services, same-day courier UK, freight services UK, logistics company UK, courier consultation UK, postcode courier search UK";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": " Zarrar Logistic",
    "image": "https://picsum.photos/seed/Logistics-logo/200/200",
    "@id": "https://logisticsenterprise.co.uk",
    "url": "https://logisticsenterprise.co.uk",
    "telephone": "+4420XXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "London",
      "addressLocality": "London",
      "addressRegion": "Greater London",
      "postalCode": "SW1A 1AA",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://facebook.com/logisticsenterprise",
      "https://twitter.com/logisticsenterprise",
      "https://linkedin.com/company/logisticsenterprise"
    ]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || "https://picsum.photos/seed/Logistics-og/1200/630"} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      
      {canonical && <link rel="canonical" href={canonical} />}

      {isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
