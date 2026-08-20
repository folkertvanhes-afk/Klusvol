const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  'Kom in <span className="text-brand-orange">contact.</span>',
  'Kom in <span className="text-brand-orange">contact</span>'
);
content = content.replace(
  'Geen tool,',
  'Geen gereedschap,' // wait, I don't need to change this if it's fine, but let's check
);
content = content.replace(
  'Een website die net zo goed is als jouw vakwerk.',
  'Een website die net zo goed is als jouw vakwerk'
);
content = content.replace(
  'Trots op je online visitekaartje.',
  'Trots op je online visitekaartje'
);
content = content.replace(
  'Een partnerschap, geen software-abonnement.',
  'Een partnerschap, geen software-abonnement'
);
content = content.replace(
  'Websites voor vakmensen die liever op de bouw staan.',
  'Websites voor vakmensen die liever op de bouw staan'
);

// "Klusbedrijven in Nederland" -> "Klusbedrijven in Nederland"
// Let's check FAQ for Noord Nederland
content = content.replace(
  'We werken voornamelijk voor vakmannen in Noord-Nederland.',
  'We werken voor vakmannen door heel Nederland.'
);

// "Bekijk websites van vakmensen in Nederland" -> "Bekijk websites die ik voor andere vakmensen heb gebouwd"
content = content.replace(
  'Bekijk websites van vakmensen in Nederland',
  'Bekijk websites die ik voor andere vakmensen heb gebouwd'
);

// "Lees het hele verhaal" -> "Ontdek meer"
content = content.replace(
  />\s*Lees het hele verhaal\s*<\/Button>/g,
  ` variant="ghost" className="w-full sm:w-auto text-brand-orange hover:bg-brand-orange/10">Ontdek meer <ArrowRight className="ml-2" size={16} /></Button>`
);

// Review stars
content = content.replace(
  /Reviews\s*<\/span>/,
  `5 uit 5 op basis van 5 reviews</span>`
);

// Update features text
content = content.replace(
  'Alle aanvragen via één app direct in je broekzak. Snel\\n                          de beste klussen eruit vissen.',
  'Krijg direct een pushmelding op je telefoon bij een nieuwe aanvraag. Beheer klussen simpel via de app, zonder in te loggen op een ingewikkeld dashboard.'
);

content = content.replace(
  'Alle aanvragen via één app direct in je broekzak. Snel\n                          de beste klussen eruit vissen.',
  'Krijg direct een pushmelding op je telefoon bij een nieuwe aanvraag. Beheer klussen simpel via de app, zonder in te loggen op een ingewikkeld dashboard.'
);

content = content.replace(
  'Wij regelen verbinding, veiligheid én blokkeren\\n                          ongewenste aanvragen via een klantfilter.',
  'Wij filteren spam en onserieuze aanvragen eruit. Je ontvangt alleen offerteaanvragen van klanten uit jouw regio die écht op zoek zijn naar vakwerk.'
);
content = content.replace(
  'Wij regelen verbinding, veiligheid én blokkeren\n                          ongewenste aanvragen via een klantfilter.',
  'Wij filteren spam en onserieuze aanvragen eruit. Je ontvangt alleen offerteaanvragen van klanten uit jouw regio die écht op zoek zijn naar vakwerk.'
);


fs.writeFileSync('App.tsx', content);
console.log('Done replacement');
