import React, { useEffect } from "react";
import { ArrowLeft, TrendingUp, Search, Calendar, CheckCircle2, MessageCircle, Star } from "lucide-react";
import { motion } from "motion/react";

const CaseStudyPage = ({ onBack, onCta }: { onBack: () => void; onCta: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-orange/[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-brand-orange mb-10 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-brand-orange/30 shadow-sm transition-all duration-300">
            <ArrowLeft size={16} />
          </span>
          <span className="font-medium text-sm">Terug naar home</span>
        </button>

        <div className="mb-12">
          <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Klantcases
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Van onzichtbaar naar een stabiele stroom klantaanvragen.
          </h1>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            De websites van Klusvol zijn gebouwd op één ding: resultaat. Geen urenlange marketing-besprekingen, maar direct online knallen in de regio.
          </p>
        </div>

        {/* Case 1: Hoekstra Sprayworks */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="p-8 md:p-12 border-b border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/[0.05] blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80"
                  alt="Hoekstra Sprayworks"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Hoekstra Sprayworks</h2>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-orange" /> Spuiterij</span>
                  <span className="flex items-center gap-1.5"><Calendar size={16} className="text-blue-500" /> Klant sinds maart 2026</span>
                </div>
                <blockquote className="text-xl text-slate-700 italic border-l-4 border-brand-orange pl-6 my-6 font-light">
                  "Sinds we onze nieuwe site hebben, filtert deze de kleine prutsklusjes en particulieren eruit en krijgen we vooral zakelijke aanvragen binnen. Precies wat we zochten en dat met minimale moeite vanuit onze kant."
                </blockquote>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">+230%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aanvragen per maand</div>
            </div>
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Search size={24} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">Top 3</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Google in eigen regio</div>
            </div>
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">Volledig</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Via WhatsApp beheerd</div>
            </div>
          </div>
        </div>

        {/* Case 2: Hessels Stukadoors */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="p-8 md:p-12 border-b border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/[0.05] blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356f58?w=400&q=80"
                  alt="Hessels Stukadoors"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Hessels Stukadoors</h2>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-brand-orange" /> Stukadoorsbedrijf</span>
                  <span className="flex items-center gap-1.5"><Calendar size={16} className="text-blue-500" /> Klant sinds aug. 2025</span>
                </div>
                <blockquote className="text-xl text-slate-700 italic border-l-4 border-blue-500 pl-6 my-6 font-light">
                  "Folkert legde alles nuchter uit en begreep precies wat wij nodig hadden. De website straalt kwaliteit uit. Als mensen ons nu opzoeken, weten ze direct dat we vakwerk leveren."
                </blockquote>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50">
            <div className="p-8 text-center flex flex-col items-center justify-center">
               <div className="flex gap-1 mb-4 text-brand-orange">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} className="fill-current" />
                  ))}
                </div>
              <div className="text-2xl font-black text-slate-900 mb-1">Vertrouwen</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Met een topsite vallen ze op</div>
            </div>
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">Ontzorgd</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Niet meer uren pielen online</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-4">
              Klaar om mee te doen?
            </h2>
            <p className="text-slate-300 font-light mb-8">
              Laat mij de techniek regelen, dan kun jij je focussen op de bouw. Ik hoor graag waar jij online naartoe wilt.
            </p>
            <button
              onClick={onCta}
              className="px-8 py-4 bg-brand-orange text-white rounded-full font-bold hover:bg-orange-600 transition-colors w-full sm:w-auto shadow-lg shadow-brand-orange/20"
            >
              Ja, ik wil nuchter een bakkie doen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyPage;
