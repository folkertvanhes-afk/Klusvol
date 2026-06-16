const fs = require('fs');

function fixImages(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  let newContent = content.replace(/<img\s([^>]+)>/g, (match, attrs) => {
    if (attrs.includes('loading=') || attrs.includes('fetchPriority=')) {
      return match; // don't touch
    }
    // simple heuristic: if it's the logo, make it eager
    if (attrs.includes('696d28a4e125efc1200fd25c') || filename.includes('AppScreens')) {
      return `<img fetchPriority="high" decoding="async" ${attrs}>`;
    }
    return `<img loading="lazy" decoding="async" ${attrs}>`;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(filename, newContent);
    console.log(`Fixed images in ${filename}`);
  }
}

fixImages('App.tsx');
fixImages('components/AboutPage.tsx');
fixImages('components/AppScreens.tsx');
fixImages('components/CaseStudyPage.tsx');
fixImages('components/BlogPage.tsx');
