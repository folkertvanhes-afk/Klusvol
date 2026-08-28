const fs = require('fs');
const content = fs.readFileSync('App.tsx', 'utf8');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('{/* Fundament (Hoofdblok) */}'));
const end = lines.findIndex((l, i) => i > start && l.includes('App Folkert voor een partnerschap')) + 5;
console.log(lines.slice(start, end).join('\n'));
