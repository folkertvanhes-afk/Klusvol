const fs = require('fs');
let lines = fs.readFileSync('App.tsx', 'utf8').split('\n');
lines[2176] = `        <meta name="description" content={activePage === 'branch' ? \`Speciaal voor \${branchData[branchType].title.toLowerCase()}. Ontvang een premium website inclusief app voor €69,- per maand. Tijdelijk €0 opstartkosten voor 2 referentie-cases!\` : "Klusvol bouwt websites voor vakmensen (schilders, hoveniers, stukadoors, loodgieters en klusbedrijven). Vanuit Groningen voor heel Nederland."} />`;
fs.writeFileSync('App.tsx', lines.join('\n'));
