import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import InteractivePhoneHero from "./components/InteractivePhoneHero";
import Chatbot from "./components/Chatbot";
import AboutPage from "./components/AboutPage"; // IMPORT ADDED
import {
  CheckCircle2,
  ArrowRight,
  XCircle,
  Clock,
  Calendar,
  MessageSquare,
  CreditCard,
  Star,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
  Smartphone,
  BarChart3,
  MousePointerClick,
  Lock,
  Download,
  Check,
  AlertTriangle,
  ToggleRight,
  TrendingUp,
  BellRing,
  Ghost,
  Users,
  FileText,
  MessageCircle,
  Quote,
  LucideIcon,
  Hammer,
  Paintbrush,
  Wrench,
  Ruler,
  Trees,
  Plug,
  Droplet,
  Truck,
  Sun,
  Thermometer,
  Grid,
  Layers,
  Sparkles,
  HardHat,
  Snowflake,
  ChevronsUp,
  Home,
  Scissors,
  PhoneOff,
  Armchair,
  FileWarning,
  Wallet,
  Briefcase,
  Activity,
  Coffee,
  PartyPopper,
  Smile,
  Unlock,
  Calculator,
  Coins,
  ChevronLeft,
  Loader2,
  Play,
  QrCode,
  Wifi,
  Server,
  Send,
  Key,
  Crown,
  Headphones,
  Rocket,
  Flame,
  PieChart,
  Droplets,
  PhoneCall,
  Trophy,
} from "lucide-react";

// --- CONFIGURATION ---
const GHL_CONFIG = {
  signupWebhook:
    "https://services.leadconnectorhq.com/hooks/Xn0ouMgD2stq6OuI1a4H/webhook-trigger/5e468d5b-5131-4482-9d45-9dd90304714a",
  contactWebhook:
    "https://services.leadconnectorhq.com/hooks/Xn0ouMgD2stq6OuI1a4H/webhook-trigger/16364438-5301-44cf-8879-8f05a6d30dd8",
  loginUrl: "https://app.klusvol.nl",
  calendarUrl: "https://agenda.klusvol.nl",
};

// --- Utility Hooks & Components ---

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const Section = ({
  children,
  className = "",
  id = "",
  background,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  background?: React.ReactNode;
}) => {
  const revealRef = useReveal();
  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-4 relative overflow-hidden ${className}`}
    >
      {background && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {background}
        </div>
      )}
      <div
        ref={revealRef}
        className="max-w-7xl mx-auto relative z-10 reveal transition-all duration-1000"
      >
        {children}
      </div>
    </section>
  );
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}: any) => {
  const baseStyle =
    "px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 justify-center text-sm md:text-base tracking-wide cursor-pointer";
  const variants = {
    primary:
      "bg-white text-slate-900 hover:bg-slate-50 shadow-sm border border-slate-200 hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]",
    secondary:
      "bg-brand-orange text-white hover:bg-orange-600 shadow-md shadow-brand-orange/20 border border-brand-orange hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
    outline:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-brand-orange/50 hover:text-brand-orange",
    ghost: "bg-transparent text-slate-600 hover:text-slate-900",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Logo Component ---
const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2.5 font-bold text-xl tracking-tight group select-none ${onClick ? "cursor-pointer" : ""}`}
  >
    <img
      src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696d28a4e125efc1200fd25c.png"
      alt="Klusvol"
      className="h-10 w-10 object-contain rounded-xl"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        document.getElementById("fallback-logo")?.classList.remove("hidden");
        document.getElementById("fallback-logo")?.classList.add("flex");
      }}
    />

    <div
      id="fallback-logo"
      className="hidden w-10 h-10 bg-brand-orange rounded-xl items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-300"
    >
      <Hammer size={20} fill="currentColor" className="text-slate-900" />
    </div>

    <span className="text-slate-900 text-2xl group-hover:text-brand-orange transition-colors duration-300">
      Klusvol
    </span>
  </div>
);

