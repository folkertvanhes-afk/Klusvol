/**
 * Centrale datastore en validatie voor lokale SEO-landingspagina's op Klusvol.nl.
 *
 * BELANGRIJK:
 * Deze array is bewust LEEG.
 * Er worden pas records toegevoegd zodra er specifieke, unieke content
 * beschikbaar is voor geselecteerde testlocaties.
 */

/**
 * @typedef {Object} LocalSeoFaqItem
 * @property {string} question - De veelgestelde vraag
 * @property {string} answer - Het antwoord
 */

/**
 * @typedef {Object} LocalSeoRelatedLocation
 * @property {string} slug - Relatief pad, bijv. "website-laten-maken-assen"
 * @property {string} label - Tekst van de link, bijv. "Website laten maken in Assen"
 */

/**
 * @typedef {Object} LocalSeoPageRecord
 * @property {string} slug - Unieke URL-slug zonder leading slash, bijv. "website-laten-maken-groningen"
 * @property {string} city - Plaatsnaam, bijv. "Groningen"
 * @property {string} region - Provincie of regio, bijv. "Groningen"
 * @property {'location' | 'branch-location'} [pageType] - Type pagina ("location" of "branch-location")
 * @property {string} [branch] - Branche van de vakman, bijv. "Schilder"
 * @property {{
 *   title: string,
 *   description: string,
 *   canonical: string
 * }} seo - Paginaspecifieke SEO metadata (verplicht)
 * @property {{
 *   h1: string,
 *   intro: string,
 *   localContext: string,
 *   whyKlusvol?: string,
 *   proof?: string,
 *   cta?: string
 * }} content - Unieke, niet-gegenereerde content voor de locatie
 * @property {LocalSeoFaqItem[]} [faq] - Optionele veelgestelde vragen
 * @property {Array<LocalSeoRelatedLocation | string>} [relatedLocations] - Optionele gerelateerde locatielinks
 * @property {Record<string, any>} [structuredData] - Optionele JSON-LD structured data hook
 * @property {string} [ctaButtonText] - Tekst op de primaire CTA-knop
 * @property {string} [ctaWhatsappMessage] - Prefilled WhatsApp-bericht
 */

/**
 * Centrale lijst van lokale SEO-pagina's.
 * @type {LocalSeoPageRecord[]}
 */
