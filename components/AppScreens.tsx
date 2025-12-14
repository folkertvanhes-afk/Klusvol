import React from 'react';
import { 
    TrendingUp, Check, Bell, User, Calendar, Star, 
    MapPin, Phone, MessageCircle, ArrowLeft, UserPlus, 
    Clock, Search
} from 'lucide-react';

export const DefaultScreen = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="px-6 pt-2">
                 <div className="flex items-center justify-between mb-8">
                     <div>
                         <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Hoi Mark</div>
                         <h2 className="text-2xl font-bold text-gray-900">Overzicht</h2>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" className="w-full h-full object-cover" alt="Profile"/>
                     </div>
                 </div>

                 {/* Stats Card */}
                 <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-xl mb-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange rounded-full -mr-8 -mt-8 blur-2xl opacity-50"></div>
                     <div className="relative z-10">
                         <div className="flex items-center gap-2 mb-1">
                            <Phone size={14} className="text-brand-orange" />
                            <span className="text-gray-400 text-xs font-medium">Gemiste oproepen</span>
                         </div>
                         <div className="text-3xl font-bold mb-3">3</div>
                         <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                             <div className="h-full bg-brand-orange w-[60%]"></div>
                         </div>
                         <div className="mt-2 text-[10px] text-gray-400">2 automatisch beantwoord</div>
                     </div>
                 </div>

                 <h3 className="font-bold text-gray-900 mb-3 text-sm">Vandaag</h3>
                 <div className="space-y-3">
                     <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                         <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                             <Calendar size={18} />
                         </div>
                         <div>
                             <div className="font-bold text-sm">Dakinspectie</div>
                             <div className="text-xs text-gray-500">14:00 • Utrecht</div>
                         </div>
                     </div>
                     
                     <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                         <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                             <Check size={18} />
                         </div>
                         <div>
                             <div className="font-bold text-sm">Factuur betaald</div>
                             <div className="text-xs text-gray-500">€ 450,00 ontvangen</div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export const LeadScreen = () => {
     return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             {/* Header */}
             <div className="px-6 mb-6 flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                     <ArrowLeft size={16} />
                 </div>
                 <span className="font-bold text-lg">Nieuwe Lead</span>
             </div>

             <div className="px-6 flex-1 overflow-hidden">
                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                     <div className="flex items-center gap-4 mb-6">
                         <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-bold">
                             WJ
                         </div>
                         <div>
                             <h2 className="text-xl font-bold text-gray-900">Willem Jansen</h2>
                             <p className="text-sm text-gray-500">Aangevraagd: 10 min geleden</p>
                         </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3 mb-6">
                         <div className="flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20">
                             <Phone size={16} /> Bellen
                         </div>
                         <div className="flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-xl font-bold text-sm">
                             <MessageCircle size={16} /> Appen
                         </div>
                     </div>
                     
                     <div className="space-y-4">
                         <div>
                             <label className="text-xs font-bold text-gray-400 uppercase">Locatie</label>
                             <div className="flex items-center gap-2 text-sm font-medium mt-1">
                                 <MapPin size={16} className="text-gray-400" />
                                 Amsterdam, Centrum
                             </div>
                         </div>
                         <div>
                             <label className="text-xs font-bold text-gray-400 uppercase">Klus</label>
                             <div className="text-sm font-medium mt-1">
                                 Lekkage aan dakkapel, spoed.
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="bg-brand-orange/5 border border-brand-orange/10 rounded-xl p-4">
                     <div className="flex gap-3">
                         <div className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
                             <Check size={12} />
                         </div>
                         <div className="text-xs text-gray-600">
                             <span className="font-bold text-brand-darker">Auto-reply verstuurd</span>
                             <p className="mt-1">"Hoi Willem, ik zit even op de ladder. Ik bel je over 30 min terug!"</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
     );
}

