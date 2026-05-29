import fs from 'fs';

let c = fs.readFileSync('components/AllCategoriesView.tsx', 'utf8');
c = c.replace(/url: '#\/category\//g, "url: '/category/");
c = c.replace(/<motion\.a\n              key=\{idx\}\n              href=\{cat\.url\}/g, "const MotionLink = motion.create(Link);\n            return (\n              <MotionLink\n                key={idx}\n                to={cat.url}");
c = c.replace(/<\/motion\.a>/g, "</MotionLink>\n            );");
if (!c.includes('import { Link } from')) {
    c = c.replace("import OptimizedImage from './ui/OptimizedImage';", "import { Link } from 'react-router-dom';\nimport OptimizedImage from './ui/OptimizedImage';");
}
fs.writeFileSync('components/AllCategoriesView.tsx', c);
