import React from 'react';
import { BadgeData } from '../types';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

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
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: parseFloat(data.animationDelay) }}
      className={`
        relative md:absolute z-30 cursor-pointer w-full md:w-auto h-full md:h-auto
        ${data.position}
        ${isLeft ? 'md:origin-right' : 'md:origin-left'}
        md:flex md:items-center
      `}
      onMouseEnter={() => onHover(data.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(data.id)}
      role="button"
      tabIndex={0}
    >
      {/* Desktop Connector Line */}
      <div 
        className={`hidden md:block absolute top-1/2 w-6 h-[1px] -translate-y-1/2 transition-all duration-500 pointer-events-none
        ${isLeft ? '-right-6' : '-left-6'}
        ${isActive ? 'bg-gradient-to-r from-brand-orange to-transparent opacity-100' : 'bg-white/20 opacity-30'}
        `}
      />

      {/* Badge Card */}
      <motion.div 
        animate={{ 
            scale: isActive ? 1.05 : 1,
            y: isActive ? 0 : [0, -5, 0]
        }}
        transition={{ 
            scale: { duration: 0.3 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: parseFloat(data.animationDelay) }
        }}
        className={`
        flex flex-col items-center justify-center gap-2 p-3 rounded-xl border backdrop-blur-xl shadow-2xl h-full
        md:flex-row md:gap-3 md:py-2 md:px-3 md:min-w-[160px]
        transition-colors duration-300
        ${isLeft ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}
        ${isActive 
            ? 'bg-brand-surface border-brand-orange shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]' 
            : 'bg-brand-surface/50 border-white/10 hover:border-brand-orange/50 hover:bg-brand-surface/80'
        }
      `}>
        {/* Icon Container */}
        <div className={`
            w-10 h-10 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0
            ${isActive ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/5 text-blue-300'}
        `}>
          {data.icon}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <p className={`hidden md:block text-[9px] font-bold uppercase tracking-wide mb-0 ${isActive ? 'text-brand-orange' : 'text-blue-400'}`}>
            {data.category}
          </p>
          <h3 className="font-medium md:font-semibold text-white text-xs md:text-sm leading-tight truncate w-full">
            {data.label}
          </h3>
        </div>

         <div className={`
            hidden md:block transition-all duration-300 opacity-0 w-0 overflow-hidden
            ${isActive ? 'w-auto opacity-100' : ''}
        `}>
             <ChevronRight className={`text-brand-orange ${isLeft ? 'rotate-180' : ''}`} size={14} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBadge;