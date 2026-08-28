const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const startTag = '{/* Promo Banner outside the cards */}';
const endTag = 'App Folkert voor een partnerschap';

const startIndex = content.indexOf(startTag);
if (startIndex === -1) {
    console.log("Start tag not found");
    process.exit(1);
}

// Find the end of the button block
let searchIndex = content.indexOf(endTag, startIndex);
if (searchIndex === -1) {
    console.log("End tag not found");
    process.exit(1);
}
// walk forward to find the closing div of the CTA
let closingTags = 0;
// We will just replace the whole block manually by picking a safe chunk.
