import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  CheckCircle2,
  MessageCircle,
  MapPin,
  Coffee,
  ArrowRight,
  Paintbrush,
  Layers,
  Trees,
  Wrench,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Hammer,
  Star,
  Clock,
} from "lucide-react";

export const HoekstraHeroVisual: React.FC = () => (
  <div className="lg:col-span-6 w-full relative">
    {/* Achtergrond sfeergloed */}
    <div className="absolute -inset-4 rounded-3xl pointer-events-none [background:radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.18)_0%,rgba(245,158,11,0.08)_50%,transparent_80%)]" />

    <div className="relative mx-auto max-w-lg lg:max-w-none">
      {/* Neutraal decoratief dieptevlak achter de browser */}
      <div className="hidden sm:block absolute -top-3 -left-3 w-full h-full rounded-2xl border border-slate-200/60 bg-slate-100/60 pointer-events-none transform -rotate-1" />

      {/* Primaire grote browser-preview van één echt project */}
      <div className="relative z-10 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Browser balk */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="bg-slate-800 text-slate-300 text-[11px] px-3.5 py-1 rounded-md font-mono truncate max-w-[220px]">
            hoekstrasprayworks.nl
          </div>
          <div className="w-8" />
        </div>

        {/* Screenshot van de echte gebouwde website (gecropt op het scherm zodat de laptop-hardware wegvalt) */}
        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
          <img
            fetchPriority="high"
            decoding="async"
            src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/6a0de5700b9f75f8b3387eae.png"
            alt="Hoekstra Sprayworks website gebouwd door Klusvol"
            className="w-full h-full object-cover scale-[1.38] object-[50%_44%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Overlappende decoratieve smartphone-preview met echte mobiele screenshot */}
      <div className="absolute -bottom-4 -right-2 sm:-right-4 sm:-bottom-5 z-20 w-28 sm:w-32 md:w-36 rounded-[1.25rem] sm:rounded-2xl border-[3px] border-slate-900 bg-slate-900 shadow-xl overflow-hidden aspect-[9/16] pointer-events-none">
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
          <img
            fetchPriority="high"
            decoding="async"
            src="/hero-hoekstra-mobile.webp"
            alt="Hoekstra Sprayworks mobiele website weergave"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
);

const GOOGLE_REVIEWS = [
  {
    name: "Bart ten Berge",
    text: "Ideaal dat Folkert altijd beschikbaar is. Ik kan hem altijd even appen of bellen.",
  },
  {
    name: "Teun Hoekstra",
    text: "Wij zijn ontzettend blij met de website die Folkert van Klusvol voor ons schilder- en spuitbedrijf heeft gemaakt. De communicatie is top en Folkert denkt graag met ons mee om het meeste uit de website te behalen.",
  },
  {
    name: "J Kuipers",
    text: "Klusvol is een erg fijne partij om mee samen te werken. De lijntjes zijn kort, als ik bel of app wordt het altijd diezelfde werkdag nog opgepakt.",
  },
];

export interface LocalSeoFaqItem {
  question: string;
  answer: string;
}

export interface LocalSeoRelatedLocation {
  slug: string;
  label: string;
}

export interface LocalSeoPageRecord {
  slug: string;
  city: string;
  region: string;
  branch?: string;
  pageType?: 'location' | 'branch-location';
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  content: {
    h1: string;
    intro: string;
    localContext: string;
    whyKlusvol?: string;
    proof?: string;
    cta?: string;
  };
  faq?: LocalSeoFaqItem[];
  relatedLocations?: Array<LocalSeoRelatedLocation | string>;
  structuredData?: Record<string, any> | null;
  ctaButtonText?: string;
  ctaWhatsappMessage?: string;
}

interface LocalSeoPageProps {
  record: LocalSeoPageRecord;
  onBack?: () => void;
  onCta?: () => void;
}

