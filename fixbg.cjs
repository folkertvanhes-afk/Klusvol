const fs = require('fs');

function fixBg(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf8');
  let newContent = content.replace(/bg-slate-50/g, 'bg-[#FAF9F6]');
  newContent = newContent.replace(/bg-\[#F6F5F2\]/g, 'bg-[#FAF9F6]');
  if (content !== newContent) {
    fs.writeFileSync(filename, newContent);
    console.log(`Fixed bg in ${filename}`);
  }
}

fixBg('App.tsx');
fixBg('components/AboutPage.tsx');
fixBg('components/CaseStudyPage.tsx');
fixBg('components/BlogPage.tsx');
fixBg('components/InteractivePhoneHero.tsx');
