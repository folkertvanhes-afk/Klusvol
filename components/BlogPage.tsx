import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, Tag, User, ArrowRight, Search } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Waarom je 's avonds niet meer moet offreren",
    excerpt: "Nog tot 23:00 uur facturen tikken? Het is de nummer 1 reden voor burn-outs in de bouw. Zo doe je het anders.",
    category: "Ondernemen",
    author: "Mark de Jong",
    date: "12 Mei 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    content: (
      <>
        <p className="mb-6">
          Het is een klassiek beeld: overdag sta je op de steiger of lig je onder een vloer, en 's avonds zit je achter de laptop. 
          Offertes uitwerken, facturen sturen en mailtjes beantwoorden. Je partner zit op de bank, maar jij bent "nog even bezig".
        </p>
        <h3 className="text-xl font-bold text-white mb-4">De verborgen kosten van avondwerk</h3>
        <p className="mb-6">
          Veel vakmensen rekenen hun administratie-uren niet mee. "Dat hoort erbij," zeggen ze. Maar als je die uren zou delen door je uurtarief, 
          schrik je je rot. Bovendien kost het je energie die je de volgende dag nodig hebt voor je vakwerk.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Doe het direct</h3>
        <p className="mb-6">
          De oplossing is simpel, maar vergt discipline: doe het direct. Met moderne tools kun je een factuur sturen zodra je de deur dichttrekt bij de klant. 
          Nog in de bus, voordat je de motor start. 
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-400">
            <li>Klant tevreden (direct duidelijkheid)</li>
            <li>Jij tevreden (hoofd leeg)</li>
            <li>Snellere betaling (het werk zit nog vers in het geheugen)</li>
        </ul>
      </>
    )
  },
  {
    id: '2',
    title: "3 Manieren om meer reviews te krijgen",
    excerpt: "Mond-tot-mondreclame is goud, maar online reviews zijn diamant. Hoe krijg je die 5 sterren zonder te smeken?",
    category: "Marketing",
    author: "Sanne Visser",
    date: "28 April 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    content: (
      <>
        <p className="mb-6">
          Je hebt prachtig werk geleverd. De klant is blij. Je drinkt nog een bak koffie en gaat weg. 
          De kans dat die klant uit zichzelf Google opent om een review te schrijven? Vrijwel nul. Niet omdat ze niet willen, maar omdat ze het vergeten.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Timing is alles</h3>
        <p className="mb-6">
          Het beste moment om een review te vragen is direct bij oplevering, of maximaal 1 uur daarna. 
          Het 'wow-gevoel' is dan nog vers. Wacht je een week? Dan is de klant alweer gewend aan zijn nieuwe badkamer.
        </p>
        <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-4 my-6">
            <p className="text-white italic">"Automatiseer dit proces. Stuur een SMS met een directe link, 30 minuten na de klus. Dit verhoogt de respons met 400%."</p>
        </div>
      </>
    )
  },
  {
    id: '3',
    title: "WhatsApp Zakelijk vs. Privé",
    excerpt: "Waarom je nooit je 06-nummer op je bus moet zetten. Scheid je werk en privé voor meer rust.",
    category: "Tools",
    author: "Erik de Vries",
    date: "15 April 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    content: (
      <>
        <p className="mb-6">
          Het lijkt handig: één telefoon voor alles. Maar als zondagochtend om 08:00 uur een klant appt over een lekkende kraan, 
          ben je mentaal direct weer aan het werk. Ook als je niet reageert.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">De kracht van een 085 of vast nummer</h3>
        <p className="mb-6">
          Een zakelijk nummer straalt professionaliteit uit. Het zegt: "Ik ben een bedrijf, geen hobbyist." 
          Daarnaast kun je een vast nummer doorschakelen naar een antwoordservice of voicemail buiten kantoortijden, 
          terwijl je vrienden je gewoon op 06 kunnen bereiken.
        </p>
      </>
    )
  },
  {
    id: '4',
    title: "Stoppen met uurtje-factuurtje?",
    excerpt: "Waarom aannemen van klussen vaak winstgevender is dan per uur werken, en hoe je dat berekent.",
    category: "Ondernemen",
    author: "Mark de Jong",
    date: "02 April 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    content: (
        <>
          <p className="mb-6">
            Veel vakmensen durven geen vaste prijs te noemen. "Wat als het tegenzit?" is de angst. 
            Maar wat als het meezit? Dan profiteert de klant van jouw snelheid en ervaring, en word jij 'gestraft' met minder uren.
          </p>
          <h3 className="text-xl font-bold text-white mb-4">Verkoop resultaat, geen tijd</h3>
          <p className="mb-6">
            Een klant betaalt niet voor 8 uur zagen en timmeren. Een klant betaalt voor een strak plafond. 
            Als jij door jouw ervaring dat plafond in 5 uur erin hebt liggen, is dat jouw winst. 
            Leer calculeren op basis van waarde, niet op basis van de klok.
          </p>
        </>
      )
  }
];

const BlogPage = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('Alles');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Scroll to top when opening a post or the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPost]);

  const categories = ['Alles', 'Ondernemen', 'Marketing', 'Tools', 'Efficiency'];
  
  const filteredPosts = activeCategory === 'Alles' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  if (selectedPost) {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-4xl mx-auto animate-fade-in">
            <button 
                onClick={() => setSelectedPost(null)} 
                className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full w-fit"
            >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                Terug naar overzicht
            </button>

            <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                    <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-lg shadow-brand-orange/20">
                        {selectedPost.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight shadow-black drop-shadow-lg">
                        {selectedPost.title}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 mb-10 border-b border-white/10 pb-6">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-brand-orange" />
                    {selectedPost.author}
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-orange" />
                    {selectedPost.date}
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-orange" />
                    {selectedPost.readTime} leestijd
                </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                {selectedPost.content}
            </div>

            {/* Author Box */}
            <div className="mt-16 p-8 bg-[#12141c] rounded-2xl border border-white/5 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden shrink-0 border-2 border-brand-orange/30">
                     <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg">Geschreven door {selectedPost.author}</h4>
                    <p className="text-gray-400 text-sm">Expert in automatisering voor vakmensen. Helpt bedrijven groeien door minder te doen.</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up-fade">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                KlusVol <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-200">Kennisbank</span>
            </h1>
            <p className="text-lg text-gray-400 font-light">
                Tips, strategieën en inzichten om jouw klusbedrijf slimmer te runnen.
            </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up-fade delay-100">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                        ${activeCategory === cat 
                            ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/25' 
                            : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up-fade delay-200">
            {filteredPosts.map((post) => (
                <div 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className="group bg-[#12141c] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/5 transition-all duration-500 cursor-pointer flex flex-col h-full"
                >
                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center text-brand-orange text-sm font-bold group/btn pt-4 border-t border-white/5">
                            Lees artikel 
                            <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
            <div className="text-center py-20">
                <div className="bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-500" />
                </div>
                <p className="text-gray-400">Geen artikelen gevonden in deze categorie.</p>
                <button onClick={() => setActiveCategory('Alles')} className="text-brand-orange font-bold mt-4 hover:underline">
                    Bekijk alles
                </button>
            </div>
        )}
    </div>
  );
};

export default BlogPage;
