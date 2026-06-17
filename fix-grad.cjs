const fs = require('fs');

function fixGradients(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf8');
  let newContent = content.replace(/from-slate-50/g, 'from-[#FAF9F6]');
  newContent = newContent.replace(/via-slate-50/g, 'via-[#FAF9F6]');
  newContent = newContent.replace(/to-slate-50/g, 'to-[#FAF9F6]');
  if (content !== newContent) {
    fs.writeFileSync(filename, newContent);
    console.log(`Fixed gradients in ${filename}`);
  }
}

fixGradients('App.tsx');
