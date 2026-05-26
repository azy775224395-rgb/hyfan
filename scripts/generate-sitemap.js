import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very basic parsing to get products from constants since we can't easily import TS in this plain Node script without tsx
const constantsContent = fs.readFileSync(path.join(__dirname, '../constants.tsx'), 'utf-8');

// Regex to find IDs (basic approximation)
const ids = [...constantsContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
// Filter out non-product IDs if any, although mostly they are string IDs like '1', '2', etc. or proper UUIDs.
const uniqueIds = [...new Set(ids)];

const articlesContent = fs.readFileSync(path.join(__dirname, '../data/articles.ts'), 'utf-8');
const articleIds = [...articlesContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const uniqueArticleIds = [...new Set(articleIds)];

const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hyfn-czzv.onrender.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hyfn-czzv.onrender.com/#/categories</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hyfn-czzv.onrender.com/#/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hyfn-czzv.onrender.com/#/warranty</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

uniqueIds.forEach(id => {
  sitemap += `  <url>
    <loc>https://hyfn-czzv.onrender.com/#/product/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
});

uniqueArticleIds.forEach(id => {
  sitemap += `  <url>
    <loc>https://hyfn-czzv.onrender.com/#/blog/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully included blogs!');