// --- CONTACT MODAL (VIP Strategy Session) ---
const ContactModal = ({
  isOpen,
  onClose,
  source = "Strategy Modal",
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const isVisit = source.includes("Koffie") || source.includes("Bezoek");
  const isAannemer = source.includes("Aannemer");
  const isGeneralContact = source.includes("Contact");

  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (GHL_CONFIG.contactWebhook.includes("http")) {
        const formData = new URLSearchParams();
        formData.append("name", form.name);
        formData.append("company", form.company);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("message", form.message);
        formData.append("source", `Klusvol Website - ${source}`);

        let type = "strategy_session";
        if (isVisit) type = "coffee_appointment";
        else if (isAannemer) type = "aannemer_inquiry";
        else if (isGeneralContact) type = "general_inquiry";

        formData.append("type", type);

        await fetch(GHL_CONFIG.contactWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
          mode: "no-cors",
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
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

  // Dynamic Content based on context
  const getContextTitle = () => {
    if (isVisit) return "Kennismaking";
    if (isAannemer) return "Aannemer Pakket";
    if (isGeneralContact) return "Contactgegevens";
    return "Klusvol Pro";
  };

  const getFormTitle = () => {
    if (isVisit) return "Koffie Afspraak Plannen";
    if (isAannemer) return "Aannemer Pakket Aanvragen";
    if (isGeneralContact) return "Stuur een bericht";
    return "Adviesgesprek Aanvragen";
  };

  const getFormDesc = () => {
    if (isVisit) return "Vul je adres in, dan kom ik bij je langs.";
    if (isAannemer)
      return "Dit pakket is maatwerk. We bespreken graag je wensen.";
    if (isGeneralContact) return "Heb je een vraag? Vul het formulier in.";
    return "We kijken samen of Klusvol Pro bij jouw groeifase past.";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-50/95 backdrop-blur-2xl transition-opacity duration-500"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl bg-slate-50 border border-slate-200 rounded-3xl md:rounded-[2.5rem] shadow-[0_0_100px_rgba(249,115,22,0.05)] animate-scale-up flex flex-col md:flex-row max-h-[90vh] md:max-h-none md:min-h-[650px] group overflow-y-auto md:overflow-visible">
        {/* Border Glow */}
        <div className="absolute inset-0 border border-brand-orange/10 rounded-3xl md:rounded-[2.5rem] pointer-events-none sticky top-0"></div>

        {/* Left Side: Premium Context OR Contact Details */}
        <div className="w-full md:w-[45%] bg-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-slate-200 backdrop-blur-md mb-6 md:mb-10">
              <Crown
                size={14}
                className="text-brand-orange fill-brand-orange"
              />
              <span className="text-[10px] md:text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                {getContextTitle()}
              </span>
            </div>

            {isGeneralContact ? (
              <>
                <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Kom in <span className="text-brand-orange">contact.</span>
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm md:text-lg mb-8">
                  We helpen je graag verder. Bel, mail of app ons direct.
                </p>

                <div className="space-y-6">
                  <a
                    href="mailto:info@klusvol.nl"
                    className="flex items-center gap-4 group/link"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover/link:border-brand-orange/30 transition-all">
                      <Mail
                        size={20}
                        className="text-slate-500 group-hover/link:text-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Email
                      </div>
                      <div className="text-slate-900 font-medium">
                        info@klusvol.nl
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:0643411427"
                    className="flex items-center gap-4 group/link"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover/link:border-brand-orange/30 transition-all">
                      <Phone
                        size={20}
                        className="text-slate-500 group-hover/link:text-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Telefoon & WhatsApp
                      </div>
                      <div className="text-slate-900 font-medium">
                        06 434 11 427
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} className="text-slate-500" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        KVK Nummer
                      </div>
                      <div className="text-slate-900 font-medium">94035202</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 leading-[1.1] tracking-tight">
                  Geen tool,
                  <br />
                  maar een <span className="text-brand-orange">Partner.</span>
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm md:text-lg">
                  Wij werken met vakmensen die willen groeien, zonder dat dit
                  ten koste gaat van hun vrije tijd.
                </p>
              </>
            )}
          </div>

          {!isGeneralContact && (
            <div className="relative z-10 mt-8 md:mt-12 space-y-6 md:space-y-8 hidden md:block">
              <div className="flex items-start gap-5 group/item">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover/item:border-brand-orange/30 transition-all duration-300">
                  <Rocket
                    size={24}
                    className="text-slate-500 group-hover/item:text-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-base mb-1">
                    Priority Onboarding
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Wij richten alles in. Jij hoeft nergens naar om te kijken.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 group/item">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover/item:border-brand-orange/30 transition-all duration-300">
                  <Headphones
                    size={24}
                    className="text-slate-500 group-hover/item:text-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-base mb-1">
                    Directe Lijn
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Je eigen accountmanager op WhatsApp.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-6 md:p-12 relative flex flex-col justify-center bg-slate-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors z-50"
          >
            <X size={24} />
          </button>

          {sent ? (
            <div className="flex flex-col items-center justify-center text-center animate-fade-in h-full py-8 md:py-0">
              <div className="w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                <Check size={48} className="text-slate-900" strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Aanvraag Ontvangen
              </h3>
              <p className="text-slate-600 max-w-xs mx-auto mb-10 text-lg">
                Bedankt {form.name}. Je staat op de lijst. We bellen je binnen 4
                uur voor de afspraak.
              </p>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full max-w-xs border-slate-200 hover:bg-slate-50"
              >
                Sluiten
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full justify-center max-w-md mx-auto w-full"
            >
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  {getFormTitle()}
                </h3>
                <p className="text-sm md:text-base text-slate-600">
                  {getFormDesc()}
                </p>
              </div>

              <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Naam
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="Jouw naam"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Bedrijf
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="Bedrijfsnaam"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Contact
                  </label>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="Emailadres"
                    />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="06-nummer"
                    />
                  </div>
                </div>

                {isVisit && (
                  <div className="space-y-2 animate-slide-up-fade">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Locatie Afspraak
                    </label>
                    <input
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="Straat en huisnummer, Plaats"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    {isVisit
                      ? "Opmerking (Optioneel)"
                      : isGeneralContact
                        ? "Je Bericht"
                        : "Grootste Uitdaging"}
                  </label>
                  <textarea
                    required={!isVisit}
                    rows={2}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all resize-none placeholder-blue-300/50 text-sm md:text-base"
                    placeholder={
                      isVisit
                        ? "Bijv: De koffie staat klaar!"
                        : "Waar kunnen we je mee helpen?"
                    }
                  />
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full justify-center text-sm md:text-base py-4 md:py-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    {isVisit
                      ? "Afspraak Bevestigen"
                      : isAannemer
                        ? "Aanvraag Versturen"
                        : isGeneralContact
                          ? "Verstuur Bericht"
                          : "Neem contact op"}{" "}
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-slate-500 mt-5 flex items-center justify-center gap-1.5">
                <Lock size={10} /> 100% Vertrouwelijk.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({
  status,
  text,
  delay,
}: {
  status: "waiting" | "loading" | "done";
  text: string;
  delay: string;
}) => {
  return (
    <div
      className={`flex items-center gap-3 transition-all duration-500 ${status === "waiting" ? "opacity-30 blur-[1px]" : "opacity-100"}`}
      style={{ transitionDelay: delay }}
    >
      <div
        className={`
                w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500
                ${
                  status === "done"
                    ? "bg-green-500 border-green-500 text-black"
                    : status === "loading"
                      ? "border-brand-orange border-t-brand-orange border-r-transparent border-b-transparent border-l-transparent animate-spin"
                      : "border-slate-200 bg-slate-50"
                }
             `}
      >
        {status === "done" && <Check size={14} strokeWidth={4} />}
      </div>
      <div
        className={`text-sm transition-colors duration-500 ${status === "done" ? "text-slate-900 font-medium" : "text-slate-500"}`}
      >
        {text}
      </div>
    </div>
  );
};

const SignupModal = ({
  isOpen,
  onClose,
  source = "Direct",
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupStatus, setSetupStatus] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    businessName: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (isOpen) {
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
    if (isOpen && e.key === "Enter") {
      if (step === 0 && formData.businessName.length > 2) handleNextStep();
      if (step === 1) handleSubmit(e as any);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
    setTimeout(() => document.getElementById("nameInput")?.focus(), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (
      !formData.email.includes("@") ||
      formData.phone.length < 8 ||
      !formData.name
    ) {
      setError("Vul alle velden correct in.");
      setIsLoading(false);
      return;
    }

    try {
      if (GHL_CONFIG.signupWebhook.includes("http")) {
        const params = new URLSearchParams();
        params.append("businessName", formData.businessName);
        params.append("name", formData.name);
        params.append("email", formData.email);
        params.append("phone", formData.phone);
        params.append("source", `Klusvol Website - ${source}`);
        params.append("type", "saas_signup");

        await fetch(GHL_CONFIG.signupWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
          mode: "no-cors",
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setStep(2);
    } catch (error) {
      console.error(error);
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

  const progressWidth = step === 0 ? "33%" : step === 1 ? "66%" : "100%";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-50/95 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl animate-scale-up overflow-hidden flex flex-col min-h-[480px]">
        <div className="relative px-8 pt-8 pb-4 flex justify-between items-center z-20">
          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${step === 2 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {step === 1 && (
              <button
                onClick={() => setStep(0)}
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-orange transition-all duration-500 ease-out"
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-8 pb-8 flex flex-col justify-center relative">
          {step === 0 && (
            <div className="animate-slide-up-fade">
              <label className="block text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                Hoe heet je{" "}
                <span className="text-brand-orange">klusbedrijf</span>?
              </label>
              <input
                ref={inputRef}
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                type="text"
                placeholder="Typ je bedrijfsnaam..."
                className="w-full bg-transparent border-b-2 border-slate-200 text-xl md:text-2xl py-4 text-slate-900 placeholder-blue-300/50 focus:outline-none focus:border-brand-orange transition-colors"
              />
              {error && (
                <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                  <AlertTriangle size={14} /> {error}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono hidden md:inline-block">
                  Druk op ↵ Enter
                </span>
                <Button
                  onClick={handleNextStep}
                  variant="secondary"
                  className="px-6 py-3 text-sm"
                >
                  Verder <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-slide-up-fade">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                Aangenaam, {formData.businessName}.
              </h2>
              <p className="text-slate-600 mb-8">
                Waar mogen we de inloggegevens heen sturen?
              </p>

              <div className="space-y-4">
                <input
                  id="nameInput"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Jouw voornaam"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Emailadres"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Mobiel nummer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                  <AlertTriangle size={14} /> {error}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono hidden md:inline-block">
                  Veilig & Spamvrij
                </span>
                <Button
                  onClick={handleSubmit}
                  variant="secondary"
                  className="px-8 py-3 text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Zet de eerste stap"
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up-fade w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Gefeliciteerd, {formData.name}!
              </h2>

              {/* THE MEMBERSHIP CARD */}
              <div className="relative w-full max-w-sm h-52 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-2xl group flex flex-col p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-[50px] rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="flex justify-between items-start z-10 mb-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                      <Zap size={20} className="text-slate-900 fill-white" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold text-lg leading-none tracking-tight">
                        Klusvol
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                        Member
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
                    <Crown
                      size={12}
                      className="text-brand-orange fill-brand-orange"
                    />
                    Officieel Lid
                  </div>
                </div>

                <div className="z-10 relative">
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                    Geregistreerd voor
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1 truncate">
                    {formData.businessName}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-600 font-mono">
                      {formData.name}
                    </div>
                    <div className="text-green-400 text-[10px] font-bold flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      ACTIEF
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center space-y-4 w-full">
                <div className="space-y-2 mb-6">
                  <StatusRow
                    status={setupStatus >= 1 ? "done" : "loading"}
                    text="Account verifiëren"
                    delay="0ms"
                  />
                  <StatusRow
                    status={
                      setupStatus >= 2
                        ? "done"
                        : setupStatus === 1
                          ? "loading"
                          : "waiting"
                    }
                    text="Nummer configureren"
                    delay="200ms"
                  />
                  <StatusRow
                    status={
                      setupStatus >= 3
                        ? "done"
                        : setupStatus === 2
                          ? "loading"
                          : "waiting"
                    }
                    text="Inloggegevens verstuurd"
                    delay="400ms"
                  />
                </div>

                {setupStatus >= 3 ? (
                  <div className="animate-pop-in">
                    <p className="text-sm text-slate-600 mb-4">
                      {isMobile
                        ? "Check je berichten voor je toegangscode."
                        : "We hebben een SMS gestuurd met je inloglink."}
                    </p>
                    <Button
                      variant="primary"
                      onClick={handleActionClick}
                      className="w-full justify-center gap-2"
                    >
                      {isMobile ? (
                        <MessageCircle size={18} />
                      ) : (
                        <CheckCircle2 size={18} />
                      )}
                      {isMobile ? "Open Berichten" : "Ik heb hem ontvangen"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 font-mono animate-pulse">
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

const LegalPage = ({
  title,
  content,
  onBack,
}: {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors mb-8 group"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Terug naar home
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
        {title}
      </h1>
      <div className="prose prose-invert prose-lg text-slate-600 max-w-none">
        {content}
      </div>
    </div>
  );
};

// --- Rich Bento Card ---
interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  visual: React.ReactNode;
}

const BentoCard = ({
  title,
  description,
  className = "",
  visual,
}: BentoCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative overflow-hidden rounded-[2rem] border border-white/40 
        bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col backdrop-blur-xl
        ${className}
      `}
    >
      {/* Dynamic Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.15), transparent 40%)`
            : `radial-gradient(600px circle at 50% 50%, rgba(249,115,22,0), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />

      {/* Permanent cool glow corner */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>

      {/* Visual Content */}
      <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center min-h-[140px] z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          {visual}
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 p-6 pt-2 md:pt-4 bg-gradient-to-t from-brand-surface/90 to-transparent">
        <motion.h3
          animate={{ color: isHovered ? "#F97316" : "#0F172A" }}
          className="text-sm md:text-base font-bold mb-1 leading-tight"
        >
          {title}
        </motion.h3>
        <motion.p
          animate={{ color: isHovered ? "#0F172A" : "#475569" }}
          className="text-[11px] md:text-xs font-medium leading-relaxed line-clamp-2"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- Micro Visual Components (Animated & Interactive) ---

const VisualBudget = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 px-4 overflow-hidden">
    <motion.div
      initial={{ x: 50, opacity: 0, rotate: 5 }}
      animate={{ x: -100, opacity: [0, 1, 0], rotate: -5 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      className="absolute w-4/5 bg-slate-50 border border-red-500/30 rounded-lg p-2 flex justify-between items-center opacity-50"
    >
      <span className="text-[10px] text-red-400 line-through">Klusje: €50</span>
      <X size={12} className="text-red-500" />
    </motion.div>

    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1.05, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full bg-brand-orange/10 border border-brand-orange/50 rounded-lg p-3 flex justify-between items-center shadow-[0_0_30px_rgba(249,115,22,0.3)] relative z-10 backdrop-blur-sm"
    >
      <span className="text-xs font-bold text-slate-900">
        Droomklus: €5.000+
      </span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <Check
          size={16}
          className="text-brand-orange drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
          strokeWidth={3}
        />
      </motion.div>
    </motion.div>
  </div>
);

const VisualRegio = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      className="absolute w-16 h-16 bg-brand-orange/20 rounded-full"
    />
    <motion.div
      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.5,
      }}
      className="absolute w-16 h-16 bg-brand-orange/40 rounded-full"
    />
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MapPin
          size={36}
          className="text-brand-orange drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
          fill="rgba(249,115,22,0.2)"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-[10px] bg-brand-orange/20 text-slate-900 font-bold px-3 py-1 rounded-full border border-brand-orange/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
      >
        Jouw Regio
      </motion.div>
    </div>
  </div>
);

const VisualKwalificatie = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
    {[
      { text: "Complete renovatie", delay: 0 },
      { text: "Budget akkoord", delay: 0.2 },
      { text: "Foto's toegevoegd", delay: 0.4 },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: item.delay, duration: 0.5 }}
        className="flex items-center gap-2 w-4/5 bg-slate-100 rounded p-2 border border-slate-300 shadow-lg backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: item.delay + 0.3, type: "spring" }}
          className="w-4 h-4 rounded-full bg-brand-orange flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        >
          <Check size={10} className="text-slate-900" strokeWidth={3} />
        </motion.div>
        <div className="text-[10px] font-medium text-slate-900">
          {item.text}
        </div>
      </motion.div>
    ))}
  </div>
);

const VisualRust = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(56,189,248,0.1),transparent)]"
    />
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-brand-surface border border-blue-400/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-md cursor-pointer"
    >
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Coffee size={32} className="text-slate-500 drop-shadow-lg" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-brand-dark shadow-[0_0_10px_rgba(34,197,94,0.6)]"
      />
    </motion.div>
  </div>
);

const VisualPremium = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4 perspective-1000">
    <motion.div
      initial={{ rotateX: 20, rotateY: -20 }}
      animate={{ rotateX: [20, 10, 20], rotateY: [-20, -10, -20] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full bg-gradient-to-br from-slate-900/5 to-slate-900/10 border border-slate-900/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden backdrop-blur-md"
    >
      <div className="h-4 w-full bg-slate-100 flex items-center px-3 gap-1.5 border-b border-slate-200">
        <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
        <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3 relative">
        <motion.div
          animate={{ width: ["0%", "60%"] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-2 bg-slate-900/20 rounded"
        />
        <motion.div
          animate={{ width: ["0%", "40%"] }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-2 bg-slate-900/10 rounded"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full h-10 bg-gradient-to-r from-brand-orange/20 to-brand-orange/40 rounded border border-brand-orange/50 mt-auto flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        >
          <span className="text-[8px] font-bold text-slate-900 uppercase tracking-wider">
            Premium Design
          </span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

const VisualGeenGezeur = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"
    />
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="relative z-10 cursor-pointer"
    >
      <ShieldCheck
        size={56}
        strokeWidth={1.5}
        className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.6)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute -bottom-2 -right-2 bg-slate-50 rounded-full p-1 border border-emerald-500/50"
      >
        <Check size={12} className="text-emerald-400" strokeWidth={4} />
      </motion.div>
    </motion.div>
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

const PricingCard = ({
  title,
  price,
  features,
  description,
  isPopular,
  buttonText = "Zet de eerste stap",
  missingFeatures = [],
  onCta,
}: PricingCardProps) => (
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`
    relative h-full flex flex-col
    ${isPopular ? "scale-100 md:scale-105 z-10" : ""}
  `}
  >
    {isPopular && (
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-slate-900 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-brand-orange/40 z-20 whitespace-nowrap"
      >
        Meest Gekozen
      </motion.div>
    )}

    <div
      className={`
      relative p-8 rounded-[2.5rem] flex flex-col h-full overflow-hidden group/card transition-all duration-500
      ${
        isPopular
          ? "bg-white border border-brand-orange/60 shadow-[0_0_60px_-10px_rgba(249,115,22,0.1)] backdrop-blur-xl ring-1 ring-brand-orange/20 hover:shadow-[0_0_80px_-10px_rgba(249,115,22,0.2)]"
          : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 border-slate-100 hover:border-brand-orange/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.05)]"
      }
    `}
    >
      {isPopular && (
        <div className="absolute inset-0 -translate-x-full group-hover/card:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"></div>
      )}

      <div className="mb-8 text-center relative z-10">
        <h3
          className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${isPopular ? "text-brand-orange" : "text-slate-500"}`}
        >
          {title}
        </h3>
        <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-5xl font-bold text-slate-900 tracking-tighter">
            €{price}
          </span>
        </div>
        <p className="text-sm text-slate-600 font-medium">per maand</p>
        {description && (
          <p className="text-xs text-slate-500 mt-2">{description}</p>
        )}
      </div>

      <div className="space-y-5 mb-10 flex-1 relative z-10">
        {features.map((feat: string, i: number) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="flex items-start gap-3 group"
          >
            <div
              className={`mt-1 p-0.5 rounded-full shrink-0 shadow-lg transition-transform group-hover:scale-110 ${isPopular ? "bg-brand-orange text-slate-900 shadow-brand-orange/20" : "bg-[#002855] text-slate-500 group-hover:bg-brand-orange group-hover:text-slate-900"}`}
            >
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-slate-800 text-sm font-medium group-hover:text-slate-900 transition-colors">
              {feat}
            </span>
          </motion.div>
        ))}
        {missingFeatures.map((feat: string, i: number) => (
          <div key={i} className="flex items-start gap-3 opacity-40">
            <div className="mt-1 p-0.5 rounded-full bg-transparent border border-blue-800 text-blue-600 shrink-0">
              <X size={12} />
            </div>
            <span className="text-slate-400 text-sm">{feat}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onCta}
        variant={isPopular ? "secondary" : "outline"}
        className="w-full text-sm py-4 relative z-10"
      >
        {buttonText}
      </Button>
    </div>
  </motion.div>
);

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`font-medium text-lg transition-colors duration-300 ${isOpen ? "text-brand-orange" : "text-slate-600 group-hover:text-slate-900"}`}
        >
          {question}
        </span>
        <ChevronDown
          className={`text-slate-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-brand-orange" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0"}`}
      >
        <p className="text-slate-600 leading-relaxed pr-8 font-light">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ComparisonItem = ({
  icon: Icon,
  title,
  desc,
  color,
  align = "left",
  isHovered,
}: any) => {
  if (color === "red") {
    return (
      <div
        className={`
                flex items-start gap-5 transition-all duration-500
                ${isHovered ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4 blur-[1px]"}
            `}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-red-500/5 border border-red-500/10 text-red-500 shadow-sm">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1 text-slate-300">{title}</h4>
          <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
            {desc}
          </p>
        </div>
      </div>
    );
  }

  const colors = {
    "brand-orange":
      "text-slate-900 bg-brand-orange shadow-lg shadow-brand-orange/30 border-brand-orange",
    "brand-white":
      "text-slate-900 bg-slate-50 border-slate-200 group-hover:bg-slate-100",
    blue: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]",
    green:
      "text-emerald-400 bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]",
    purple:
      "text-purple-400 bg-purple-950/40 border-purple-500/30 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]",
  };

  const activeColorClass =
    colors[color as keyof typeof colors] || colors["brand-white"];

  return (
    <div
      className={`
            flex items-start gap-5 transition-all duration-500 group
            ${align === "right" ? "md:flex-row-reverse md:text-right" : ""}
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-50 translate-y-2"}
        `}
    >
      <div
        className={`
                w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 backdrop-blur-md
                ${isHovered ? activeColorClass : "bg-slate-50 border-slate-100 text-slate-500"}
            `}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <h4
          className={`font-bold text-lg mb-1 transition-colors duration-300 ${isHovered ? "text-slate-900" : "text-slate-600"}`}
        >
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
};

// --- Interactive USPs Component ---
const InteractiveUSPs = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const usps = [
    {
      num: "01",
      title: "Focus op lange termijn",
      desc: "Je bouwt iets op en wil de komende 10 jaar vooruitkijken met een partner die je helpt daar te komen. Wij bouwen die digitale fundering voor je.",
      icon: Crown,
      color: "text-amber-500",
      bgBase: "bg-amber-500",
    },
    {
      num: "02",
      title: "Partnerschap",
      desc: "Wij werken op basis van samenwerking. Eerlijke, transparante bouwkosten en een strak maandelijks beheer. Geen gladde verkooppraatjes.",
      icon: Trophy,
      color: "text-brand-orange",
      bgBase: "bg-brand-orange",
    },
    {
      num: "03",
      title: "Ondersteunende App",
      desc: "Al je aanvragen komen direct en netjes binnen op één plek. Zelfs de DM's en berichten van je social media kanalen komen overzichtelijk in deze app terecht.",
      icon: Smartphone,
      color: "text-blue-500",
      bgBase: "bg-blue-500",
    },
    {
      num: "04",
      title: "Altijd bereikbaar",
      desc: "Korte lijntjes. Geen onpersoonlijke helpdesk of moeilijke ticketsystemen. Gewoon Folkert even appen als er iets is.",
      icon: MessageSquare,
      color: "text-emerald-500",
      bgBase: "bg-emerald-500",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
      {usps.map((usp, i) => {
        const isActive = activeIdx === i;
        return (
          <motion.div
            key={i}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setActiveIdx(i)}
            animate={{ flex: isActive ? 4 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer flex flex-col justify-end p-8 md:p-10 border transition-colors ${
              isActive
                ? "border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                : "border-slate-100 bg-white shadow-sm hover:border-brand-orange/30 hover:bg-slate-50/80"
            }`}
          >
            {/* Background Grain */}
            <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay ${isActive ? 'block' : 'hidden'}`}></div>
            
            {/* Color Glow */}
            <div className={`absolute -bottom-20 -right-20 w-64 h-64 ${usp.bgBase}/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between w-full mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${isActive ? `${usp.bgBase}/10 ${usp.color} border border-${usp.bgBase}/20 scale-110` : `${usp.bgBase}/5 ${usp.color} opacity-70 border border-slate-100 scale-100`}`}>
                  <usp.icon size={26} />
                </div>
                <div className={`text-5xl md:text-6xl font-black leading-none transition-all duration-500 ${isActive ? 'text-slate-100' : 'text-slate-100 opacity-60'}`}>
                  {usp.num}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end items-start md:items-stretch relative">
                <h3 className={`font-bold transition-all duration-300 ${isActive ? 'text-2xl md:text-3xl text-slate-900 mb-4 whitespace-normal origin-bottom-left' : 'text-lg text-slate-800 mb-0 whitespace-nowrap overflow-hidden text-ellipsis origin-bottom-left lg:-rotate-90 lg:absolute lg:bottom-0 lg:left-0 lg:w-[250px] lg:translate-x-2'}`}>
                  {usp.title}
                </h3>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[200px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                  <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed">
                    {usp.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
const stepsData = [
  {
    title: "Schetsblok & Wensen",
    desc: "Jij vertelt wat je doet en wie je zoekt. Wij maken een plan.",
    fullDesc: "Jij vertelt wat je doet en wie je zoekt. Wij maken een plan.",
    icon: Paintbrush,
  },
  {
    title: "Wij bouwen je site",
    desc: "Wij bouwen je site. Geen templates, maar maatwerk voor jouw vak.",
    fullDesc:
      "Wij bouwen je site. Geen templates, maar maatwerk voor jouw vak.",
    icon: ShieldCheck,
  },
  {
    title: "Website Live",
    desc: "Je site staat live. Vanaf nu filtert het systeem de ruis eruit.",
    fullDesc: "Je site staat live. Vanaf nu filtert het systeem de ruis eruit.",
    icon: Coffee,
  },
];

const PricingShowcaseSlider = () => {
  const showcases = [
    {
      title: "Hoekstra Sprayworks",
      src: "https://assets.cdn.filesafe.space/UMBYqC3d2lb9GmvTCMc4/media/69ce1f3335c728284fc0c22e.mp4",
      isVideo: true,
      link: "https://hoekstrasprayworks.nl"
    },
    {
      title: "Stukadoorsbedrijf Hessels",
      src: "https://images.unsplash.com/photo-1625585598750-3535fe40efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNzQ4Mjd8MHwxfHNlYXJjaHwxOHx8bWluaW1hbCUyMGludGVyaW9yfGVufDB8fHx8MTc3MTk1MTM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      isVideo: false,
      link: "https://stukadoorsbedrijfhessels.nl/"
    }
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIdx((v) => (v + 1) % showcases.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-full min-h-[240px] group">
      {showcases.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target={item.link !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`absolute inset-0 transition-opacity duration-1000 block cursor-pointer ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          {item.isVideo ? (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </a>
      ))}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none z-20"></div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pt-16 pb-4 px-4 z-20 pointer-events-none">
        <div className="text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2 drop-shadow-md">
            <CheckCircle2 size={14} className="text-green-400" />{" "}
            {showcases[idx].title}
          </span>
          <div className="flex gap-1.5">
            {showcases.map((_, dotIdx) => (
              <div
                key={dotIdx}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${dotIdx === idx ? "bg-brand-orange" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <h2 className="hidden md:block text-2xl md:text-4xl font-bold mb-12 tracking-tight">
          In 3 stappen klaar
        </h2>

        <div className="hidden md:flex flex-col gap-4 relative pl-8 border-l border-slate-100">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-50"></div>
          <motion.div
            className="absolute left-0 w-[2px] bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.8)]"
            animate={{
              top: `${activeStep * 33}%`,
              height: "33%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {stepsData.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                animate={{
                  backgroundColor: isActive
                    ? "rgba(0,0,0,0.02)"
                    : "rgba(0,0,0,0)",
                  borderColor: isActive
                    ? "rgba(249,115,22,0.3)"
                    : "transparent",
                  x: isActive ? 8 : 0,
                  opacity: isActive ? 1 : 0.6,
                }}
                className="relative p-6 rounded-2xl cursor-pointer border"
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? "#F97316" : "#E2E8F0",
                    scale: isActive ? 1.25 : 1,
                    boxShadow: isActive
                      ? "0 0 15px rgba(249,115,22,0.8)"
                      : "none",
                  }}
                  className="absolute -left-[39px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-brand-dark"
                />

                <motion.h3
                  animate={{ color: isActive ? "#0F172A" : "#475569" }}
                  className="text-xl font-bold mb-2"
                >
                  {step.title}
                </motion.h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  {step.fullDesc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="md:hidden">
          <h2 className="text-2xl font-bold mb-6 text-center">
            In 3 stappen klaar
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {stepsData.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`
                                        flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300
                                        ${
                                          isActive
                                            ? "bg-white border-brand-orange text-slate-900 shadow-lg"
                                            : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-white"
                                        }
                                    `}
                >
                  <step.icon size={20} className="mb-2" />
                  <span className="text-xs font-bold">{step.title}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-center text-sm text-slate-600 min-h-[3rem] px-4 animate-fade-in">
            {stepsData[activeStep].fullDesc}
          </div>
        </div>
      </div>

      <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center">
        {/* Updated Glow to Warm/Orange */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 to-blue-500/5 blur-[80px] rounded-full mix-blend-screen"></div>

        <div className="relative z-10 w-full max-w-sm h-full md:h-[320px] bg-white border border-slate-200 shadow-sm hover:shadow-md rounded-[3rem] p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden bg-white border border-slate-200 hover:border-brand-orange/30">
          <motion.div
            animate={{
              opacity: activeStep === 0 ? 1 : 0,
              scale: activeStep === 0 ? 1 : 0.9,
              y: activeStep === 0 ? 0 : 20,
              filter: activeStep === 0 ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-4"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80"
                alt="Schetsen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-6">
                <div className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/30 font-bold tracking-wide flex items-center gap-2 shadow-lg">
                  <Paintbrush size={16} /> Schetsblok & Wensen
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              opacity: activeStep === 1 ? 1 : 0,
              scale: activeStep === 1 ? 1 : 0.9,
              y: activeStep === 1 ? 0 : 20,
              filter: activeStep === 1 ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-4"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Bouwen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/80 to-transparent mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="bg-brand-orange text-white px-6 py-2 rounded-full border border-white/20 font-bold tracking-wide flex items-center gap-2 shadow-[0_0_30px_rgba(249,115,22,0.6)]">
                  <ShieldCheck size={16} /> Wij bouwen je site
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              opacity: activeStep === 2 ? 1 : 0,
              scale: activeStep === 2 ? 1 : 0.9,
              y: activeStep === 2 ? 0 : 20,
              filter: activeStep === 2 ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-4"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Live"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end justify-center pb-6">
                <div className="bg-green-500 text-white px-6 py-2 rounded-full border border-green-400 font-bold tracking-wide flex items-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-pulse-slow">
                  <span className="relative flex h-2.5 w-2.5 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  Website Live
                </div>
              </div>
            </div>
          </motion.div>
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
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 opacity-60">
        Speciaal gebouwd voor jouw vak
      </p>
      <div className="flex flex-col gap-4 relative mask-gradient-x">
        <div className="flex w-max animate-scroll gap-4 hover:[animation-play-state:paused]">
          {row1.map((sector, i) => (
            <div
              key={i}
              className="group px-5 py-2.5 rounded-full bg-white border border-slate-200 flex items-center gap-3 cursor-default whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300 shadow-sm"
            >
              <sector.icon
                size={16}
                className="text-slate-600 group-hover:text-brand-orange transition-colors"
              />
              <span className="font-medium text-slate-800 text-sm group-hover:text-slate-900 transition-colors">
                {sector.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-max animate-scroll-reverse gap-4 hover:[animation-play-state:paused]">
          {row2.map((sector, i) => (
            <div
              key={i}
              className="group px-5 py-2.5 rounded-full bg-white border border-slate-200 flex items-center gap-3 cursor-default whitespace-nowrap hover:bg-brand-orange/10 hover:border-brand-orange/50 transition-all duration-300 shadow-sm"
            >
              <sector.icon
                size={16}
                className="text-slate-600 group-hover:text-brand-orange transition-colors"
              />
              <span className="font-medium text-slate-800 text-sm group-hover:text-slate-900 transition-colors">
                {sector.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// --- Break-Even ROI Calculator 2.0 (Laagdrempelig) ---
const ROICalculator = () => {
  const [profitPerJob, setProfitPerJob] = useState(450);
  const costPerMonth = 69; // Assistent Pakket

  const profitLeft = profitPerJob - costPerMonth;
  const isCovered = profitLeft >= 0;
  const costPercentage = Math.min(100, (costPerMonth / profitPerJob) * 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val < 0) val = 0;
    if (val > 10000) val = 10000;
    setProfitPerJob(val);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-slate-200 p-6 md:p-10 relative overflow-hidden group shadow-xl">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
          <Calculator size={14} /> Wat levert het op?
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight tracking-tight text-slate-900">
          Verdien je site snel terug
        </h2>
        <p className="text-base text-slate-600">
          Kwaliteit trekt kwaliteit aan. Bereken wat één goede klus je oplevert.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Simple Input */}
        <div className="space-y-5">
          <label className="block text-lg font-bold text-slate-900 mb-2">
            Wat hou je over aan 1 klus?
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange font-bold text-xl">
              €
            </span>
            <input
              type="number"
              value={profitPerJob}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-t-xl py-4 pl-10 pr-4 text-3xl font-bold text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "Klein", val: 150 },
              { label: "Gemiddeld", val: 450 },
              { label: "Groot", val: 1500 },
            ].map((preset) => (
              <button
                key={preset.val}
                onClick={() => setProfitPerJob(preset.val)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${profitPerJob === preset.val ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-brand-orange/50 hover:text-slate-900"}`}
              >
                {preset.label} (€{preset.val})
              </button>
            ))}
          </div>
        </div>

        {/* Right: The Visual Bar */}
        <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Opbrengst 1e Klus
            </div>
            <div className="text-xl font-bold text-slate-900">
              € {profitPerJob}
            </div>
          </div>

          {/* The Stacked Bar */}
          <div className="h-12 w-full bg-white rounded-xl overflow-hidden flex relative mb-5 ring-1 ring-slate-200">
            {/* Cost Part */}
            <div
              className="h-full bg-brand-orange flex items-center justify-center relative group/cost transition-all duration-500"
              style={{ width: `${costPercentage}%`, minWidth: "40px" }}
            >
              <span className="text-white font-bold text-xs absolute whitespace-nowrap drop-shadow-md">
                €{costPerMonth}
              </span>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-brand-orange font-bold uppercase whitespace-nowrap opacity-0 group-hover/cost:opacity-100 transition-opacity">
                Kosten
              </div>
            </div>

            {/* Profit Part */}
            <div className="h-full flex-1 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center relative group/profit">
              <span className="text-white font-bold text-sm md:text-base drop-shadow-md">
                €{isCovered ? profitLeft : 0}
              </span>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-green-600 font-bold uppercase whitespace-nowrap opacity-0 group-hover/profit:opacity-100 transition-opacity">
                Winst
              </div>
            </div>
          </div>

          {isCovered ? (
            <div className="space-y-3 animate-fade-in">
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                Met slechts{" "}
                <span className="text-brand-orange font-bold">
                  {Math.round(costPercentage)}%
                </span>{" "}
                van je eerste klus is je site betaald.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-blue-500/5 p-2.5 rounded-lg border border-blue-500/10">
                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                <span>
                  De rest van de maand is{" "}
                  <strong className="text-slate-900">pure winst</strong>.
                </span>
              </div>
            </div>
          ) : (
            <div className="text-orange-500 text-sm font-medium animate-pulse">
              Nog €{Math.abs(profitLeft)} nodig om de site te betalen.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState<
    "home" | "privacy" | "terms" | "about"
  >("home"); // TYPE UPDATED
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [currentSource, setCurrentSource] = useState("Website Direct");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (
    page: "home" | "privacy" | "terms" | "about",
    sectionId?: string,
  ) => {
    // TYPE UPDATED
    setActivePage(page);
    setMobileMenuOpen(false);

    if (page === "home" && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to top for new pages like Blog
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLoginClick = () => {
    window.open(GHL_CONFIG.loginUrl, "_blank");
  };

  const openSignup = (source: string) => {
    setCurrentSource(source);
    setShowSignup(true);
  };

  const openContact = (source: string) => {
    setCurrentSource(source);
    setShowContact(true);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-brand-orange/30 min-h-screen">
      {/* Background - Quiet Luxury / Premium Calm */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
        {/* Soft Blue Glow Top Left */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

        {/* Subtle Warm Orange Glow Top Right */}
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-brand-orange/[0.04] blur-[180px] rounded-full pointer-events-none"></div>

        {/* Soft Blue Glow Bottom Right */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      {/* Navbar - Intelligent Scroll - VISIBLE ON ALL PAGES */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled || activePage !== "home" ? "backdrop-blur-xl bg-slate-50/80 border-slate-900/[0.05] py-2" : "bg-transparent border-transparent py-6"}`}
      >
          <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer">
              <Logo onClick={() => navigateTo("home")} />
            </div>

            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              <button
                onClick={() => navigateTo("home", "voordelen")}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:text-brand-orange transition-colors duration-300"
              >
                Voordelen
              </button>
              <button
                onClick={() => navigateTo("home", "hoe-het-werkt")}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:text-brand-orange transition-colors duration-300"
              >
                Hoe het werkt
              </button>
              <button
                onClick={() => navigateTo("home", "prijzen")}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:text-brand-orange transition-colors duration-300"
              >
                Prijzen
              </button>
              {/* NEW: Over ons added to desktop menu */}
              <button
                onClick={() => navigateTo("about")}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:text-brand-orange transition-colors duration-300"
              >
                Over ons
              </button>
              <Button
                onClick={() =>
                  window.open("https://wa.me/31643411427", "_blank")
                }
                variant="primary"
                className="py-2.5 px-6 text-xs uppercase tracking-widest font-bold"
              >
                App om te starten
              </Button>
            </div>

            <button
              className="lg:hidden text-slate-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-24 left-0 w-full bg-slate-50/95 backdrop-blur-xl border-b border-slate-100 p-6 flex flex-col gap-6 animate-slide-up-fade shadow-2xl z-50">
              <button
                onClick={() => navigateTo("home", "voordelen")}
                className="text-slate-800 text-lg font-medium text-left"
              >
                Voordelen
              </button>
              <button
                onClick={() => navigateTo("home", "hoe-het-werkt")}
                className="text-slate-800 text-lg font-medium text-left"
              >
                Hoe het werkt
              </button>
              <button
                onClick={() => navigateTo("home", "prijzen")}
                className="text-slate-800 text-lg font-medium text-left"
              >
                Prijzen
              </button>
              {/* NEW: Over ons added to mobile menu */}
              <button
                onClick={() => navigateTo("about")}
                className="text-slate-800 text-lg font-medium text-left"
              >
                Over Ons
              </button>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open("https://wa.me/31643411427", "_blank");
                }}
                variant="secondary"
                className="w-full justify-center py-4"
              >
                App om te starten
              </Button>
            </div>
          )}
        </nav>

      {/* PAGE ROUTING LOGIC */}
      {activePage === "home" ? (
        <>
          {/* 1. Hero Section */}
          <section className="relative pt-32 pb-24 md:pt-60 md:pb-20 px-4 z-10 min-h-screen flex items-center">
            {/* Full Width Hero Background */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=2000&q=80"
                alt="Vakwerk"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
              {/* Content */}
              <div className="order-2 lg:order-1 relative z-20 text-center lg:text-left">
                {/* Hero ambient glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-orange/10 blur-[80px] rounded-full pointer-events-none opacity-60"></div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] mb-10 backdrop-blur-md hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300 cursor-default"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                  Jouw trotse visitekaartje online
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05] text-balance"
                >
                  Jouw vakwerk verdient een{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600 block mt-2">
                    topwebsite.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg md:text-xl text-slate-600 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light relative z-10"
                >
                  Jouw online showroom op maat. Een eenmalige investering,
                  lokaal vindbaar en perfect beheerd.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center lg:justify-start items-center relative z-10"
                >
                  <Button
                    onClick={() =>
                      window.open("https://wa.me/31643411427?text=" + encodeURIComponent("Hoi Folkert, ik wil de online mogelijkheden voor mijn bedrijf bespreken."), "_blank")
                    }
                    variant="secondary"
                    className="px-6 py-4 h-auto w-full sm:w-auto shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:shadow-[0_0_70px_rgba(249,115,22,0.6)] border-brand-orange/50 !flex-row !items-center !gap-3 rounded-full"
                  >
                    <span className="text-base font-bold">
                      Stuur direct een appje
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </motion.div>
              </div>

              {/* Phone Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 0.9, rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                className="relative h-[400px] md:h-[550px] w-full flex items-center justify-center order-1 lg:order-2 mt-8 md:mt-0 perspective-1000"
              >
                {/* Backing Glow behind phone - WARM ORANGE now to match branding */}
                <div className="absolute inset-0 bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse-slow"></div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-20 transform transition-transform duration-500 hover:rotate-y-0"
                >
                  <InteractivePhoneHero />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* 5. Modern USPs (Waarom Klusvol) */}
          <Section
            id="voordelen"
            className="bg-slate-50 relative overflow-hidden"
          >
            {/* Background wow effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-20 text-center">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Waarom Klusvol
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
                  Wij snappen jouw vak.
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl font-light mx-auto">
                  Geen marketing-prietpraat of ingewikkelde procedures. Gewoon
                  een strakke site die voor jou werkt, geregeld door mensen die
                  meedenken.
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <InteractiveUSPs />
              </div>
            </div>
          </Section>

          {/* 3.5 Vakwerk Showcase & Target Audience */}
          <div className="bg-slate-50 border-t border-slate-100">
            <Section className="!pb-0 md:!pb-0">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Ons Vakwerk
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Trots op je online visitekaartje.
                </h2>
                <p className="text-lg text-slate-600 font-light">
                  Wij spreken de taal van de bouw. Bekijk wat we voor collega's
                  hebben gemaakt.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
                {[
                  {
                    media:
                      "https://assets.cdn.filesafe.space/UMBYqC3d2lb9GmvTCMc4/media/69ce1f3335c728284fc0c22e.mp4",
                    isVideo: true,
                    title: "Hoekstra Sprayworks",
                    link: "https://hoekstrasprayworks.nl",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1625585598750-3535fe40efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNzQ4Mjd8MHwxfHNlYXJjaHwxOHx8bWluaW1hbCUyMGludGVyaW9yfGVufDB8fHx8MTc3MTk1MTM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
                    title: "Stukadoorsbedrijf Hessels",
                    link: "https://stukadoorsbedrijfhessels.nl/",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative flex flex-col items-center"
                  >
                    <a
                      href={item.link || "#"}
                      target={item.link ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="block w-full relative cursor-pointer"
                    >
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 aspect-[4/3] border border-slate-200">
                        {item.isVideo ? (
                          <video
                            src={item.media}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                          <h3 className="font-bold text-white text-xl md:text-2xl mb-4 drop-shadow-md">
                            {item.title}
                          </h3>
                          <div className="overflow-hidden">
                            <span className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              Bekijk Live Site <ArrowRight size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* 6. Target Audience */}
            <div className="pb-16">
              <SectorSection />
            </div>
          </div>

          {/* 7. How It Works */}
          <Section
            id="hoe-het-werkt"
            className="border-t border-slate-100 bg-gradient-to-b from-white to-brand-orange/[0.02] relative overflow-hidden"
          >
            {/* Subtle Oranje Glow Background Elements */}
            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-brand-orange/[0.03] blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-brand-orange/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <InteractiveSteps />
            </div>
          </Section>

          {/* 8. Pricing */}
          <Section
            id="prijzen"
            className="relative bg-slate-50 overflow-hidden"
          >
            {/* Spatial Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Eerlijke Deal
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Een partnerschap, geen software-abonnement.
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                  Kies het fundament dat bij je past. Geen verborgen kosten,
                  geen addertjes onder het gras.
                </p>
              </div>

              {/* Fundament (Hoofdblok) */}
              <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
                <div className="relative bg-white/60 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)]">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-brand-orange/10 transition-colors duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6 self-start">
                      <Crown size={14} /> DE BASIS
                    </div>

                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
                      Klusvol Website
                    </h3>

                    {/* NEW Price Anchor block with visual */}
                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/80 border border-slate-100 shadow-sm rounded-[2rem] p-6 md:p-8">
                      <div className="flex flex-col">
                        <h4 className="text-brand-orange font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                          <Trophy size={14} /> Investering in Vakmanschap
                        </h4>
                        <div className="text-slate-900 font-extrabold text-2xl mb-1 tracking-tight">
                          Bouwkosten: € 1.500,-
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                          € 69,-{" "}
                          <span className="text-lg text-slate-500 font-medium tracking-normal">
                            /mnd
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-6">
                          voor hosting, techniek en beheer.
                        </p>
                        <div className="mt-2 text-sm text-slate-700 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm leading-relaxed relative">
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-orange rounded-full"></div>
                          <span className="block font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-brand-orange" />
                            Onze garantie:
                          </span>
                          Zie je na 90 dagen geen resultaat? Dan storten we 3 maanden aan beheerkosten direct terug. Samen nemen we het risico.
                        </div>
                      </div>
                      <div className="relative z-10 w-full h-full min-h-[240px]">
                        <PricingShowcaseSlider />
                      </div>
                    </div>

                    {/* What you get instead of preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-t border-slate-100 pt-8">
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Premium Showroom op maat
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Een professionele en betrouwbare uitstraling waar je
                          trots op kunt zijn. Geen standaard templates.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Ondersteunende App
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Alle aanvragen via één app direct in je broekzak. Snel
                          de beste klussen eruit vissen.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Hosting & Beheer
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Wij regelen verbinding, veiligheid én blokkeren
                          ongewenste aanvragen via een klantfilter.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button
                        onClick={() =>
                          window.open("https://wa.me/31643411427", "_blank")
                        }
                        className="w-full sm:w-auto py-6 px-10 text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] bg-brand-orange hover:bg-orange-600 rounded-full font-bold"
                      >
                        App Folkert voor een partnerschap
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Groeipaden (Opties) */}
              <div className="max-w-5xl mx-auto pt-10">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight flex justify-center items-center gap-3">
                    Kies je Groeipad
                  </h3>
                  <p className="text-lg text-slate-600 max-w-xl mx-auto">
                    Vóórdat we live gaan of wanneer je planning klaar is voor
                    extra naamsbekendheid.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Option 1 */}
                  <div className="group relative bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-blue-200 rounded-[2rem] p-6 md:p-8 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg flex flex-col items-start text-left">
                    <div className="flex flex-col items-start mb-2">
                      <div className="font-bold text-xl text-slate-900 transition-colors mb-2">
                        Vindbaar in de regio
                      </div>
                      <div className="font-black text-3xl text-slate-900 transition-colors">
                        + € 249,-{" "}
                        <span className="text-sm text-slate-500 font-medium">
                          /mnd
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 font-medium italic mb-6">
                      Voor de vakman die op lange termijn goed vindbaar wil zijn in Google.
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-4 flex-1">
                      <div className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">
                          Wat krijg je?
                        </span>
                        10 Regio-pagina's, ca. 100 SEO backlinks, Google Business profiel optimalisatie en focus op lokale SEO dominantie.
                      </div>
                    </div>
                    <div className="pt-6 mt-auto">
                      <Button
                        variant="link"
                        className="px-0 h-auto text-blue-600 font-bold text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            "https://wa.me/31643411427?text=" + encodeURIComponent("Ik heb interesse in het pakket: Vindbaar in de regio"),
                            "_blank"
                          );
                        }}
                      >
                        App 'Vindbaar'{" "}
                        <ArrowRight
                          size={16}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="group relative bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-brand-orange/30 rounded-[2rem] p-6 md:p-8 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg flex flex-col items-start text-left">
                    <div className="flex flex-col items-start mb-2">
                      <div className="font-bold text-xl text-slate-900 transition-colors mb-2">
                        Direct meer werk
                      </div>
                      <div className="font-black text-3xl text-slate-900 transition-colors">
                        + € 249,-{" "}
                        <span className="text-sm text-slate-500 font-medium">
                          /mnd
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 font-medium italic mb-6">
                      Voor de vakman die direct leads wil en deze kraan zelf aan en uit wil zetten.
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-4 flex-1">
                      <div className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">
                          Wat krijg je?
                        </span>
                        Beheer van Google garantiesystemen. Je staat direct bovenaan met een officieel vinkje.
                      </div>
                      <div className="text-xs text-orange-900/80 bg-brand-orange/5 p-3 rounded-xl leading-relaxed mt-4">
                        * Exclusief advertentiekosten (gemiddeld € 15,- tot € 35,- per lead).
                      </div>
                    </div>
                    <div className="pt-6 mt-auto">
                      <Button
                        variant="link"
                        className="px-0 h-auto text-brand-orange font-bold text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            "https://wa.me/31643411427?text=" + encodeURIComponent("Ik heb interesse in het pakket: Direct meer werk"),
                            "_blank"
                          );
                        }}
                      >
                        App 'Direct Werk'{" "}
                        <ArrowRight
                          size={16}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="group relative bg-gradient-to-b from-brand-orange/[0.05] to-white/80 backdrop-blur-xl hover:bg-white border border-brand-orange/30 hover:border-brand-orange/50 rounded-[2rem] p-6 md:p-8 transition-all duration-500 shadow-[0_10px_40px_rgba(249,115,22,0.1)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] overflow-hidden flex flex-col md:-translate-y-2 z-10 w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-brand-orange/30 transition-colors"></div>

                    <div className="flex flex-col items-start mb-2 relative z-10">
                      <div className="font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                        De Regio-Knal{" "}
                        <Zap
                          size={20}
                          className="fill-brand-orange/20 text-brand-orange"
                        />
                      </div>
                      <div className="font-black text-4xl text-brand-orange">
                        + € 399,-{" "}
                        <span className="text-sm text-slate-500 font-medium">
                          /mnd
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-brand-orange font-medium italic mb-6 relative z-10">
                      Voor de vakman die de gehele lokale markt wil domineren.
                    </div>

                    <div className="pt-4 border-t border-brand-orange/10 space-y-4 flex-1 relative z-10">
                      <div className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">
                          Wat krijg je?
                        </span>
                        De ultieme combinatie. Structurele organische vindbaarheid (incl. ca. 100 SEO backlinks) mét de kracht van directe leads op commando.
                      </div>
                      <div className="text-xs text-brand-orange/80 bg-brand-orange/5 p-3 rounded-xl leading-relaxed mt-4">
                        * Exclusief advertentiekosten.
                      </div>
                    </div>
                    <div className="pt-6 mt-auto relative z-10">
                      <Button
                        variant="link"
                        className="px-0 h-auto text-brand-orange font-bold text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            "https://wa.me/31643411427?text=" + encodeURIComponent("Ik heb interesse in het pakket: De Regio-Knal"),
                            "_blank"
                          );
                        }}
                      >
                        App 'Regio-Knal'{" "}
                        <ArrowRight
                          size={16}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Guarantee Section */}
              <div className="max-w-4xl mx-auto mt-16 animate-fade-in relative z-20">
                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center shadow-sm border border-brand-orange/10 text-brand-orange">
                    <ShieldCheck size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                      De 100% "Zonder Zorgen" Zichtbaarheidsgarantie
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      Zie je binnen 90 dagen na oplevering geen stijging in je online vindbaarheid of websitebezoekers? Dan storten we 3 maanden lang jouw beheerkosten direct en zonder discussie terug.
                    </p>
                    <div className="mt-4 text-sm text-slate-600">
                      <span className="font-bold text-slate-900">Spelregels:</span> Jij levert tijdig praktijkfoto's aan, vraagt 3 klanten om een review, en geeft ons toegang tot je Google Bedrijfsprofiel. Wij regelen de rest.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 9. ROI Calculator */}
          <Section>
            <ROICalculator />
          </Section>

          {/* 10. FAQ */}
          <Section className="border-t border-slate-100 relative overflow-hidden bg-slate-50">
            {/* Warm Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-brand-orange/[0.03] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-[-100px] w-96 h-96 bg-brand-orange/[0.04] blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 tracking-tight">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <AccordionItem
                  question="Waarom kost een Klusvol website € 1.500,- bouwkosten?"
                  answer="We bouwen geen standaard dertien-in-een-dozijn sites. We leveren een exclusieve, converterende 'online showroom' die droomklanten aantrekt en ruis filtert. Dat is een solide investering in je fundament, géén kostenpost."
                />
                <AccordionItem
                  question="Wat als ik al een domeinnaam heb?"
                  answer="Geen probleem. We kunnen je bestaande domeinnaam eenvoudig via DNS koppelen aan het nieuwe, strakke fundament dat we voor je bouwen."
                />
                <AccordionItem
                  question="Hoe werkt de Klant-Filter precies?"
                  answer="We stellen slimme vragen op je website. Bijvoorbeeld: 'Wat is je budget?' of 'Binnen welke regio valt de klus?'. Voldoet een aanvraag niet aan jouw eisen? Dan krijgt de klant automatisch, maar netjes, bericht dat je vol zit."
                />
                <AccordionItem
                  question="Kan ik de website zelf aanpassen?"
                  answer="Kleine tekstuele aanpassingen of nieuwe foto's voeg je eenvoudig door aan ons door te geven via de specifieke WhatsApp support lijn. Wij regelen alle technische en grafische details."
                />
                <AccordionItem
                  question="Zit ik aan een contract vast?"
                  answer="Voor onze techniek, beheer en hosting (€ 69,- /mnd) sluiten we een samenwerking af van 24 maanden. Dit stelt ons in staat om consistent aan een veilige en razendsnelle website te werken die goed scoort op Google."
                />
              </div>
            </div>
          </Section>

          {/* 11. Final CTA */}
          <Section
            className="py-32 relative overflow-hidden bg-slate-50"
            background={
              <>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay border border-slate-100 pointer-events-none"></div>
                {/* Dynamic glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
                <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/10 blur-[150px] rounded-full pointer-events-none opacity-60"></div>
                <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
              </>
            }
          >
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-orange/20 text-brand-orange shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                <Coffee size={36} />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tighter leading-tight drop-shadow-sm">
                Klaar om je plannen te bespreken?
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Onder het genot van een (digitale) bak koffie bespreken we hoe
                we jouw bedrijf online op de kaart zetten. Sluit je aan bij
                nuchtere vakmensen die alleen nog de krenten uit de pap halen.
              </p>
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open("https://wa.me/31643411427?text=" + encodeURIComponent("Hoi Folkert, ik wil de online mogelijkheden voor mijn bedrijf bespreken."), "_blank")
                  }
                  className="px-10 py-5 text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] active:scale-95 transition-all w-full sm:w-auto"
                >
                  Stuur direct een appje{" "}
                  <MessageCircle size={22} className="ml-2" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-4 opacity-80 uppercase tracking-widest font-bold">
                  <span>Helemaal vrijblijvend</span>
                </div>
              </div>
            </div>
          </Section>

          {/* 12. Footer */}
          <footer className="py-20 bg-slate-50 relative overflow-hidden font-light border-t border-slate-200">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-600">
              <div className="col-span-1 md:col-span-1">
                <Logo onClick={() => navigateTo("home")} />
                <p className="mt-6 leading-relaxed">
                  Klusvol helpt vakmensen groeien door onzichtbaar werk uit
                  handen te nemen.
                </p>
              </div>

              <div>
                <h4 className="text-slate-900 font-bold mb-6 tracking-wide">
                  Product
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => navigateTo("home", "voordelen")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Voordelen
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo("home", "hoe-het-werkt")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Hoe het werkt
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo("home", "prijzen")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Prijzen
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-slate-900 font-bold mb-6 tracking-wide">
                  Bedrijf
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => navigateTo("about")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Over Ons
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        window.open("https://wa.me/31643411427", "_blank")
                      }
                      className="hover:text-brand-orange transition-colors"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLoginClick}
                      className="text-slate-900 font-bold hover:text-brand-orange transition-colors flex items-center gap-2"
                    >
                      Inloggen <ArrowRight size={14} />
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-slate-900 font-bold mb-6 tracking-wide">
                  Juridisch
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => navigateTo("privacy")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Privacybeleid
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo("terms")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Algemene Voorwaarden
                    </button>
                  </li>
                  <li>
                    <span className="opacity-50">KVK: 94035202</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p className="text-slate-500">
                &copy; {new Date().getFullYear()} Klusvol. Alle rechten
                voorbehouden.
              </p>
              <div className="flex items-center gap-2 border border-slate-200 bg-white shadow-sm px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-semibold text-slate-700">
                  Systeem Online
                </span>
              </div>
            </div>
          </footer>
        </>
      ) : activePage === "privacy" ? (
        <LegalPage
          title="Privacybeleid"
          content={
            <div className="space-y-6">
              <p>
                Bij Klusvol nemen we jouw privacy serieus. We verwerken
                persoonsgegevens enkel voor het doel waarvoor ze zijn verstrekt.
              </p>
              <h3>1. Gegevens die we verzamelen</h3>
              <p>
                We verzamelen naam, e-mailadres, telefoonnummer en
                bedrijfsgegevens om onze dienst te kunnen leveren.
              </p>
              <h3>2. Hoe we gegevens gebruiken</h3>
              <p>
                Om je account in te richten, facturen te sturen en contact op te
                nemen voor support.
              </p>
              <p>...</p>
            </div>
          }
          onBack={() => navigateTo("home")}
        />
      ) : activePage === "terms" ? (
        <LegalPage
          title="Algemene Voorwaarden"
          content={
            <div className="space-y-6">
              <p>
                Op alle diensten van Klusvol zijn deze voorwaarden van
                toepassing.
              </p>
              <h3>1. Definities</h3>
              <p>Klusvol: de gebruiker van deze algemene voorwaarden...</p>
              <h3>2. Toepasselijkheid</h3>
              <p>Deze voorwaarden zijn van toepassing op ieder aanbod...</p>
              <p>...</p>
            </div>
          }
          onBack={() => navigateTo("home")}
        />
      ) : (
        <AboutPage
          onBack={() => navigateTo("home")}
          onCta={() => openContact("Koffie Afspraak - About Page")}
        />
      )}

      {/* GLOBAL MODALS */}
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        source={currentSource}
      />
      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        source={currentSource}
      />

      {/* GLOBAL CHATBOT */}
      <Chatbot />
    </div>
  );
}

export default App;