export const LOCAL_SEO_PAGES = [
  {
    slug: "website-laten-maken-groningen",
    pageType: "location",
    city: "Groningen",
    region: "Groningen",

    seo: {
      title: "Website laten maken Groningen voor vakmensen | Klusvol",
      description: "Website laten maken in Groningen? Klusvol bouwt en beheert websites voor schilders, stukadoors, hoveniers en klusbedrijven. Persoonlijk en praktisch.",
      canonical: "https://klusvol.nl/website-laten-maken-groningen"
    },

    content: {
      h1: "Website laten maken in Groningen voor vakmensen",

      intro: "Heb je een schilder-, stukadoors-, hoveniers- of klusbedrijf in Groningen en wil je professioneel online voor de dag komen? Klusvol bouwt websites speciaal voor vakmensen. Geen ingewikkeld webbureau-traject, maar direct contact met mij, Folkert, vanuit Groningen.",

      localContext: "Een website voor een vakbedrijf hoeft niet ingewikkeld te zijn. Bezoekers moeten snel kunnen zien wat je doet, waar je werkt en hoe ze contact met je opnemen. Daarom ligt de nadruk op je vakwerk, duidelijke diensten, projecten en een eenvoudige route naar bellen of WhatsApp. Klusvol werkt vanuit Groningen en helpt vakbedrijven in de regio én in de rest van Nederland. Een kennismaking kan online of fysiek in de regio.",

      whyKlusvol: "Je hebt rechtstreeks contact met degene die je website bouwt en beheert. Geen ticketsysteem of verschillende contactpersonen. Hosting, technisch onderhoud en kleine wijzigingen kunnen door Klusvol worden geregeld, zodat jij je kunt richten op je eigen vak.",

      proof: "Klusvol werkt al met verschillende vakbedrijven in Noord-Nederland, waaronder ondernemers in Hoogezand en Roden. Op de website van Klusvol zijn onder andere projecten voor schilders en stukadoors te bekijken.",

      cta: "Wil je weten wat er voor jouw vakbedrijf in Groningen mogelijk is? Stuur Folkert een WhatsApp met wat je doet en waar je actief bent. Dan kijken we samen of Klusvol bij je bedrijf past."
    },

    faq: [
      {
        question: "Wat kost een website laten maken in Groningen?",
        answer: "Een Klusvol-website kost normaal circa €1.500 om te bouwen. Voor geselecteerde referentieprojecten kan de opstart volledig vervallen. Daarna betaal je €69 per maand voor hosting, technisch onderhoud en kleine wijzigingen. Voor nieuwe Klusvol-overeenkomsten geldt een minimale looptijd van 24 maanden."
      },
      {
        question: "Bouwt Klusvol alleen websites voor bedrijven in Groningen?",
        answer: "Nee. Klusvol werkt vanuit Groningen en helpt vakbedrijven door heel Nederland. Voor ondernemers in Groningen en omgeving is een fysieke afspraak ook mogelijk."
      },
      {
        question: "Voor welke vakbedrijven bouwt Klusvol websites?",
        answer: "Klusvol richt zich vooral op kleine vakbedrijven, waaronder schilders, stukadoors, hoveniers en klusbedrijven."
      },
      {
        question: "Moet ik mijn website zelf onderhouden?",
        answer: "Nee. Hosting en technisch onderhoud zijn onderdeel van het maandbedrag. Kleine wijzigingen kunnen ook door Klusvol worden uitgevoerd."
      }
    ],

    relatedLocations: [],

    structuredData: null,

    ctaButtonText: "App Folkert over mijn website",
    ctaWhatsappMessage: "Hoi Folkert, ik heb een vakbedrijf in de regio Groningen en wil even kijken wat er mogelijk is met een website."
  },
  {
    slug: "website-schilder-groningen",
    city: "Groningen",
    region: "Groningen",
    branch: "Schilder",
    pageType: "branch-location",

    seo: {
      title: "Website laten maken voor schilders in Groningen | Klusvol",
      description: "Website voor je schildersbedrijf in Groningen? Klusvol bouwt websites die je schilderwerk, projecten en diensten duidelijk presenteren. Persoonlijk contact vanuit Groningen.",
      canonical: "https://klusvol.nl/website-schilder-groningen"
    },

    content: {
      h1: "Website laten maken voor schilders in Groningen",

      intro: "Heb je een schildersbedrijf in Groningen en wil je jouw werk professioneel online laten zien? Klusvol bouwt websites voor vakmensen, met extra aandacht voor duidelijke diensten, sterke projectbeelden en een eenvoudige route naar contact. Je hebt rechtstreeks contact met mij, Folkert, vanuit Groningen.",

      localContext: "Bij schilderwerk wil een potentiële klant vooral snel kunnen zien wat je maakt en of jouw werk past bij de klus. Denk aan binnen- en buitenschilderwerk, spuitwerk, renovatie of andere specialisaties. Een goede website geeft ruimte aan echte projecten, laat duidelijk zien waar je actief bent en maakt bellen of WhatsApp laagdrempelig.",

      whyKlusvol: "Ik bouw de website rechtstreeks voor jouw bedrijf en blijf ook daarna bereikbaar voor hosting, technisch onderhoud en kleine wijzigingen. Heb je nieuwe projectfoto's of wil je een dienst aanpassen? Dan hoef je niet zelf met de techniek bezig.",

      proof: "Gebruik voor deze pagina specifiek Hoekstra Sprayworks als relevante echte Klusvol-case.",

      cta: "Wil je weten hoe een website voor jouw schildersbedrijf eruit kan zien? Stuur me een WhatsApp en vertel kort wat voor schilderwerk je doet en waar je actief bent."
    },

    faq: [
      {
        question: "Wat kost een website voor een schildersbedrijf?",
        answer: "Een Klusvol-website kost normaal circa €1.500 om te bouwen. Voor geselecteerde referentieprojecten kan de opstart volledig vervallen. Daarna betaal je €69 per maand voor hosting, technisch onderhoud en kleine wijzigingen. Voor nieuwe Klusvol-overeenkomsten geldt een minimale looptijd van 24 maanden."
      },
      {
        question: "Welke foto's heb ik nodig voor een schilderswebsite?",
        answer: "Goede foto's van daadwerkelijk uitgevoerd schilderwerk zijn het meest bruikbaar. Denk aan verschillende projecten en werkzaamheden. Klusvol kan deze verwerken in de website."
      },
      {
        question: "Kan ik later nieuwe schilderprojecten laten toevoegen?",
        answer: "Ja. Kleine wijzigingen vallen binnen de maandelijkse dienstverlening, binnen de bestaande voorwaarden van Klusvol."
      },
      {
        question: "Werk je alleen met schilders in Groningen?",
        answer: "Nee. Klusvol werkt vanuit Groningen maar bouwt websites voor vakbedrijven door heel Nederland. Voor bedrijven in de regio kan een afspraak ook fysiek plaatsvinden."
      }
    ],

    relatedLocations: [],

    structuredData: null,

    ctaButtonText: "App Folkert over mijn schilderswebsite",
    ctaWhatsappMessage: "Hoi Folkert, ik heb een schildersbedrijf in de regio Groningen en wil even kijken wat er mogelijk is met een website."
  }
];

