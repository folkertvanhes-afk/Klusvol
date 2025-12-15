import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, User, ArrowRight, Search, Coffee, Play, Pause, Share2, Download, Calculator, Headphones, Music2, Check, Loader2, X, Linkedin, Link as LinkIcon, Twitter, Send, AlertCircle, Euro, FileText, MessageCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  plainText: string; // Added for TTS
  content: React.ReactNode;
  category: string;
  author: string;
  date: string;
  coffeeCups: number;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Waarom je 's avonds niet meer moet offreren",
    excerpt: "Nog tot 23:00 uur facturen tikken? Het is de nummer 1 reden voor burn-outs in de bouw. Zo doe je het anders.",
    plainText: "Het is een klassiek beeld: overdag sta je op de steiger of lig je onder een vloer, en 's avonds zit je achter de laptop. Offertes uitwerken, facturen sturen en mailtjes beantwoorden. Veel vakmensen rekenen hun administratie-uren niet mee. Dat hoort erbij, zeggen ze. Maar als je die uren zou delen door je uurtarief, schrik je je rot. De oplossing is simpel: gebruik tools waarmee je de factuur verstuurt nog voordat je de bus start.",
    category: "Ondernemen",
    author: "Mark de Jong",
    date: "12 Mei 2024",
    coffeeCups: 1,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    content: (
      <>
        <p className="mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-brand-orange first-letter:mr-3 first-letter:float-left">
          Het is een klassiek beeld: overdag sta je op de steiger of lig je onder een vloer, en 's avonds zit je achter de laptop. 
          Offertes uitwerken, facturen sturen en mailtjes beantwoorden. Je partner zit op de bank, maar jij bent "nog even bezig".
        </p>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-brand-orange rounded-full"></span>
            De verborgen kosten
        </h3>
        <p className="mb-6">
          Veel vakmensen rekenen hun administratie-uren niet mee. "Dat hoort erbij," zeggen ze. Maar als je die uren zou delen door je uurtarief, 
          schrik je je rot. Bovendien kost het je energie die je de volgende dag nodig hebt voor je vakwerk.
        </p>
        <div className="my-10 p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[50px] rounded-full group-hover:bg-brand-orange/20 transition-colors"></div>
            <h4 className="text-lg font-bold text-white mb-2 relative z-10">Pro Tip:</h4>
            <p className="text-gray-400 italic relative z-10">"Doe het direct. Stuur de factuur nog in de bus, voordat je de motor start. Het bespaart je gemiddeld 6 uur per week."</p>
        </div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-brand-orange rounded-full"></span>
            Directe winst
        </h3>
        <p className="mb-6">
          De oplossing is simpel, maar vergt discipline. Met moderne tools kun je een factuur sturen zodra je de deur dichttrekt bij de klant. 
        </p>
        <ul className="grid grid-cols-1 gap-4 mb-6">
            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                <span className="text-gray-300">Klant tevreden (direct duidelijkheid)</span>
            </li>
            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                <span className="text-gray-300">Jij tevreden (hoofd leeg)</span>
            </li>
            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                <span className="text-gray-300">Snellere betaling (werk vers in geheugen)</span>
            </li>
        </ul>
      </>
    )
  },
  {
    id: '2',
    title: "3 Manieren om meer reviews te krijgen",
    excerpt: "Mond-tot-mondreclame is goud, maar online reviews zijn diamant. Hoe krijg je die 5 sterren zonder te smeken?",
    plainText: "Je hebt prachtig werk geleverd. De klant is blij. Maar de kans dat die klant uit zichzelf een review schrijft is bijna nul. Timing is alles. Vraag het direct bij oplevering.",
    category: "Marketing",
    author: "Sanne Visser",
    date: "28 April 2024",
    coffeeCups: 1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    content: (
      <>
        <p className="mb-6">
          Je hebt prachtig werk geleverd. De klant is blij. Je drinkt nog een bak koffie en gaat weg. 
          De kans dat die klant uit zichzelf Google opent om een review te schrijven? Vrijwel nul.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Timing is alles</h3>
        <p className="mb-6">
          Het beste moment om een review te vragen is direct bij oplevering, of maximaal 1 uur daarna. 
          Het 'wow-gevoel' is dan nog vers.
        </p>
      </>
    )
  },
  {
    id: '3',
    title: "WhatsApp Zakelijk vs. Privé",
    excerpt: "Waarom je nooit je 06-nummer op je bus moet zetten. Scheid je werk en privé voor meer rust.",
    plainText: "Het lijkt handig: één telefoon voor alles. Maar als zondagochtend om 8 uur een klant appt, ben je mentaal direct weer aan het werk. Neem een 085 nummer. Dat straalt professionaliteit uit.",
    category: "Tools",
    author: "Erik de Vries",
    date: "15 April 2024",
    coffeeCups: 2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    content: (
      <>
        <p className="mb-6">
          Het lijkt handig: één telefoon voor alles. Maar als zondagochtend om 08:00 uur een klant appt, ben je mentaal direct weer aan het werk.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Neem een 085 nummer</h3>
        <p className="mb-6">
          Een zakelijk nummer straalt professionaliteit uit. Het zegt: "Ik ben een bedrijf, geen hobbyist."
        </p>
      </>
    )
  },
  {
    id: '4',
    title: "Stoppen met uurtje-factuurtje?",
    excerpt: "Waarom aannemen van klussen vaak winstgevender is dan per uur werken, en hoe je dat berekent.",
    plainText: "Veel vakmensen durven geen vaste prijs te noemen uit angst dat het tegenzit. Maar wat als het meezit? Verkoop resultaat, geen uren.",
    category: "Ondernemen",
    author: "Mark de Jong",
    date: "02 April 2024",
    coffeeCups: 2,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    content: (
        <>
          <p className="mb-6">
            Veel vakmensen durven geen vaste prijs te noemen. "Wat als het tegenzit?" is de angst. 
            Maar wat als het meezit?
          </p>
          <h3 className="text-xl font-bold text-white mb-4">Verkoop resultaat</h3>
          <p className="mb-6">
            Een klant betaalt niet voor 8 uur zagen. Een klant betaalt voor een strak plafond. 
          </p>
        </>
      )
  }
];

