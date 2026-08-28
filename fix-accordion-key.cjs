const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  /<AccordionItem key=\{'branch-faq-'\+i\} question=\{faq\.q\} answer=\{faq\.a\} \/>/g,
  `<div key={'branch-faq-'+i}><AccordionItem question={faq.q} answer={faq.a} /></div>`
);

fs.writeFileSync('App.tsx', content);