/**
 * Valideert de integriteit en SEO-regels van LOCAL_SEO_PAGES records.
 * Faalt luid met een duidelijke foutmelding zodra een vereist veld ontbreekt,
 * zodat er nooit per ongeluk incomplete of generieke SEO-pagina's worden gepubliceerd.
 *
 * @param {LocalSeoPageRecord[]} pages - De array van te valideren records
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateLocalSeoPages(pages) {
  if (!Array.isArray(pages)) {
    throw new Error('validateLocalSeoPages: input moet een array zijn.');
  }

  // Lege dataset is 100% geldig (huidige situatie vóór publicatie van testlocaties)
  if (pages.length === 0) {
    return { valid: true, errors: [] };
  }

  const errors = [];
  const slugs = new Set();
  const canonicals = new Set();

  pages.forEach((page, index) => {
    const prefix = `[LocalSeo Record #${index + 1} (${page?.slug || 'geen-slug'})]`;

    if (!page || typeof page !== 'object') {
      errors.push(`${prefix}: Record moet een object zijn.`);
      return;
    }

    // 1. Slug controle
    if (!page.slug || typeof page.slug !== 'string' || !page.slug.trim()) {
      errors.push(`${prefix}: Verplicht veld "slug" ontbreekt.`);
    } else {
      const cleanSlug = page.slug.replace(/^\/+|\/+$/g, '');
      if (slugs.has(cleanSlug)) {
        errors.push(`${prefix}: Dubbele slug ontdekt: "${cleanSlug}". Slugs moeten uniek zijn.`);
      }
      slugs.add(cleanSlug);
    }

    // 2. pageType controle
    if (page.pageType !== undefined && page.pageType !== 'location' && page.pageType !== 'branch-location') {
      errors.push(`${prefix}: Ongeldig veld "pageType": "${page.pageType}". Toegestaan: "location" of "branch-location".`);
    }

    // 3. branch controle bij branch-location
    if (page.pageType === 'branch-location') {
      if (!page.branch || typeof page.branch !== 'string' || !page.branch.trim()) {
        errors.push(`${prefix}: Verplicht veld "branch" ontbreekt bij pageType "branch-location".`);
      }
    }

    // 4. City aanwezig
    if (!page.city || typeof page.city !== 'string' || !page.city.trim()) {
      errors.push(`${prefix}: Verplicht veld "city" ontbreekt.`);
    }

    // 5. SEO Metadata controle
    if (!page.seo || typeof page.seo !== 'object') {
      errors.push(`${prefix}: Verplicht object "seo" ontbreekt.`);
    } else {
      if (!page.seo.title || typeof page.seo.title !== 'string' || !page.seo.title.trim()) {
        errors.push(`${prefix}: Verplicht veld "seo.title" ontbreekt.`);
      }
      if (!page.seo.description || typeof page.seo.description !== 'string' || !page.seo.description.trim()) {
        errors.push(`${prefix}: Verplicht veld "seo.description" ontbreekt.`);
      }
      if (!page.seo.canonical || typeof page.seo.canonical !== 'string' || !page.seo.canonical.trim()) {
        errors.push(`${prefix}: Verplicht veld "seo.canonical" ontbreekt.`);
      } else {
        if (canonicals.has(page.seo.canonical)) {
          errors.push(`${prefix}: Dubbele canonical ontdekt: "${page.seo.canonical}".`);
        }
        canonicals.add(page.seo.canonical);

        // Canonical moet aansluiten op https://klusvol.nl/${slug}
        if (page.slug) {
          const cleanSlug = page.slug.replace(/^\/+|\/+$/g, '');
          const expectedCanonical = `https://klusvol.nl/${cleanSlug}`;
          if (page.seo.canonical !== expectedCanonical) {
            errors.push(
              `${prefix}: Canonical "${page.seo.canonical}" sluit niet aan op slug. Verwacht: "${expectedCanonical}".`
            );
          }
        }
      }
    }

    // 6. Content controle
    if (!page.content || typeof page.content !== 'object') {
      errors.push(`${prefix}: Verplicht object "content" ontbreekt.`);
    } else {
      if (!page.content.h1 || typeof page.content.h1 !== 'string' || !page.content.h1.trim()) {
        errors.push(`${prefix}: Verplicht veld "content.h1" ontbreekt.`);
      }
      if (!page.content.intro || typeof page.content.intro !== 'string' || !page.content.intro.trim()) {
        errors.push(`${prefix}: Verplicht veld "content.intro" ontbreekt.`);
      }
      if (!page.content.localContext || typeof page.content.localContext !== 'string' || !page.content.localContext.trim()) {
        errors.push(`${prefix}: Verplicht veld "content.localContext" ontbreekt.`);
      }
    }
  });

  if (errors.length > 0) {
    const message = `Contentvalidatie van LOCAL_SEO_PAGES mislukt:\n- ${errors.join('\n- ')}`;
    throw new Error(message);
  }

  return { valid: true, errors: [] };
}
