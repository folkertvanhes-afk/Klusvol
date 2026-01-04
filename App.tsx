import React, { useState, useEffect, useRef } from 'react';
import InteractivePhoneHero from './components/InteractivePhoneHero';
import Chatbot from './components/Chatbot';
import BlogPage from './components/BlogPage';
import { 
  CheckCircle2, ArrowRight, XCircle, Clock, Calendar, MessageSquare, 
  CreditCard, Star, Menu, X, ChevronDown, ChevronUp, Phone, Mail, 
  MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Zap, Smartphone,
  BarChart3, MousePointerClick, Lock, Download, Check, AlertTriangle,
  ToggleRight, TrendingUp, BellRing, Ghost, Users, FileText, MessageCircle,
  Quote,
  LucideIcon,
  Hammer, Paintbrush, Wrench, Ruler, Trees, Plug, Droplet, Truck,
  Sun, Thermometer, Grid, Layers, Sparkles, HardHat, 
  Snowflake, ChevronsUp, Home, Scissors,
  PhoneOff, Armchair, FileWarning, Wallet, Briefcase, Activity,
  Coffee, PartyPopper, Smile, Unlock, Calculator, Coins, ChevronLeft, Loader2,
  Play, QrCode, Wifi, Server, Send, Key, Crown, Headphones, Rocket, Flame
} from 'lucide-react';

// --- CONFIGURATION ---
const GHL_CONFIG = {
    // WEBHOOK 1: DIRECTE AANMELDINGEN (Start & Basis Pakket)
    // Workflow acties: Account aanmaken, SMS sturen, Onboarding starten
    signupWebhook: 'https://services.leadconnectorhq.com/hooks/Xn0ouMgD2stq6OuI1a4H/webhook-trigger/5e468d5b-5131-4482-9d45-9dd90304714a', 

    // WEBHOOK 2: STRATEGIE SESSIE / CONTACT (Pro Pakket)
    // Workflow acties: Notificatie naar sales, toevoegen aan pipeline "Leads", mailtje sturen
    contactWebhook: 'https://services.leadconnectorhq.com/hooks/Xn0ouMgD2stq6OuI1a4H/webhook-trigger/16364438-5301-44cf-8879-8f05a6d30dd8',
    
    loginUrl: 'https://app.klusvol.nl', 
    calendarUrl: 'https://agenda.klusvol.nl',
};

// --- Utility Hooks & Components ---

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => {
  const revealRef = useReveal();
  return (
    <section id={id} className={`py-24 md:py-32 px-4 relative overflow-hidden ${className}`}>
      <div ref={revealRef} className="max-w-7xl mx-auto relative z-10 reveal transition-all duration-1000">
        {children}
      </div>
    </section>
  );
};

