const fs = require('fs');

function replaceHashesFiles(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/href="#\//g, 'href="/');
  fs.writeFileSync(filePath, content);
}

replaceHashesFiles('./data/articles.ts');
replaceHashesFiles('./components/Header.tsx');
