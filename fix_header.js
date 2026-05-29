import fs from 'fs';

let c = fs.readFileSync('components/Header.tsx', 'utf8');

c = c.replace(/<a href="#\/blog"/g, '<Link to="/blog"');
c = c.replace(/<a href="#\/tracking"/g, '<Link to="/tracking"');
c = c.replace(/<\/a>/g, '</Link>');

c = c.replace(/<a \n                  href=\{item.url\} /g, '<Link \n                  to={item.url} ');
c = c.replace(/<a \n                            key=\{sIdx\}\n                            href=\{sub.url\}/g, '<Link \n                            key={sIdx}\n                            to={sub.url}');
c = c.replace(/<a href=\{item.url\}/g, '<Link to={item.url}');
c = c.replace(/<a \n                              key=\{sIdx\} \n                              href=\{sub.url\} /g, '<Link \n                              key={sIdx} \n                              to={sub.url} ');
c = c.replace(/<a /g, '<Link ');
c = c.replace(/ href=/g, ' to=');
if (!c.includes('import { Link } from')) {
    c = c.replace("import { MAIN_MENU } from '../navigationData';", "import { Link } from 'react-router-dom';\nimport { MAIN_MENU } from '../navigationData';");
}
fs.writeFileSync('components/Header.tsx', c);
