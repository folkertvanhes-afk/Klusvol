import React from 'react';
import { BadgeData } from '../types';
import { ChevronRight } from 'lucide-react';

interface FloatingBadgeProps {
  data: BadgeData;
  isActive: boolean;
  onHover: (id: BadgeData['id']) => void;
  onClick: (id: BadgeData['id']) => void;
  onLeave: () => void;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({ data, isActive, onHover, onClick, onLeave }) => {
  // Determine if the badge is on the left side of the phone based on the position class
  const isLeft = data.position.includes('right-full');

  return (
    <div
      className={`
        relative md:absolute z-30 transition-all duration-300 ease-out transform cursor-pointer w-full md:w-auto h-full md:h-auto
        ${data.position}
        ${/* Only float on desktop and when not active */ ''}
        ${!isActive ? 'md:animate-float' : ''}
        ${/* Origin allows scale animation to grow OUTWARDS from the phone */ ''}
        ${isLeft ? 'md:origin-right' : 'md:origin-left'}
        md:flex md:items-center
      `}
      style={{ animationDelay: data.animationDelay }}
      onMouseEnter={() => onHover(data.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(data.id)}
      role="button"
      tabIndex={0}
    >
      {/* Desktop Connector Line */}
      {/* If on Left: Line is on the right side of badge. If on Right: Line is on left side. */}
      <div 
        className={`hidden md:block absolute top-1/2 w-6 h-[1px] -translate-y-1/2 transition-all duration-500 pointer-events-none
        ${isLeft ? '-right-6' : '-left-6'}
        ${isActive ? 'bg-gradient-to-r from-brand-orange to-transparent opacity-100' : 'bg-gray-700 opacity-30'}
        ${/* If left, gradient should flow left-to-right (orange at phone). If right, flow right-to-left? 
           Actually, gradient usually looks best originating from the active element or the source. 
           Let's keep it simple: solid color or simple gradient. */ ''}
        `}
      />

      {/* Badge Card */}
      <div className={`
        flex flex-col items-center justify-center gap-2 p-3 rounded-xl border backdrop-blur-md shadow-lg h-full
        md:flex-row md:gap-3 md:py-2 md:px-3 md:min-w-[160px]
        transition-all duration-300
        ${/* Mirror layout for left side badges so icon is closest to phone */ ''}
        ${isLeft ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}
        ${isActive 
            ? 'bg-gray-800/95 border-brand-orange shadow-[0_0_15px_-5px_rgba(255,87,34,0.4)] md:scale-105' 
            : 'bg-gray-900/40 border-gray-700/50 hover:border-gray-500 hover:bg-gray-800/80 hover:scale-[1.02] md:hover:scale-105'
        }
      `}>
        {/* Icon Container */}
        <div className={`
            w-10 h-10 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0
            ${isActive ? 'bg-brand-orange text-white' : 'bg-gray-800 text-gray-400'}
        `}>
          {data.icon}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <p className={`hidden md:block text-[9px] font-bold uppercase tracking-wide mb-0 ${isActive ? 'text-brand-orange' : 'text-gray-500'}`}>
            {data.category}
          </p>
          <h3 className="font-medium md:font-semibold text-white text-xs md:text-sm leading-tight truncate w-full">
            {data.label}
          </h3>
        </div>

        {/* Active Indicator Arrow (Desktop Only) */}
        {/* We hide this for the "compact/subtle" look requested, or we can keep it small. 
            Let's keep it but make it very subtle or remove to save space for "direct naast" look.
            Removing creates a cleaner "floating label" look. 
        */}
         <div className={`
            hidden md:block transition-all duration-300 opacity-0 w-0 overflow-hidden
            ${isActive ? 'w-auto opacity-100' : ''}
        `}>
             <ChevronRight className={`text-brand-orange ${isLeft ? 'rotate-180' : ''}`} size={14} />
        </div>
      </div>
    </div>
  );
};

export default FloatingBadge;