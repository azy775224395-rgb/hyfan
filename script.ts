import fs from 'fs';

let content = fs.readFileSync('constants.tsx', 'utf8');
let newContent = content.replace(/name:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)'/g, (match, name, oldCategory) => {
    let newCategory = oldCategory;
    if (name.includes('لوح')) newCategory = 'الالواح الشمسيه';
    else if (name.includes('بطارية')) newCategory = 'البطاريات';
    else if (name.includes('إنفرتر') || name.includes('انفرتر')) newCategory = 'الانفرترات';
    else if (name.includes('غسالة') || name.includes('ثلاجة') || name.includes('فريزر') || name.includes('مكنسة')) newCategory = 'الاجهزة المنزلية';
    else if (name.includes('مكيف')) newCategory = 'المكيفات';
    else if (name.includes('طباخة')) newCategory = 'اجهزة الطباخه';
    else if (name.includes('باقة')) newCategory = 'الباقات';

    return match.replace(`category: '${oldCategory}'`, `category: '${newCategory}'`);
});

fs.writeFileSync('constants.tsx', newContent, 'utf8');
console.log('Categories updated!');
