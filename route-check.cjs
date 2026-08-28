const fs = require('fs');
const content = fs.readFileSync('App.tsx', 'utf8');
const appIndex = content.indexOf('function App() {');
console.log(content.substring(appIndex, appIndex + 2000));
