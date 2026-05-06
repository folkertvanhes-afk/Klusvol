const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf8');

app = app.replace(/animate={{ color: isHovered \? '#F97316' : '#FFFFFF' }}/g, "animate={{ color: isHovered ? '#F97316' : '#0F172A' }}");
app = app.replace(/animate={{ color: isHovered \? '#FFFFFF' : '#BFDBFE' }}/g, "animate={{ color: isHovered ? '#0F172A' : '#475569' }}");
app = app.replace(/color: hoveredSide !== null \? '#FFFFFF' : '#93C5FD'/g, "color: hoveredSide !== null ? '#0F172A' : '#475569'");
app = app.replace(/animate={{ color: isActive \? '#FFFFFF' : '#93C5FD' }}/g, "animate={{ color: isActive ? '#0F172A' : '#475569' }}");
app = app.replace(/backgroundColor: isActive \? '#F97316' : '#002855'/g, "backgroundColor: isActive ? '#F97316' : '#E2E8F0'");
app = app.replace(/backgroundColor: isActive \? 'rgba\(255,255,255,0\.05\)' : 'rgba\(0,0,0,0\)'/g, "backgroundColor: isActive ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0)'");

fs.writeFileSync('App.tsx', app);
