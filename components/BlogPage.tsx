import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, ChevronLeft, User, ArrowRight, Search, Coffee, Play, Pause, 
  Share2, Calculator, Headphones, Music2, Check, Loader2, X, Linkedin, 
  Link as LinkIcon, Twitter, MessageCircle, BookOpen, Layers, Target, 
  TrendingUp, Anchor, ArrowUpRight, HelpCircle, ChevronDown, List, Hammer
} from 'lucide-react';

// =================================================================================================
// DEEL 1: CONFIGURATIE & CONTENT (HIER PAS JE DE BLOGS AAN)
// =================================================================================================

/* 
   -------------------------------------------------------------------------------------------------
   HOE VOEG JE EEN NIEUW BLOG TOE?
   -------------------------------------------------------------------------------------------------
   Kopieer het onderstaande blok en plak het in de 'ARTICLES' lijst hieronder.
   
   {
    id: 'unieke-naam-voor-url',
    type: 'cluster', // of 'monster' voor een hoofdartikel
    pillarId: 'finance', // Kies uit: 'finance', 'clients', of 'efficiency'
    title: "Titel van je blog",
    excerpt: "Korte samenvatting voor op de kaartjes.",
    coverImage: "PLAATS_HIER_AFBEELDING_LINK", 
    plainText: "...", // Mag leeg blijven voor nu
    lastUpdated: "24 Mei 2024",
    author: "Jouw Naam",
    readTime: 5, // Aantal minuten
    relatedIds: ['finance-monster'], // Link naar andere blogs
    summaryPoints: [
      "Belangrijk punt 1",
      "Belangrijk punt 2"
    ],
    content: (
      <>
        <p className="lead text-xl text-gray-300 mb-8 font-light">
           Hier je introductie tekst...
        </p>
        
        <h2 id="tussenkopje" className="text-2xl font-bold text-white mt-12 mb-6">
            Tussenkopje
        </h2>
        <p className="mb-6 text-gray-400">
            Je normale tekst alinea.
        </p>

        <img 
            src="LINK_NAAR_PLAATJE_IN_TEKST" 
            className="w-full rounded-xl border border-white/10 my-8" 
        />
      </>
    )
  },
*/

// --- TYPES (NIET AANPASSEN) ---

type ArticleType = 'monster' | 'cluster';
type PillarId = 'finance' | 'clients' | 'efficiency';

interface Article {
  id: string;
  type: ArticleType;
  pillarId: PillarId;
  title: string;
  excerpt: string;
  coverImage: string;
  plainText: string; 
  content: React.ReactNode;
  author: string;
  lastUpdated: string; 
  readTime: number; 
  relatedIds: string[]; 
  summaryPoints: string[]; 
  faq?: { q: string; a: string }[]; 
}

interface Pillar {
  id: PillarId;
  title: string;
  description: string;
  icon: React.ReactNode;
  monsterBlogId: string;
}

// --- DE INHOUD (DATABASE) ---

const PILLARS: Record<PillarId, Pillar> = {
  finance: {
    id: 'finance',
    title: "Bedrijfsvoering & Winst",
    description: "Stop met geld laten liggen. Optimaliseer je tarieven en cashflow.",
    icon: <TrendingUp size={24} />,
    monsterBlogId: 'finance-monster'
  },
  clients: {
    id: 'clients',
    title: "Klantrelaties & Reputatie",
    description: "Van lastige klanten naar 5-sterren ambassadeurs.",
    icon: <Target size={24} />,
    monsterBlogId: 'clients-monster'
  },
  efficiency: {
    id: 'efficiency',
    title: "Efficiency & Rust",
    description: "Meer werk verzetten in minder tijd, zonder stress.",
    icon: <Layers size={24} />,
    monsterBlogId: 'efficiency-monster'
  }
};

