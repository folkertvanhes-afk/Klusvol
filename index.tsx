import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

let hydrated = false;

const hydrate = () => {
  if (hydrated) return;
  hydrated = true;
  cleanupInteractionListeners();
  ReactDOM.hydrateRoot(rootElement, app);
};

const interactionEvents = ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown'] as const;

const onUserInteraction = () => {
  hydrate();
};

const cleanupInteractionListeners = () => {
  if (typeof window === 'undefined') return;
  interactionEvents.forEach((event) => {
    window.removeEventListener(event, onUserInteraction);
  });
};

if (rootElement.hasChildNodes()) {
  if (typeof window !== 'undefined') {
    interactionEvents.forEach((event) => {
      window.addEventListener(event, onUserInteraction, { once: true, passive: true });
    });

    const HYDRATION_TIMEOUT = 1200; // 1000-1500ms bounds

    if ('requestIdleCallback' in window) {
      (window as Window & {
        requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number;
      }).requestIdleCallback(hydrate, { timeout: HYDRATION_TIMEOUT });
    } else {
      setTimeout(hydrate, HYDRATION_TIMEOUT);
    }
  } else {
    hydrate();
  }
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
