const fs = require('fs');
const path = require('path');

const appRoot = '/app/applet';

function optimizeAppTsx() {
  const file = path.join(appRoot, 'App.tsx');
  let content = fs.readFileSync(file, 'utf8');

  // React lazy imports
  content = content.replace(
    /import AboutPage from "\.\/components\/AboutPage";/g,
    'const AboutPage = React.lazy(() => import("./components/AboutPage"));'
  );
  content = content.replace(
    /import CaseStudyPage from "\.\/components\/CaseStudyPage";/g,
    'const CaseStudyPage = React.lazy(() => import("./components/CaseStudyPage"));'
  );
  content = content.replace(
    /import Chatbot from "\.\/components\/Chatbot";/g,
    'const Chatbot = React.lazy(() => import("./components/Chatbot"));'
  );
  content = content.replace(
    /import React, { useState, useEffect, useRef } from "react";/g,
    'import React, { useState, useEffect, useRef, Suspense, lazy } from "react";'
  );

  // Add Suspense wrappers
  content = content.replace(
    /<Chatbot \/>/g,
    '<React.Suspense fallback={null}><Chatbot /></React.Suspense>'
  );

  content = content.replace(
    /<AboutPage\s*(.*?)\s*\/>/g,
    '<React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full"></div></div>}><AboutPage $1 /></React.Suspense>'
  );

  content = content.replace(
    /<CaseStudyPage\s*(.*?)\s*\/>/g,
    '<React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full"></div></div>}><CaseStudyPage $1 /></React.Suspense>'
  );
  
  let imgChunks = content.split('<img ');
  for (let i = 1; i < imgChunks.length; i++) {
    if (!imgChunks[i].includes('loading=')) {
      if (i === 1) { // Logo
        imgChunks[i] = 'fetchPriority="high" decoding="async" ' + imgChunks[i];
      } else {
        imgChunks[i] = 'loading="lazy" decoding="async" ' + imgChunks[i];
      }
    }
  }
  content = imgChunks.join('<img ');

  fs.writeFileSync(file, content);
}

function processFile(filename) {
  const file = path.join(appRoot, filename);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let imgChunks = content.split('<img ');
  for (let i = 1; i < imgChunks.length; i++) {
    if (!imgChunks[i].includes('loading=')) {
       if (filename.includes('AppScreens') && i <= 2) {
         imgChunks[i] = 'fetchPriority="high" decoding="async" ' + imgChunks[i];
       } else {
         imgChunks[i] = 'loading="lazy" decoding="async" ' + imgChunks[i];
       }
    }
  }
  content = imgChunks.join('<img ');
  fs.writeFileSync(file, content);
}

optimizeAppTsx();
processFile('components/AboutPage.tsx');
processFile('components/AppScreens.tsx');
processFile('components/CaseStudyPage.tsx');
processFile('components/BlogPage.tsx');

console.log("Optimizations done!");
