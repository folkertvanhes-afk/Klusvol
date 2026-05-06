import React from 'react';
import { 
    Check, User, MapPin, Phone, MessageCircle, ArrowLeft, 
    Search, Mail, Menu, Star, Camera
} from 'lucide-react';

export const DefaultScreen = () => {
    return (
        <div className="flex flex-col h-full bg-white text-slate-900 font-sans select-none cursor-default relative overflow-hidden">
             {/* Premium Hero Website Look */}
             <div className="absolute inset-0 bg-slate-100">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Hero" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/80"></div>
             </div>
             
             <div className="relative z-10 flex flex-col h-full">
                 <div className="h-14 w-full shrink-0 flex items-center justify-between px-6 pt-4">
                     <div className="font-bold text-white tracking-tight">VAKWERK.</div>
                     <Menu size={20} className="text-white" />
                 </div>
                 
                 <div className="px-6 pt-12 pb-8 text-center flex-1 flex flex-col justify-center">
                     <h1 className="text-3xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                         Kwaliteit in elke hoek.
                     </h1>
                     <p className="text-sm text-white/90 mb-6 drop-shadow-md">
                         Wij leveren vakwerk dat jarenlang meegaat. Geen praatjes, maar strak resultaat.
                     </p>
                     <div className="bg-brand-orange text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/20 mx-auto px-8">
                         Vraag offerte aan
                     </div>
                 </div>

                 {/* Notification Bubble Overlay */}
                 <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 animate-fade-in z-50">
                     <div className="flex items-start gap-3">
                         <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shrink-0 shadow-inner">
                             <MessageCircle size={20} className="text-white" />
                         </div>
                         <div>
                             <div className="flex items-center justify-between mb-1">
                                 <span className="font-bold text-slate-900 text-sm">Klusvol Assistent</span>
                                 <span className="text-[10px] text-slate-500">Nu</span>
                             </div>
                             <p className="text-slate-800 text-sm font-medium leading-tight">
                                 Nieuwe aanvraag: Badkamer renovatie
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export const ShowroomScreen = () => {
    return (
        <div className="flex flex-col h-full bg-white text-slate-900 font-sans select-none cursor-default relative overflow-hidden">
             {/* Premium Hero Website Look */}
             <div className="absolute top-0 left-0 w-full h-64 bg-slate-100">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Hero" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white"></div>
             </div>
             
             <div className="relative z-10 flex flex-col h-full">
                 <div className="h-14 w-full shrink-0 flex items-center justify-between px-6 pt-4">
                     <div className="font-bold text-white tracking-tight">VAKWERK.</div>
                     <Menu size={20} className="text-white" />
                 </div>
                 
                 <div className="px-6 pt-16 pb-8">
                     <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                         Kwaliteit in elke hoek.
                     </h1>
                     <p className="text-sm text-slate-600 mb-6">
                         Wij leveren vakwerk dat jarenlang meegaat. Geen praatjes, maar strak resultaat.
                     </p>
                     <div className="bg-brand-orange text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/20">
                         Vraag offerte aan
                     </div>
                 </div>

                 <div className="flex-1 bg-white px-6">
                     <div className="flex items-center gap-4 mb-6">
                         <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                                 </div>
                             ))}
                         </div>
                         <div className="text-xs text-slate-500">
                             <div className="flex text-yellow-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                             <span className="font-bold text-slate-900">4.9/5</span> (120 reviews)
                         </div>
                     </div>

                     <div className="space-y-4">
                         <div className="h-24 bg-slate-100 rounded-2xl overflow-hidden relative">
                             <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" alt="Project" className="w-full h-full object-cover" />
                         </div>
                         <div className="h-24 bg-slate-100 rounded-2xl overflow-hidden relative">
                             <img src="https://images.unsplash.com/photo-1504307651254-35680f356f27?w=400&q=80" alt="Project" className="w-full h-full object-cover" />
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export const OntzorgingScreen = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="px-6 mb-6 flex items-center justify-between">
                 <span className="font-bold text-2xl tracking-tight">Techniek</span>
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                     <Check size={16} />
                 </div>
             </div>

             <div className="px-6 space-y-4">
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                         <Check size={18} />
                     </div>
                     <div>
                         <div className="font-bold text-sm">Hosting Actief</div>
                         <div className="text-xs text-slate-500">99.9% Uptime</div>
                     </div>
                 </div>

                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                         <Check size={18} />
                     </div>
                     <div>
                         <div className="font-bold text-sm">SSL Certificaat</div>
                         <div className="text-xs text-slate-500">Beveiligde verbinding</div>
                     </div>
                 </div>

                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                         <Check size={18} />
                     </div>
                     <div>
                         <div className="font-bold text-sm">Updates & Backups</div>
                         <div className="text-xs text-slate-500">Automatisch geregeld</div>
                     </div>
                 </div>
             </div>
             
             <div className="px-6 mt-8">
                 <div className="bg-brand-orange/5 border border-brand-orange/10 p-4 rounded-xl">
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
                             <Check size={16} />
                         </div>
                         <div>
                             <h4 className="font-bold text-brand-darker text-sm">Volledig Ontzorgd</h4>
                             <p className="text-xs text-slate-600 mt-1">Jij focust op je vak, wij op de techniek.</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export const AppScreen = () => {
     return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             {/* Header */}
             <div className="px-6 mb-6 flex items-center justify-between">
                 <span className="font-bold text-2xl tracking-tight">Inbox</span>
                 <div className="flex gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                         <Search size={16} />
                     </div>
                 </div>
             </div>

             {/* Social Integration Icons */}
             <div className="px-6 mb-4 flex justify-between items-center">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gekoppeld</div>
                 <div className="flex gap-2">
                     <div className="w-6 h-6 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]"><MessageCircle size={12} /></div>
                     <div className="w-6 h-6 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]"><span className="font-bold text-[10px]">f</span></div>
                     <div className="w-6 h-6 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2]"><span className="font-bold text-[10px]">in</span></div>
                     <div className="w-6 h-6 rounded-full bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F]"><Camera size={12} /></div>
                 </div>
             </div>

             <div className="px-4 flex-1 overflow-hidden flex flex-col gap-3">
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex gap-4 relative overflow-hidden">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange"></div>
                     <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 relative">
                         <MessageCircle size={20} />
                         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#25D366] rounded-full border-2 border-white flex items-center justify-center">
                             <span className="text-[8px] text-white font-bold">WA</span>
                         </div>
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                             <h3 className="font-bold text-sm">Willem Jansen</h3>
                             <span className="text-[10px] text-slate-400 font-medium">10:42</span>
                         </div>
                         <p className="text-xs text-slate-600 line-clamp-2">Hoi, kunnen jullie volgende week langskomen voor de badkamer? De tegels zijn binnen.</p>
                     </div>
                 </div>

                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex gap-4">
                     <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 relative">
                         <Mail size={20} />
                         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                             <span className="text-[8px] text-white font-bold">@</span>
                         </div>
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                             <h3 className="font-bold text-sm">Aanvraag via Website</h3>
                             <span className="text-[10px] text-slate-400 font-medium">Gisteren</span>
                         </div>
                         <p className="text-xs text-slate-600 line-clamp-2">Nieuwe offerte aanvraag: Dakkapel plaatsen in Utrecht. Budget: €8.000.</p>
                     </div>
                 </div>

                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex gap-4 opacity-70">
                     <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0 relative">
                         <span className="font-bold text-lg">f</span>
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                             <h3 className="font-bold text-sm">Kees (Leverancier)</h3>
                             <span className="text-[10px] text-slate-400 font-medium">Maandag</span>
                         </div>
                         <p className="text-xs text-slate-600 line-clamp-1">De materialen staan klaar.</p>
                     </div>
                 </div>
             </div>
        </div>
     );
}

