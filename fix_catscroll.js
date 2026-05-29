import fs from 'fs';

let c = fs.readFileSync('components/CategoryScroll.tsx', 'utf8');
c = c.replace(/url: '#\/category\//g, "url: '/category/");
c = c.replace(/<motion\.a\n            key=\{idx\}\n            href=\{cat\.url\}/g, "const MotionLink = motion.create(Link);\n          return (\n          <MotionLink\n            key={idx}\n            to={cat.url}");
c = c.replace(/<\/motion\.a>/g, "</MotionLink>\n          );");
if (!c.includes('import { Link } from')) {
    c = c.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport { Link } from 'react-router-dom';");
}
fs.writeFileSync('components/CategoryScroll.tsx', c);
