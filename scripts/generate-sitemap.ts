import * as fs from 'fs';
import * as path from 'path';

// Using static products since DB table doesn't exist
import { INITIAL_PRODUCTS as products } from '../constants';

const BASE_URL = 'https://hyfn-czzv.onrender.com';

async function generateSitemap() {
  console.log('Generating sitemap...');

  try {
    const today = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/story', priority: '0.7', changefreq: 'monthly' },
      { url: '/warranty', priority: '0.6', changefreq: 'monthly' },
      { url: '/reviews', priority: '0.8', changefreq: 'daily' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' }
    ];

    // Unique Categories
    const categories = new Set<string>();
    if (products) {
      products.forEach((p) => {
        if (p.category) categories.add(p.category);
      });
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach((page) => {
      xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add category pages
    categories.forEach((cat) => {
      // Basic encoding for URL
      const encodedCat = encodeURIComponent(cat);
      xml += `  <url>
    <loc>${BASE_URL}/category/${encodedCat}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Add product pages
    if (products) {
      products.forEach((product) => {
        xml += `  <url>
    <loc>${BASE_URL}/product/${product.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
      });
    }

    xml += `</urlset>`;

    const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
    const rootSitemapPath = path.resolve(process.cwd(), 'sitemap.xml'); // Fallback if no public fold

    if (fs.existsSync(path.resolve(process.cwd(), 'public'))) {
      fs.writeFileSync(sitemapPath, xml, 'utf8');
      console.log(`Successfully generated sitemap at ${sitemapPath}`);
    } else {
      fs.writeFileSync(rootSitemapPath, xml, 'utf8');
      console.log(`Successfully generated sitemap at ${rootSitemapPath}`);
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

generateSitemap();