export const FilterScreen = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none cursor-default">
             <div className="h-14 w-full shrink-0"></div>
             
             <div className="px-6 mb-4 flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                     <ArrowLeft size={16} />
                 </div>
                 <span className="font-bold text-lg">Nieuwe Aanvraag</span>
             </div>

             <div className="px-4 flex-1 overflow-hidden flex flex-col">
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-4 relative overflow-hidden flex-1">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                     
                     <div className="flex items-center gap-4 mb-5 relative z-10">
                         <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-lg font-bold">
                             JD
                         </div>
                         <div>
                             <h2 className="text-lg font-bold text-slate-900">Jan de Vries</h2>
                             <p className="text-xs text-slate-500">Zojuist via website</p>
                         </div>
                     </div>

                     <div className="space-y-3 relative z-10">
                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                             <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Locatie</label>
                             <div className="flex items-center gap-2 text-xs font-medium mt-0.5">
                                 <MapPin size={12} className="text-green-500" />
                                 Amsterdam (Binnen werkgebied)
                             </div>
                         </div>
                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                             <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Budget</label>
                             <div className="flex items-center gap-2 text-xs font-medium mt-0.5">
                                 <Check size={12} className="text-green-500" />
                                 € 5.000 - € 10.000
                             </div>
                         </div>
                         <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                             <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Klus</label>
                             <div className="text-xs font-medium mt-0.5 text-slate-700 line-clamp-2">
                                 Complete badkamer renovatie.
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="bg-green-500 text-white rounded-xl p-4 shadow-lg shadow-green-500/20 mb-6 shrink-0">
                     <div className="flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                             <Check size={16} />
                         </div>
                         <div>
                             <span className="font-bold text-sm">Klant-Filter Geslaagd</span>
                             <p className="text-xs text-green-100 mt-0.5">Klaar om te bellen!</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}