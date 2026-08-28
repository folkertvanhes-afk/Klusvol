const fs = require('fs');
let lines = fs.readFileSync('App.tsx', 'utf8').split('\n');
lines[2358] = `                  {activePage === "branch" ? branchData[branchType].subtext : "Klusvol bouwt websites voor vakmensen (schilders, hoveniers, stukadoors, loodgieters en klusbedrijven). Vanuit Groningen voor heel Nederland."}`;
fs.writeFileSync('App.tsx', lines.join('\n'));
