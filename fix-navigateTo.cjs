const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  /if \(\(page === "home" \|\| page === "branch"\) && sectionId\) \{/,
  `if (page === "home" && sectionId) {`
);

fs.writeFileSync('App.tsx', content);
