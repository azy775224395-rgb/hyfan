import fs from 'fs';

const content = fs.readFileSync('constants.tsx', 'utf-8');

const updated = content.replace(/fullDescription:\s*(['"`])([\s\S]*?)\1(?!([\s\S]{0,50}longDescription))/g, (match, quote, desc) => {
  const longDesc = `\n    longDescription: \`
      <h3 class="text-xl font-black text-emerald-800 mb-2">وصف تفصيلي</h3>
      <p class="mb-4">
        ${desc}
      </p>
      <h3 class="text-xl font-black text-emerald-800 mb-2">لماذا تختار هذا المنتج؟</h3>
      <p>
        تم اختيار هذا المنتج بعناية كأحد أفضل الخيارات في السوق ليتناسب مع احتياجات الطاقة في اليمن، حيث يوفر أداءً استثنائياً وعمراً افتراضياً طويلاً، مما يجعله استثماراً آمناً وموثوقاً لمشروعك.
      </p>
    \``;
  return match + ',' + longDesc;
});

fs.writeFileSync('constants.tsx', updated);
console.log('Update complete');
