const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Undo the wrong insert
content = content.replace(
  /{activePage === "branch" && branchData\[branchType\]\.faqs\.map\(\(faq, i\) => \([\s\n]*?<AccordionItem key=\{'branch-faq-'\+i\} question=\{faq\.q\} answer=\{faq\.a\} \/>[\s\n]*?\)\)}/g,
  ''
);

fs.writeFileSync('App.tsx', content);
