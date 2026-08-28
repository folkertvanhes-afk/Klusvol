const fs = require('fs');
let lines = fs.readFileSync('App.tsx', 'utf8').split('\n');
lines[2891] = `              <div className="space-y-4">
                {activePage === "branch" && branchData[branchType].faqs.map((faq, i) => (
                  <AccordionItem key={'branch-faq-'+i} question={faq.q} answer={faq.a} />
                ))}`;
fs.writeFileSync('App.tsx', lines.join('\n'));
