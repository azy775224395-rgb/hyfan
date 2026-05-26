import fs from 'fs';
import path from 'path';

let content = fs.readFileSync(path.join(process.cwd(), 'data/articles.ts'), 'utf-8');

// 1. Convert Unsplash Images to WebP (fm=webp)
content = content.replace(/auto=format/g, 'fm=webp');

// 2. Add FAQs and Voice Search titles
// Article 1: ultimate-solar-battery-guide-yemen-2026
content = content.replace(
  `title: "الدليل الشامل لبطاريات الطاقة الشمسية في اليمن 2026: مقارنة تفصيلية، أسعار، ونصائح الخبراء",`,
  `title: "الدليل الشامل لبطاريات الطاقة الشمسية في اليمن 2026: كيف تختار أفضل بطارية لمنزلك؟",`
);
content = content.replace(
  `</div>\n      </div>\n    \`\n  },\n  {\n    id: "how-to-choose-solar-system-yemen"`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كم سعر بطارية الليثيوم في اليمن؟</summary>\n          <p class="mt-2 text-gray-700">الأسعار تتراوح بين 600 إلى 1200 دولار أمريكي للـ 100 أمبير (48 فولت) تقريباً، حسب الماركة ومدى ذكاء نظام الـ BMS المدمج بها.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كيف أعرف أن بطارية الليثيوم أصلية؟</summary>\n          <p class="mt-2 text-gray-700">تأكد من وجود باركود مصنعي، واسأل عن شهادات الوكالة، ولا تتردد في طلب فحص داخلي بالكمبيوتر لبرمجة הـ BMS من المهندس.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">متى أختار بطارية جل ومتى أختار ليثيوم؟</summary>\n          <p class="mt-2 text-gray-700">الجل للإضاءة والأحمال الخفيفة والميزانيات المتوسطة. الليثيوم مخصصة للمكيفات والأحمال الثقيلة والمناطق الشديدة الحرارة كعدن والحديدة.</p>\n        </details>\n      </div>\n    \`\n  },\n  {\n    id: "how-to-choose-solar-system-yemen"`
);

// Article 4: ultimate-solar-panels-guide-yemen-2026
content = content.replace(
  `title: "دليل شراء الألواح الشمسية في اليمن 2026: كيف تختار بين Trina و JA Solar و Jinko؟ وما الفرق بين N-Type و P-Type؟",`,
  `title: "دليل الألواح الشمسية في اليمن 2026: كيف تختار أفضل لوح شمسي لسطحك؟",`
);
content = content.replace(
  `</div>\n      </div>\n\n    \`\n  },\n  {\n    id: "ultimate-solar-inverter-guide-yemen-2026"`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كيف أفرق بين اللوح الشمسي الأصلي والمقلد؟</summary>\n          <p class="mt-2 text-gray-700">عبر مطابقة السيريال نمبر (الباركود) الموجود تحت الزجاج مع الرقم الموجود على الملصق الخلفي والتأكد منه عبر موقع الشركة الرسمي، وتجنب شرائها إذا كان الغراء الجانبي عشوائياً.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">ما هو أفضل نوع ألواح شمسية للمناطق الحارة؟</summary>\n          <p class="mt-2 text-gray-700">الألواح التي تمتلك تقنية N-Type من ماركات مثل Jinko أو JA Solar لأنها مقاومة للحرارة العالية ولا تفقد كفاءتها وقت الظهيرة.</p>\n        </details>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-solar-inverter-guide-yemen-2026"`
);

// Article 5: ultimate-solar-inverter-guide-yemen-2026
content = content.replace(
  `title: "دليل اختيار إنفرتر الطاقة الشمسية في اليمن 2026: الفرق بين PWM و MPPT.. ولماذا الإنفرتر الهجين (Hybrid) هو المستقبل؟",`,
  `title: "دليل إنفرترات الطاقة الشمسية 2026: كيف تشغل المكيف على الطاقة الشمسية بأمان؟",`
);

content = content.replace(
  `</div>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-solar-water-pumps-guide-yemen-2026-part1"`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كم سعر الإنفرتر الهجين في اليمن؟</summary>\n          <p class="mt-2 text-gray-700">يبدأ من 250 دولار للأحجام الصغيرة 3 كيلو، ويصل إلى أكثر من 800 دولار للأحجام الاحترافية 5 أو 8 كيلو وات، وتختلف حسب العلامة التجارية (Growatt وغيرها).</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">ما هو أحسن إنفرتر لتشغيل مكيف؟</summary>\n          <p class="mt-2 text-gray-700">أي إنفرتر هجين ذكي بحجم 5 كيلو وات يعمل بنظام 48 فولت ومزود بتقنية MPPT، سيعمل المكيف بكل سلاسة ودون جهد إضافي على البطاريات.</p>\n        </details>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-solar-water-pumps-guide-yemen-2026-part1"`
);