const Button = ({ children, variant = 'primary', className = "", onClick, ...props }: any) => {
  const baseStyle = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 justify-center text-sm md:text-base tracking-wide cursor-pointer";
  const variants = {
    primary: "bg-white text-black hover:bg-orange-50 hover:text-brand-orange shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/50 hover:border-brand-orange/30 hover:shadow-[0_0_30px_rgba(255,87,34,0.3)]",
    secondary: "bg-gradient-to-r from-brand-orange to-orange-600 text-white hover:to-brand-orange shadow-lg shadow-brand-orange/30 border border-brand-orange/50 hover:shadow-[0_0_40px_rgba(255,87,34,0.6)]",
    outline: "border border-white/10 text-white hover:bg-white/5 hover:border-brand-orange/50 hover:text-brand-orange backdrop-blur-md",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Logo Component ---
const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div onClick={onClick} className={`flex items-center gap-2.5 font-bold text-xl tracking-tight group select-none ${onClick ? 'cursor-pointer' : ''}`}>
     {/* 
        We load the SVG from the public folder. 
     */}
     <img 
        src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/6932e8085cc44eb1e36b5df7.png" 
        alt="Klusvol" 
        className="h-10 w-10 object-contain rounded-xl" 
        onError={(e) => {
            e.currentTarget.style.display = 'none';
            document.getElementById('fallback-logo')?.classList.remove('hidden');
            document.getElementById('fallback-logo')?.classList.add('flex');
        }}
     />

     {/* Fallback Icon (wordt getoond als logo.svg mist) */}
     <div id="fallback-logo" className="hidden w-10 h-10 bg-brand-orange rounded-xl items-center justify-center text-white shadow-[0_0_15px_rgba(255,87,34,0.5)] group-hover:scale-110 transition-transform duration-300">
        <Hammer size={20} fill="currentColor" className="text-white" />
     </div>
     
     <span className="text-white text-2xl group-hover:text-brand-orange transition-colors duration-300">Klusvol</span>
  </div>
);

// --- CONTACT MODAL (VIP Strategy Session) ---
const ContactModal = ({ isOpen, onClose, source = "Strategy Modal" }: { isOpen: boolean; onClose: () => void; source?: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });

    useEffect(() => {
        if(isOpen) {
            setSent(false);
            setForm({ name: '', company: '', email: '', phone: '', message: '' });
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Send data to GHL Webhook using URLSearchParams (Form Data) to avoid CORS/Content-Type issues
            if (GHL_CONFIG.contactWebhook.includes('http')) {
                const formData = new URLSearchParams();
                formData.append('name', form.name);
                formData.append('company', form.company);
                formData.append('email', form.email);
                formData.append('phone', form.phone);
                formData.append('message', form.message);
                formData.append('source', `Klusvol Website - ${source}`);
                // Type wordt nog steeds meegestuurd voor tagging, maar webhook is nu uniek
                formData.append('type', 'strategy_session');

                await fetch(GHL_CONFIG.contactWebhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData,
                    mode: 'no-cors' 
                });
            } else {
                // Fallback simulation
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
            
            setSent(true);
        } catch (err) {
            console.error(err);
            setSent(true); 
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#000000]/95 backdrop-blur-2xl transition-opacity duration-500" onClick={onClose}></div>
            
            <div className="relative w-full max-w-5xl bg-[#050810] border border-white/10 rounded-3xl md:rounded-[2.5rem] shadow-[0_0_100px_rgba(234,179,8,0.1)] animate-scale-up flex flex-col md:flex-row max-h-[90vh] md:max-h-none md:min-h-[650px] group overflow-y-auto md:overflow-visible">
                {/* Gold Border Glow */}
                <div className="absolute inset-0 border border-yellow-500/20 rounded-3xl md:rounded-[2.5rem] pointer-events-none sticky top-0"></div>

                {/* Left Side: Premium Context */}
                <div className="w-full md:w-[45%] bg-[#0B0F19] p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-yellow-950/30 border border-yellow-500/30 backdrop-blur-md mb-6 md:mb-10 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                             <Crown size={14} className="text-yellow-500 fill-yellow-500" />
                             <span className="text-[10px] md:text-[11px] font-bold text-yellow-200 uppercase tracking-widest">Klusvol Pro</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                            Geen tool,<br/>
                            maar een <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">Partner.</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light text-sm md:text-lg">
                            We werken exclusief met vakmensen die hun plafond hebben bereikt en daar doorheen willen breken.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8 md:mt-12 space-y-6 md:space-y-8 hidden md:block">
                         <div className="flex items-start gap-5 group/item">
                             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500/10 group-hover/item:border-yellow-500/30 transition-all duration-300">
                                 <Rocket size={24} className="text-gray-400 group-hover/item:text-yellow-500 transition-colors" />
                             </div>
                             <div>
                                 <div className="text-white font-bold text-base mb-1">Priority Onboarding</div>
                                 <div className="text-sm text-gray-500 leading-relaxed">Wij richten alles in. Jij hoeft nergens naar om te kijken.</div>
                             </div>
                         </div>
                         
                         <div className="flex items-start gap-5 group/item">
                             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-yellow-500/10 group-hover/item:border-yellow-500/30 transition-all duration-300">
                                 <Headphones size={24} className="text-gray-400 group-hover/item:text-yellow-500 transition-colors" />
                             </div>
                             <div>
                                 <div className="text-white font-bold text-base mb-1">Directe Lijn</div>
                                 <div className="text-sm text-gray-500 leading-relaxed">Je eigen accountmanager op WhatsApp. Geen wachtrijen.</div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 p-6 md:p-12 relative flex flex-col justify-center bg-[#050810]">
                     <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors z-50">
                        <X size={24} />
                    </button>

                    {sent ? (
                        <div className="flex flex-col items-center justify-center text-center animate-fade-in h-full py-8 md:py-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                                <Check size={48} className="text-white" strokeWidth={3} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Aanvraag Ontvangen</h3>
                            <p className="text-gray-400 max-w-xs mx-auto mb-10 text-lg">
                                Bedankt {form.name}. Je staat op de lijst. We bellen je binnen 4 uur voor de intake.
                            </p>
                            <Button variant="outline" onClick={onClose} className="w-full max-w-xs border-white/10 hover:bg-white/5">Sluiten</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center max-w-md mx-auto w-full">
                            <div className="mb-6 md:mb-10">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Plan Strategie Sessie</h3>
                                <p className="text-sm md:text-base text-gray-400">We kijken samen of Klusvol Pro bij jouw groeifase past.</p>
                            </div>
                            
                            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Naam</label>
                                        <input 
                                            required
                                            value={form.name}
                                            onChange={e => setForm({...form, name: e.target.value})}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-gray-900 transition-all placeholder-gray-700 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] text-sm md:text-base"
                                            placeholder="Jouw naam"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Bedrijf</label>
                                        <input 
                                            value={form.company}
                                            onChange={e => setForm({...form, company: e.target.value})}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-gray-900 transition-all placeholder-gray-700 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] text-sm md:text-base"
                                            placeholder="Bedrijfsnaam"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Direct Contact</label>
                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                        <input 
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({...form, email: e.target.value})}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-gray-900 transition-all placeholder-gray-700 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] text-sm md:text-base"
                                            placeholder="Emailadres"
                                        />
                                        <input 
                                            required
                                            type="tel"
                                            value={form.phone}
                                            onChange={e => setForm({...form, phone: e.target.value})}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-gray-900 transition-all placeholder-gray-700 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] text-sm md:text-base"
                                            placeholder="06-nummer"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Grootste Uitdaging</label>
                                    <textarea 
                                        required
                                        rows={2}
                                        value={form.message}
                                        onChange={e => setForm({...form, message: e.target.value})}
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-gray-900 transition-all resize-none placeholder-gray-700 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] text-sm md:text-base"
                                        placeholder="Bijv: Ik wil personeel aannemen maar..."
                                    />
                                </div>
                            </div>

                            <Button variant="secondary" className="w-full justify-center text-sm md:text-base py-4 md:py-5 bg-gradient-to-r from-yellow-600 to-brand-orange border-none shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <>Vraag Strategie Sessie Aan <ArrowRight size={18} /></>}
                            </Button>
                            
                            <p className="text-center text-xs text-gray-600 mt-5 flex items-center justify-center gap-1.5">
                                <Lock size={10} /> 100% Vertrouwelijk.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatusRow = ({ status, text, delay }: { status: 'waiting' | 'loading' | 'done', text: string, delay: string }) => {
    return (
        <div className={`flex items-center gap-3 transition-all duration-500 ${status === 'waiting' ? 'opacity-30 blur-[1px]' : 'opacity-100'}`} style={{ transitionDelay: delay }}>
             <div className={`
                w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500
                ${status === 'done' ? 'bg-green-500 border-green-500 text-[#0F121C]' : 
                  status === 'loading' ? 'border-brand-orange border-t-brand-orange border-r-transparent border-b-transparent border-l-transparent animate-spin' : 'border-white/10 bg-white/5'}
             `}>
                 {status === 'done' && <Check size={14} strokeWidth={4} />}
             </div>
             <div className={`text-sm transition-colors duration-500 ${status === 'done' ? 'text-white font-medium' : 'text-gray-500'}`}>
                 {text}
             </div>
        </div>
    );
};

const SignupModal = ({ isOpen, onClose, source = "Direct" }: { isOpen: boolean; onClose: () => void; source?: string }) => {
    const [step, setStep] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [setupStatus, setSetupStatus] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        businessName: '',
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        if(isOpen) {
            setStep(0);
            setSetupStatus(0);
            setError(null);
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (step === 2) {
            const timers = [
                setTimeout(() => setSetupStatus(1), 800),  
                setTimeout(() => setSetupStatus(2), 2200), 
                setTimeout(() => setSetupStatus(3), 3800), 
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [step]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isOpen && e.key === 'Enter') {
            if (step === 0 && formData.businessName.length > 2) handleNextStep();
            if (step === 1) handleSubmit(e as any);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, step, formData]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {
        if (!formData.businessName.trim()) {
            setError("Vul alsjeblieft je bedrijfsnaam in.");
            return;
        }
        setError(null);
        setStep(1);
        setTimeout(() => document.getElementById('nameInput')?.focus(), 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!formData.email.includes('@') || formData.phone.length < 8 || !formData.name) {
             setError("Vul alle velden correct in.");
             setIsLoading(false);
             return;
        }

        try {
             // REAL GHL INTEGRATION
             if (GHL_CONFIG.signupWebhook.includes('http')) {
                 // Convert to URLSearchParams to send as application/x-www-form-urlencoded
                 // This ensures GHL receives data even via opaque no-cors request
                 const params = new URLSearchParams();
                 params.append('businessName', formData.businessName);
                 params.append('name', formData.name);
                 params.append('email', formData.email);
                 params.append('phone', formData.phone);
                 params.append('source', `Klusvol Website - ${source}`);
                 params.append('type', 'saas_signup');

                 await fetch(GHL_CONFIG.signupWebhook, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                     body: params,
                     mode: 'no-cors'
                 });
             } else {
                 // Simulation
                 await new Promise(resolve => setTimeout(resolve, 1500)); 
             }
             
             setStep(2);
        } catch (error) {
            console.error(error);
            // On Webhook error (CORS), we usually still proceed as GHL received the data
            setStep(2);
        } finally {
            setIsLoading(false);
        }
    };

    const handleActionClick = () => {
        if (isMobile) {
            window.location.href = "sms:"; 
        } else {
            onClose();
        }
    };

    const progressWidth = step === 0 ? '33%' : step === 1 ? '66%' : '100%';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#050810]/90 backdrop-blur-md transition-opacity duration-500" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg bg-[#0F121C] border border-white/10 rounded-3xl shadow-2xl animate-scale-up overflow-hidden flex flex-col min-h-[480px]">
                
                <div className="relative px-8 pt-8 pb-4 flex justify-between items-center z-20">
                    <div className={`flex items-center gap-2 transition-opacity duration-300 ${step === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        {step === 1 && (
                            <button onClick={() => setStep(0)} className="text-gray-500 hover:text-white transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-orange transition-all duration-500 ease-out" style={{ width: progressWidth }}></div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 px-8 pb-8 flex flex-col justify-center relative">
                    
                    {step === 0 && (
                        <div className="animate-slide-up-fade">
                            <label className="block text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                Hoe heet je <span className="text-brand-orange">klusbedrijf</span>?
                            </label>
                            <input 
                                ref={inputRef}
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                type="text" 
                                placeholder="Typ je bedrijfsnaam..." 
                                className="w-full bg-transparent border-b-2 border-white/10 text-xl md:text-2xl py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors"
                            />
                            {error && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><AlertTriangle size={14} /> {error}</p>}
                            
                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-mono hidden md:inline-block">Druk op ↵ Enter</span>
                                <Button onClick={handleNextStep} variant="secondary" className="px-6 py-3 text-sm">
                                    Verder <ArrowRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-slide-up-fade">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                Aangenaam, {formData.businessName}.
                            </h2>
                            <p className="text-gray-400 mb-8">Waar kunnen we de setup bevestiging heen sturen?</p>
                            
                            <div className="space-y-4">
                                <input 
                                    id="nameInput"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Jouw voornaam" 
                                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-gray-900 transition-all"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email" 
                                        placeholder="Emailadres" 
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-gray-900 transition-all"
                                    />
                                    <input 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        type="tel" 
                                        placeholder="Mobiel nummer" 
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:bg-gray-900 transition-all"
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><AlertTriangle size={14} /> {error}</p>}

                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-mono hidden md:inline-block">Veilig & Spamvrij</span>
                                <Button onClick={handleSubmit} variant="secondary" className="px-8 py-3 text-sm" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Start Setup"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-slide-up-fade w-full flex flex-col items-center">
                            
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Gefeliciteerd, {formData.name}!</h2>

                            {/* THE MEMBERSHIP CARD (Refined) */}
                            <div className="relative w-full max-w-sm h-52 bg-[#050810] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group flex flex-col p-6 relative">
                                {/* Abstract Background Art (Glows) */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-[50px] rounded-full pointer-events-none mix-blend-screen"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                                {/* Subtle Noise Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                                {/* Content Layer */}
                                <div className="flex justify-between items-start z-10 mb-auto">
                                    <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                                            <Zap size={20} className="text-white fill-white" />
                                         </div>
                                         <div>
                                             <div className="text-white font-bold text-lg leading-none tracking-tight">Klusvol</div>
                                             <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Member</div>
                                         </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-300 uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
                                        <Crown size={12} className="text-yellow-500 fill-yellow-500" />
                                        Officieel Lid
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="z-10 relative">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Geregistreerd voor</div>
                                    <div className="text-2xl font-bold text-white tracking-tight mb-1 truncate">{formData.businessName}</div>
                                    
                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                                        <div className="text-xs text-gray-400 font-mono">{formData.name}</div>
                                        <div className="text-green-400 text-[10px] font-bold flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                            ACTIEF
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center space-y-4 w-full">
                                <div className="space-y-2 mb-6">
                                    <StatusRow status={setupStatus >= 1 ? 'done' : 'loading'} text="Account verifiëren" delay="0ms" />
                                    <StatusRow status={setupStatus >= 2 ? 'done' : setupStatus === 1 ? 'loading' : 'waiting'} text="085-nummer configureren" delay="200ms" />
                                    <StatusRow status={setupStatus >= 3 ? 'done' : setupStatus === 2 ? 'loading' : 'waiting'} text="Inloggegevens via SMS verstuurd" delay="400ms" />
                                </div>

                                {setupStatus >= 3 ? (
                                    <div className="animate-pop-in">
                                        <p className="text-sm text-gray-400 mb-4">
                                            {isMobile ? 'Check je berichten voor je toegangscode.' : 'We hebben een SMS gestuurd met je inloglink.'}
                                        </p>
                                        <Button variant="primary" onClick={handleActionClick} className="w-full justify-center gap-2">
                                            {isMobile ? <MessageCircle size={18} /> : <CheckCircle2 size={18} />}
                                            {isMobile ? 'Open Berichten' : 'Ik heb hem ontvangen'}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-500 font-mono animate-pulse">
                                        Beveiligde verbinding maken...
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- NEW PAGE COMPONENTS ---

const LegalPage = ({ title, content, onBack }: { title: string, content: React.ReactNode, onBack: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-12 pb-20 px-6 max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-8 group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Terug naar home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">{title}</h1>
            <div className="prose prose-invert prose-lg text-gray-400 max-w-none">
                {content}
            </div>
        </div>
    );
};

// --- Rich Bento Card (Updated Layout Strategy) ---
interface BentoCardProps {
    title: string;
    description: string;
    className?: string;
    visual: React.ReactNode;
}

const BentoCard = ({ title, description, className = "", visual }: BentoCardProps) => (
  <div className={`
    relative overflow-hidden group rounded-3xl border border-white/10 
    bg-gradient-to-br from-[#12141c] to-[#0B0F19] 
    hover:border-brand-orange/40 hover:shadow-[0_0_80px_-20px_rgba(255,87,34,0.15)]
    transition-all duration-700 flex flex-col backdrop-blur-md
    ${className}
  `}>
    
    {/* Permanent orange glow corner for futuristic feel */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-orange/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-brand-orange/10 transition-colors duration-500"></div>

    {/* Subtle full card orange gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

    {/* The Visual Content (Top Area) - Now FLEX-1 to fill space in tall cards */}
    <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center min-h-[140px]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* The visual container - REMOVED GRAYSCALE for cheerier look */}
        <div className="w-full h-full opacity-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out flex items-center justify-center">
            {visual}
        </div>
    </div>

    {/* Text Content (Bottom Area) */}
    <div className="relative z-10 p-6 pt-2 md:pt-4 bg-gradient-to-t from-[#0B0F19] to-transparent">
      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-brand-orange mb-1 leading-tight transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[11px] md:text-xs text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

// --- Micro Visual Components for Bento Grid ---

const VisualAutoResponse = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Chat Interface Mockup - Scaled Up for 2x2 */}
        <div className="w-full max-w-[260px] flex flex-col gap-3 transform group-hover:translate-y-[-5px] transition-transform duration-500 px-4">
            {/* Incoming Message */}
            <div className="self-start bg-gray-800 backdrop-blur-md border border-white/10 text-gray-300 text-[10px] md:text-xs py-2 px-4 rounded-2xl rounded-tl-sm shadow-lg flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-600 shrink-0"></div>
                Ik belde net voor een offerte...
            </div>
            
            {/* Typing Indicator (New) */}
            <div className="self-end bg-brand-orange/20 text-brand-orange py-1.5 px-3 rounded-2xl rounded-tr-sm flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                <div className="w-1 h-1 rounded-full bg-current animate-bounce"></div>
                <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-100"></div>
                <div className="w-1 h-1 rounded-full bg-current animate-bounce delay-200"></div>
            </div>

            {/* Auto Response (Animated) */}
            <div className="self-end bg-brand-orange text-white text-[10px] md:text-xs py-2 px-4 rounded-2xl rounded-tr-sm shadow-xl shadow-brand-orange/20 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                <Zap size={10} fill="currentColor" />
                Hoi! Ik bel je zo even terug.
            </div>

            {/* Success Status */}
            <div className="self-end text-[9px] text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500 pr-1">
                Verzonden • Direct
            </div>
        </div>
    </div>
);

const VisualInbox = () => (
    <div className="relative w-full h-full flex items-center justify-center transition-all duration-500">
        {/* Central Hub Orb - Larger for vertical space */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-20 h-20 rounded-full border border-white/10 bg-white/[0.02] animate-[spin_10s_linear_infinite]"></div>
             <div className="absolute w-28 h-28 rounded-full border border-white/5 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        {/* Icons converging - Spread out more vertically */}
        <div className="absolute bg-green-500/10 p-2.5 rounded-xl border border-green-500/20 text-green-500 transform translate-x-[-30px] translate-y-[-25px] group-hover:translate-x-[-40px] group-hover:translate-y-[-35px] transition-all duration-500 shadow-lg">
            <Phone size={16} />
        </div>
        <div className="absolute bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-blue-500 transform translate-x-[30px] translate-y-[-25px] group-hover:translate-x-[40px] group-hover:translate-y-[-35px] transition-all duration-500 shadow-lg">
            <Mail size={16} />
        </div>
        <div className="absolute bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 text-purple-500 transform translate-y-[35px] group-hover:translate-y-[45px] transition-all duration-500 shadow-lg">
            <MessageCircle size={16} />
        </div>
        
        {/* Center */}
        <div className="w-12 h-12 bg-[#1a1f2e] rounded-2xl border border-white/10 flex items-center justify-center z-10 relative shadow-2xl group-hover:border-brand-orange/50 transition-colors duration-500">
            <Smartphone size={20} className="text-white" />
        </div>
    </div>
);

const VisualPrivacy = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative scale-75 md:scale-90">
             <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <ShieldCheck size={52} strokeWidth={1} className="text-gray-500 group-hover:text-emerald-500 transition-colors duration-500 relative z-10" />
             <div className="absolute -bottom-2 -right-2 bg-[#0F121C] p-1.5 rounded-lg border border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-emerald-500/30">
                 <Lock size={12} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
             </div>
        </div>
    </div>
);

const VisualCRM = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
        {[1, 2, 3].map((i) => (
            <div key={i} 
                className={`
                    w-36 h-9 bg-gray-800/80 backdrop-blur border border-white/5 rounded-lg shadow-lg
                    absolute transition-all duration-500 flex items-center gap-2.5 px-3
                    group-hover:border-white/10
                `}
                style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, calc(-50% + ${(i-2)*9}px)) scale(${1 - (i-1)*0.05})`,
                    zIndex: 3-i,
                }}
            >
                <div className={`w-4 h-4 rounded-full ${i===1 ? 'bg-purple-500' : 'bg-gray-600'} transition-colors duration-500`}></div>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full w-1/2"></div>
            </div>
        ))}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0F121C] to-transparent z-10"></div>
         <div className="absolute bottom-5 z-20 bg-brand-orange text-white text-[9px] px-3 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg shadow-brand-orange/20">
             + Nieuwe Klant
         </div>
    </div>
);

