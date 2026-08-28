const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// 1. Imports
content = content.replace(
  'import React, { useState, useEffect, useRef, Suspense, lazy } from "react";',
  `import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const branchData: Record<string, { title: string, subtext: string, faqs: {q: string, a: string}[] }> = {
  "schilder": {
    title: "Schilders",
    subtext: "Speciaal voor schilders die hun vakwerk online net zo goed willen presenteren als op de wand.",
    faqs: [
      { q: "Hoeveel kost een website voor een schilder?", a: "Voor een eenmalige investering van €1.500,- bouwen wij een premium website voor jouw schildersbedrijf, inclusief een app. Daarna betaal je €69,- per maand voor hosting en beheer." },
      { q: "Krijgt een schilder ook nieuwe klanten via zijn website?", a: "Ja. Omdat we de website optimaliseren voor lokale zoekopdrachten (bijv. 'Schilder in [Jouw Regio]'), word je beter gevonden door mensen die direct op zoek zijn naar jouw vakmanschap." }
    ]
  },
  "stukadoor": {
    title: "Stukadoors",
    subtext: "Speciaal voor stukadoors die liever op de bouw staan dan achter een laptop.",
    faqs: [
      { q: "Wat kost een website voor een stukadoor?", a: "Je betaalt eenmalig €1.500,- voor het bouwen van de website. Vervolgens betaal je €69,- per maand voor betrouwbare hosting, onderhoud en support via WhatsApp." },
      { q: "Kan ik als stukadoor mijn projecten online tonen?", a: "Absoluut! We integreren een portfolio-gedeelte in je website waar je eenvoudig voor/na foto's van je stucwerk kunt laten zien aan potentiële klanten." }
    ]
  },
  "hovenier": {
    title: "Hoveniers",
    subtext: "Speciaal voor hoveniers die hun projecten willen tonen aan nieuwe klanten in de regio.",
    faqs: [
      { q: "Waarom heb ik als hovenier een professionele website nodig?", a: "Een goede website laat jouw afgeronde tuinen en projecten spreken. Het wekt direct vertrouwen en zorgt ervoor dat klanten jou bellen in plaats van de concurrent." },
      { q: "Wat zijn de kosten voor een hovenierswebsite?", a: "De eenmalige bouwkosten bedragen €1.500,-. Daarna verzorgen wij voor €69,- per maand de hosting, technische updates en ben je verzekerd van snelle support." }
    ]
  },
  "klusbedrijf": {
    title: "Klusbedrijven",
    subtext: "Speciaal voor klusbedrijven die klaar zijn om online serieus zichtbaar te worden.",
    faqs: [
      { q: "Wat kost een website voor mijn klusbedrijf?", a: "De opstartkosten zijn €1.500,- voor de volledige bouw van de website. Het maandelijkse abonnement voor hosting, beveiliging en support is €69,-." },
      { q: "Word ik als klusbedrijf dan ook lokaal beter gevonden?", a: "Jazeker. We richten je website zo in dat wanneer mensen in jouw omgeving zoeken naar een betrouwbaar klusbedrijf, ze veel sneller bij jou uitkomen." }
    ]
  }
};
`
);

// 2. SectorSection Update
content = content.replace(
  /const sectorsRow1 = \[([\s\S]*?)\];/,
  `const sectorsRow1 = [
  { icon: Paintbrush, label: "Schilders", url: "/website-schilder" },
  { icon: Layers, label: "Stukadoors", url: "/website-stukadoor" },
  { icon: Trees, label: "Hoveniers", url: "/website-hovenier" },
  { icon: Grid, label: "Tegelzetters" },
  { icon: Key, label: "Deur- en slotenmakers" },
];`
);

content = content.replace(
  /const sectorsRow2 = \[([\s\S]*?)\];/,
  `const sectorsRow2 = [
  { icon: AppWindow, label: "Ramen en kozijnen" },
  { icon: Droplets, label: "Loodgieters" },
  { icon: Zap, label: "Installateurs" },
  { icon: Hammer, label: "Klusbedrijven", url: "/website-klusbedrijf" },
  { icon: Armchair, label: "Meubelmakers" },
];`
);

content = content.replace(
  /\{row1\.map\(\(sector, i\) => \([\s\S]*?<div\n*([\s\S]*?)>\n*([\s\S]*?)<\/div>\n*\)\)}/,
  `{row1.map((sector, i) => {
    const Component = sector.url ? Link : 'div';
    const props = sector.url ? { to: sector.url } : {};
    return (
      <Component
        key={i}
        {...props}
        className="group px-5 py-2.5 rounded-full bg-white border border-slate-200 flex items-center gap-3 cursor-pointer whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300 shadow-sm"
      >
        <sector.icon
          size={16}
          className="text-slate-600 group-hover:text-brand-orange transition-colors"
        />
        <span className="font-medium text-slate-800 text-sm group-hover:text-slate-900 transition-colors">
          {sector.label}
        </span>
      </Component>
    );
  })}`
);

