import React, { useEffect } from 'react';
import { ChevronLeft, Hammer, Heart, ShieldCheck, Clock, ArrowRight, User, Star, Zap, CheckCircle2, Unlock, Rocket, MessageCircle, Lock, Moon, FileX, Coffee, Trophy, Phone } from 'lucide-react';

const AboutPage = ({ onBack, onCta }: { onBack: () => void, onCta: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

            {/* Navigation */}
            <button onClick={onBack} className="relative z-20 flex items-center gap-2 text-slate-400 hover:text-brand-orange transition-colors mb-12 group font-medium">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Terug naar home
            </button>

            {/* Hero Section - REDESIGNED */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 relative">
                 {/* Background Glows */}
                 <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none opacity-40"></div>
                 
                 {/* Left Column: Text */}
                 <div className="relative z-10 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[11px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                        <Hammer size={12} /> Onze Missie
                    </div>
                    
                    {/* Updated Typography: Using non-breaking spaces and text-balance to keep phrases together */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1] text-balance">
                        <span className="block">Bouwen zit in je&nbsp;bloed.</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-200 to-white">
                            Boekhouden&nbsp;niet.
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-xl mb-10">
                        Je bent voor jezelf begonnen om mooie dingen te maken, niet om boekhouder te spelen. Daarom heb ik Klusvol gebouwd: om die randzaken van je over te nemen, zodat jij je handen weer vrij hebt voor het echte werk.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 group hover:border-brand-orange/50 transition-colors">
                            <Moon size={16} className="text-brand-orange group-hover:text-white transition-colors" />
                            <span className="group-hover:text-white transition-colors">Avonden weer vrij</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 group hover:border-brand-orange/50 transition-colors">
                            <FileX size={16} className="text-brand-orange group-hover:text-white transition-colors" />
                            <span className="group-hover:text-white transition-colors">Weg met papierwerk</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 group hover:border-brand-orange/50 transition-colors">
                            <Trophy size={16} className="text-brand-orange group-hover:text-white transition-colors" />
                            <span className="group-hover:text-white transition-colors">Alleen topklanten</span>
                        </div>
                    </div>
                 </div>

                 {/* Right Column: Visual Composition */}
                 <div className="relative z-10 order-1 lg:order-2 h-[400px] lg:h-[600px] flex items-center justify-center">
                     {/* Main Image with Gradient Mask */}
                     <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                         <img 
                            src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696cad1dd403b792ebe75574.png"
                            alt="Vakman aan het werk" 
                            className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[20s]"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
                         <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
                     </div>
                 </div>
            </div>

            {/* The DNA Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
                <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-brand-surface to-[#001933] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full group-hover:bg-brand-orange/20 transition-colors"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-orange mb-6 border border-white/5">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Geen software, maar service.</h3>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                            Je hebt geen zin om software te leren. Daarom richten wij alles voor je in. Wij zijn je digitale rechterhand, niet de zoveelste tool waar je niks van snapt.
                        </p>
                    </div>
                </div>

                <div className="col-span-1 bg-brand-surface border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-500 flex flex-col justify-end">
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent"></div>
                     <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Eerlijkheid.</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Klusvol is maandelijks opzegbaar. Als wij geen waarde leveren, verdien jij de vrijheid om te gaan.
                        </p>
                     </div>
                </div>

                <div className="col-span-1 bg-brand-surface border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-500">
                     <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Tijd is Geld.</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Geld kun je altijd weer verdienen. Tijd met je gezin, of gewoon even niks doen, komt nooit meer terug.
                        </p>
                     </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-[#001020] border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                    <div className="relative z-10 flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Gewoon Nederlands.</h3>
                        <p className="text-slate-400">
                            Geen helpdesk in het buitenland. Wij zitten in Groningen en snappen hoe de Nederlandse bouw werkt.
                        </p>
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden -ml-8">
                             <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm -ml-6 shadow-lg border-2 border-brand-dark">
                            +4
                        </div>
                    </div>
                </div>
            </div>

            {/* The Founder Story - Immersive Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-gradient-to-b from-transparent via-brand-orange/50 to-transparent h-3/4 hidden lg:block"></div>
                
                <div className="order-2 lg:order-1 relative lg:pl-12">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="w-8 h-[1px] bg-brand-orange"></span>
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Het Verhaal</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        "Jij bent de specialist in het vakwerk. Ik ben de specialist achter de schermen."
                    </h2>
                    <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed">
                        <p>
                            Ik ben Folkert. Zelf ben ik geen handige klusser, maar ik heb enorm respect voor vakmanschap. Ik zag in mijn omgeving dat goede vakmensen vaak vastlopen in de randzaken.
                        </p>
                        <p>
                            Overdag wordt er gebouwd, maar de administratie blijft liggen tot de avonduren. Terugbellen, offertes maken, planningen rondkrijgen. Het hoort bij ondernemen, maar het hoeft je vrije tijd niet op te eten.
                        </p>
                        <p className="text-white font-medium italic border-l-2 border-brand-orange pl-4">
                            "Dat kan slimmer," dacht ik.
                        </p>
                        <p>
                            Klusvol is ontstaan vanuit de praktijk. Wij nemen het regelwerk over met slimme systemen. Zo doe jij waar jij goed in bent, en doen wij de rest. Gewoon, goed geregeld.
                        </p>
                    </div>
                    
                    <div className="mt-10 pt-10 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <div className="text-white font-serif text-3xl italic">Folkert van Hes</div>
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Oprichter Klusvol</div>
                        </div>
                        {/* UPDATED: Using the same PNG logo as App.tsx */}
                        <img 
                            src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696d28a4e125efc1200fd25c.png" 
                            className="h-12 w-12 object-contain rounded-xl" 
                            alt="Klusvol Logo" 
                        />
                    </div>
                </div>

                <div className="order-1 lg:order-2 relative group">
                    <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-brand-surface shadow-2xl transform-gpu isolation-isolate">
                         {/* HIERONDER JE FOTO VERANDEREN: Vervang de src="..." met jouw eigen URL */}
                         <img 
                            src="https://assets.cdn.filesafe.space/Xn0ouMgD2stq6OuI1a4H/media/696bf4d4b34b64020e600c8b.png"
                            alt="Folkert - Oprichter Klusvol" 
                            className="w-full h-full object-cover opacity-90"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>
                         
                         <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                             <p className="text-white font-medium text-sm italic">
                                 "Mijn doel is niet dat je méér gaat werken. Mijn doel is dat je stopt met werken als je thuiskomt."
                             </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* The "Beloftes" Section */}
            <div className="mb-32">
                <h2 className="text-3xl font-bold text-white mb-10 text-center">De Klusvol Garantie</h2>
                <div className="bg-brand-surface border border-white/5 rounded-3xl p-1 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        {[
                            { title: "Maandelijks Opzegbaar", icon: Unlock },
                            { title: "Gratis Installatie", icon: Rocket },
                            { title: "Persoonlijk Contact", icon: MessageCircle },
                            { title: "100% Privacy", icon: Lock }
                        ].map((item, i) => (
                            <div key={i} className="p-6 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center text-slate-400 mb-3 group-hover:text-brand-orange group-hover:border-brand-orange/30 transition-all">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-sm font-bold text-white">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section - PERSONAL COFFEE INVITE */}
            <div className="bg-gradient-to-br from-brand-surface to-[#001933] rounded-[3rem] p-8 md:p-20 relative overflow-hidden text-center border border-white/5 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 text-brand-orange shadow-lg shadow-brand-orange/10">
                        <Coffee size={36} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Eerst even een bak koffie?
                    </h2>
                    <p className="text-lg text-slate-300 mb-10 font-light leading-relaxed max-w-xl mx-auto">
                        Ik geloof dat een goede samenwerking begint met een persoonlijk gesprek. Ik kom graag vrijblijvend bij je langs om kennis te maken. Gewoon bij jou thuis of even snel op de klus, dan hoef jij de deur niet uit. Liever eerst even bellen? Dat kan natuurlijk ook.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={onCta}
                            className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 active:scale-95 flex items-center gap-3"
                        >
                            Kom maar langs <ArrowRight size={20} />
                        </button>
                        <a 
                            href="tel:0643411427"
                            className="px-8 py-4 rounded-full font-bold text-lg text-slate-400 hover:text-white border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
                        >
                            <Phone size={20} /> Bel Folkert
                        </a>
                    </div>
                    <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-bold opacity-60">
                        Zonder verplichtingen.
                    </p>
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            </div>
        </div>
    );
};

export default AboutPage;