// --- Audio Player Component (With Real TTS) ---
const AudioPlayer = ({ text }: { text: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        // Cancel speech when component unmounts
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setProgress(0);
        } else {
            const ut = new SpeechSynthesisUtterance(text);
            ut.lang = 'nl-NL'; // Set to Dutch
            ut.rate = 0.95; // Slightly slower for better clarity
            
            ut.onend = () => {
                setIsPlaying(false);
                setProgress(100);
                setTimeout(() => setProgress(0), 1000);
            };

            // Simple boundary event to simulate progress bar (not perfect percentage but visual feedback)
            ut.onboundary = (event) => {
                // Rough estimate: character index / length
                const percent = Math.min(100, (event.charIndex / text.length) * 100);
                setProgress(percent);
            };

            utteranceRef.current = ut;
            window.speechSynthesis.speak(ut);
            setIsPlaying(true);
        }
    };
    
    return (
        <div className="w-full bg-[#1A1F2E] border border-white/10 rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 to-transparent opacity-50"></div>
            
            {/* Play Button */}
            <button 
                onClick={togglePlay}
                className={`relative z-10 w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg ${isPlaying ? 'bg-gray-700' : 'bg-brand-orange shadow-brand-orange/20'}`}
            >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            
            <div className="flex-1 z-10">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange flex items-center gap-1.5">
                        {isPlaying ? <Music2 size={10} className="animate-bounce" /> : <Headphones size={10} />}
                        {isPlaying ? 'Aan het lezen...' : 'Luister Artikel'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">AI Voice</span>
                </div>
                
                {/* Visualizer / Progress */}
                <div className="h-8 flex items-center gap-0.5 relative">
                    {/* Background bars */}
                    <div className="absolute inset-0 flex items-center gap-0.5 opacity-20">
                         {[...Array(40)].map((_, i) => (
                            <div key={i} className="w-1 bg-gray-500 rounded-full" style={{ height: `${20 + Math.random() * 40}%` }}></div>
                         ))}
                    </div>

                    {/* Active bars (animated when playing) */}
                    {isPlaying ? (
                        <div className="flex items-center gap-0.5 w-full h-full">
                            {[...Array(40)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-1 bg-brand-orange rounded-full animate-pulse"
                                    style={{ 
                                        height: `${20 + Math.random() * 80}%`,
                                        animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                        opacity: i / 40 < progress / 100 ? 0.3 : 1 // Dim played parts slightly or fancy effect
                                    }}
                                ></div>
                            ))}
                        </div>
                    ) : (
                        // Static bars when paused
                         <div className="flex items-center gap-0.5 w-full h-full opacity-50">
                             <div className="w-full h-0.5 bg-gray-700 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-orange" style={{ width: `${progress}%` }}></div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Calculator Modal Component ---
const CalculatorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState(1); // 1: Input, 2: Lead Capture, 3: Result
    const [inputs, setInputs] = useState({
        income: 60000,
        expenses: 15000,
        hours: 1200
    });
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Quick calculation for preview
    const calculatedRate = Math.round((inputs.income + inputs.expenses) / inputs.hours);

    useEffect(() => {
        if(isOpen) setStep(1);
    }, [isOpen]);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email.includes('@')) return;
        
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep(3);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-[#0F121C] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up">
                
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-[#12141c] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                            <Calculator size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Uurtarief Calculator</h3>
                            <p className="text-xs text-gray-500">Bereken jouw ideale tarief</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <form onSubmit={handleNext} className="space-y-6 animate-slide-up-fade">
                             <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Gewenst Netto Jaarinkomen</label>
                                    <div className="relative">
                                        <Euro size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input 
                                            type="number" 
                                            value={inputs.income}
                                            onChange={e => setInputs({...inputs, income: Number(e.target.value)})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white font-bold focus:border-brand-orange focus:outline-none"
                                        />
                                    </div>
                                    <input 
                                        type="range" min="30000" max="150000" step="1000" 
                                        value={inputs.income} onChange={e => setInputs({...inputs, income: Number(e.target.value)})}
                                        className="w-full mt-3 accent-brand-orange h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Jaarlijkse Kosten</label>
                                        <input 
                                            type="number" 
                                            value={inputs.expenses}
                                            onChange={e => setInputs({...inputs, expenses: Number(e.target.value)})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white font-bold text-sm focus:border-brand-orange focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold mb-2 block">Facturabele Uren</label>
                                        <input 
                                            type="number" 
                                            value={inputs.hours}
                                            onChange={e => setInputs({...inputs, hours: Number(e.target.value)})}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white font-bold text-sm focus:border-brand-orange focus:outline-none"
                                        />
                                    </div>
                                </div>
                             </div>

                             <div className="bg-brand-orange/10 p-4 rounded-xl border border-brand-orange/20 text-center">
                                 <div className="text-xs text-brand-orange uppercase font-bold mb-1">Indicatief Uurtarief</div>
                                 <div className="text-3xl font-extrabold text-white">€ {calculatedRate},-</div>
                             </div>

                             <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                 Bekijk Gedetailleerd Rapport <ArrowRight size={16} />
                             </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleFinalize} className="space-y-6 animate-slide-up-fade">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Je rapport staat klaar</h3>
                                <p className="text-gray-400 text-sm">Waar mogen we de uitgebreide berekening en de Excel-template heen sturen?</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase font-bold ml-1">Zakelijk Emailadres</label>
                                <input 
                                    type="email" 
                                    required
                                    placeholder="naam@bedrijf.nl"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 px-5 text-white focus:border-brand-orange focus:outline-none"
                                />
                            </div>

                            <button type="submit" disabled={isLoading} className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50">
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Stuur mij de berekening'}
                            </button>
                            
                            <p className="text-[10px] text-center text-gray-600">We sturen je geen spam. Beloofd.</p>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8 animate-pop-in">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/30">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Verzonden!</h3>
                            <p className="text-gray-400 text-sm mb-8">
                                Check je inbox ({email}). We hebben de Excel-tool en je persoonlijke rapport verstuurd.
                            </p>
                            <button onClick={onClose} className="bg-white/10 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-colors">
                                Sluiten
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sidebar Lead Magnet (Updated to trigger Modal) ---
const Sidebar = ({ onOpenCalculator }: { onOpenCalculator: () => void }) => {
    
    // Modern Share Buttons
    const handleShare = (platform: string) => {
        const url = "https://klusvol.nl/blog";
        const text = "Interessant artikel voor vakmensen:";
        
        if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            alert("Link gekopieerd!");
        }
    };

    return (
        <div className="space-y-6 sticky top-28">
            {/* Lead Magnet Card */}
            <div className="bg-gradient-to-b from-[#1A1F2E] to-[#0B0F19] p-6 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-orange-600"></div>
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-orange/10 blur-[40px] rounded-full group-hover:bg-brand-orange/20 transition-colors"></div>
                
                <div className="w-16 h-16 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                    <Calculator size={32} className="text-brand-orange" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">Uurtarief Calculator</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Reken jij wel genoeg? Gebruik onze interactieve tool om direct je ideale tarief te bepalen.
                </p>
                
                <button 
                    onClick={onOpenCalculator}
                    className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-orange hover:text-white transition-all shadow-lg active:scale-95"
                >
                    <Calculator size={16} /> Open Calculator
                </button>
            </div>

            {/* Subtle Share Row */}
            <div className="bg-[#12141c] p-4 rounded-2xl border border-white/5">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3 text-center">Deel dit artikel</div>
                <div className="flex justify-between gap-2">
                     <button onClick={() => handleShare('linkedin')} className="flex-1 h-10 rounded-lg bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all"><Linkedin size={18} /></button>
                     <button onClick={() => handleShare('twitter')} className="flex-1 h-10 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all"><Twitter size={18} /></button>
                     <button onClick={() => handleShare('whatsapp')} className="flex-1 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"><MessageCircle size={18} /></button>
                     <button onClick={() => handleShare('copy')} className="flex-1 h-10 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center hover:bg-white hover:text-black transition-all"><LinkIcon size={18} /></button>
                </div>
            </div>
        </div>
    );
};

const BlogPage = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('Alles');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPost]);

  const categories = ['Alles', 'Ondernemen', 'Marketing', 'Tools', 'Efficiency'];
  
  const filteredPosts = activeCategory === 'Alles' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  // --- SINGLE POST VIEW ---
  if (selectedPost) {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
            {/* Modal */}
            <CalculatorModal isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center mb-8">
                <button 
                    onClick={() => setSelectedPost(null)} 
                    className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors group px-4 py-2 rounded-full border border-white/5 hover:bg-white/5 hover:border-white/10"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span className="font-medium text-sm">Terug naar kennisbank</span>
                </button>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:block">
                    {selectedPost.category}
                </span>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-white/10 group">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6 animate-slide-up">
                            <span className="bg-brand-orange/20 backdrop-blur-md text-brand-orange border border-brand-orange/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                {selectedPost.category}
                            </span>
                            <span className="text-gray-300 text-xs font-medium flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                <Calendar size={12} /> {selectedPost.date}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 shadow-black drop-shadow-lg animate-slide-up delay-100">
                            {selectedPost.title}
                        </h1>
                        
                        <div className="flex items-center gap-4 animate-slide-up delay-200">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-brand-orange overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-sm">
                                    <div className="text-white font-bold">{selectedPost.author}</div>
                                    <div className="text-gray-500 text-xs">Auteur</div>
                                </div>
                             </div>
                             <div className="w-px h-8 bg-white/10"></div>
                             <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                                 <Coffee size={16} className="text-brand-orange" />
                                 <span className="text-xs font-bold">{selectedPost.coffeeCups} {selectedPost.coffeeCups === 1 ? 'bak' : 'bakken'} koffie</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Article Content */}
                <div className="lg:col-span-8">
                    <AudioPlayer text={selectedPost.plainText} />
                    
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed prose-headings:text-white prose-a:text-brand-orange hover:prose-a:text-white prose-strong:text-white prose-blockquote:border-l-brand-orange prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
                        {selectedPost.content}
                    </div>

                    {/* Author Footer */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Over de auteur</h4>
                        <div className="flex items-start gap-6 bg-[#12141c] p-6 rounded-3xl border border-white/5">
                             <div className="w-16 h-16 rounded-2xl bg-gray-700 overflow-hidden shrink-0">
                                 <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" alt="Author" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">{selectedPost.author}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Oprichter van Klusvol. Ik help vakmensen om minder tijd aan randzaken te besteden en meer winst over te houden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <Sidebar onOpenCalculator={() => setShowCalculator(true)} />
                </div>
            </div>
        </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Added Back Button for Main View */}
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-8 group">
             <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Terug naar home
        </button>

        {/* Modern Header */}
        <div className="relative mb-20 p-8 md:p-16 rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#12141c] to-black border border-white/5 shadow-2xl animate-slide-up-fade">
             {/* Abstract Background Shapes */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>

             <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                   <Music2 size={12} /> Kennisbank
                </div>
                <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                    Slimmer werken,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">niet harder.</span>
                </h1>
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                    Tips, strategieën en luister-artikelen om jouw klusbedrijf naar het volgende niveau te tillen.
                </p>
             </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 animate-slide-up-fade delay-100">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border uppercase tracking-wide
                        ${activeCategory === cat 
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] transform scale-105' 
                            : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up-fade delay-200">
            {filteredPosts.map((post) => (
                <div 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className="group relative bg-[#12141c] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-brand-orange/40 transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Image Area */}
                    <div className="h-64 relative overflow-hidden p-3">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                             <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            />
                             <div className="absolute top-4 left-4 z-20">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-white/10 uppercase tracking-wider shadow-lg">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 pt-4 flex-1 flex flex-col relative z-20">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                            <span className="flex items-center gap-1.5 text-brand-orange"><Coffee size={12} /> {post.coffeeCups} {post.coffeeCups === 1 ? 'bak' : 'bakken'}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors leading-tight">
                            {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-1 font-light">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                             <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/10 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" className="w-full h-full object-cover"/>
                                </div>
                                <span className="text-xs font-bold text-gray-400">{post.author}</span>
                             </div>
                             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                 <ArrowRight size={14} />
                             </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
                <div className="bg-white/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <Search size={32} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Geen artikelen gevonden</h3>
                <p className="text-gray-400 mb-6">Probeer een andere categorie.</p>
                <button onClick={() => setActiveCategory('Alles')} className="px-6 py-3 bg-brand-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
                    Bekijk alles
                </button>
            </div>
        )}
    </div>
  );
};

export default BlogPage;