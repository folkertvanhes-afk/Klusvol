const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf8');

app = app.replace(/bg-white\/\[0\.01\]/g, 'bg-slate-50');
app = app.replace(/border-slate-900\/\[0\.03\]/g, 'border-slate-100');
app = app.replace(/bg-white\/60/g, 'bg-white');
app = app.replace(/bg-white\/80/g, 'bg-white');
app = app.replace(/bg-white\/95/g, 'bg-white');

fs.writeFileSync('App.tsx', app);
