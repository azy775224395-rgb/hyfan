import fs from 'fs';

let c = fs.readFileSync('App.tsx', 'utf8');
c = c.replace(/navigateTo\("#\//g, 'navigateTo("/');
c = c.replace(/navigateTo\(\`#\//g, 'navigateTo(`/');
fs.writeFileSync('App.tsx', c);