const ARTICLES: Article[] = [
  // -----------------------------------------------------------------------------------------------
  // PILAAR 1: FINANCE
  // -----------------------------------------------------------------------------------------------
  {
    id: 'finance-monster',
    type: 'monster',
    pillarId: 'finance',
    title: "De Ultieme Gids voor een Winstgevend Klusbedrijf",
    excerpt: "Waarom hard werken niet genoeg is. Een compleet systeem om je uurtarief te bepalen, je cashflow te managen en je administratie te automatiseren.",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2672&auto=format&fit=crop",
    plainText: "Dit is de ultieme gids...",
    lastUpdated: "14 Mei 2024",
    author: "Mark de Jong",
    readTime: 12,
    relatedIds: ['finance-1', 'finance-2'],
    summaryPoints: [
      "De meeste vakmensen rekenen 20% te weinig door verborgen kosten.",
      "Factureren voor de start van de motor bespaart 4 uur admin per week.",
      "Vaste prijzen winnen het van uurtje-factuurtje in 80% van de gevallen."
    ],
    faq: [
      { q: "Wat is een gezond uurtarief voor een ZZP'er in de bouw?", a: "Dit hangt af van je kosten, maar mik minimaal op €55-€65 ex BTW om pensioen en risico te dekken." },
      { q: "Moet ik voorrijkosten rekenen?", a: "Ja, of verwerk ze in je starttarief. Gratis reizen bestaat niet." }
    ],
    content: (
      <>
        <p className="lead text-xl text-gray-300 mb-8 font-light">
          Je bent vakman geworden om mooie dingen te maken, niet om boekhouder te spelen. Toch is grip op je cijfers de enige weg naar echte vrijheid.
        </p>
        
        <h2 id="uurtarief" className="text-2xl font-bold text-white mt-12 mb-6 group flex items-center gap-2">
            1. Het Uurtarief Misverstand
        </h2>
        <p className="mb-6 text-gray-400">
            Veel ondernemers kijken naar wat de buurman vraagt. Fout. Je buurman is misschien wel bijna failliet. 
            Je tarief moet gebaseerd zijn op jouw gewenste netto inkomen, gedeeld door je <em>facturabele</em> uren (niet je werkuren).
        </p>
        
        {/* Functional Visual: Cost Breakdown */}
        <div className="my-8 bg-[#12141c] border border-white/10 rounded-2xl p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Waar gaat je €60 per uur heen?</h4>
            <div className="flex h-4 w-full rounded-full overflow-hidden mb-4">
                <div className="w-[30%] bg-red-500"></div>
                <div className="w-[20%] bg-orange-500"></div>
                <div className="w-[15%] bg-yellow-500"></div>
                <div className="w-[35%] bg-green-500"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Belastingen & Verzekering (30%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Bedrijfskosten & Bus (20%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Pensioen & Buffer (15%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full text-white font-bold">Jouw Netto Loon (35%)</div></div>
            </div>
        </div>

        <h2 id="vaste-prijzen" className="text-2xl font-bold text-white mt-12 mb-6">2. Uurtje-factuurtje vs. Aannemen</h2>
        <p className="mb-6 text-gray-400">
            Klaar met discussies over je koffiepauze? Stap over op vaste prijzen. 
            De klant koopt zekerheid ("Het kost €500"), jij koopt efficiëntie. Als jij het in 3 uur doet in plaats van 5, is die winst voor jou.
        </p>
      </>
    )
  },
  {
    id: 'finance-1',
    type: 'cluster',
    pillarId: 'finance',
    title: "Waarom je 's avonds niet meer moet offreren",
    excerpt: "De #1 reden voor burn-outs: administratie in de privétijd. Zo automatiseer je dit weg.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "10 Mei 2024",
    author: "Mark de Jong",
    readTime: 5,
    relatedIds: ['finance-monster'],
    summaryPoints: ["Administratie in de avond kost energie.", "Gebruik tools in de bus."],
    content: <p>Cluster content...</p>
  },
  {
    id: 'finance-2',
    type: 'cluster',
    pillarId: 'finance',
    title: "Facturen die 3x sneller betaald worden",
    excerpt: "Psychologische trucs en technische tools om je geld sneller op de rekening te hebben.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "02 Mei 2024",
    author: "Mark de Jong",
    readTime: 4,
    relatedIds: ['finance-monster'],
    summaryPoints: ["Stuur betaalverzoeken via SMS.", "Wees duidelijk in omschrijvingen."],
    content: <p>Cluster content...</p>
  },

  // -----------------------------------------------------------------------------------------------
  // PILAAR 2: CLIENTS
  // -----------------------------------------------------------------------------------------------
  {
    id: 'clients-monster',
    type: 'monster',
    pillarId: 'clients',
    title: "Het Handboek Klantcommunicatie voor Vakmensen",
    excerpt: "Hoe je 'nee' zegt tegen slechte klanten, 'ja' krijgt op offertes en automatisch 5-sterren reviews verzamelt.",
    coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "20 April 2024",
    author: "Sanne Visser",
    readTime: 15,
    relatedIds: ['clients-1'],
    summaryPoints: [
      "Communicatie is 50% van het werk in de ogen van de klant.",
      "Bereikbaarheid hoeft niet 24/7 te zijn, als het maar duidelijk is.",
      "Reviews zijn je krachtigste marketingtool."
    ],
    faq: [
        {q: "Hoe ga ik om met klanten die steeds de prijs omlaag praten?", a: "Wees beleefd maar ferm. Leg uit dat kwaliteit geld kost. Als ze blijven zeuren: niet aannemen."}
    ],
    content: (
        <>
            <p className="lead text-xl text-gray-300 mb-8 font-light">
                Je bent een vakman, geen helpdeskmedewerker. Toch verwachten klanten dat je altijd bereikbaar bent. Hoe los je dat op?
            </p>
            <h2 id="grenzen" className="text-2xl font-bold text-white mt-12 mb-6">1. Grenzen stellen</h2>
            <p className="mb-6 text-gray-400">
                Het begint bij duidelijkheid. Een klant die om 22:00 appt, verwacht niet per se direct antwoord, tenzij je direct antwoordt.
                Dan schep je een precedent.
            </p>
        </>
    )
  },
  {
    id: 'clients-1',
    type: 'cluster',
    pillarId: 'clients',
    title: "3 Manieren om meer reviews te krijgen",
    excerpt: "Vraag het op het juiste moment. Timing is alles voor die 5 sterren.",
    coverImage: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2671&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "12 April 2024",
    author: "Sanne Visser",
    readTime: 6,
    relatedIds: ['clients-monster'],
    summaryPoints: ["Vraag direct bij oplevering.", "Maak het makkelijk met een link."],
    content: <p>Cluster content...</p>
  },

  // -----------------------------------------------------------------------------------------------
  // PILAAR 3: EFFICIENCY
  // -----------------------------------------------------------------------------------------------
  {
    id: 'efficiency-monster',
    type: 'monster',
    pillarId: 'efficiency',
    title: "De Silent Admin Methode: Nooit meer kantoorwerk",
    excerpt: "Een radicaal andere manier van werken waarbij je administratie zichzelf doet terwijl jij op de klus bent.",
    coverImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "01 Mei 2024",
    author: "Erik de Vries",
    readTime: 10,
    relatedIds: ['efficiency-1'],
    summaryPoints: ["Gebruik je reistijd nuttig.", "Digitaliseer bonnen direct."],
    content: <p>Monster content...</p>
  },
  {
    id: 'efficiency-1',
    type: 'cluster',
    pillarId: 'efficiency',
    title: "WhatsApp Zakelijk vs. Privé",
    excerpt: "Waarom een 06-nummer op je bus een fout is.",
    coverImage: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2670&auto=format&fit=crop",
    plainText: "...",
    lastUpdated: "15 April 2024",
    author: "Erik de Vries",
    readTime: 4,
    relatedIds: ['efficiency-monster'],
    summaryPoints: ["Neem een 085 nummer.", "Scheid werk en privé."],
    content: <p>Cluster content...</p>
  }
];

// =================================================================================================
// DEEL 2: DE LOGICA & COMPONENTEN (HIER HOEF JE NIETS AAN TE PASSEN)
// =================================================================================================

// --- HELPER COMPONENTS ---

const TocSidebar = ({ content }: { content: React.ReactNode }) => {
    // In a real app, this would parse headings from the content markdown/HTML
    return (
        <div className="hidden lg:block sticky top-32 space-y-8">
            <div className="bg-[#12141c] border border-white/5 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <List size={14} /> In dit artikel
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    {/* Note: This is currently hardcoded for demo purposes. Ideally, use a markdown parser */}
                    <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-white/20">01</span> Introductie</a></li>
                    <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-white/20">02</span> Kern van het verhaal</a></li>
                    <li><a href="#" className="hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-white/20">03</span> Conclusie</a></li>
                </ul>
            </div>

            {/* Soft Sell Component */}
            <div className="bg-gradient-to-br from-brand-orange/10 to-orange-900/10 border border-brand-orange/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="text-white font-bold mb-2">Geen zin in gedoe?</h4>
                    <p className="text-xs text-gray-400 mb-4">Klusvol automatiseert alles waar je over leest.</p>
                    <button className="text-xs font-bold bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full">
                        Probeer Gratis
                    </button>
                </div>
            </div>
        </div>
    );
};

const KeyTakeaways = ({ points }: { points: string[] }) => (
    <div className="bg-gradient-to-r from-blue-900/10 to-transparent border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
        <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
            <BookOpen size={14} /> TL;DR - Samenvatting
        </h4>
        <ul className="space-y-2">
            {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    {point}
                </li>
            ))}
        </ul>
    </div>
);

const CheckCircle2 = ({size, className}: {size: number, className?: string}) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

const FaqSection = ({ items }: { items: { q: string, a: string }[] }) => (
    <section id="faq" className="mt-16 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle size={20} className="text-brand-orange" /> Veelgestelde vragen
        </h3>
        <div className="space-y-4">
            {items.map((item, i) => (
                <details key={i} className="group bg-white/5 rounded-xl border border-white/5 open:bg-white/10 transition-colors">
                    <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-200 list-none">
                        {item.q}
                        <ChevronDown size={16} className="group-open:rotate-180 transition-transform text-gray-500" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                    </div>
                </details>
            ))}
        </div>
    </section>
);

// --- MAIN COMPONENTS ---

const ArticleView = ({ article, onBack, onNavigate }: { article: Article, onBack: () => void, onNavigate: (id: string) => void }) => {
    const pillar = PILLARS[article.pillarId];
    
    // Get related articles (Cluster logic)
    const relatedArticles = ARTICLES.filter(a => article.relatedIds.includes(a.id) || (a.pillarId === article.pillarId && a.id !== article.id)).slice(0, 3);

    return (
        <div className="min-h-screen pt-12 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                <button onClick={onBack} className="hover:text-white transition-colors">Kennisbank</button>
                <span className="text-white/20">/</span>
                <span className="text-brand-orange font-bold">{pillar.title}</span>
                <span className="text-white/20">/</span>
                <span className="text-gray-300 truncate max-w-[200px]">{article.title}</span>
            </nav>

            {/* HERO IMAGE */}
            <div className="w-full h-48 md:h-80 relative rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-80"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Column */}
                <main className="lg:col-span-8">
                    {/* Header */}
                    <header className="mb-10">
                        {article.type === 'monster' && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                                <Anchor size={12} /> Masterclass
                            </div>
                        )}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">MJ</div>
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                <span>Bijgewerkt: {article.lastUpdated}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Coffee size={14} />
                                <span>{article.readTime} min leestijd</span>
                            </div>
                        </div>
                    </header>

                    {/* AI/GEO Summary */}
                    <KeyTakeaways points={article.summaryPoints} />

                    {/* The Content */}
                    <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed prose-headings:text-white prose-a:text-brand-orange hover:prose-a:text-white prose-strong:text-white prose-blockquote:border-l-brand-orange prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
                        {article.content}
                    </article>

                    {/* FAQ (Schema Ready) */}
                    {article.faq && <FaqSection items={article.faq} />}

                    {/* Related Articles (Internal Linking) */}
                    <div className="mt-20 pt-10 border-t border-white/10">
                        <h3 className="text-white font-bold mb-6">Verder lezen in {pillar.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedArticles.map(rel => (
                                <div key={rel.id} onClick={() => onNavigate(rel.id)} className="group cursor-pointer bg-[#12141c] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all flex items-start gap-4">
                                    <img src={rel.coverImage} alt={rel.title} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    <div>
                                        <h4 className="font-bold text-white mb-2 group-hover:text-brand-orange transition-colors line-clamp-2 text-sm">{rel.title}</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                                            <ArrowUpRight size={10} />
                                            {rel.readTime} min
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sidebar Column */}
                <aside className="lg:col-span-4 relative">
                    <TocSidebar content={article.content} />
                </aside>
            </div>
        </div>
    );
};

const BlogHome = ({ onNavigate, onBack }: { onNavigate: (id: string) => void, onBack: () => void }) => {
    return (
        <div className="min-h-screen pt-12 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
            
            {/* Custom Header with simple Back button instead of Logo */}
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-12 group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Terug naar home
            </button>

            {/* Knowledge Base Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                   <BookOpen size={12} /> Kennisbank
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                    Jouw bedrijf,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">maar dan beter.</span>
                </h1>
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                    Geen losse tips, maar complete systemen om te groeien. Kies een onderwerp om te starten.
                </p>
            </div>

            {/* Pillar Grid */}
            <div className="space-y-24">
                {Object.values(PILLARS).map((pillar) => {
                    const monster = ARTICLES.find(a => a.id === pillar.monsterBlogId);
                    const cluster = ARTICLES.filter(a => a.pillarId === pillar.id && a.id !== pillar.monsterBlogId);

                    return (
                        <section key={pillar.id} className="relative">
                            {/* Pillar Header */}
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
                                    {pillar.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{pillar.title}</h2>
                                    <p className="text-sm text-gray-400">{pillar.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                                {/* Monster Blog Card (Hero for this pillar) */}
                                <div 
                                    onClick={() => monster && onNavigate(monster.id)}
                                    className="lg:col-span-7 bg-[#12141c] border border-white/10 rounded-[2.5rem] p-0 relative overflow-hidden group cursor-pointer hover:border-brand-orange/40 transition-all duration-500 flex flex-col h-[500px]"
                                >
                                    {/* Background Image with Overlay */}
                                    <div className="absolute inset-0 z-0">
                                        <img 
                                            src={monster?.coverImage} 
                                            alt={monster?.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                                    </div>
                                    
                                    <div className="relative z-10 flex-1 p-8 md:p-10 flex flex-col justify-end">
                                        <div className="inline-flex self-start items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-6">
                                            <Anchor size={12} className="text-brand-orange" />
                                            Start Hier
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-brand-orange transition-colors drop-shadow-lg">
                                            {monster?.title}
                                        </h3>
                                        <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 drop-shadow-md">
                                            {monster?.excerpt}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-6 border-t border-white/20">
                                            <div className="flex items-center gap-3 text-xs text-gray-300 font-bold uppercase tracking-wider">
                                                <span>{monster?.readTime} min leestijd</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                                <span>Masterclass</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cluster Articles List */}
                                <div className="lg:col-span-5 flex flex-col gap-4">
                                    {cluster.map((article) => (
                                        <div 
                                            key={article.id} 
                                            onClick={() => onNavigate(article.id)}
                                            className="flex-1 bg-[#12141c] border border-white/5 rounded-3xl p-4 cursor-pointer hover:bg-white/[0.02] hover:border-white/20 transition-all group/item flex items-center gap-5"
                                        >
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                                                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2 group-hover/item:text-brand-orange transition-colors line-clamp-2">
                                                    {article.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                                                    <ArrowUpRight size={12} />
                                                    Lees in {article.readTime} min
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Placeholder for more */}
                                    <div className="p-6 rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-gray-600 text-xs font-medium hover:text-gray-400 hover:border-white/20 transition-all cursor-default">
                                        Meer artikelen in aantocht...
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

const BlogPage = ({ onBack }: { onBack: () => void }) => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeArticleId]);

  const activeArticle = ARTICLES.find(a => a.id === activeArticleId);

  if (activeArticle) {
      return (
          <ArticleView 
            article={activeArticle} 
            onBack={() => setActiveArticleId(null)} 
            onNavigate={setActiveArticleId} 
          />
      );
  }

  // Pass onBack to BlogHome so clicking the Logo works as a "Back/Home" button
  return <BlogHome onNavigate={setActiveArticleId} onBack={onBack} />;
};

export default BlogPage;