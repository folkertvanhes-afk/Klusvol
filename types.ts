import React from 'react';

export type AppState = 'default' | 'lead' | 'appointment' | 'review' | 'invoice';

export interface BadgeData {
  id: AppState;
  category: string; // Small uppercase text (e.g. "NIEUWE LEAD")
  label: string;    // Main prominent text (e.g. "Willem Jansen")
  icon: React.ReactNode;
  position: string; // Tailwind class for positioning
  animationDelay?: string; // CSS animation delay string (e.g., '0s', '1s')
}