export const AppointmentScreen = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="px-6 mb-6 flex items-center justify-between">
                 <span className="font-bold text-lg">Agenda</span>
                 <span className="text-sm font-medium text-gray-500">Vandaag</span>
             </div>

             <div className="flex-1 px-4 pb-4 overflow-hidden flex flex-col gap-2">
                 {/* Timeline items */}
                 <div className="flex gap-4 opacity-50">
                     <div className="flex flex-col items-center">
                         <span className="text-xs font-bold text-gray-400 mb-2">09:00</span>
                         <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                         <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-gray-100 flex-1 mb-4 grayscale">
                         <div className="font-bold text-sm line-through">Materiaal inkopen</div>
                         <div className="text-xs text-gray-500">Bouwmaat</div>
                     </div>
                 </div>

                 <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                         <span className="text-xs font-bold text-brand-orange mb-2">14:00</span>
                         <div className="w-3 h-3 rounded-full bg-brand-orange ring-4 ring-brand-orange/20"></div>
                         <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                     </div>
                     <div className="bg-white p-4 rounded-xl border-l-4 border-brand-orange shadow-lg flex-1 mb-4 relative">
                         <div className="absolute top-4 right-4 bg-brand-orange/10 text-brand-orange text-[10px] font-bold px-2 py-1 rounded">
                             VOLGENDE
                         </div>
                         <div className="font-bold text-sm mb-1">Dakinspectie</div>
                         <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                             <MapPin size={12} /> Utrechtseweg 12
                         </div>
                         <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-50">
                             <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">JD</div>
                             <span className="text-xs font-medium">Jan de Vries</span>
                             <div className="ml-auto bg-gray-900 text-white p-1.5 rounded-lg">
                                 <Phone size={12} />
                             </div>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex gap-4 opacity-60">
                     <div className="flex flex-col items-center">
                         <span className="text-xs font-bold text-gray-400 mb-2">16:30</span>
                         <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                         <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-gray-100 flex-1">
                         <div className="font-bold text-sm">Offerte uitwerken</div>
                         <div className="text-xs text-gray-500">Kantoor</div>
                     </div>
                 </div>
             </div>
        </div>
    );
}

export const ReviewScreen = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="bg-white mx-4 mt-4 p-6 rounded-2xl shadow-sm text-center border border-gray-100">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 mb-4 animate-bounce-small">
                     <Star size={32} className="text-yellow-400 fill-yellow-400" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 mb-1">Nieuwe Review!</h2>
                 <p className="text-sm text-gray-500 mb-6">Je hebt een 5-sterren review ontvangen.</p>

                 <div className="bg-gray-50 rounded-xl p-4 text-left relative">
                     <div className="absolute -top-3 left-6 text-gray-300">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 16.0001 9 16.0001 9 16.0001V8.00006H14.017V2.00006H4V16.0001H9V21H14.017ZM24 21L24 18C24 16.8954 23.1046 16 22 16H19V8.00006H24V2.00006H14V16.0001H19V21H24Z" /></svg>
                     </div>
                     <p className="text-sm italic text-gray-700 leading-relaxed relative z-10">
                         "Mark reageerde supersnel toen ik belde voor de lekkage. Dezelfde middag nog opgelost. Echte vakman!"
                     </p>
                     <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                         <span className="text-xs font-bold text-gray-900">- P. Verhoeven</span>
                         <div className="flex gap-0.5">
                             {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
                         </div>
                     </div>
                 </div>
                 
                 <div className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20">
                     Reageren
                 </div>
             </div>
             
             <div className="px-6 mt-8">
                 <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">
                     <span>Score deze maand</span>
                 </div>
                 <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100">
                     <div className="flex items-center gap-3">
                         <div className="text-2xl font-bold text-gray-900">4.9</div>
                         <div className="flex flex-col">
                             <div className="flex gap-0.5">
                                 {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
                             </div>
                             <span className="text-[10px] text-gray-400">Gebaseerd op 24 reviews</span>
                         </div>
                     </div>
                     <TrendingUp size={20} className="text-green-500" />
                 </div>
             </div>
        </div>
    );
}

export const InvoiceScreen = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 text-gray-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="bg-white p-6 pb-8 rounded-b-[2rem] shadow-sm mb-6 text-center">
                 <div className="text-gray-400 text-sm font-medium mb-2">Totaal ontvangen vandaag</div>
                 <div className="text-4xl font-bold text-gray-900 mb-2">€ 1.500,<span className="text-2xl text-gray-400">00</span></div>
                 <div className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                     <TrendingUp size={14} /> +12% t.o.v. vorige week
                 </div>
             </div>
             
             <div className="px-6">
                 <h3 className="font-bold text-gray-900 mb-4">Recente betalingen</h3>
                 <div className="space-y-3">
                      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <Check size={18} />
                              </div>
                              <div>
                                  <div className="font-bold text-sm">Factuur #2024-082</div>
                                  <div className="text-xs text-gray-500">Willem Jansen</div>
                              </div>
                          </div>
                          <div className="font-bold text-gray-900">+ € 1.500</div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between opacity-60">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                  <Check size={18} />
                              </div>
                              <div>
                                  <div className="font-bold text-sm">Factuur #2024-081</div>
                                  <div className="text-xs text-gray-500">Gisteren</div>
                              </div>
                          </div>
                          <div className="font-bold text-gray-900">+ € 450</div>
                      </div>
                 </div>
                 
                 <div className="mt-8 bg-brand-orange/10 border border-brand-orange/20 p-4 rounded-xl">
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
                             <Bell size={16} />
                         </div>
                         <div>
                             <h4 className="font-bold text-brand-darker text-sm">Factuur herinnering</h4>
                             <p className="text-xs text-gray-600 mt-1">Er staat nog 1 factuur open die morgen verloopt. Herinnering sturen?</p>
                             <button className="mt-3 text-xs font-bold text-brand-orange uppercase tracking-wide">
                                 Nu versturen
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};