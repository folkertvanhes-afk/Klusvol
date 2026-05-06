const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf8');

app = app.replace(/bg-slate-900\/50/g, 'bg-slate-50');
app = app.replace(/bg-slate-900\/\[0\.05\]/g, 'bg-slate-50');
app = app.replace(/bg-slate-900\/5/g, 'bg-slate-50');
app = app.replace(/bg-slate-900\/10/g, 'bg-slate-100');
app = app.replace(/border-slate-900\/10/g, 'border-slate-200');
app = app.replace(/border-slate-900\/5/g, 'border-slate-100');
app = app.replace(/border-slate-900\/20/g, 'border-slate-300');

fs.writeFileSync('App.tsx', app);
