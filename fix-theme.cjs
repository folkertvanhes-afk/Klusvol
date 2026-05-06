const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf8');

// Fix Button variants
app = app.replace(/primary: ".*"/, 'primary: "bg-white text-slate-900 hover:bg-slate-50 shadow-sm border border-slate-200 hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]"');
app = app.replace(/secondary: ".*"/, 'secondary: "bg-brand-orange text-white hover:bg-orange-600 shadow-md shadow-brand-orange/20 border border-brand-orange hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"');
app = app.replace(/outline: ".*"/, 'outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-brand-orange/50 hover:text-brand-orange"');

// Fix glass-panel
app = app.replace(/glass-panel/g, 'bg-white border border-slate-200 shadow-sm hover:shadow-md');

// Fix text colors
app = app.replace(/text-slate-900\/90/g, 'text-slate-700');
app = app.replace(/text-brand-text/g, 'text-slate-900');

fs.writeFileSync('App.tsx', app);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/background-color: #F8FAFC;/g, 'background-color: #F8FAFC;');
html = html.replace(/color: #0F172A;/g, 'color: #0F172A;');
fs.writeFileSync('index.html', html);