content = content.replace(
  /\{row2\.map\(\(sector, i\) => \([\s\S]*?<div\n*([\s\S]*?)>\n*([\s\S]*?)<\/div>\n*\)\)}/,
  `{row2.map((sector, i) => {
    const Component = sector.url ? Link : 'div';
    const props = sector.url ? { to: sector.url } : {};
    return (
      <Component
        key={i}
        {...props}
        className="group px-5 py-2.5 rounded-full bg-white border border-slate-200 flex items-center gap-3 cursor-pointer whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300 shadow-sm"
      >
        <sector.icon
          size={16}
          className="text-slate-600 group-hover:text-brand-orange transition-colors"
        />
        <span className="font-medium text-slate-800 text-sm group-hover:text-slate-900 transition-colors">
          {sector.label}
        </span>
      </Component>
    );
  })}`
);


// 3. PricingShowcaseSlider parameter
content = content.replace(
  /const PricingShowcaseSlider = \(\) => \{/,
  `const PricingShowcaseSlider = ({ branchType }: { branchType?: string }) => {`
);
content = content.replace(
  /const showcases = \[/,
  `const allShowcases = [`
);
content = content.replace(
  /\];[\s\n]*const \[idx, setIdx\] = useState\(0\);/,
  `];
  
  const showcases = branchType === 'stukadoor' 
    ? allShowcases.filter(s => s.title.includes('Jeffrey Green'))
    : allShowcases;

  const [idx, setIdx] = useState(0);`
);

// 4. Update App()
content = content.replace(
  /function App\(\) \{[\s\n]*const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\);[\s\n]*const \[scrolled, setScrolled\] = useState\(false\);[\s\n]*const \[activePage, setActivePage\] = useState<[\s\S]*?>\("home"\); \/\/ TYPE UPDATED/,
  `function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  let activePage = "home";
  let branchType = "";
  if (pathname === "/privacy") activePage = "privacy";
  else if (pathname === "/terms") activePage = "terms";
  else if (pathname === "/about") activePage = "about";
  else if (pathname === "/cases") activePage = "cases";
  else if (pathname.startsWith("/website-")) {
    const possibleBranch = pathname.replace("/website-", "");
    if (branchData[possibleBranch]) {
      activePage = "branch";
      branchType = possibleBranch;
    }
  }`
);

content = content.replace(
  /const navigateTo = \([\s\S]*?\} else \{[\s\S]*?\}\s*};\s*/,
  `const navigateTo = (
    page: "home" | "privacy" | "terms" | "about" | "cases",
    sectionId?: string,
  ) => {
    setMobileMenuOpen(false);
    
    let path = "/";
    if (page !== "home") path = \`/\${page}\`;
    navigate(path);

    if ((page === "home" || page === "branch") && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
`
);

// Fix <Helmet> setup
content = content.replace(
  /<div className="bg-\[#FAF9F6\] text-slate-900 font-sans overflow-x-hidden selection:bg-brand-orange\/30 min-h-screen">/,
  `<div className="bg-[#FAF9F6] text-slate-900 font-sans overflow-x-hidden selection:bg-brand-orange/30 min-h-screen">
      <Helmet>
        <title>{activePage === 'branch' ? \`Website laten maken voor \${branchData[branchType].title.toLowerCase()} | Klusvol\` : "Klusvol | Websites voor vakmensen"}</title>
        <meta name="description" content={activePage === 'branch' ? \`Speciaal voor \${branchData[branchType].title.toLowerCase()}. Ontvang een premium website inclusief app voor €69,- per maand. Tijdelijk €0 opstartkosten voor 2 referentie-cases!\` : "Klusvol bouwt websites voor vakmensen (schilders, hoveniers, stukadoors, loodgieters en klusbedrijven). Vanuit Groningen voor heel Nederland."} />
        {activePage === 'branch' && <link rel="canonical" href={\`https://klusvol.nl/website-\${branchType}\`} />}
      </Helmet>`
);

// 5. Replace `activePage === "home"` with `(activePage === "home" || activePage === "branch")`
content = content.replace(
  /\{activePage === "home" \? \(/,
  `{(activePage === "home" || activePage === "branch") ? (`
);

// 6. Update Hero Text
content = content.replace(
  /Jouw vakwerk verdient een\{" "\}\s*<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600 block mt-2">\s*strakke website\s*<\/span>/,
  `{activePage === "branch" ? (
                    <>Website voor <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600 block mt-2">{branchData[branchType].title.toLowerCase()}</span></>
                  ) : (
                    <>Jouw vakwerk verdient een{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600 block mt-2">strakke website</span></>
                  )}`
);

content = content.replace(
  /Klusvol bouwt websites voor vakmensen \(schilders, hoveniers, stukadoors, loodgieters en klusbedrijven\)\. Vanuit Groningen voor heel Nederland\./,
  `{activePage === "branch" ? branchData[branchType].subtext : "Klusvol bouwt websites voor vakmensen (schilders, hoveniers, stukadoors, loodgieters en klusbedrijven). Vanuit Groningen voor heel Nederland."}`
);

// 7. Update PricingShowcaseSlider call
content = content.replace(
  /<PricingShowcaseSlider \/>/,
  `<PricingShowcaseSlider branchType={branchType} />`
);

fs.writeFileSync('App.tsx', content);
