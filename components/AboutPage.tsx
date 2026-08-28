import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Hammer,
  ShieldCheck,
  Target,
  Wrench,
  MessageCircle,
  Coffee,
  CheckCircle2,
  Phone,
  Search,
  ChevronRight,
  User,
  MapPin,
  Quote,
  Star,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const AboutPage = ({
  onBack,
  onCta,
}: {
  onBack: () => void;
  onCta: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    {
      title: "Duidelijke taal",
      desc: "Geen dure woorden of ingewikkelde verkooppraatjes. Jouw website moet doen wat jij nodig hebt: er professioneel uitzien, vertrouwen wekken en waar gewenst klanten aantrekken. Punt.",
      icon: Target,
    },
    {
      title: "Persoonlijk en direct",
      desc: "Geen support-tickets of helpdesk. Een vraag of aanpassing? Je appt of belt me gewoon. Werkt voor ons allebei prettiger.",
      icon: Phone,
    },
    {
      title: "Focus op jouw vak",
      desc: "Jij bent ondernemer geworden om goed werk te leveren, niet om met techniek te stoeien. Geef het uit handen aan iemand die de bouwwereld snapt.",
      icon: Hammer,
    },
    {
      title: "Eerlijke afspraken",
      desc: "Geen gouden bergen die ik niet waar kan maken. Je weet vooraf wat de bouwkosten zijn en wat je maandelijks betaalt. Geen verrassingen.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in relative z-10 font-sans">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-1]"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      {/* Navigation */}
      <button
        onClick={onBack}
        className="relative z-20 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors mb-12 group font-medium bg-white/60 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Terug naar home
      </button>

      {/* Trust & Introduction Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center relative">

        <div className="relative group z-10 w-full max-w-lg mx-auto lg:max-w-full">
          
          <div className="relative flex items-center justify-center h-[400px] md:h-[500px]">
            {/* Background Image (Vakman) */}
            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl rotate-[-4deg] hover:rotate-[-2deg] hover:z-30 hover:scale-105 transition-all duration-500 z-10 cursor-pointer">
               <img
                  src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696cad1dd403b792ebe75574.png"
                  alt="Klusvol in de praktijk"
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-500"
               />
               <div className="absolute inset-0 bg-slate-900/10 hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Foreground Portrait (Folkert) */}
            <div className="absolute top-0 right-0 w-2/3 h-4/5 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl rotate-[3deg] hover:rotate-[1deg] hover:z-30 hover:scale-[1.02] transition-all duration-500 z-20 cursor-pointer">
              <img
                src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696bf4d4b34b64020e600c8b.png"
                alt="Folkert - Oprichter Klusvol"
                loading="lazy"
                className="w-full h-full object-cover filter brightness-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl p-3 md:p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <img
                    src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696d28a4e125efc1200fd25c.png"
                    className="h-10 w-10 object-contain rounded-xl border border-slate-100 bg-white p-1"
                    loading="lazy"
                    alt="Klusvol Logo"
                  />
                  <div>
                    <div className="text-slate-900 font-bold text-sm md:text-base leading-tight">Folkert van Hes</div>
                    <div className="text-slate-500 text-xs md:text-sm font-medium">Jouw online partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Badges below photos */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             whileInView={{ opacity: 1, y: 0 }} 
             viewport={{ once: true, margin: "-50px" }}
             className="flex flex-wrap gap-3 mt-8 md:mt-12 justify-center lg:justify-start"
          >
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> Heldere taal
             </div>
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> 100% Ontzorging
             </div>
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> Jarenlange ervaring
             </div>
          </motion.div>
        </div>

        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
             <Wrench size={12} /> Over mij
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.05]">
            Folkert van Hes <br />
            <span className="text-brand-orange">Jouw online fundament</span>
          </h1>
          
          <div className="space-y-10 text-lg text-slate-600 leading-relaxed mb-16 max-w-2xl font-light text-left">
             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
             >
               Ik ben Folkert, afgestudeerd in ondernemerschap en retailmanagement, en bouw inmiddels 3 jaar websites voor allerlei bedrijven: webshops, coaches, vakmensen. Bij die laatste groep voelde het meteen goed.
             </motion.p>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
             >
               Vakmannen zijn recht voor hun raap. Geen marketingpraatjes, geen omhaal. Ze willen weten wat het kost, wat ze ervoor krijgen en of je doet wat je belooft. Daar werk ik graag mee. En juist deze groep kan mijn hulp goed gebruiken: stikken in het werk, top vakwerk leveren, maar online vaak een rommeltje. Daar zet ik mijn kennis tegenover.
             </motion.p>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               className="font-medium text-slate-800"
             >
               Daarom begon ik Klusvol. Vanuit Haren bouw ik voor vakmensen in heel Nederland. Heldere afspraken, korte lijnen en een strak resultaat. Ik geloof in een samenwerking voor de lange termijn, niet in snelle handel.
             </motion.p>

             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
             >
               Buiten Klusvol vind je me op het voetbalveld, in de sportschool of met een boek of podcast. Vakmanschap aan beide kanten van het scherm.
             </motion.p>
          </div>
        </div>
      </div>

      {/* Quote and Extra Info (Subtle) */}
      <div className="max-w-4xl pt-4 mb-24 z-10 relative">
          <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             whileInView={{ opacity: 1, y: 0 }} 
             viewport={{ once: true, margin: "-50px" }}
             className="border-l-2 border-brand-orange pl-6 md:pl-8 py-2"
          >
             <p className="text-xl md:text-2xl font-light text-slate-800 italic leading-relaxed mb-4">
               "Sinds de website online staat hebben we al veel complimenten gekregen van klanten over hoe strak het eruitziet."
             </p>
             <div className="flex items-center gap-3 text-sm font-bold text-slate-500 uppercase tracking-widest">
               <span className="text-slate-900">Teun en Kim</span>
               <span className="w-1 h-1 bg-brand-orange rounded-full"></span>
               <span>Hoekstra Sprayworks</span>
             </div>
          </motion.div>
      </div>

      {/* Interactive Values Section */}
      <div className="max-w-5xl mx-auto mb-24 lg:mb-32 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row relative z-10">
         <div className="w-full md:w-2/5 md:border-r border-slate-200 p-6 flex flex-col gap-2 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/50 to-transparent pointer-events-none"></div>
            <h3 className="uppercase tracking-widest text-[11px] font-bold text-slate-400 mb-4 pl-4 pt-2 block">Onze Waarden</h3>
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => setActiveTab(idx)}
                className={`text-left px-5 py-4 rounded-2xl font-bold transition-all flex items-center justify-between group ${activeTab === idx ? "bg-white shadow-md text-slate-900 border border-slate-100" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800 border border-transparent"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${activeTab === idx ? "bg-brand-orange/10 text-brand-orange" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"}`}>
                    <tab.icon size={18} />
                  </div>
                  <span>{tab.title}</span>
                </div>
                {activeTab === idx && <ChevronRight size={16} className="text-brand-orange" />}
              </button>
            ))}
         </div>
         <div className="w-full md:w-3/5 p-8 md:p-14 flex items-center bg-white/50 relative">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 transition={{ duration: 0.3 }}
                 className="space-y-6"
               >
                 <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-8 border border-brand-orange/20 shadow-sm">
                    {React.createElement(tabs[activeTab].icon, { size: 32 })}
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                   {tabs[activeTab].title}
                 </h2>
                 <p className="text-lg text-slate-600 leading-relaxed font-light">
                   {tabs[activeTab].desc}
                 </p>
               </motion.div>
            </AnimatePresence>
         </div>
      </div>

      {/* Compact Interactive CTA */}
      <div className="text-center relative max-w-4xl mx-auto z-10 py-12 md:py-20 group">
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-orange/5 rounded-full flex items-center justify-center mb-6 text-brand-orange ring-1 ring-brand-orange/20 shadow-[0_0_30px_rgba(249,115,22,0.05)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] group-hover:bg-brand-orange/10 transition-all duration-500">
            <Coffee size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Even sparren?
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed mb-10">
            Bel of app me. Ik hoor graag waar jij online naartoe wilt en zeg eerlijk of ik je daarbij kan helpen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href="https://wa.me/31643411427"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 duration-300"
            >
              <MessageCircle size={20} /> Stuur mij een appje
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
