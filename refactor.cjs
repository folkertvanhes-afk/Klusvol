const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf8');

// Colors
app = app.replace(/text-white/g, 'text-slate-900');
app = app.replace(/text-blue-100/g, 'text-slate-800');
app = app.replace(/text-blue-200/g, 'text-slate-600');
app = app.replace(/text-blue-300/g, 'text-slate-500');
app = app.replace(/text-blue-400/g, 'text-slate-400');
app = app.replace(/text-blue-500/g, 'text-blue-600');
app = app.replace(/bg-brand-dark/g, 'bg-slate-50');
app = app.replace(/bg-brand-surface/g, 'bg-white');
app = app.replace(/bg-white\/5/g, 'bg-slate-900\/5');
app = app.replace(/bg-white\/10/g, 'bg-slate-900\/10');
app = app.replace(/bg-white\/\[0\.02\]/g, 'bg-slate-900\/[0.02]');
app = app.replace(/bg-white\/\[0\.03\]/g, 'bg-slate-900\/[0.03]');
app = app.replace(/bg-white\/\[0\.05\]/g, 'bg-slate-900\/[0.05]');
app = app.replace(/border-white\/5/g, 'border-slate-900\/5');
app = app.replace(/border-white\/10/g, 'border-slate-900\/10');
app = app.replace(/border-white\/20/g, 'border-slate-900\/20');
app = app.replace(/border-white\/\[0\.03\]/g, 'border-slate-900\/[0.03]');
app = app.replace(/border-white\/\[0\.05\]/g, 'border-slate-900\/[0.05]');
app = app.replace(/border-white\/\[0\.1\]/g, 'border-slate-900\/[0.1]');

// Specific fixes
app = app.replace(/text-slate-900\/90/g, 'text-slate-900\/90');
app = app.replace(/bg-black\/40/g, 'bg-white\/80'); // glass panels
app = app.replace(/bg-black\/20/g, 'bg-white\/60');
app = app.replace(/bg-black\/50/g, 'bg-white\/90');

fs.writeFileSync('App.tsx', app);
console.log('App.tsx refactored');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/background-color: #0B2A51;/g, 'background-color: #F8FAFC;');
html = html.replace(/color: #F0F9FF;/g, 'color: #0F172A;');
html = html.replace(/background: rgba\(21, 67, 125, 0\.65\);/g, 'background: rgba(255, 255, 255, 0.65);');
html = html.replace(/background: rgba\(21, 67, 125, 0\.85\);/g, 'background: rgba(255, 255, 255, 0.85);');
html = html.replace(/border: 1px solid rgba\(255, 255, 255, 0\.1\);/g, 'border: 1px solid rgba(0, 0, 0, 0.05);');
html = html.replace(/border: 1px solid rgba\(255, 255, 255, 0\.2\);/g, 'border: 1px solid rgba(0, 0, 0, 0.1);');
fs.writeFileSync('index.html', html);
console.log('index.html refactored');
