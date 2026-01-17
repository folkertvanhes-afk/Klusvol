import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, CalendarCheck, Star, ReceiptEuro } from 'lucide-react';
import { AppState, BadgeData } from '../types';
import FloatingBadge from './FloatingBadge';
import { DefaultScreen, LeadScreen, AppointmentScreen, ReviewScreen, InvoiceScreen } from './AppScreens';

const badges: BadgeData[] = [
  {
    id: 'lead',
    category: 'Nieuwe Klant',
    label: 'Willem Jansen',
    icon: <UserPlus size={18} />,
    position: 'md:top-24 md:right-full md:mr-5',
    animationDelay: '1.2s'
  },
  {
    id: 'appointment',
    category: 'Eerstvolgende',
    label: '14:00 Dakinspectie',
    icon: <CalendarCheck size={18} />,
    position: 'md:top-36 md:left-full md:ml-5',
    animationDelay: '1.4s'
  },
  {
    id: 'review',
    category: 'Google Review',
    label: '★★★★★ 5.0',
    icon: <Star size={18} fill="currentColor" />,
    position: 'md:bottom-40 md:right-full md:mr-5',
    animationDelay: '1.6s'
  },
  {
    id: 'invoice',
    category: 'Factuur Betaald',
    label: '+ € 1.500,00',
    icon: <ReceiptEuro size={18} />,
    position: 'md:bottom-24 md:left-full md:ml-5',
    animationDelay: '1.8s'
  }
];

const InteractivePhoneHero = () => {
  const [activeScreen, setActiveScreen] = useState<AppState>('default');
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated: Run loop on mobile as well to show functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const nextIndex = (currentIndexRef.current + 1) % badges.length;
        currentIndexRef.current = nextIndex;
        setActiveScreen(badges[nextIndex].id);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]); // Removed isMobile dependency to allow mobile autoplay

  const handleManualInteraction = (id: AppState) => {
    setIsAutoPlaying(false); // Stop autoplay on interaction
    setActiveScreen(id);
    const index = badges.findIndex(b => b.id === id);
    if (index !== -1) currentIndexRef.current = index;
  };

  const handleMouseEnterContainer = () => setIsAutoPlaying(false);
  const handleMouseLeaveContainer = () => {
     // Restart autoplay on leave
     setIsAutoPlaying(true);
     // Optional: Reset to default or keep current? Let's keep loop running
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'lead': return <LeadScreen />;
      case 'appointment': return <AppointmentScreen />;
      case 'review': return <ReviewScreen />;
      case 'invoice': return <InvoiceScreen />;
      default: return <DefaultScreen />;
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-[340px] md:w-[600px] h-[700px]" 
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
    >
      
      {/* Background Glow Effect - ENHANCED ORANGE LAYERS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] bg-brand-orange/20 blur-[80px] md:blur-[130px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-orange-500/20 blur-[60px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Anchor Container */}
      <div className="relative w-[280px] h-[560px] md:w-[300px] md:h-[600px] shrink-0 z-20 transition-transform duration-500 md:hover:scale-[1.02]">
        
        {/* The Actual iPhone Device 
            UPDATED:
            - Border Color: #002244 (Dark Navy)
            - Shadow: refined to have a subtle orange tint
            - Ring: Added ring-white/10 for metallic edge
        */}
        <div className="absolute inset-0 bg-black rounded-[3rem] border-[8px] border-[#002244] shadow-[0_20px_50px_-10px_rgba(249,115,22,0.15)] overflow-hidden ring-1 ring-white/10 z-10 box-border">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 md:w-32 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
                <div className="w-12 md:w-16 h-4 bg-black rounded-full flex items-center justify-end px-2">
                   <div className="w-1 h-1 rounded-full bg-[#1c1c1e]"></div>
                </div>
            </div>
            
            {/* Screen Content Area */}
            <div key={activeScreen} className="h-full w-full rounded-[2.3rem] overflow-hidden bg-black">
                {renderScreen()}
            </div>

            {/* Reflection/Gloss overlay - Made slightly stronger for glass effect */}
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent z-40 opacity-50"></div>
        </div>

        {/* Desktop Badge Layer */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
            {badges.map((badge) => (
                <div key={badge.id} className="pointer-events-auto">
                     <FloatingBadge 
                        data={badge} 
                        isActive={activeScreen === badge.id}
                        onHover={() => handleManualInteraction(badge.id)}
                        onClick={() => handleManualInteraction(badge.id)}
                        onLeave={() => {}} 
                    />
                </div>
            ))}
        </div>

      </div>

      {/* Mobile Badge Grid (Below Phone) - Enhanced as Indicators */}
      <div className="md:hidden w-full max-w-[340px] mt-6 px-4 animate-slide-up delay-700 opacity-0 fill-mode-forwards">
        <div className="grid grid-cols-4 gap-2">
            {badges.map((badge) => {
                const isActive = activeScreen === badge.id;
                return (
                    <button 
                        key={badge.id}
                        onClick={() => handleManualInteraction(badge.id)}
                        className={`
                            flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border
                            ${isActive 
                                ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20 scale-105' 
                                : 'bg-brand-surface text-blue-300 border-white/5 hover:bg-[#002855]'
                            }
                        `}
                    >
                        <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
                            {badge.icon}
                        </div>
                    </button>
                );
            })}
        </div>
        <p className="text-center text-xs text-blue-300 mt-4 font-medium animate-pulse">
            {isAutoPlaying ? "Kijk mee met Mark..." : "Tik om te bekijken"}
        </p>
      </div>

    </div>
  );
};

export default InteractivePhoneHero;