/**
 * Centrale routeconfiguratie voor Klusvol.nl
 *
 * Eén centrale bron van waarheid voor:
 * 1. Prerendering (prerender.js)
 * 2. Sitemap-generatie (sitemap.xml)
 * 3. Toekomstige uitbreiding met dynamische / lokale SEO-pagina's
 */

import { LOCAL_SEO_PAGES, validateLocalSeoPages } from './local-seo-data.js';

// Valideer de databron bij inladen (garandeert dat incomplete/foutieve records direct falen)
validateLocalSeoPages(LOCAL_SEO_PAGES);

export const BASE_URL = 'https://klusvol.nl';

/**
 * De huidige vaste publieke routes van Klusvol.nl.
 * Oude Engelstalige redirects (/about, /cases, /privacy, /terms) horen hier NIET thuis.
 */
export const CORE_PUBLIC_ROUTES = [
  { path: '/', type: 'core' },
  { path: '/website-schilder', type: 'branch' },
  { path: '/website-stukadoor', type: 'branch' },
  { path: '/website-hovenier', type: 'branch' },
  { path: '/website-klusbedrijf', type: 'branch' },
  { path: '/over-klusvol', type: 'core' },
  { path: '/projecten', type: 'core' },
  { path: '/privacyverklaring', type: 'legal' },
  { path: '/algemene-voorwaarden', type: 'legal' },
];

/**
 * Dynamische / lokale SEO-routes afgeleid uit LOCAL_SEO_PAGES.
 * Momenteel leeg zolang LOCAL_SEO_PAGES leeg is (geen nieuwe URLs).
 */
export function getLocalSeoRoutes() {
  return LOCAL_SEO_PAGES.map((page) => ({
    path: `/${page.slug.replace(/^\/+|\/+$/g, '')}`,
    type: 'local-seo',
  }));
}

/**
 * Geeft alle actieve publieke routes terug.
 * Combineert core routes met eventuele toekomstige dynamische routes.
 */
export function getAllPublicRoutes() {
  return [
    ...CORE_PUBLIC_ROUTES,
    ...getLocalSeoRoutes(),
  ];
}

/**
 * Geeft de array van URL-paden terug ten behoeve van de prerenderer.
 * Voorbeeld: ['/', '/website-schilder', ...]
 */
export function getPrerenderRoutes() {
  return getAllPublicRoutes().map((route) => route.path);
}

/**
 * Geeft alle canonical publieke URL's terug (met https://klusvol.nl).
 * Voorbeeld: ['https://klusvol.nl/', 'https://klusvol.nl/website-schilder', ...]
 */
export function getSitemapUrls() {
  return getAllPublicRoutes().map((route) => `${BASE_URL}${route.path}`);
}

/**
 * Genereert geldige XML conform het standaard sitemap-protocol (sitemaps.org).
 * Zonder overbodige priority, changefreq of verzonnen lastmod-datums.
 */
export function generateSitemapXml() {
  const urls = getSitemapUrls();
  const urlTags = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>
`;
}
