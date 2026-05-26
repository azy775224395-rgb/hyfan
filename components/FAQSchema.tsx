import React, { useEffect, useState } from "react";

interface FAQSchemaProps {
  content: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ content }) => {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    // We parse the HTML content for `<summary>` and `<p>` pairs inside `<details>`
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const detailsElements = doc.querySelectorAll("details");
      
      const faqs: { question: string; answer: string }[] = [];
      
      detailsElements.forEach((detail) => {
        const summary = detail.querySelector("summary");
        const p = detail.querySelector("p");
        if (summary && p) {
          faqs.push({
            question: summary.textContent || "",
            answer: p.textContent || "",
          });
        }
      });

      if (faqs.length > 0) {
        setSchema({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [content]);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQSchema;
