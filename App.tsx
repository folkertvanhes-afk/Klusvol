import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "motion/react";
import InteractivePhoneHero from "./components/InteractivePhoneHero";
const Chatbot = React.lazy(() => import("./components/Chatbot"));
const AboutPage = React.lazy(() => import("./components/AboutPage")); // IMPORT ADDED
const CaseStudyPage = React.lazy(() => import("./components/CaseStudyPage"));
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
  Filter,
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
  AppWindow,
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
      "bg-white text-slate-900 hover:bg-[#FAF9F6] shadow-sm border border-slate-200 hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]",
    secondary:
      "bg-brand-orange text-white hover:bg-orange-600 shadow-md shadow-brand-orange/20 border border-brand-orange hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
    outline:
      "border border-slate-200 text-slate-700 hover:bg-[#FAF9F6] hover:border-brand-orange/50 hover:text-brand-orange",
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
    <img fetchPriority="high" decoding="async"       src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696d28a4e125efc1200fd25c.png"
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
        className="absolute inset-0 bg-[#FAF9F6]/95 backdrop-blur-2xl transition-opacity duration-500"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl bg-[#FAF9F6] border border-slate-200 rounded-3xl md:rounded-[2.5rem] shadow-[0_0_100px_rgba(249,115,22,0.05)] animate-scale-up flex flex-col md:flex-row max-h-[90vh] md:max-h-none md:min-h-[650px] group overflow-y-auto md:overflow-visible">
        {/* Border Glow */}
        <div className="absolute inset-0 border border-brand-orange/10 rounded-3xl md:rounded-[2.5rem] pointer-events-none sticky top-0"></div>

        {/* Left Side: Premium Context OR Contact Details */}
        <div className="w-full md:w-[45%] bg-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

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
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shrink-0 group-hover/link:border-brand-orange/30 transition-all">
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
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shrink-0 group-hover/link:border-brand-orange/30 transition-all">
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
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shrink-0">
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
                <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shrink-0 group-hover/item:border-brand-orange/30 transition-all duration-300">
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
                <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shrink-0 group-hover/item:border-brand-orange/30 transition-all duration-300">
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
        <div className="flex-1 p-6 md:p-12 relative flex flex-col justify-center bg-[#FAF9F6]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-[#FAF9F6] text-slate-500 hover:text-slate-900 transition-colors z-50"
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
                className="w-full max-w-xs border-slate-200 hover:bg-[#FAF9F6]"
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
                      className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
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
                      className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
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
                      className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
                      placeholder="Emailadres"
                    />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
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
                      className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all placeholder-blue-300/50 text-sm md:text-base"
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
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all resize-none placeholder-blue-300/50 text-sm md:text-base"
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
                      : "border-slate-200 bg-[#FAF9F6]"
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
        className="absolute inset-0 bg-[#FAF9F6]/95 backdrop-blur-md transition-opacity duration-500"
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
                  className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Emailadres"
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Mobiel nummer"
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-orange/50 focus:bg-slate-100 transition-all"
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
              <div className="relative w-full max-w-sm h-52 bg-[#FAF9F6] border border-slate-200 rounded-2xl overflow-hidden shadow-2xl group flex flex-col p-6 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="flex justify-between items-start z-10 mb-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-center shadow-inner">
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
                  <div className="bg-[#FAF9F6] border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
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
      className="absolute w-4/5 bg-[#FAF9F6] border border-red-500/30 rounded-lg p-2 flex justify-between items-center opacity-50"
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
        className="absolute -bottom-2 -right-2 bg-[#FAF9F6] rounded-full p-1 border border-emerald-500/50"
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
          : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-[#FAF9F6] border-slate-100 hover:border-brand-orange/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.05)]"
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
      "text-slate-900 bg-[#FAF9F6] border-slate-200 group-hover:bg-slate-100",
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
                ${isHovered ? activeColorClass : "bg-[#FAF9F6] border-slate-100 text-slate-500"}
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
      title: "Jij timmert, ik regel de rest",
      desc: "Geen avonduren meer achter de laptop. Jij doet het vakwerk, ik werk aan je online aanwezigheid.",
      icon: Hammer,
      color: "text-amber-600",
      bgBase: "bg-amber-600",
    },
    {
      num: "02",
      title: "Kies de klussen die je wilt",
      desc: "De site werkt als een filter. Ontvang alleen serieuze aanvragen uit de regio, zonder de ruis.",
      icon: Filter,
      color: "text-brand-orange",
      bgBase: "bg-brand-orange",
    },
    {
      num: "03",
      title: "Alles kortgesloten op je telefoon",
      desc: "Nieuwe klussen komen overzichtelijk binnen op je telefoon. Geen losse notities en briefjes meer.",
      icon: Smartphone,
      color: "text-amber-700",
      bgBase: "bg-amber-700",
    },
    {
      num: "04",
      title: "Snel schakelen via WhatsApp",
      desc: "Geen eindeloze ticketsystemen. Heb je een aanpassing op je site nodig? Stuur me gewoon een appje.",
      icon: MessageSquare,
      color: "text-stone-700",
      bgBase: "bg-stone-700",
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
            animate={{ flex: isActive ? 6 : 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer flex flex-col justify-end p-8 md:p-10 border transition-colors duration-500 ${
              isActive
                ? "border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                : "border-slate-100 bg-white shadow-sm hover:border-brand-orange/30 hover:bg-[#FAF9F6]/80"
            }`}
          >
            {/* Background Grain */}
            <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay ${isActive ? 'block' : 'hidden'}`}></div>
            
            {/* Color Glow */}

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between w-full mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${isActive ? `${usp.bgBase}/10 ${usp.color} border border-${usp.bgBase}/20 scale-110` : `${usp.bgBase}/5 ${usp.color} opacity-70 border border-slate-100 scale-100`}`}>
                  <usp.icon size={26} />
                </div>
                <div className={`text-5xl md:text-6xl font-black leading-none transition-all duration-500 ${isActive ? 'text-slate-100' : 'text-slate-100 opacity-60'}`}>
                  {usp.num}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end items-start relative w-full h-full lg:min-h-[160px]">
                
                {/* Horizontal / Active content */}
                <div className={`transition-all duration-500 ease-out flex flex-col justify-end w-full ${isActive ? 'opacity-100 translate-x-0 lg:absolute lg:bottom-0 lg:left-0' : 'opacity-100 lg:opacity-0 lg:-translate-x-4 lg:absolute lg:bottom-0 lg:left-0 lg:pointer-events-none'}`}>
                  <h3 className={`font-bold text-slate-900 mb-4 whitespace-normal lg:whitespace-nowrap transition-all duration-500 ${isActive ? 'text-2xl md:text-3xl' : 'text-lg lg:text-2xl'}`}>
                    {usp.title}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all w-full duration-500 ease-in-out ${isActive ? 'max-h-[200px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                    <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed min-w-[250px] whitespace-normal">
                      {usp.desc}
                    </p>
                  </div>
                </div>

                {/* Vertical / Inactive content (only on desktop) */}
                <h3 className={`hidden lg:block font-bold text-lg text-slate-800 whitespace-nowrap absolute bottom-0 left-0 -rotate-90 origin-bottom-left translate-x-3 transition-all duration-500 ease-out ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  {usp.title}
                </h3>
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
    desc: "Jij vertelt wat je doet. Ik maak een plan.",
    fullDesc: "Jij vertelt wat je doet. Ik maak een plan.",
    icon: Paintbrush,
  },
  {
    title: "Ik bouw je site",
    desc: "Geen templates, maatwerk voor jouw klusbedrijf.",
    fullDesc:
      "Geen templates, maatwerk voor jouw klusbedrijf.",
    icon: ShieldCheck,
  },
  {
    title: "Website Live",
    desc: "Vanaf nu filtert je site de goede klussen eruit.",
    fullDesc: "Vanaf nu filtert je site de goede klussen eruit.",
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
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#FAF9F6]"></div>
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
                    ? "#FFFFFF"
                    : "rgba(0,0,0,0)",
                  borderColor: isActive
                    ? "rgba(249,115,22,0.3)"
                    : "transparent",
                  boxShadow: isActive
                    ? "0 10px 30px -10px rgba(0,0,0,0.05)"
                    : "none",
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
                                            : "bg-[#FAF9F6] border-slate-100 text-slate-500 hover:bg-white"
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

      <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full flex items-center justify-center">
        {/* Updated Glow to Warm/Orange */}

        <div className="relative z-10 w-full max-w-2xl aspect-[3/2] bg-white border border-slate-200 shadow-sm hover:shadow-md rounded-3xl md:rounded-[3rem] p-3 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden hover:border-brand-orange/30">
          <motion.div
            animate={{
              opacity: activeStep === 0 ? 1 : 0,
              scale: activeStep === 0 ? 1 : 0.9,
              y: activeStep === 0 ? 0 : 20,
              filter: activeStep === 0 ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-3 md:p-6"
          >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img loading="lazy" decoding="async"                 src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/6a0de56d0b9f75f8b3387e52.png"
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
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-3 md:p-6"
          >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img loading="lazy" decoding="async"                 src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/6a0de56907a34aa07f7f3ed7.png"
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
            className="absolute flex flex-col items-center gap-6 pointer-events-none w-full h-full p-3 md:p-6"
          >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
              <img loading="lazy" decoding="async"                 src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/6a0de5700b9f75f8b3387eae.png"
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
  { icon: Layers, label: "Stukadoors" },
  { icon: Trees, label: "Hoveniers" },
  { icon: Grid, label: "Tegelzetters" },
  { icon: Key, label: "Deur- en slotenmakers" },
];

const sectorsRow2 = [
  { icon: AppWindow, label: "Ramen en kozijnen" },
  { icon: Droplets, label: "Loodgieters" },
  { icon: Zap, label: "Installateurs" },
  { icon: Hammer, label: "Klusbedrijven" },
  { icon: Armchair, label: "Meubelmakers" },
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
    <div className="bg-[#FAF9F6] text-slate-900 font-sans overflow-x-hidden selection:bg-brand-orange/30 min-h-screen">
      {/* Background - Warm, Ambachtelijk met Focus op Oranje */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#FAF9F6] via-[#F6F4EE] to-[#FFF3E6] flex items-center justify-center">
        {/* Subtle Textural Grid */}
        

        {/* Pulsing Warm Orange Glow Top Right (Primary Highlight) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-brand-orange blur-[200px] rounded-full pointer-events-none"
        ></motion.div>

        {/* Soft Warm Grey Glow Bottom Left */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] left-[-15%] w-[900px] h-[900px] bg-[#E8E6E1] blur-[150px] rounded-full pointer-events-none"
        ></motion.div>

        {/* Subtle Warm Highlight Center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-amber-500 blur-[180px] rounded-full pointer-events-none"
        ></motion.div>

        {/* Noise Overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      {/* Navbar - Intelligent Scroll - VISIBLE ON ALL PAGES */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled || activePage !== "home" ? "backdrop-blur-xl bg-[#FAF9F6]/80 border-slate-900/[0.05] py-2" : "bg-transparent border-transparent py-6"}`}
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
                Over mij
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
            <div className="lg:hidden absolute top-24 left-0 w-full bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-slate-100 p-6 flex flex-col gap-6 animate-slide-up-fade shadow-2xl z-50">
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
                Over mij
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
                fetchPriority="high"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/80 via-[#FAF9F6]/95 to-[#FAF9F6]"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
              {/* Content */}
              <div className="order-2 lg:order-1 relative z-20 text-center lg:text-left">
                {/* Hero ambient glow behind text */}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FAF9F6] border border-slate-200 text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] mb-10 backdrop-blur-md hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300 cursor-default"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                  Speciaal voor klusbedrijven in Nederland
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.05] text-balance"
                >
                  Jouw vakwerk verdient een{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600 block mt-2">
                    strakke website.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light relative z-10"
                >
                  Klusvol bouwt websites voor vakmannen in Nederland vanaf € 1.500,- eenmalig plus € 69,- per maand.
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
            className="relative overflow-hidden"
          >
            {/* Background wow effects */}

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-20 text-center">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Waarom Klusvol
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
                  Een website die net zo goed is als jouw vakwerk.
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl font-light mx-auto">
                  Geen wachttijden, geen ingewikkelde verkooppraatjes. Ik bouw, jij belt of appt als er iets moet veranderen.
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <InteractiveUSPs />
              </div>
            </div>
          </Section>

          {/* 3.5 Vakwerk Showcase & Target Audience */}
          <div className="border-t border-slate-100">
            <Section className="!pb-0 md:!pb-0">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Ons Vakwerk
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Trots op je online visitekaartje.
                </h2>
                <p className="text-lg text-slate-600 font-light">
                  Bekijk de websites van vakmensen in Nederland.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
                {[
                  {
                    media:
                      "https://assets.cdn.filesafe.space/UMBYqC3d2lb9GmvTCMc4/media/69ce1f3335c728284fc0c22e.mp4",
                    isVideo: true,
                    title: "Hoekstra Sprayworks",
                    subtitle: "Spuiterij, klant sinds maart 2026",
                    link: "https://hoekstrasprayworks.nl",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1625585598750-3535fe40efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNzQ4Mjd8MHwxfHNlYXJjaHwxOHx8bWluaW1hbCUyMGludGVyaW9yfGVufDB8fHx8MTc3MTk1MTM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
                    title: "Stukadoorsbedrijf Hessels",
                    subtitle: "Stukadoorsbedrijf, klant sinds april 2026",
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
                          <h3 className="font-bold text-white text-xl md:text-2xl mb-1 drop-shadow-md">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-sm text-slate-300 font-medium mb-4 drop-shadow-md">
                              {item.subtitle}
                            </p>
                          )}
                          {!item.subtitle && <div className="mb-4"></div>}
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
              <div className="flex justify-center mt-12 w-full">
                {/* <Button
                  onClick={() => navigateTo("cases")}
                  variant="outline"
                  className="inline-flex w-auto mt-4"
                >
                  Bekijk uitgebreide cases en cijfers
                </Button> */}
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
            className="border-t border-slate-100 relative overflow-hidden"
          >
            {/* Subtle Oranje Glow Background Elements */}

            <div className="relative z-10">
              <InteractiveSteps />
            </div>
          </Section>

          {/* 7.5 Google Reviews */}
          <Section className="border-t border-slate-100 relative overflow-hidden">

            <div className="max-w-6xl mx-auto relative z-10 px-4">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full text-sm font-bold text-slate-800 mb-6">
                  Uitstekend
                  <div className="flex gap-0.5 text-amber-400">
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                  </div>
                  <span className="text-slate-400 font-medium">|</span>
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path fill="none" d="M1 1h22v22H1z"/></svg>
                    Reviews
                  </span>
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Vakmensen over Klusvol
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                  Directe reacties van ondernemers met wie ik samenwerk.
                </p>
              </div>

              <div className="relative -mx-4 px-4 w-[calc(100%+2rem)] overflow-hidden py-4">
                
                <motion.div 
                  className="flex gap-6 lg:gap-8 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                >
                {Array(4).fill([
                  {
                    name: "Teun Hoekstra",
                    text: "Wij zijn ontzettend blij met de website die Folkert van Klusvol voor ons schilder- en spuitbedrijf heeft gemaakt. De communicatie is top en Folkert denkt graag met ons mee om het meeste uit de website te behalen.",
                    date: "2026-05-09",
                  },
                  {
                    name: "J Kuipers",
                    text: "Klusvol is een erg fijne partij om mee samen te werken. De lijntjes zijn kort, als ik bel of app wordt het altijd diezelfde werkdag nog opgepakt.",
                    date: "2026-05-14",
                  },
                  {
                    name: "Bart ten Berge",
                    text: "Ideaal dat Folkert altijd beschikbaar is. Ik kan hem altijd even appen of bellen.",
                    date: "2026-05-02",
                  },
                ]).flat().map((review, i) => {
                  const getRelativeTime = (dateString: string) => {
                    const diffInDays = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24));
                    if (diffInDays <= 0) return "vandaag";
                    if (diffInDays === 1) return "1 dag geleden";
                    if (diffInDays < 7) return `${diffInDays} dagen geleden`;
                    if (diffInDays < 14) return `1 week geleden`;
                    const weeks = Math.floor(diffInDays / 7);
                    if (weeks < 4) return `${weeks} weken geleden`;
                    const months = Math.floor(diffInDays / 30);
                    if (months === 1) return `1 maand geleden`;
                    if (months < 12) return `${months} maanden geleden`;
                    const years = Math.floor(diffInDays / 365);
                    if (years === 1) return `1 jaar geleden`;
                    return `${years} jaar geleden`;
                  };
                  return (
                  <div
                    key={i}
                    className="w-[300px] md:w-[380px] shrink-0 bg-white border border-slate-200 p-8 rounded-[2rem] relative shadow-sm flex flex-col hover:border-brand-orange/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{review.name}</h4>
                        <div className="text-xs text-slate-500 mt-0.5">{getRelativeTime(review.date)}</div>
                      </div>
                      <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path fill="none" d="M1 1h22v22H1z"/></svg>
                    </div>
                    <div className="flex gap-0.5 mb-4 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 leading-relaxed font-light text-sm line-clamp-6">
                      "{review.text}"
                    </p>
                  </div>
                )})}
                </motion.div>
              </div>
            </div>
          </Section>

          {/* 8. Pricing */}
          <Section
            id="prijzen"
            className="relative overflow-hidden"
          >
            {/* Spatial Background Elements */}

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  Eerlijke Deal
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Een partnerschap, geen software-abonnement.
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                  Direct helder. Geen verrassingen voor jou als schilder, timmerman of loodgieter.
                </p>
              </div>

              {/* Fundament (Hoofdblok) */}
              <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
                <div className="relative bg-white/60 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)]">

                  <div className="relative z-10 flex flex-col">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6 self-start">
                      <Crown size={14} /> DE BASIS
                    </div>

                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
                      Klusvol Website
                    </h3>

                    {/* NEW Price Anchor block with visual */}
                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FAF9F6]/80 border border-slate-100 shadow-sm rounded-[2rem] p-6 md:p-8">
                      <div className="flex flex-col">
                        <h4 className="text-brand-orange font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                          <Trophy size={14} /> Helder en doelgericht
                        </h4>
                        <div className="text-slate-900 font-extrabold text-2xl mb-1 tracking-tight">
                          Bouwkosten € 1.500,- eenmalig
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                          € 69,-{" "}
                          <span className="text-lg text-slate-500 font-medium tracking-normal">
                            per maand
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-6">
                          Voor hosting, beheer en support via WhatsApp. 6 maanden proef, daarna automatisch 18 maanden.
                        </p>
                        <div className="mt-2 text-sm text-slate-700 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm leading-relaxed relative">
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-orange rounded-full"></div>
                          <span className="block font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-brand-orange" />
                            100% Geld-Terug-Garantie
                          </span>
                          Niet tevreden met het eerste concept? Je krijgt de eenmalige bouwkosten direct terug. Gegarandeerd.
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
                          Premium Digitaal Visitekaartje
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Een professionele uitstraling op maat. Geen standaard templates, gewoon goed.
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

            </div>
          </Section>

          {/* 9. Over Folkert */}
          <Section className="py-32 relative overflow-hidden">
             {/* Sfeervolle achtergrond (wow effect) */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[600px] max-w-7xl mx-auto pointer-events-none">
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Image side */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-brand-orange/10 transform translate-x-4 translate-y-4 rounded-[2.5rem] -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-200 bg-[#FAF9F6] relative z-10 shadow-xl shadow-brand-orange/5">
                    {/* Foto van Folkert met een vakman werkt beter voor vertrouwen */}
                    <img 
                      src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696cad1dd403b792ebe75574.png" 
                      alt="Folkert in gesprek met een vakman" 
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-8 left-8 text-white opacity-100 drop-shadow-md z-10">
                      <span className="block text-sm font-bold tracking-widest uppercase">Korte Lijnen</span>
                      <span className="block text-xs uppercase tracking-widest mt-1">Direct contact, snelle service</span>
                    </div>
                    {/* Arrow pointing right indicating Folkert */}
                    <motion.div 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute top-[4%] right-[8%] sm:top-[6%] sm:right-[10%] flex flex-col items-center z-10"
                    >
                      <span className="font-extrabold text-white text-sm sm:text-base md:text-lg tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] filter">Dat ben ik</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange mt-1 sm:mt-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] w-6 h-6 sm:w-8 sm:h-8">
                        <path d="M12 4v16"></path>
                        <path d="m18 14-6 6-6-6"></path>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content side */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="max-w-xl"
                >
                  <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                    Webontwikkelaar
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter text-slate-900 leading-[1.1]">
                    Websites voor vakmensen die liever op de bouw staan.
                  </h2>
                  <div className="text-lg text-slate-600 leading-relaxed space-y-6 font-light">
                    <p>
                      Mijn naam is Folkert van Hes, webontwikkelaar uit Haren (Groningen). Ik bouw de website die jouw vakwerk verdient.
                    </p>
                    <p>
                      Ik bouw voor schilders, hoveniers en tegelzetters in Nederland die hun tijd liever op de bouw doorbrengen dan achter een laptop. Vaste prijs, strak ontwerp, en aanpassingen gooi je gewoon via WhatsApp over de schutting.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Button
                      onClick={() => navigateTo("about")}
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      Lees het hele verhaal
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* 10. FAQ */}
          <Section className="border-t border-slate-100 relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 tracking-tight">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <AccordionItem
                  question="Wat kost een website voor een vakman bij Klusvol?"
                  answer="Klusvol bouwt websites voor vakmannen voor €1.500 eenmalig, plus €69 per maand. De eenmalige bouwkosten zijn voor het ontwerp en de techniek. De €69 per maand is voor de hosting, het beheer en aanpassingen."
                />
                <AccordionItem
                  question="Met welke vakmannen werkt Klusvol mee?"
                  answer="Klusvol bouwt websites voor schilders, stukadoors, hoveniers, tegelzetters, loodgieters, installateurs en klusbedrijven. We werken voornamelijk voor vakmannen in Noord-Nederland. Folkert van Hes kent de sector en spreekt de taal van de bouw."
                />
                <AccordionItem
                  question="Hoe werkt het abonnement bij Klusvol?"
                  answer="Je betaalt €69 per maand voor een all-in service. Hierin zit de hosting, het technische beheer en kleine aanpassingen aan je website. Aanpassingen of nieuwe foto's stuur je simpelweg door via WhatsApp."
                />
                <AccordionItem
                  question="Zit ik aan een contract vast en hoe werkt de proefperiode?"
                  answer="Je start met een proefperiode van 6 maanden. Ben je tevreden? Dan wordt dit automatisch verlengd met 18 maanden. We werken met deze termijn omdat we de eerste twee jaar veel tijd investeren in de fundamenten, doorontwikkeling en het beheer van jouw website."
                />
                <AccordionItem
                  question="Wat is de opzegtermijn na de initiële looptijd?"
                  answer="Na de totale looptijd van 24 maanden heb je een opzegtermijn van 1 maand. Er zitten geen ingewikkelde haken en ogen aan; een appje naar mij is voldoende om op te zeggen."
                />
                <AccordionItem
                  question="Hoe lang duurt het bouwen van een website voor een klusbedrijf?"
                  answer="Het bouwen van een website duurt bij Klusvol gemiddeld tussen de 2 en 4 weken. We hebben een kort overleg voor jouw wensen en zorgen dan dat het digitale visitekaartje snel en goed online staat."
                />
                <AccordionItem
                  question="Waarom kiezen vakmannen voor Klusvol in plaats van een Wix of Squarespace template?"
                  answer="Met een Wix of Squarespace template ben je uren in de avond aan het fröbelen. Bij Klusvol besteed je het bouwen en beheer volledig uit voor een eerlijk bedrag, zodat jij ongestoord vakwerk kunt blijven leveren."
                />
              </div>
            </div>
          </Section>

          {/* 11. Final CTA */}
          <Section
            className="py-32 relative overflow-hidden"
            background={
              <>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay border border-slate-100 pointer-events-none"></div>
                {/* Dynamic glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
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
                Zullen we nuchter een bakkie doen? Ik hoor graag waar jij online naartoe wilt.
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
          <footer className="py-20 relative overflow-hidden font-light border-t border-slate-200">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-600">
              <div className="col-span-1 md:col-span-1">
                <Logo onClick={() => navigateTo("home")} />
                <p className="mt-6 leading-relaxed">
                  Klusvol helpt vakmensen groeien door onzichtbaar werk uit
                  handen te nemen. Vanuit Groningen bouwen wij voor vakmensen in heel Nederland.
                </p>
              </div>

              <div>
                <h4 className="text-slate-900 font-bold mb-6 tracking-wide">
                  Product
                </h4>
                <ul className="space-y-4">
                  {/* <li>
                    <button
                      onClick={() => navigateTo("cases")}
                      className="hover:text-brand-orange transition-colors"
                    >
                      Klantcases
                    </button>
                  </li> */}
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
                      Over mij
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
      ) : activePage === "cases" ? (
        <CaseStudyPage
          onBack={() => navigateTo("home")}
          onCta={() => openContact("Koffie Afspraak - Case Studies")}
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
      <React.Suspense fallback={null}><Chatbot /></React.Suspense>
    </div>
  );
}

export default App;
