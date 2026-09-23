import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { getPrerenderRoutes, generateSitemapXml, getSitemapUrls } from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES = getPrerenderRoutes();

async function prerender() {
  console.log('--- Starting Klusvol Static Prerendering (SSG) ---');

  const distDir = path.resolve(__dirname, 'dist');
  const distSsrDir = path.resolve(__dirname, 'dist-ssr');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found. Please run "vite build" first.`);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');

  console.log('Building SSR bundle...');
  await build({
    build: {
      ssr: path.resolve(__dirname, 'entry-server.tsx'),
      outDir: distSsrDir,
      emptyOutDir: true,
    },
  });

  const entryServerPath = path.resolve(distSsrDir, 'entry-server.js');
  const { render } = await import(entryServerPath);

  const results = [];

  for (const route of ROUTES) {
    try {
      const { appHtml } = render(route);

      // Extract metadata from rendered output if present
      const titleMatch = appHtml.match(/<title>([^<]*)<\/title>/);
      const descMatch = appHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/);
      const canonicalMatch = appHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/);

      let pageHtml = rawTemplate;

      // 1. Update Title in <head>
      if (titleMatch && titleMatch[1]) {
        const titleTag = `<title>${titleMatch[1]}</title>`;
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/, titleTag);
      }

      // 2. Update Meta Description in <head>
      if (descMatch && descMatch[1]) {
        const descTag = `<meta name="description" content="${descMatch[1]}" />`;
        pageHtml = pageHtml.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/, descTag);
      }

      // 3. Update or Add Canonical link in <head>
      if (canonicalMatch && canonicalMatch[1]) {
        const canonicalTag = `<link rel="canonical" href="${canonicalMatch[1]}" />`;
        if (pageHtml.includes('rel="canonical"')) {
          pageHtml = pageHtml.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/, canonicalTag);
        } else {
          pageHtml = pageHtml.replace('</head>', `  ${canonicalTag}\n</head>`);
        }
      } else {
        // If no canonical for this route, remove any leftover placeholder canonical
        pageHtml = pageHtml.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>\n?/, '');
      }

      // 4. Update or Add JSON-LD in <head> if present in appHtml (e.g. homepage)
      const jsonLdMatch = appHtml.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
      if (jsonLdMatch && jsonLdMatch[1]) {
        const jsonLdTag = `<script type="application/ld+json">${jsonLdMatch[1]}</script>`;
        pageHtml = pageHtml.replace('</head>', `  ${jsonLdTag}\n</head>`);
      }

      // 5. Clean hoisted head/SEO tags from App HTML so they are NOT duplicated inside <div id="root">
      const cleanRootHtml = appHtml
        .replace(/<title[\s\S]*?<\/title>/gi, '')
        .replace(/<meta\s+name=["']description["'][^>]*\/?>/gi, '')
        .replace(/<link\s+rel=["']canonical["'][^>]*\/?>/gi, '')
        .replace(/<link\s+rel=["']preload["'][^>]*\/?>/gi, '')
        .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');

      // 6. Inject prerendered App HTML into <div id="root">
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanRootHtml}</div>`
      );

      // 6. Determine output file path
      let outPath;
      if (route === '/') {
        outPath = path.resolve(distDir, 'index.html');
      } else {
        const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        outPath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outPath, pageHtml, 'utf-8');

      // Verify file written and content length
      const fileSize = fs.statSync(outPath).size;
      const h1Match = pageHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      const cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '(none)';

      results.push({
        route,
        file: path.relative(__dirname, outPath),
        size: `${(fileSize / 1024).toFixed(1)} kB`,
        title: titleMatch ? titleMatch[1] : '(default)',
        h1: cleanH1,
        canonical: canonicalMatch ? canonicalMatch[1] : '(none)',
        success: true,
      });
    } catch (err) {
      console.error(`Error prerendering route "${route}":`, err);
      results.push({
        route,
        success: false,
        error: err.message,
      });
    }
  }

  // Clean up temporary SSR build directory
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch (err) {
    // Ignore cleanup errors
  }

  // Generate dist/sitemap.xml from central route configuration
  const sitemapXml = generateSitemapXml();
  const sitemapPath = path.resolve(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`\nGenerated dist/sitemap.xml with ${getSitemapUrls().length} canonical URLs.`);

  console.log('\n=== PRERENDER SUMMARY ===');
  console.table(results);

  const hasFailures = results.some((r) => !r.success);
  if (hasFailures) {
    throw new Error('Prerendering failed for one or more routes.');
  }

  console.log('\nPrerendering successfully finished for all routes.');
}

prerender().catch((err) => {
  console.error('Prerender process failed:', err);
  process.exit(1);
});
