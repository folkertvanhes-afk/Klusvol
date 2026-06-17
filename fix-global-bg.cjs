const fs = require('fs');

function fixGlobalBg(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf8');

  // Replace background in root
  content = content.replace(
    /className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-\[#FAF9F6\] flex items-center justify-center"/,
    'className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#FAF9F6] via-[#F6F4EE] to-[#FFF3E6] flex items-center justify-center"'
  );

  // Remove section backgrounds so global shines through
  content = content.replace(/className="bg-\[#FAF9F6\] relative overflow-hidden"/g, 'className="relative overflow-hidden"');
  content = content.replace(/<div className="bg-\[#FAF9F6\] border-t border-slate-100">/g, '<div className="border-t border-slate-100">');
  content = content.replace(/<Section className="bg-\[#FAF9F6\] border-t border-slate-100 relative overflow-hidden">/g, '<Section className="border-t border-slate-100 relative overflow-hidden">');
  content = content.replace(/className="relative bg-\[#FAF9F6\] overflow-hidden"/g, 'className="relative overflow-hidden"');
  content = content.replace(/<Section className="border-t border-slate-100 relative overflow-hidden bg-\[#FAF9F6\]">/g, '<Section className="border-t border-slate-100 relative overflow-hidden">');
  content = content.replace(/className="py-32 relative overflow-hidden bg-\[#FAF9F6\]"/g, 'className="py-32 relative overflow-hidden"');
  content = content.replace(/<footer className="py-20 bg-\[#FAF9F6\] relative overflow-hidden font-light border-t border-slate-200">/g, '<footer className="py-20 relative overflow-hidden font-light border-t border-slate-200">');

  // Remove decorative pieces (grid lines, weird glows in the background)
  // Grid:
  content = content.replace(/<div className="absolute inset-0 bg-\[linear-gradient.*?\] bg-\[size.*?\]"><\/div>/g, '');
  // Glows from the root bg:
  // Let's remove them directly via replacing the lines. We can do that by taking out all motion.div with bg-brand-orange or amber or whatever glow. 
  // We can just regex out those motion.div absolute glow things.

  fs.writeFileSync(filename, content);
  console.log(`Fixed global bg in ${filename}`);
}

fixGlobalBg('App.tsx');
