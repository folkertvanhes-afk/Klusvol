const fs = require('fs');

function fixBlues(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf8');
  content = content.replace(/bg-blue-500\/10/g, 'bg-amber-600/10');
  content = content.replace(/bg-blue-500\/5/g, 'bg-stone-500/5');
  fs.writeFileSync(filename, content);
  console.log(`Fixed blue glows in ${filename}`);
}

fixBlues('App.tsx');
