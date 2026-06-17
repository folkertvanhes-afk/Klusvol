const fs = require('fs');
const glob = require('glob'); // wait, I don't have glob if it's not installed, I'll use simple array

const files = [
  'App.tsx',
  'components/AboutPage.tsx',
  'components/CaseStudyPage.tsx',
  'components/AppScreens.tsx',
  'components/BlogPage.tsx',
  'components/Chatbot.tsx',
  'components/InteractivePhoneHero.tsx'
];

files.forEach(filename => {
  if (!fs.existsSync(filename)) return;
  let lines = fs.readFileSync(filename, 'utf8').split('\n');
  
  let newLines = lines.map(line => {
    // skip the global background in App.tsx (we know they are motion.div or have specific sizes)
    if (filename === 'App.tsx' && line.includes('absolute top-[-10%] right-[-10%] w-[1000px]')) return line;
    if (filename === 'App.tsx' && line.includes('absolute bottom-[-15%] left-[-15%] w-[900px]')) return line;
    if (filename === 'App.tsx' && line.includes('absolute top-[30%] left-[20%] w-[600px]')) return line;
    
    // remove lines that are just decorative blur shapes that are not in the main bg
    if (line.includes('absolute') && line.includes('blur-[') && line.includes('pointer-events-none') && line.includes('rounded-full')) {
      return ''; // remove it
    }
    
    // also remove the absolute gradients
    if (line.includes('absolute inset-0 bg-gradient-to-') && line.includes('mix-blend-screen')) {
      return '';
    }
    
    return line;
  });

  // remove empty lines that we just ''-ed out
  newLines = newLines.filter(l => l !== '');

  fs.writeFileSync(filename, newLines.join('\n'));
});
console.log("Decorations removed.");