// Article 6: ultimate-solar-water-pumps-guide-yemen-2026-part1
content = content.replace(
  `title: "دليل منظومات الغطاسات الشمسية للآبار في اليمن 2026: كيف تودع الديزل وتزيد أرباح مزرعتك؟ (الجزء الأول)",`,
  `title: "أفضل منظومة غطاس شمسية للزراعة في اليمن: كيف تختار الغطاس المناسب للبئر؟",`
);

content = content.replace(
  `</div>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-home-appliances-solar-guide-yemen-2026"`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كم لوح شمسي يحتاج الغطاس 5 حصان؟</summary>\n          <p class="mt-2 text-gray-700">يحتاج غطاس الـ 5 حصان إلى حوالي 10 إلى 12 لوحاً من الألواح عالية الكفاءة (مثلاً 550 وات)، لضمان إنطلاق المروحة بقوة من أول ضوء وحتى العصر.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كيف أطول عمر الغطاس في البئر المالح؟</summary>\n          <p class="mt-2 text-gray-700">باستخدام غطاس مصنوع بالكامل من الستانلس ستيل القوي (304 أو 316) ليتحمل مقاومة الصدأ في المياه الكبريتية والمالحة للآبار.</p>\n        </details>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-home-appliances-solar-guide-yemen-2026"`
);

// Article 7: ultimate-home-appliances-solar-guide-yemen-2026
content = content.replace(
  `title: "دليل الأجهزة المنزلية الموفرة للطاقة في اليمن 2026: كيف تشغل المكيف والثلاجة على الطاقة الشمسية بأقل التكاليف؟",`,
  `title: "تشغيل المكيف والثلاجة على الطاقة الشمسية في اليمن: كم لوح أحتاج؟",`
);

content = content.replace(
  `</div>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-solar-bundles-yemen-2026"`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كم لوح شمسي لتشغيل مكيف 1 طن إنفرتر؟</summary>\n          <p class="mt-2 text-gray-700">يكفي 4 ألى 6 ألواح من الفئة العملاقة (580 واط) للتشغيل وقت النهار المباشر بجانب شحن بطارية الليثيوم لفترة الليل.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">هل أقدر أشغل غسالة سخان على الطاقة الشمسية؟</summary>\n          <p class="mt-2 text-gray-700">نعم، ولكن يُفضل تشغيلها فقط وقت الذروة الشمسية (الظهيرة) لكي يسحب الإنفرتر قوتها الجبارة (1500 وات) من الألواح مباشرة ويوفر عمر البطارية.</p>\n        </details>\n      </div>\n    \`\n  },\n  {\n    id: "ultimate-solar-bundles-yemen-2026"`
);

// Article 8: ultimate-solar-bundles-yemen-2026
content = content.replace(
  `title: "دليل باقات الطاقة الشمسية المتكاملة في اليمن 2026: كيف تختار الباقة الأنسب لمنزلك أو مشروعك؟",`,
  `title: "ما هي أفضل منظومة طاقة لمنزلي في عدن والحديدة؟",`
);

// Article 9: ultimate-solar-protection-guide-yemen-2026
content = content.replace(
  `title: "دليل حماية منظومات الطاقة الشمسية في اليمن 2026: لماذا تحترق المنظومات؟ وكيف تحمي استثمارك بالكيابل والقواطع الصحيحة؟",`,
  `title: "حماية منظومات الطاقة الشمسية: كيف تحمي منظومتك من الاحتراق والصواعق؟",`
);

content = content.replace(
  `</div>\n      </div>\n    \`\n  }\n];`,
  `</div>\n      </div>\n\n      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>\n      <div class="space-y-4">\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">ليش تحترق بطاريات الطاقة الشمسية؟</summary>\n          <p class="mt-2 text-gray-700">تحترق عادة لعدم وجود قاطع (DC) أصلي، واقتصار الفنيين على شبك الكيبلات مباشرة، وكذلك التفريغ الجائر أو حرارة الجو القاسية دون تهوية.</p>\n        </details>\n        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">\n          <summary class="font-bold text-lg text-emerald-900">كيف أحمي المنظومة حقنا من الصواعق؟</summary>\n          <p class="mt-2 text-gray-700">تركيب وتد تأريض نحاسي بالأرض، مع تمديده لهياكل الألواح ولجهاز الإنفرتر وربطه بقطعة مانع صواعق (SPD) أصلية في مسار الكابل.</p>\n        </details>\n      </div>\n    \`\n  }\n];`
);

fs.writeFileSync(path.join(process.cwd(), 'data/articles.ts'), content, 'utf-8');
console.log('done modifying articles.ts');