const VisualReviews = () => (
    <div className="relative w-full h-full flex items-center justify-center gap-0.5">
        {[1,2,3,4,5].map((star, i) => (
            <Star 
                key={star} 
                size={22} 
                className={`
                    transition-all duration-300 transform group-hover:scale-110
                    fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]
                `}
                style={{ transitionDelay: `${i * 50}ms` }}
            />
        ))}
        <div className="absolute -bottom-6 text-[10px] font-bold text-white bg-white/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 backdrop-blur-md">
            5.0
        </div>
    </div>
);

const VisualPayment = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* CHANGED: Smaller card size to fit compact view */}
        <div className="w-28 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-white/10 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group-hover:-rotate-3 group-hover:scale-110 transition-transform duration-500 group-hover:border-green-500/30">
            {/* Success Check */}
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white mb-1 shadow-lg shadow-green-500/30 transform scale-75 opacity-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
                <Check size={14} strokeWidth={4} />
            </div>
            <div className="text-[9px] text-gray-400 group-hover:text-white transition-colors">Betaald</div>
            
            {/* Confetti */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-100"></div>
        </div>
    </div>
);


interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    description?: string;
    isPopular?: boolean;
    buttonText?: string;
    missingFeatures?: string[];
    onCta: () => void;
}

const PricingCard = ({ title, price, features, description, isPopular, buttonText = "14 Dagen Gratis", missingFeatures = [], onCta }: PricingCardProps) => (
  // 1. Outer Container: Handles Positioning, Hover State, and Z-Index
  <div className={`
    relative h-full transition-all duration-500 group/card flex flex-col
    ${isPopular ? 'scale-100 md:scale-105 z-10' : ''}
  `}>
    
    {/* 2. Badge: Absolutely positioned outside the clipping area */}
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-orange to-orange-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-brand-orange/40 z-20 whitespace-nowrap">
        Meest Gekozen
      </div>
    )}

    {/* 3. Inner Card: Handles Appearance, Borders, Background, and Overflow (for Shimmer) */}
    <div className={`
      relative p-8 rounded-[2.5rem] flex flex-col h-full overflow-hidden
      ${isPopular 
        ? 'bg-[#1a1f2e]/90 border border-brand-orange/60 shadow-[0_0_60px_-10px_rgba(255,87,34,0.3)] backdrop-blur-xl ring-1 ring-brand-orange/20' 
        : 'glass-panel hover:bg-white/[0.03] border-white/5 hover:border-brand-orange/30 hover:shadow-[0_0_30px_-10px_rgba(255,87,34,0.1)]'
      }
    `}>
        {/* Shimmer Effect (Only for popular) */}
        {isPopular && (
          <div className="absolute inset-0 -translate-x-full group-hover/card:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"></div>
        )}
        
        <div className="mb-8 text-center relative z-10">
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${isPopular ? 'text-brand-orange' : 'text-gray-500'}`}>{title}</h3>
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-5xl font-bold text-white tracking-tighter">€{price}</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">per maand</p>
        </div>
        
        <div className="space-y-5 mb-10 flex-1 relative z-10">
          {features.map((feat: string, i: number) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className={`mt-1 p-0.5 rounded-full shrink-0 shadow-lg transition-transform group-hover:scale-110 ${isPopular ? 'bg-brand-orange text-white shadow-brand-orange/20' : 'bg-gray-800 text-gray-400 group-hover:bg-brand-orange group-hover:text-white'}`}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{feat}</span>
            </div>
          ))}
           {missingFeatures.map((feat: string, i: number) => (
            <div key={i} className="flex items-start gap-3 opacity-40">
               <div className="mt-1 p-0.5 rounded-full bg-transparent border border-gray-700 text-gray-500 shrink-0">
                <X size={12} />
              </div>
              <span className="text-gray-500 text-sm">{feat}</span>
            </div>
          ))}
        </div>

        <Button onClick={onCta} variant={isPopular ? 'secondary' : 'outline'} className="w-full text-sm py-4 relative z-10">
          {buttonText}
        </Button>
    </div>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-medium text-lg transition-colors duration-300 ${isOpen ? 'text-brand-orange' : 'text-gray-400 group-hover:text-white'}`}>
          {question}
        </span>
        <ChevronDown className={`text-gray-600 transition-transform duration-500 ${isOpen ? 'rotate-180 text-brand-orange' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed pr-8 font-light">{answer}</p>
      </div>
    </div>
  );
};

// --- Modern "Sliding Doors" Comparison Section ---
const ComparisonSection = () => {
    const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

    const getWidths = () => {
        if (hoveredSide === 'left') return { left: 'flex-[2]', right: 'flex-[1]' };
        if (hoveredSide === 'right') return { left: 'flex-[1]', right: 'flex-[2]' };
        return { left: 'flex-[1]', right: 'flex-[1]' };
    };

    const widths = getWidths();

    return (
        <Section className="border-t border-white/[0.03] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Kies je <span className="text-white">toekomst</span></h2>
                    <p className="text-lg text-gray-400">De keuze tussen altijd druk of altijd controle.</p>
                </div>

                <div 
                    className="flex flex-col md:flex-row h-auto md:h-[600px] w-full rounded-[2.5rem] overflow-hidden border border-white/5 relative group shadow-2xl transition-all duration-700"
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    {/* LEFT SIDE: CHAOS */}
                    <div 
                        onMouseEnter={() => setHoveredSide('left')}
                        className={`
                            relative ${widths.left} transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                            bg-gray-950 border-r border-white/5 overflow-hidden flex flex-col z-10
                        `}
                    >
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-900/10 via-transparent to-transparent transition-opacity duration-700 ${hoveredSide === 'left' ? 'opacity-100' : 'opacity-30'}`}></div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                            <div className="mb-8">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-4 transition-all duration-500 ${hoveredSide === 'left' ? 'scale-100' : 'scale-90 opacity-70'}`}>
                                    <AlertTriangle size={14} /> Ouderwets
                                </div>
                                <h3 className={`text-3xl md:text-5xl font-extrabold text-gray-200 transition-all duration-500 leading-tight ${hoveredSide === 'right' ? 'blur-[2px] opacity-30' : ''}`}>
                                    De Chaos
                                </h3>
                            </div>

                            <div className="space-y-8 flex-1">
                                <ComparisonItem 
                                    icon={PhoneOff} 
                                    title="Altijd bereikbaar zijn" 
                                    desc="Telefoon gaat tijdens het avondeten. Je neemt op omdat je bang bent de klus te missen."
                                    color="red"
                                    isHovered={hoveredSide === 'left' || hoveredSide === null}
                                />
                                <ComparisonItem 
                                    icon={FileWarning} 
                                    title="Administratie in de avond" 
                                    desc="Na een lange dag nog facturen tikken in Word. Vaak vergeet je de helft."
                                    color="red"
                                    isHovered={hoveredSide === 'left' || hoveredSide === null}
                                />
                                <ComparisonItem 
                                    icon={Briefcase} 
                                    title="Alles alleen doen" 
                                    desc="Jij bent de secretaresse, de boekhouder én de vakman. Het houdt nooit op."
                                    color="red"
                                    isHovered={hoveredSide === 'left' || hoveredSide === null}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CENTER BADGE */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex items-center justify-center">
                        <div className={`
                            w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0B0F19] border border-white/10 flex items-center justify-center font-black italic text-xl shadow-2xl transition-all duration-700 z-50
                            ${hoveredSide === 'right' ? 'rotate-12 scale-110 border-brand-orange/30 text-white bg-[#0B0F19]' : ''}
                            ${hoveredSide === 'left' ? '-rotate-12 scale-110 border-red-500/30 text-white' : 'text-gray-600'}
                        `}>
                            VS
                        </div>
                    </div>

                    {/* RIGHT SIDE: CONTROL */}
                    <div 
                        onMouseEnter={() => setHoveredSide('right')}
                        className={`
                            relative ${widths.right} transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                            bg-[#0B0F19] overflow-hidden flex flex-col group/right
                        `}
                    >
                         <div className={`absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-gray-950 transition-all duration-1000`}></div>
                        
                        <div className={`absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange/20 via-brand-orange/5 to-transparent blur-[80px] pointer-events-none transition-all duration-1000 ${hoveredSide === 'right' ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}></div>

                        <div className={`absolute -top-20 -right-20 w-80 h-80 bg-brand-orange/10 blur-[100px] rounded-full mix-blend-screen transition-all duration-1000 ${hoveredSide === 'right' ? 'scale-125 opacity-100' : 'scale-100 opacity-20'}`}></div>

                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                            <div className="mb-8 md:text-right flex flex-col md:items-end">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 transition-all duration-500 backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.2)] ${hoveredSide === 'right' ? 'scale-100 border-emerald-400/50 bg-emerald-500/20 text-emerald-300' : 'scale-90 opacity-70'}`}>
                                    <CheckCircle2 size={14} /> Met Klusvol
                                </div>
                                <h3 className={`text-3xl md:text-5xl font-extrabold text-white transition-all duration-500 leading-tight drop-shadow-lg ${hoveredSide === 'left' ? 'blur-[2px] opacity-30' : ''}`}>
                                    De Controle
                                </h3>
                            </div>

                             <div className="space-y-8 flex-1">
                                <ComparisonItem 
                                    icon={Coffee} 
                                    title="Rust in je hoofd" 
                                    desc="De app vangt de telefoon af en stuurt een SMS. Jij werkt ongestoord door."
                                    color="blue"
                                    align="right"
                                    isHovered={hoveredSide === 'right' || hoveredSide === null}
                                />
                                <ComparisonItem 
                                    icon={TrendingUp} 
                                    title="Geld stroomt binnen" 
                                    desc="Betaalverzoekjes via SMS worden 3x sneller betaald. Geen achterstallige facturen meer."
                                    color="green"
                                    align="right"
                                    isHovered={hoveredSide === 'right' || hoveredSide === null}
                                />
                                <ComparisonItem 
                                    icon={Smile} 
                                    title="Professioneel Team" 
                                    desc="Klanten denken dat je een kantoormedewerker hebt. Jij hebt gewoon een slimme app."
                                    color="purple"
                                    align="right"
                                    isHovered={hoveredSide === 'right' || hoveredSide === null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const ComparisonItem = ({ icon: Icon, title, desc, color, align = 'left', isHovered }: any) => {
    if (color === 'red') {
        return (
            <div className={`
                flex items-start gap-5 transition-all duration-500
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4 blur-[1px]'}
            `}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-red-500/5 border border-red-500/10 text-red-500 shadow-sm">
                    <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-400">{title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600 max-w-sm">{desc}</p>
                </div>
            </div>
        );
    }

    const colors = {
        'brand-orange': 'text-white bg-brand-orange shadow-lg shadow-brand-orange/30 border-brand-orange',
        'brand-white': 'text-white bg-white/5 border-white/10 group-hover:bg-white/10',
        'blue': 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]',
        'green': 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]',
        'purple': 'text-purple-400 bg-purple-950/40 border-purple-500/30 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]',
    };
    
    const activeColorClass = colors[color as keyof typeof colors] || colors['brand-white'];

    return (
        <div className={`
            flex items-start gap-5 transition-all duration-500 group
            ${align === 'right' ? 'md:flex-row-reverse md:text-right' : ''}
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}
        `}>
            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 backdrop-blur-md
                ${isHovered ? activeColorClass : 'bg-white/5 border-white/5 text-gray-500'}
            `}>
                <Icon size={22} strokeWidth={1.5} />
            </div>
            <div>
                <h4 className={`font-bold text-lg mb-1 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
                <p className="text-sm leading-relaxed text-gray-400 max-w-sm font-medium">{desc}</p>
            </div>
        </div>
    );
};

// --- Interactive 3-Steps Visual Component ---
const stepsData = [
    { 
        title: "Aanvragen", 
        desc: "Meld je aan.",
        fullDesc: "Vul je gegevens in. Wij checken of Klusvol geschikt is voor jouw bedrijf.",
        icon: MousePointerClick
    },
    { 
        title: "Inrichting", 
        desc: "Wij regelen alles.",
        fullDesc: "Geen gedoe. Wij richten jouw account persoonlijk in, inclusief telefoonnummer en automations.",
        icon: Wrench
    },
    { 
        title: "Starten", 
        desc: "Direct aan de slag.",
        fullDesc: "Je ontvangt de inloggegevens per mail en kunt direct beginnen met tijd besparen.",
        icon: Zap
    }
];

const InteractiveSteps = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return;
        
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % stepsData.length);
        }, 3000); 

        return () => clearInterval(timer);
    }, [isHovering]);

    return (
        <div 
            className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="space-y-6">
                <h2 className="hidden md:block text-3xl md:text-5xl font-bold mb-12 tracking-tight">In 3 stappen operationeel</h2>
                
                <div className="hidden md:flex flex-col gap-4 relative pl-8 border-l border-white/5">
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5"></div>
                    <div 
                        className="absolute left-0 w-[2px] bg-brand-orange transition-all duration-500 ease-in-out shadow-[0_0_15px_rgba(255,87,34,0.8)]"
                        style={{ 
                            top: `${activeStep * 33}%`, 
                            height: '33%' 
                        }}
                    ></div>

                    {stepsData.map((step, i) => {
                        const isActive = activeStep === i;
                        return (
                            <div 
                                key={i}
                                onMouseEnter={() => setActiveStep(i)}
                                className={`
                                    relative p-6 rounded-2xl cursor-pointer transition-all duration-500
                                    ${isActive 
                                        ? 'bg-white/[0.05] border border-brand-orange/30 translate-x-2 shadow-[0_0_30px_rgba(255,87,34,0.1)]' 
                                        : 'bg-transparent border border-transparent opacity-60 hover:opacity-100 hover:bg-white/[0.02]'
                                    }
                                `}
                            >
                                <div className={`
                                    absolute -left-[39px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#050810] transition-all duration-500
                                    ${isActive ? 'bg-brand-orange scale-125 shadow-[0_0_15px_rgba(255,87,34,0.8)]' : 'bg-gray-800'}
                                `}></div>

                                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 font-light leading-relaxed">{step.fullDesc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="md:hidden">
                    <h2 className="text-2xl font-bold mb-6 text-center">In 3 stappen klaar</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {stepsData.map((step, i) => {
                            const isActive = activeStep === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className={`
                                        flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300
                                        ${isActive 
                                            ? 'bg-gray-800 border-brand-orange text-white shadow-lg' 
                                            : 'bg-gray-900/50 border-white/5 text-gray-500 hover:bg-gray-800'
                                        }
                                    `}
                                >
                                    <step.icon size={20} className="mb-2" />
                                    <span className="text-xs font-bold">{step.title}</span>
                                </button>
                            );
                        })}
                    </div>
                     <div className="mt-4 text-center text-sm text-gray-400 min-h-[3rem] px-4 animate-fade-in">
                         {stepsData[activeStep].fullDesc}
                     </div>
                </div>
            </div>

            <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-blue-500/5 blur-[80px] rounded-full"></div>
                 
                 <div className="relative z-10 w-full max-w-sm h-full md:h-[320px] glass-panel rounded-[3rem] p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden bg-black/40 border border-white/10 hover:border-brand-orange/30">
                     
                     <div className={`absolute transition-all duration-700 transform flex flex-col items-center gap-6 ${activeStep === 0 ? 'opacity-100 scale-100 translate-y-0 blur-0' : 'opacity-0 scale-90 translate-y-10 blur-sm pointer-events-none'}`}>
                         <div className="w-24 h-24 rounded-3xl bg-[#1a1f2e] border border-brand-orange/20 flex items-center justify-center shadow-2xl relative shadow-brand-orange/10">
                             <div className="absolute inset-0 bg-brand-orange/20 blur-xl rounded-full animate-pulse-slow"></div>
                             <MousePointerClick size={48} className="text-brand-orange relative z-10" />
                         </div>
                         <div className="bg-blue-500/10 text-blue-500 px-6 py-2 rounded-full border border-blue-500/20 font-bold tracking-wide flex items-center gap-2">
                             Aanvraag Verstuurd
                         </div>
                     </div>

                     <div className={`absolute transition-all duration-700 transform flex flex-col items-center gap-6 ${activeStep === 1 ? 'opacity-100 scale-100 translate-y-0 blur-0' : 'opacity-0 scale-90 translate-y-10 blur-sm pointer-events-none'}`}>
                         <div className="w-56 h-32 bg-[#1a1f2e] rounded-xl border border-white/10 flex flex-col p-4 shadow-2xl relative overflow-hidden">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange"><Wrench size={16}/></div>
                                <div>
                                    <div className="h-2 w-24 bg-gray-700 rounded-full mb-1"></div>
                                    <div className="h-2 w-16 bg-gray-800 rounded-full"></div>
                                </div>
                             </div>
                             <div className="mt-auto">
                                <div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>Installeren...</span><span>85%</span></div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                     <div className="h-full bg-green-500 w-[85%] animate-pulse"></div>
                                </div>
                             </div>
                         </div>
                         <p className="text-gray-400 font-medium">Wij richten je account in</p>
                     </div>

                     <div className={`absolute transition-all duration-700 transform flex flex-col items-center gap-6 ${activeStep === 2 ? 'opacity-100 scale-100 translate-y-0 blur-0' : 'opacity-0 scale-90 translate-y-10 blur-sm pointer-events-none'}`}>
                         <div className="w-full max-w-[240px] bg-[#1a1f2e] rounded-2xl p-4 border border-white/10 shadow-xl relative overflow-hidden group-hover:border-brand-orange/20">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></div>
                             <div className="flex items-center gap-3 mb-4">
                                 <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><Check size={16}/></div>
                                 <div className="text-xs text-gray-400">Account Actief</div>
                             </div>
                             <div className="text-2xl font-bold text-white mb-1">Klaar voor gebruik</div>
                             <div className="text-xs text-gray-500">Inloggegevens verstuurd</div>
                             
                             <div className="absolute top-2 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                             <div className="absolute bottom-4 right-8 w-1 h-1 bg-brand-orange rounded-full animate-ping delay-100"></div>
                         </div>
                         <div className="flex gap-1 text-yellow-400">
                             {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" className="animate-star-pop" style={{animationDelay: `${star * 0.1}s`}} />)}
                         </div>
                     </div>

                 </div>
            </div>
        </div>
    );
};

// --- Sector / Audience Section (Compact & Subtle) ---
const sectorsRow1 = [
  { icon: Paintbrush, label: "Schilders" },
  { icon: Wrench, label: "Loodgieters" },
  { icon: Zap, label: "Elektriciens" },
  { icon: Hammer, label: "Timmermannen" },
  { icon: Trees, label: "Hoveniers" },
];

const sectorsRow2 = [
  { icon: HardHat, label: "Aannemers" },
  { icon: Truck, label: "Koeriers" },
  { icon: Snowflake, label: "Installateurs" },
  { icon: Home, label: "Makelaars" },
  { icon: Scissors, label: "Kappers" },
];

const SectorSection = () => {
    const row1 = [...sectorsRow1, ...sectorsRow1, ...sectorsRow1];
    const row2 = [...sectorsRow2, ...sectorsRow2, ...sectorsRow2];

    return (
        <Section className="overflow-hidden py-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 opacity-60">Speciaal gebouwd voor jouw vak</p>
            <div className="flex flex-col gap-4 relative mask-gradient-x">
                <div className="flex w-max animate-scroll gap-4 hover:[animation-play-state:paused]">
                    {row1.map((sector, i) => (
                        <div key={i} className="group px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-3 cursor-default whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300">
                            <sector.icon size={16} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                            <span className="font-medium text-gray-300 text-sm group-hover:text-white transition-colors">{sector.label}</span>
                        </div>
                    ))}
                </div>

                <div className="flex w-max animate-scroll-reverse gap-4 hover:[animation-play-state:paused]">
                    {row2.map((sector, i) => (
                        <div key={i} className="group px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-3 cursor-default whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300">
                             <sector.icon size={16} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                            <span className="font-medium text-gray-300 text-sm group-hover:text-white transition-colors">{sector.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

// --- Break-Even ROI Calculator 2.0 (Winst Simulator) ---
const ROICalculator = () => {
    const [profitPerJob, setProfitPerJob] = useState(450);
    
    const packages = [
        { name: "Start", price: 97 },
        { name: "Basis", price: 147 },
        { name: "Pro", price: 217 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        if (val < 0) val = 0;
        if (val > 10000) val = 10000;
        setProfitPerJob(val);
    };

    return (
        <div className="max-w-6xl mx-auto bg-[#0F121C] rounded-[3rem] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-brand-orange/10 transition-colors duration-1000"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                        <Coins size={14} /> Winst Simulator
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
                        Bereken je <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Pure Winst</span>
                    </h2>
                    
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold">
                         <Sparkles size={12} className="text-brand-orange" />
                         Scenario: slechts 1 extra klus per maand
                    </div>

                    <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                        Vul je gemiddelde winst in en zie hoe je met <strong>slechts één extra klus</strong> per maand je investering er al dik uit haalt.
                    </p>
                    
                    <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/5 shadow-2xl">
                        <label className="block text-sm font-bold text-gray-300 mb-3">Winst per klus (€)</label>
                        <div className="flex items-center gap-4 mb-6">
                             <div className="relative w-32 shrink-0">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">€</span>
                                <input 
                                    type="number" 
                                    value={profitPerJob} 
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-8 pr-3 text-white font-bold focus:outline-none focus:border-brand-orange transition-colors"
                                />
                             </div>
                             
                             <input 
                                type="range" 
                                min="50" 
                                max="1500" 
                                step="10" 
                                value={profitPerJob} 
                                onChange={(e) => setProfitPerJob(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-orange hover:accent-orange-400 transition-all"
                            />
                        </div>
                        <div className="flex gap-2 text-xs text-gray-500">
                             <div className="bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white" onClick={()=>setProfitPerJob(250)}>€250 (Klein)</div>
                             <div className="bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white" onClick={()=>setProfitPerJob(750)}>€750 (Middel)</div>
                             <div className="bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white" onClick={()=>setProfitPerJob(1500)}>€1500 (Groot)</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    {packages.map((pkg) => {
                        const jobsNeeded = (pkg.price / profitPerJob);
                        const isCovered = profitPerJob >= pkg.price;
                        const profit = isCovered ? profitPerJob - pkg.price : 0;
                        
                        return (
                            <div key={pkg.name} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <div className="font-bold text-white text-lg">{pkg.name} Pakket</div>
                                        <div className="text-gray-500 text-xs">Kosten: €{pkg.price}/mnd</div>
                                    </div>
                                    <div className="text-right">
                                        {isCovered ? (
                                            <div>
                                                <div className="text-green-400 font-bold text-lg">+ €{profit.toFixed(0)}</div>
                                                <div className="text-green-500/60 text-xs font-bold uppercase">Winst op 1e klus!</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-orange-400 font-bold text-lg">{jobsNeeded.toFixed(1)} klussen</div>
                                                <div className="text-orange-500/60 text-xs font-bold uppercase">Om quitte te spelen</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden flex">
                                    {isCovered ? (
                                        <>
                                            <div 
                                                className="h-full bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-300 relative border-r border-black/20"
                                                style={{ width: `${(pkg.price / profitPerJob) * 100}%` }}
                                            >
                                               {((pkg.price/profitPerJob)*100).toFixed(0)}%
                                            </div>
                                            <div className="flex-1 h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-[10px] font-bold text-black/70">
                                               Winst
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-full h-full bg-brand-orange flex items-center justify-center text-[10px] font-bold text-white">
                                                Nog €{(pkg.price - profitPerJob).toFixed(0)} nodig
                                            </div>
                                        </>
                                    )}
                                </div>
                                
                                {isCovered && (
                                     <p className="text-xs text-gray-500 mt-2 text-center">
                                         Van je eerste klus (€{profitPerJob}) gaat slechts <span className="text-white">{Math.round((pkg.price/profitPerJob)*100)}%</span> naar de kosten.
                                     </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// --- Sticky Mobile CTA - FLOATING ISLAND ---
const StickyMobileCTA = ({ onCta }: { onCta: () => void }) => {
    return (
        <div className="fixed bottom-6 left-6 right-6 z-[60] md:hidden animate-slide-up-fade">
            <div className="relative group rounded-3xl p-[1px] bg-gradient-to-r from-brand-orange/40 via-white/20 to-brand-orange/40 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)]">
                {/* Glow Behind */}
                <div className="absolute inset-0 bg-brand-orange/10 blur-xl opacity-60 rounded-3xl"></div>
                
                {/* The 'Island' Content */}
                <div className="relative bg-[#0F121C]/80 backdrop-blur-xl rounded-3xl p-4 pl-5 flex items-center justify-between shadow-2xl">
                    <div className="flex-1">
                        <div className="text-white font-bold text-base leading-tight tracking-tight">Klusvol Proberen?</div>
                        <div className="text-gray-400 text-xs mt-0.5 font-medium">Wij richten alles voor je in.</div>
                    </div>
                    <button 
                        onClick={onCta} 
                        className="bg-white text-black px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wide shadow-lg active:scale-95 transition-transform flex items-center gap-2 hover:bg-brand-orange hover:text-white"
                    >
                        Start Setup
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'privacy' | 'terms' | 'blog'>('home');
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [currentSource, setCurrentSource] = useState('Website Direct');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: 'home' | 'privacy' | 'terms' | 'blog', sectionId?: string) => {
      setActivePage(page);
      setMobileMenuOpen(false);
      
      if (page === 'home' && sectionId) {
          setTimeout(() => {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      } else if (page === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          // Scroll to top for new pages like Blog
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  const handleLoginClick = () => {
      window.open(GHL_CONFIG.loginUrl, '_blank');
  }

  const openSignup = (source: string) => {
      setCurrentSource(source);
      setShowSignup(true);
  }

  const openContact = (source: string) => {
      setCurrentSource(source);
      setShowContact(true);
  }

  return (
    <div className="bg-brand-dark text-white font-sans overflow-x-hidden selection:bg-brand-orange/30 min-h-screen">
      
      {/* Background - Reverted to Cleaner/Simpler version */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-brand-orange/10 blur-[120px] rounded-full mix-blend-screen"></div>
           <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Navbar - Intelligent Scroll - ONLY ON HOME */}
      {activePage === 'home' && (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'backdrop-blur-xl bg-brand-dark/80 border-white/[0.05] py-2' : 'bg-transparent border-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer">
                <Logo onClick={() => navigateTo('home')} />
            </div>

            <div className="hidden md:flex items-center gap-10">
                <button onClick={() => navigateTo('home', 'voordelen')} className="text-sm font-medium text-gray-400 hover:text-white hover:text-brand-orange transition-colors duration-300">Voordelen</button>
                <button onClick={() => navigateTo('home', 'hoe-het-werkt')} className="text-sm font-medium text-gray-400 hover:text-white hover:text-brand-orange transition-colors duration-300">Hoe het werkt</button>
                <button onClick={() => navigateTo('home', 'prijzen')} className="text-sm font-medium text-gray-400 hover:text-white hover:text-brand-orange transition-colors duration-300">Prijzen</button>
                <button onClick={() => navigateTo('blog')} className="text-sm font-medium text-gray-400 hover:text-white hover:text-brand-orange transition-colors duration-300">Blog</button>
                <Button onClick={() => openSignup('Header Navigation')} variant="primary" className="py-2.5 px-6 text-xs uppercase tracking-widest font-bold">Start Setup</Button>
            </div>

            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            </div>
            
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-6 animate-slide-up-fade shadow-2xl z-50">
                <button onClick={() => navigateTo('home', 'voordelen')} className="text-gray-300 text-lg font-medium text-left">Voordelen</button>
                <button onClick={() => navigateTo('home', 'hoe-het-werkt')} className="text-gray-300 text-lg font-medium text-left">Hoe het werkt</button>
                <button onClick={() => navigateTo('home', 'prijzen')} className="text-gray-300 text-lg font-medium text-left">Prijzen</button>
                <button onClick={() => navigateTo('blog')} className="text-gray-300 text-lg font-medium text-left">Blog</button>
                <Button onClick={() => { setMobileMenuOpen(false); openSignup('Mobile Menu'); }} variant="secondary" className="w-full justify-center py-4">Start Setup</Button>
            </div>
            )}
        </nav>
      )}

      {/* PAGE ROUTING LOGIC */}
      {activePage === 'home' ? (
        <>
          {/* 1. Hero Section (Hook) */}
          <section className="relative pt-32 pb-24 md:pt-60 md:pb-20 px-4 z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Content */}
              <div className="order-1 lg:order-1 relative z-20 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] mb-10 animate-slide-up-fade backdrop-blur-md hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300 cursor-default">
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                  Je Digitale Rechterhand
                </div>
                
                {/* Fixed H1 - No more layout shift */}
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] mb-8 animate-slide-up-fade delay-100 tracking-tight text-white">
                  De onzichtbare assistent <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-200 to-white">
                    voor de vakman.
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light animate-slide-up-fade delay-200">
                  Neemt automatisch op als jij op de ladder staat. Wij richten alles voor je in, zodat jij direct aan de slag kunt.
                </p>
                
                {/* HIGH CONVERSION LAUNCH ELEMENT - UPDATED */}
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center lg:justify-start animate-slide-up-fade delay-300 items-center">
                  <Button onClick={() => openSignup('Hero Section - Launch Deal')} variant="secondary" className="px-8 py-4 h-auto min-h-[70px] w-full sm:w-auto shadow-[0_0_50px_rgba(255,87,34,0.4)] hover:shadow-[0_0_70px_rgba(255,87,34,0.6)] border-brand-orange/50 group !flex-col !items-start !gap-0.5">
                    <div className="flex items-center gap-2 text-lg font-bold">
                        Claim Gratis Website <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-[11px] text-white/90 font-medium uppercase tracking-wider">
                        Launch Deal t.w.v. € 1.800,-
                    </div>
                  </Button>
                  
                  {/* Scarcity Card */}
                  <div className="text-left px-4 border-l-2 border-white/10 pl-6 py-1">
                      <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                          </span>
                          Launch Deal: Website Cadeau
                      </div>
                      <div className="w-full max-w-[180px] h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-brand-orange w-[80%] rounded-full shadow-[0_0_10px_rgba(255,87,34,0.5)]"></div>
                      </div>
                      <p className="text-gray-400 text-[11px] font-medium tracking-wide leading-tight">
                          Nog 2 plekken beschikbaar.
                      </p>
                  </div>
                </div>

              </div>

              {/* Phone Visual */}
              <div className="relative h-[650px] w-full flex items-center justify-center order-2 lg:order-2 animate-float mt-8 md:mt-0">
                 <div className="absolute inset-0 bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none opacity-40 animate-pulse-slow"></div>
                 <div className="relative z-20 scale-90 md:scale-105 transform perspective-1000 rotate-y-12 transition-transform duration-500 hover:rotate-y-0">
                   <InteractivePhoneHero />
                 </div>
              </div>
            </div>
          </section>

          {/* 3. The Pain */}
          <Section className="border-t border-white/[0.03]">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Stop met <span className="text-brand-orange drop-shadow-[0_0_35px_rgba(255,87,34,0.4)]">geld verliezen</span></h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">62% van de telefoontjes naar vakmensen wordt niet opgenomen. <br className="hidden md:block"/>De klant wacht niet, die belt de volgende.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="glass-panel p-10 rounded-[2.5rem] text-center hover:bg-red-500/5 hover:border-red-500/30 transition-all duration-500 group">
                  <div className="w-20 h-20 mx-auto bg-red-500 text-white rounded-3xl flex items-center justify-center mb-8 border border-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2)] group-hover:scale-110 transition-transform duration-500">
                      <XCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Gemiste Oproep</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Je handen zitten onder de verf. Je hoort hem wel, maar kunt niet opnemen.</p>
               </div>
               
               <div className="glass-panel p-10 rounded-[2.5rem] text-center group hover:bg-orange-500/5 hover:border-orange-500/30 transition-all duration-500">
                  <div className="w-20 h-20 mx-auto bg-orange-500 text-white rounded-3xl flex items-center justify-center mb-8 border border-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform duration-500">
                      <Clock size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Te Laat</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Je belt 's avonds terug. De klant heeft al een ander gevonden.</p>
               </div>

               <div className="glass-panel p-10 rounded-[2.5rem] text-center group hover:bg-red-600/5 hover:border-red-600/30 transition-all duration-500">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-3xl flex items-center justify-center mb-8 border border-red-500/10 shadow-[0_0_30px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-500">
                      <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Omzet Weg</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Dat was een klus van €1.500. Zonde van je tijd.</p>
               </div>
            </div>
          </Section>

          {/* 4. Comparison Section */}
          <ComparisonSection />

          {/* 5. Bento Grid Features */}
          <Section id="voordelen">
            <div className="mb-20">
              <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Jouw Cockpit</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Onzichtbaar. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Krachtig.</span></h2>
              <p className="text-lg text-gray-400 max-w-xl font-light">Geen losse tools, maar één geoliede machine die werkt terwijl jij slaapt.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
               <BentoCard 
                  className="col-span-2 row-span-2 min-h-[220px] md:min-h-0"
                  title="Auto-Response"
                  description="Directe SMS opvolging bij elke gemiste oproep."
                  visual={<VisualAutoResponse />}
               />
               <BentoCard 
                  className="col-span-1 row-span-2"
                  title="Centrale Inbox"
                  description="Alles in één lijst."
                  visual={<VisualInbox />}
               />
               <BentoCard 
                  className="col-span-1 row-span-1"
                  title="Privacy"
                  description="Zakelijk & Privé gescheiden."
                  visual={<VisualPrivacy />}
               />
               <BentoCard 
                  className="col-span-1 row-span-1"
                  title="Klanten"
                  description="Je complete bestand."
                  visual={<VisualCRM />}
               />
               <BentoCard 
                  className="col-span-2 md:col-span-2 row-span-1"
                  title="Google Reviews"
                  description="Automatisch meer 5-sterren reviews."
                  visual={<VisualReviews />}
               />
               <BentoCard 
                  className="col-span-2 md:col-span-2 row-span-1" 
                  title="Betaalverzoek"
                  description="Krijg sneller betaald via SMS."
                  visual={<VisualPayment />}
               />
            </div>
          </Section>
          
          {/* 6. Target Audience */}
          <SectorSection />

          {/* 7. How It Works */}
          <Section id="hoe-het-werkt" className="border-t border-white/[0.03] bg-white/[0.01]">
             <InteractiveSteps />
          </Section>

          {/* 8. Pricing */}
          <Section id="prijzen">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Simpele prijzen.</h2>
              <p className="text-xl text-gray-400 font-light">Geen contracten. Maandelijks opzegbaar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
               <PricingCard 
                 title="Klusvol Start" 
                 price="97" 
                 buttonText="Start Gratis Setup"
                 onCta={() => openSignup('Pricing - Start Pakket')}
                 features={[
                   "Automatische SMS bij gemist",
                   "Zakelijk telefoonnummer (085)",
                   "Privacy: Privé en zakelijk gescheiden",
                   "Centrale Inbox (Mail, App, SMS)",
                   "Klusvol iOS & Android App"
                 ]}
                 missingFeatures={[
                   "Online Agenda & Planner",
                   "Betaalverzoeken sturen",
                   "Review automations",
                   "Website Widget",
                 ]}
               />
               
               <PricingCard 
                 title="Klusvol Basis" 
                 price="147" 
                 isPopular
                 buttonText="Start Gratis Setup"
                 onCta={() => openSignup('Pricing - Basis Pakket')}
                 features={[
                   "Alles uit Start, plus:",
                   "Online Agenda & Planner",
                   "Automatische Google Reviews",
                   "Betaalverzoeken via SMS",
                   "Website Widget",
                   "CRM voor klanten",
                 ]}
                 description="Meest gekozen door ZZP'ers"
               />

               <PricingCard 
                 title="Klusvol Pro" 
                 price="217" 
                 buttonText="Plan Strategie Sessie"
                 onCta={() => openContact('Pricing - Pro Pakket')}
                 features={[
                   "Alles uit Basis, plus:",
                   "Marketing Automations",
                   "Offerte tool",
                   "Email Marketing",
                   "Funnel Builder",
                   "Priority Support",
                   "1-op-1 Onboarding Call"
                 ]}
               />
            </div>
          </Section>

          {/* 9. ROI Calculator */}
          <Section>
             <ROICalculator />
          </Section>

          {/* 10. FAQ */}
          <Section className="border-t border-white/[0.03]">
             <div className="max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-12 text-center">Veelgestelde vragen</h2>
               <div className="space-y-4">
                 <AccordionItem question="Zit ik aan een contract vast?" answer="Nee. Klusvol is maandelijks opzegbaar. Geen kleine lettertjes." />
                 <AccordionItem question="Heb ik technische kennis nodig?" answer="Totaal niet. Wij richten je hele account voor je in. Jij hoeft alleen de app te downloaden en in te loggen." />
                 <AccordionItem question="Behoud ik mijn eigen 06-nummer?" answer="Ja. Je krijgt van ons een zakelijk nummer dat doorschakelt naar je mobiel. Je eigen 06 blijft gewoon werken voor vrienden en familie." />
                 <AccordionItem question="Werkt dit voor elk type klusbedrijf?" answer="Ja, zolang je telefonisch bereikbaar wilt zijn voor klanten. Of je nu schilder, stukadoor of hovenier bent." />
                 <AccordionItem question="Wat als ik al een website heb?" answer="Geen probleem. We plaatsen onze slimme widget op jouw site, zodat je ook daar leads en afspraken binnenkrijgt." />
               </div>
             </div>
          </Section>

          {/* 11. Final CTA (NEW) */}
          <Section className="py-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange/5 to-transparent opacity-50"></div>
              <div className="max-w-5xl mx-auto text-center relative z-10">
                  <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-tight">
                      Klaar om je <span className="text-brand-orange">avonden</span> terug te claimen?
                  </h2>
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                      Sluit je aan bij slimme vakmensen die hun telefoon niet meer opnemen, maar wel elke klus binnenhalen. Wij richten alles voor je in.
                  </p>
                  <div className="flex flex-col items-center gap-4">
                      <Button onClick={() => openSignup('Final Page CTA')} variant="secondary" className="px-10 py-5 text-lg shadow-2xl shadow-brand-orange/20 hover:scale-105 transition-transform">
                          Start Gratis Setup <ArrowRight size={22} />
                      </Button>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                          <CheckCircle2 size={14} className="text-green-500" /> <span>Direct geregeld</span>
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          <CheckCircle2 size={14} className="text-green-500" /> <span>Maandelijks opzegbaar</span>
                      </div>
                  </div>
              </div>
          </Section>

          {/* 12. Footer */}
          <footer className="py-20 border-t border-white/[0.05] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500">
              <div className="col-span-1 md:col-span-1">
                <Logo />
                <p className="mt-6 leading-relaxed">
                  Klusvol helpt vakmensen groeien door onzichtbaar werk uit handen te nemen.
                </p>
                <div className="flex gap-4 mt-6">
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"><Facebook size={16}/></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"><Instagram size={16}/></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"><Linkedin size={16}/></a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6">Product</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => navigateTo('home', 'voordelen')} className="hover:text-brand-orange transition-colors">Voordelen</button></li>
                  <li><button onClick={() => navigateTo('home', 'hoe-het-werkt')} className="hover:text-brand-orange transition-colors">Hoe het werkt</button></li>
                  <li><button onClick={() => navigateTo('home', 'prijzen')} className="hover:text-brand-orange transition-colors">Prijzen</button></li>
                  <li><button onClick={() => navigateTo('blog')} className="hover:text-brand-orange transition-colors">Kennisbank</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Bedrijf</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Over ons</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Partners</a></li>
                  <li><button onClick={handleLoginClick} className="text-white font-bold hover:text-brand-orange transition-colors flex items-center gap-2">Inloggen <ArrowRight size={14}/></button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Juridisch</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => navigateTo('privacy')} className="hover:text-brand-orange transition-colors">Privacybeleid</button></li>
                  <li><button onClick={() => navigateTo('terms')} className="hover:text-brand-orange transition-colors">Algemene Voorwaarden</button></li>
                  <li><span className="opacity-50">KVK: 12345678</span></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                 <p>&copy; {new Date().getFullYear()} Klusvol. Alle rechten voorbehouden.</p>
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     <span>Alle systemen operationeel</span>
                 </div>
            </div>
          </footer>

          <StickyMobileCTA onCta={() => openSignup('Sticky Mobile CTA')} />
        </>
      ) : activePage === 'privacy' ? (
        <LegalPage 
            title="Privacybeleid" 
            content={
                <div className="space-y-6">
                    <p>Bij Klusvol nemen we jouw privacy serieus. We verwerken persoonsgegevens enkel voor het doel waarvoor ze zijn verstrekt.</p>
                    <h3>1. Gegevens die we verzamelen</h3>
                    <p>We verzamelen naam, e-mailadres, telefoonnummer en bedrijfsgegevens om onze dienst te kunnen leveren.</p>
                    <h3>2. Hoe we gegevens gebruiken</h3>
                    <p>Om je account in te richten, facturen te sturen en contact op te nemen voor support.</p>
                    <p>...</p>
                </div>
            }
            onBack={() => navigateTo('home')} 
        />
      ) : activePage === 'terms' ? (
        <LegalPage 
            title="Algemene Voorwaarden" 
            content={
                <div className="space-y-6">
                    <p>Op alle diensten van Klusvol zijn deze voorwaarden van toepassing.</p>
                    <h3>1. Definities</h3>
                    <p>Klusvol: de gebruiker van deze algemene voorwaarden...</p>
                    <h3>2. Toepasselijkheid</h3>
                    <p>Deze voorwaarden zijn van toepassing op ieder aanbod...</p>
                    <p>...</p>
                </div>
            }
            onBack={() => navigateTo('home')} 
        />
      ) : (
          <BlogPage onBack={() => navigateTo('home')} />
      )}

      {/* GLOBAL MODALS */}
      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} source={currentSource} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} source={currentSource} />
      
      {/* GLOBAL CHATBOT */}
      <Chatbot />
      
    </div>
  );
}

export default App;