export const LocalSeoPage: React.FC<LocalSeoPageProps> = ({
  record,
  onBack,
  onCta,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [record.slug]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const hasRelatedLocations =
    Array.isArray(record.relatedLocations) && record.relatedLocations.length > 0;
  const hasFaqs = Array.isArray(record.faq) && record.faq.length > 0;

  const ctaButtonText =
    record.ctaButtonText ||
    (record.city === "Groningen"
      ? "App Folkert over mijn website"
      : "App via WhatsApp");

  const whatsappMessage =
    record.ctaWhatsappMessage ||
    (record.city === "Groningen"
      ? "Hoi Folkert, ik heb een vakbedrijf in de regio Groningen en wil even kijken wat er mogelijk is met een website."
      : `Hallo Folkert, ik heb interesse in een website via Klusvol voor ${record.city}.`);

  // Tak voor specifieke branche + locatie pilotpagina's (bijv. /website-schilder-groningen)
  if (record.pageType === "branch-location") {
    return (
      <main className="min-h-screen pt-28 md:pt-36 pb-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 1. HERO: BRANCH-SPECIFIEK */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20 md:mb-28">
            {/* Links: Badge, H1, Intro, WhatsApp CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-5">
                <Paintbrush size={13} className="text-brand-orange" />
                <span>Websites voor schilders in {record.city}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-slate-900 mb-6 tracking-tight leading-[1.08] text-balance">
                {record.content.h1}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-xl">
                {record.content.intro}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href={`https://wa.me/31643411427?text=${encodeURIComponent(
                    whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange text-white px-7 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto sm:whitespace-nowrap shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 duration-300"
                >
                  <MessageCircle size={19} className="shrink-0" />
                  <span className="whitespace-nowrap">{ctaButtonText}</span>
                </a>

                {onCta && (
                  <button
                    type="button"
                    onClick={onCta}
                    className="inline-flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold py-3 px-4 underline underline-offset-4 decoration-slate-300 hover:decoration-brand-orange transition-colors"
                  >
                    <Coffee size={16} className="text-brand-orange" />
                    <span>Plan een koffiegesprek</span>
                  </button>
                )}
              </div>
            </div>

            {/* Rechts: Herbruikbare coherente Hoekstra Sprayworks desktop + mobiele preview */}
            <HoekstraHeroVisual />
          </section>

          {/* 2. SAMENGEVOEGDE SCHILDER-SECTIE: Laat zien wat je als schilder kunt (SPLIT LAYOUT MET ASYMMETRISCHE COLLAGE) */}
          <section className="mb-20 md:mb-28 pt-8 border-t border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Links: Heading, intro & 3 kernpunten */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3">
                  <Sparkles size={14} />
                  <span>Vakmanschap in beeld</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  Laat zien wat je als schilder kunt
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-light">
                  Voor een potentiële klant telt vooral wat hij kan zien. Laat duidelijk zien welk schilderwerk je uitvoert, toon echte projecten en maak het makkelijk om contact op te nemen.
                </p>

                <div className="space-y-6 pt-6 border-t border-slate-200/80">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Paintbrush size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        Je werkzaamheden
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Binnen- en buitenschilderwerk, spuitwerk, renovatie of andere specialisaties duidelijk zichtbaar maken, zodat bezoekers direct weten wat je doet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        Je projecten
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Echte foto's van uitgevoerd werk laten zien zodat bezoekers kunnen beoordelen of de stijl en afwerking bij hun klus passen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        Contact zonder gedoe
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Duidelijk bellen of WhatsApp aanbieden zonder lange formulieren of ingewikkelde stappen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rechts: Asymmetrische fotocollage van echt schilder- en spuitwerk */}
              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 lg:gap-4 items-center pt-2">
                  {/* Grote hoofdfoto: Vakman van Hoekstra Sprayworks met airless spuitpistool */}
                  <div className="sm:col-span-12 lg:col-span-7">
                    <div className="rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-100 aspect-[4/3] relative">
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/schilderwerk/spuitwerk-vakman-hoekstra.webp"
                        alt="Vakman van Hoekstra Sprayworks aan het werk met airless verfspuitapparatuur"
                        width={1000}
                        height={750}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Secundaire detailfoto's: rechts op desktop, 2 kolommen op mobiel */}
                  <div className="sm:col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:-ml-6 lg:z-10">
                    {/* Foto rechtsboven: Strak buitenschilderwerk van dakkapel */}
                    <div className="rounded-xl lg:rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 aspect-[4/3] relative">
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/schilderwerk/buitenschilderwerk-dakkapel.webp"
                        alt="Strak afgewerkt buitenschilderwerk van dakkapel in hoogglans lak"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Foto rechtsonder: Karakteristieke woning buitenzijde / erker en daklijsten */}
                    <div className="rounded-xl lg:rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 aspect-[4/3] relative">
                      <img
                        loading="lazy"
                        decoding="async"
                        src="/schilderwerk/buitenschilderwerk-woning.webp"
                        alt="Opgeleverd buitenschilderwerk van gevel, erker en kozijnen"
                        width={600}
                        height={692}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. REFERENTIEPROJECT HOEKSTRA (EDITORIAL KLANTCASE IN DONKER CONTRASTVLAK) */}
          <section className="mb-20 md:mb-28">
            <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Links: Projectinformatie & Context */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                      Referentieproject
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                      Gebouwd voor een schilder- en spuitbedrijf
                    </h2>
                    <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-xl font-light mb-6">
                      Een echte Klusvol-website in de praktijk, ingericht voor professioneel spuit- en schilderwerk. Heldere presentatie van werkzaamheden en direct contact voor serieuze aanvragen.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300 mb-8">
                      <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-brand-orange border border-slate-700">
                        Hoekstra Sprayworks
                      </span>
                      <span className="text-slate-400">
                        Klant sinds maart 2026
                      </span>
                    </div>
                  </div>

                  <div>
                    <a
                      href="https://hoekstrasprayworks.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold text-white hover:text-brand-orange transition-colors text-sm group"
                    >
                      <span className="underline underline-offset-4 decoration-slate-700 group-hover:decoration-brand-orange">
                        Bekijk hoekstrasprayworks.nl
                      </span>
                      <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Rechts: Teun Hoekstra Google Review (geïntegreerd in donker vlak) */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                        Google Review
                      </span>
                    </div>

                    <blockquote className="text-slate-200 text-base sm:text-lg leading-relaxed italic mb-5 font-normal">
                      "{GOOGLE_REVIEWS[1].text}"
                    </blockquote>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-700/70">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">
                        TH
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {GOOGLE_REVIEWS[1].name}
                        </div>
                        <div className="text-xs text-slate-400">
                          Hoekstra Sprayworks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. GRONINGEN & PRIJZEN / WERKWIJZE */}
          <section className="mb-20 md:mb-28 pt-8 border-t border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Links: Heading & Tekst */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3">
                  <span>Vanuit Groningen</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  Persoonlijk contact en een duidelijke werkwijze
                </h2>
                <div className="text-slate-600 leading-relaxed text-base md:text-lg space-y-4 max-w-2xl font-light">
                  <p>
                    {record.content.whyKlusvol}
                  </p>
                  <p>
                    Klusvol werkt vanuit Groningen en helpt schildersbedrijven in de regio en door heel Nederland. Wil je kennismaken? Dat kan online of fysiek op locatie in Groningen en omgeving.
                  </p>
                </div>
              </div>

              {/* Rechts: Prijzen & voorwaarden langs rustige lijn */}
              <div className="lg:col-span-5 border-l-2 border-orange-200/80 pl-6 sm:pl-8 space-y-6 pt-2 lg:pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      Duidelijke kosten
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Normale bouw en opstart circa €1.500. Voor geselecteerde referentieprojecten kan de opstart €0 zijn. Daarna €69 per maand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      Onderhoud & kleine wijzigingen
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Inclusief hosting, technisch onderhoud en kleine wijzigingen zoals nieuwe foto's of een aangepaste dienst.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      Duidelijke overeenkomst
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Voor nieuwe overeenkomsten geldt een minimale looptijd van 24 maanden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FAQ (BRANCH-SPECIFIEK) */}
          {hasFaqs && (
            <section className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 shadow-xs">
              <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                Veelgestelde Vragen
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                Vragen over websites voor schildersbedrijven
              </h2>
              <div className="divide-y divide-slate-100">
                {record.faq!.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-3.5 sm:py-4">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between text-left gap-4 font-semibold text-slate-900 hover:text-brand-orange transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base sm:text-lg">{item.question}</span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-400 transform transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-brand-orange" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-slate-600 leading-relaxed text-sm md:text-base pr-4">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 7. INTERNE LINKS (CRAWLBAAR NAAR BRANCH & LOCATIE) */}
          <nav aria-label="Gerelateerde pagina's" className="mb-16 pt-8 border-t border-slate-200/80">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Bekijk ook gerelateerde pagina's
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/website-schilder"
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-xs transition-all duration-300 group flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
                    Branche informatie
                  </span>
                  <span className="font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                    Meer over Klusvol-websites voor schilders
                  </span>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>

              <Link
                to="/website-laten-maken-groningen"
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-xs transition-all duration-300 group flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
                    Lokale informatie
                  </span>
                  <span className="font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                    Algemene website laten maken in Groningen
                  </span>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            </div>
          </nav>

          {/* 8. DONKERE CTA */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none [background:radial-gradient(circle_at_top_right,rgba(249,115,22,0.15)_0%,transparent_70%)]" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                Direct Contact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-tight">
                {record.content.cta}
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light">
                Stuur me een WhatsApp en vertel kort wat voor schilderwerk je doet. Dan kijken we samen wat er voor jouw bedrijf mogelijk is.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`https://wa.me/31643411427?text=${encodeURIComponent(
                    whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto sm:whitespace-nowrap shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 duration-300"
                >
                  <MessageCircle size={19} className="shrink-0" />
                  <span className="whitespace-nowrap">{ctaButtonText}</span>
                </a>

                {onCta && (
                  <button
                    type="button"
                    onClick={onCta}
                    className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-4 rounded-full font-semibold text-base transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Coffee size={18} className="text-brand-orange" />
                    <span>Plan een koffiegesprek</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Bestaande layout voor standaard locatiepagina's (bijv. /website-laten-maken-groningen)
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. HERO: ECHTE PROJECTEN ALS VISUEEL HOOFDANKER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20 md:mb-28">
          {/* Links: Tekst + Primaire WhatsApp CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-5">
              <MapPin size={13} className="text-brand-orange" />
              <span>Lokale Websites voor Vakmensen</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-slate-900 mb-6 tracking-tight leading-[1.08] text-balance">
              {record.content.h1}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-xl">
              {record.content.intro}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={`https://wa.me/31643411427?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-orange text-white px-7 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto sm:whitespace-nowrap shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 duration-300"
              >
                <MessageCircle size={19} className="shrink-0" />
                <span className="whitespace-nowrap">{ctaButtonText}</span>
              </a>

              {onCta && (
                <button
                  type="button"
                  onClick={onCta}
                  className="inline-flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold py-3 px-4 underline underline-offset-4 decoration-slate-300 hover:decoration-brand-orange transition-colors"
                >
                  <Coffee size={16} className="text-brand-orange" />
                  <span>Plan een koffiegesprek</span>
                </button>
              )}
            </div>
          </div>

          {/* Rechts: Herbruikbare coherente Hoekstra Sprayworks desktop + mobiele preview */}
          <HoekstraHeroVisual />
        </section>

        {/* 2. REGIONALE FOCUS: Ruimtelijke editorial sectie (geen zware cards) */}
        <section className="mb-20 md:mb-28 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Links: Heading & Tekst */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3">
                <span>Regionale Focus</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Lokale vindbaarheid en werkgebied
              </h2>
              <div className="text-slate-600 leading-relaxed text-base md:text-lg space-y-4 max-w-2xl">
                <p>{record.content.localContext}</p>
              </div>
            </div>

            {/* Rechts: Drie items langs een rustige verticale scheidslijn */}
            <div className="lg:col-span-5 border-l-2 border-orange-200/80 pl-6 sm:pl-8 space-y-6 pt-2 lg:pt-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    Vanuit Groningen
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Klusvol bouwt en beheert websites vanuit Groningen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <Coffee size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    Online of fysiek afspreken
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Een kennismaking kan online of fysiek in de regio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <Hammer size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    Voor vakbedrijven
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Speciaal voor schilders, stukadoors, hoveniers en klusbedrijven.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WAAROM KLUSVOL: Eén brede horizontale sectie met 3 kolommen */}
        {record.content.whyKlusvol && (
          <section className="mb-20 md:mb-28">
            <div className="mb-8">
              <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                Samenwerking
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Waarom vakmensen voor Klusvol kiezen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 border-y border-slate-200/90 py-10">
              {/* Voordeel 1 */}
              <div className="pb-8 md:pb-0 md:pr-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-4">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Direct contact
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Je hebt rechtstreeks contact met degene die je website bouwt en beheert. Geen ticketsysteem of verschillende contactpersonen.
                  </p>
                </div>
              </div>

              {/* Voordeel 2 */}
              <div className="py-8 md:py-0 md:px-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-4">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Hosting & beheer geregeld
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Hosting en technisch onderhoud kunnen door Klusvol worden geregeld, zodat jij je kunt richten op je eigen vak.
                  </p>
                </div>
              </div>

              {/* Voordeel 3 */}
              <div className="pt-8 md:pt-0 md:pl-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-4">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Kleine wijzigingen zonder gedoe
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Kleine aanpassingen nodig? Stuur me een appje, dan pak ik ze voor je op.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. BEWIJS / PROJECTEN: Visueel centrum met echte Klusvol projecten (zonder quotes) */}
        <section className="mb-20 md:mb-28">
          <div className="mb-10">
            <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Vakwerk in de Praktijk
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Websites die ik voor vakbedrijven heb gebouwd
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl">
              Klusvol bouwt en beheert websites voor vakbedrijven in Noord-Nederland. Hieronder zie je een selectie van live websites voor schilders en stukadoors.
            </p>
          </div>

          {/* Showcase met exact 2 echte projecten: Jeffrey Green & Hessels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Featured Project 1: Jeffrey Green */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://assets.cdn.filesafe.space/v2mZBfrhSs3uFVZENKQy/media/6a394e3928e2dab9ea39174b.webp"
                  alt="Stukadoorsbedrijf Jeffrey Green website"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Stukadoorsbedrijf
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-brand-orange uppercase tracking-wider text-[11px]">
                      Stukadoor
                    </span>
                    <span>Klant sinds augustus 2026</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Stukadoorsbedrijf Jeffrey Green
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    Een strakke website voor stukadoorswerk, gericht op het duidelijk tonen van gerealiseerde projecten en een snelle route naar contact.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-xs text-slate-500 font-medium">
                    Live website
                  </span>
                  <a
                    href="https://stukadoorjeffreygreen.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-brand-orange transition-colors"
                  >
                    <span>Bekijk website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Project 2: Stukadoorsbedrijf Hessels */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://images.unsplash.com/photo-1625585598750-3535fe40efb3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&auto=format&ixid=M3wyNzQ4Mjd8MHwxfHNlYXJjaHwxOHx8bWluaW1hbCUyMGludGVyaW9yfGVufDB8fHx8MTc3MTk1MTM4Mnww&ixlib=rb-4.1.0&q=75&w=800"
                  alt="Stukadoorsbedrijf Hessels website"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Stukadoorsbedrijf
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-brand-orange uppercase tracking-wider text-[11px]">
                      Stukadoorsbedrijf
                    </span>
                    <span>Klant sinds april 2026</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Stukadoorsbedrijf Hessels
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    Representatieve website voor stuc- en pleisterwerk, gericht op een duidelijke presentatie van het vakwerk en eenvoudige bereikbaarheid.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-xs text-slate-500 font-medium">
                    Live website
                  </span>
                  <a
                    href="https://stukadoorsbedrijfhessels.nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-brand-orange transition-colors"
                  >
                    <span>Bekijk website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. REVIEWS: Wat klanten over Klusvol zeggen (Google Reviews) */}
        <section className="mb-20 md:mb-28">
          <div className="mb-10">
            {/* Google Review Samenvattingsbadge */}
            <div className="inline-flex items-center gap-4 bg-white border border-slate-200 shadow-xs px-6 py-3 rounded-2xl mb-6 text-left">
              <svg viewBox="0 0 24 24" width="28" height="28" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path fill="none" d="M1 1h22v22H1z"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-slate-900 text-sm">Uitstekend</span>
                  <div className="flex gap-0.5 text-amber-400">
                    <Star className="fill-current" size={14} />
                    <Star className="fill-current" size={14} />
                    <Star className="fill-current" size={14} />
                    <Star className="fill-current" size={14} />
                    <Star className="fill-current" size={14} />
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium leading-tight whitespace-nowrap">
                  <strong className="text-slate-700">5</strong> uit 5 op basis van 5 reviews
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
              Wat klanten over Klusvol zeggen
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-2xl font-light">
              Ervaringen van ondernemers met wie ik samenwerk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-brand-orange/30 hover:shadow-sm transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-base">
                        {review.name.charAt(0)}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight">
                        {review.name}
                      </h3>
                    </div>
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      <path fill="none" d="M1 1h22v22H1z"/>
                    </svg>
                  </div>
                  <div className="flex gap-0.5 mb-4 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={15} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-light text-sm">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BRANCHES: Luchtige, open interactieve rasterkaarten */}
        <section className="mb-20 md:mb-28">
          <div className="mb-8">
            <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Specialisaties
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
              Websites voor jouw vakgebied
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-2xl">
              Klusvol bouwt websites speciaal afgestemd op jouw vak. Bekijk onze branches:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <Link
              to="/website-schilder"
              className="flex items-center justify-between p-6 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-all duration-300">
                  <Paintbrush size={22} />
                </div>
                <div>
                  <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-orange transition-colors block">
                    Website voor schilders
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Bekijk websites voor schildersbedrijven
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3"
              />
            </Link>

            <Link
              to="/website-stukadoor"
              className="flex items-center justify-between p-6 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-all duration-300">
                  <Layers size={22} />
                </div>
                <div>
                  <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-orange transition-colors block">
                    Website voor stukadoors
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Bekijk websites voor stukadoorsbedrijven
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3"
              />
            </Link>

            <Link
              to="/website-hovenier"
              className="flex items-center justify-between p-6 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-all duration-300">
                  <Trees size={22} />
                </div>
                <div>
                  <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-orange transition-colors block">
                    Website voor hoveniers
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Bekijk websites voor hoveniersbedrijven
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3"
              />
            </Link>

            <Link
              to="/website-klusbedrijf"
              className="flex items-center justify-between p-6 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 hover:border-brand-orange/40 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-all duration-300">
                  <Wrench size={22} />
                </div>
                <div>
                  <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-orange transition-colors block">
                    Website voor klusbedrijven
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Bekijk websites voor allround klusbedrijven
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 ml-3"
              />
            </Link>
          </div>
        </section>

        {/* 6. DONKERE CTA: Krachtige contrastrijke editorial sectie */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-20 md:mb-28 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none [background:radial-gradient(circle_at_top_right,rgba(249,115,22,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Direct Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-tight">
              {record.content.cta || "Klaar voor een website die lokaal voor je werkt?"}
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Geen ellenlange vergaderingen of ingewikkeld gedoe. Wij bouwen een professionele website inclusief hosting en beheer, zodat jij je kunt richten op jouw vakwerk.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://wa.me/31643411427?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto sm:whitespace-nowrap shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 duration-300"
              >
                <MessageCircle size={19} className="shrink-0" />
                <span className="whitespace-nowrap">{ctaButtonText}</span>
              </a>

              {onCta && (
                <button
                  type="button"
                  onClick={onCta}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-4 rounded-full font-semibold text-base transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Coffee size={18} className="text-brand-orange" />
                  <span>Plan een koffiegesprek</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 7. FAQ: Rustige, brede enkele container met heldere open states */}
        {hasFaqs && (
          <section className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 sm:p-10 lg:p-12 mb-16 shadow-xs">
            <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Veelgestelde Vragen
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              Vragen over websites in jouw regio
            </h2>
            <div className="divide-y divide-slate-100">
              {record.faq!.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left gap-4 font-semibold text-slate-900 hover:text-brand-orange transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg">{item.question}</span>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 transform transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-brand-orange" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3.5 text-slate-600 leading-relaxed text-sm md:text-base pr-4">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 8. Gerelateerde Locaties (indien van toepassing) */}
        {hasRelatedLocations && (
          <nav aria-label="Gerelateerde locaties" className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Bekijk ook andere regio's:
            </h3>
            <div className="flex flex-wrap gap-2">
              {record.relatedLocations!.map((loc, i) => {
                const slug = typeof loc === "string" ? loc : loc.slug;
                const label = typeof loc === "string" ? loc : loc.label;
                const path = `/${slug.replace(/^\/+/, "")}`;
                return (
                  <Link
                    key={i}
                    to={path}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </main>
  );
};

export default LocalSeoPage;
