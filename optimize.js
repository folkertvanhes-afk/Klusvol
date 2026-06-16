const fs = require('fs');

function optimizeAppTsx() {
  let content = fs.readFileSync('App.tsx', 'utf8');

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

  fs.writeFileSync('App.tsx', content);
}

function processFile(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf8');
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
  fs.writeFileSync(filename, content);
}

optimizeAppTsx();
processFile('components/AboutPage.tsx');
processFile('components/AppScreens.tsx');
processFile('components/CaseStudyPage.tsx');
processFile('components/BlogPage.tsx');

console.log("Optimizations done!");
