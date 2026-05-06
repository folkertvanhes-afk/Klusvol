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
  ChevronRight
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
      title: "Geen marketingpraat",
      desc: "Wij snappen dat je geen behoefte hebt aan duren woorden of ingewikkelde verkooppraatjes. Je wilt gewoon dat je website doet wat het moet doen: de juiste klanten uit jouw regio aantrekken. Punt.",
      icon: Target,
    },
    {
      title: "Persoonlijk & Direct",
      desc: "Geen support-tickets aanmaken of wachten op een helpdesk. Heb je een vraag of wil je iets aanpassen op de site? Je mag mij gewoon appen of bellen. Snel schakelen is voor jou ook het prettigst.",
      icon: Phone,
    },
    {
      title: "Focus op jouw vak",
      desc: "Jij bent ondernemer geworden om fantastisch werk op te leveren, niet om te stoeien met de techniek van een website. Geef het uit handen aan iemand die de bouwwereld snapt, zodat jij je handen vrij hebt.",
      icon: Hammer,
    },
    {
      title: "Eerlijke afspraken",
      desc: "We beloven geen gouden bergen als we dat niet waar kunnen maken. Je weet bij ons vooraf precies wat de bouwkosten zijn en wat je maandelijks betaalt. Geen verrassingen achteraf.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in relative z-10 font-sans">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 bg-white pointer-events-none z-[-1]"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      {/* Navigation */}
      <button
        onClick={onBack}
        className="relative z-20 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors mb-12 group font-medium bg-slate-50 px-5 py-2 rounded-full border border-slate-200"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Terug naar home
      </button>

      {/* Trust & Introduction Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative group z-10 w-full max-w-lg mx-auto lg:max-w-full">
          <div className="absolute inset-0 bg-brand-orange/10 blur-[80px] rounded-full group-hover:bg-brand-orange/20 transition-all duration-700"></div>
          
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
        </div>

        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
             <Wrench size={12} /> Over ons
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Jij levert het vakwerk. <br />
            <span className="text-brand-orange">Wij regelen de rest.</span>
          </h1>
          
          <div className="space-y-5 text-lg text-slate-600 leading-relaxed mb-10 font-light">
            <p>
              Ik ben Folkert, oprichter van Klusvol. Na jaren op de achtergrond van de online wereld te hebben gewerkt, viel me één ding op in de bouw: vakmensen leveren topwerk af, maar hun website laat vaak te wensen over. Of het kost simpelweg te veel tijd en geld om bij te houden.
            </p>
            <p>
              Daarom besloot ik Klusvol te starten. Geen vage bureau-constructies of eenmalige projecten waarbij je daarna aan je lot wordt overgelaten. Wij bieden gewoon een strakke website op basis van een langdurig partnerschap.
            </p>
            <p className="pl-4 border-l-4 border-brand-orange italic bg-slate-50 py-4 pr-4 rounded-r-xl text-slate-800 font-medium shadow-sm">
              "We beschouwen onszelf als jouw onzichtbare collega voor alles wat met online te maken heeft."
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> Heldere taal
             </div>
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> 100% Ontzorging
             </div>
             <div className="bg-white border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700">
               <CheckCircle2 size={18} className="text-brand-orange" /> Jarenlange ervaring
             </div>
          </div>
        </div>
      </div>

      {/* Interactive Values Section */}
      <div className="max-w-5xl mx-auto mb-24 lg:mb-32 bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row relative z-10">
         <div className="w-full md:w-2/5 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-2">
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
         <div className="w-full md:w-3/5 p-8 md:p-14 flex items-center bg-white relative">
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
      <div className="bg-slate-50 rounded-[3rem] p-8 md:p-14 text-center border border-slate-200 shadow-sm relative overflow-hidden group max-w-4xl mx-auto z-10 transition-shadow duration-700 hover:shadow-[0_20px_60px_rgba(249,115,22,0.05)]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay border border-slate-100 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange shadow-[0_0_30px_rgba(249,115,22,0.1)] group-hover:scale-110 transition-transform duration-500">
            <Coffee size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Klaar voor meer zekerheid?
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed mb-10">
            Laten we even bellen of appen. Ik luister graag naar je plannen en vertel je eerlijk of wij je daarbij kunnen helpen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href="https://wa.me/31643411427"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <MessageCircle size={20} /> Stuur een appje
            </a>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-brand-orange/20"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AboutPage;
