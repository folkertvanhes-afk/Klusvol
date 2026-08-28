const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  /<div className="space-y-4">/,
  `<div className="space-y-4">
                {activePage === "branch" && branchData[branchType].faqs.map((faq, i) => (
                  <AccordionItem key={'branch-faq-'+i} question={faq.q} answer={faq.a} />
                ))}`
);

fs.writeFileSync('App.tsx', content);
