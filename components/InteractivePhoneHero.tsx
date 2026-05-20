import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Check, Monitor, Wrench, ShieldCheck } from 'lucide-react';
import { AppState, BadgeData } from '../types';
import FloatingBadge from './FloatingBadge';
import { DefaultScreen, ShowroomScreen, OntzorgingScreen, FilterScreen, AppScreen } from './AppScreens';

const badges: BadgeData[] = [
  {
    id: 'showroom',
    category: 'Online Showroom',
    label: 'Premium visitekaartje',
    icon: <Monitor size={18} />,
    position: 'md:top-24 md:right-full md:mr-5',
    animationDelay: '1.2s'
  },
  {
    id: 'ontzorging',
    category: 'Geen omkijken naar',
    label: 'Wij regelen de techniek',
    icon: <Wrench size={18} />,
    position: 'md:top-48 md:left-full md:ml-5',
    animationDelay: '1.4s'
  },
  {
    id: 'filter',
    category: 'Ruis Filteren',
    label: 'Alleen serieuze aanvragen',
    icon: <ShieldCheck size={18} />,
    position: 'md:bottom-48 md:right-full md:mr-5',
    animationDelay: '1.6s'
  },
  {
    id: 'app',
    category: 'Klusvol App',
    label: 'Alles in één inbox',
    icon: <MessageCircle size={18} />,
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const delay = currentIndexRef.current === 0 ? 6000 : 3000;
    const timeout = setTimeout(() => {
      const nextIndex = (currentIndexRef.current + 1) % badges.length;
      currentIndexRef.current = nextIndex;
      setActiveScreen(badges[nextIndex].id);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isAutoPlaying, activeScreen]);

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
      case 'showroom': return <ShowroomScreen />;
      case 'ontzorging': return <OntzorgingScreen />;
      case 'filter': return <FilterScreen />;
      case 'app': return <AppScreen />;
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
      <div className="relative w-[240px] h-[480px] md:w-[260px] md:h-[520px] shrink-0 z-20 transition-transform duration-500 md:hover:scale-[1.02]">
        
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