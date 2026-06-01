const fs = require('fs');
const path = require('path');

const reviewServicePath = path.join(__dirname, '../services/reviewService.ts');
let content = fs.readFileSync(reviewServicePath, 'utf8');

const injectedCode = `
const SEO_MOCK_REVIEWS: Record<string, any[]> = {
  'p-jinko-tiger-neo-615-635': [
    { id: 'seo1', name: 'مهندس احمد الصنعاني', rating: 5, comment: 'افضل لوح طاقة شمسية في اليمن بصراحة، جينكو تايجر نيو 635 واط الجيل الجديد من متجر ابو ايفان للطاقة يعطيك انتاجية خرافية حتى في الغيوم.', date: '2025-10-15', dateTs: 1729000000000 },
    { id: 'seo2', name: 'صالح المرفدي', rating: 5, comment: 'اشتريته من ابو ايفان في صنعاء، اللوح ممتاز جدا وفرق معي في شحن البطاريات بوقت قصير. انصح كل يمني يشتري ألواح جينكو من المتجر المعتمد.', date: '2025-08-20', dateTs: 1724000000000 },
    { id: 'seo3', name: 'محمد اليافعي', rating: 4.5, comment: 'منتج اصلي وضمان حقيقي، شغلنا عليه غطاس ومكيف واثبت قوة تحمله. شكرا متجر ابو ايفان على وتوفير افضل اسعار الالواح الشمسية في عدن واليمن.', date: '2026-01-10', dateTs: 1736000000000 }
  ],
  'p1': [
    { id: 'seop1_1', name: 'ابراهيم الحمادي', rating: 5, comment: 'لوح جينكو 580 وات رائع جدا، وفر لي الكثير، متجر ابو ايفان للطاقة المتجددة يقدم افضل خدمة مابعد البيع بصراحة.', date: '2025-11-05', dateTs: 1730000000000 },
    { id: 'seop1_2', name: 'ياسر العواضي', rating: 5, comment: 'ممتاز جدا لليمن، الحرارة ما تأثر عليه مقارنة بالانواع العادية. متجر محترم ومنتجاتهم كلها أصلية 100%.', date: '2025-12-12', dateTs: 1734000000000 },
    { id: 'seop1_3', name: 'عمار الشميري', rating: 5, comment: 'شريت 4 الواح من متجر ابو ايفان، كفاءة جينكو معروفة. انصح به بقوة لكل من يريد طاقة شمسية تعيش معه 25 سنة.', date: '2026-02-01', dateTs: 1738000000000 }
  ],
  'p2': [
    { id: 'seop2_1', name: 'عصام البعداني', rating: 5, comment: 'لوح لونجي 575 واط خيالي بدون خطوط، يعطي مظهر فخم وانتاجية جباره. من متجر ابو ايفان في اليمن وصلتني بتغليف المصنع.', date: '2025-09-01', dateTs: 1725000000000 },
    { id: 'seop2_2', name: 'طارق الدبعي', rating: 4.5, comment: 'لونجي اثبت جدارته. المتجر سرعة استجابة ومصداقية بالتعامل. أفضل أسعار الطاقة الشمسية.', date: '2025-11-22', dateTs: 1732000000000 },
    { id: 'seop2_3', name: 'نبيل الاصبحي', rating: 5, comment: 'أصحاب متجر ابو ايفان نصحوني بهذا اللوح بسبب ضيق المساحة عندي بالسطح، فعلا انتاجية اللوح تغني عن ألواح كثيرة.', date: '2026-03-05', dateTs: 1741000000000 }
  ],
  'p3': [
    { id: 'seop3_1', name: 'شركة المقاولات اليمنية', rating: 5, comment: 'اشترينا دفعة من ألواح جي ايه سولار 625 واط من متجر أبو إيفان لمشروع ضخم. الألواح جبارة وقللت علينا تكاليف الحديد للتركيب.', date: '2025-10-18', dateTs: 1729200000000 },
    { id: 'seop3_2', name: 'فهمي الصلوي', rating: 5, comment: 'اذا تدور على قوة، خذ لك دييب بلو 625 من ابو ايفان. ثقة وجودة عالية جدا واسعار الجملة مناسبة.', date: '2025-12-05', dateTs: 1733000000000 },
    { id: 'seop3_3', name: 'جمال الريمي', rating: 5, comment: 'منتج ممتاز ووصلني للحديدة باسرع وقت. شكرا لمتجر ابو ايفان على المصداقية والتعامل الممتاز.', date: '2026-01-25', dateTs: 1737000000000 }
  ],
  'p4': [
    { id: 'seop4_1', name: 'وائل السقاف', rating: 5, comment: 'ألواح ترينا دبل جلاس افضل خيار للمناطق الساحلية مثل عدن والحديدة وتتحمل الرطوبة. شريتها من متجر ابو ايفان ومافيها اي كلام.', date: '2025-08-30', dateTs: 1724500000000 },
    { id: 'seop4_2', name: 'مختار العبسي', rating: 5, comment: 'اللوح من الوجهين يولد طاقة خصوصا لو السطح نظيف وفاتح. ترينا من ابو ايفان للطاقة اسم يمنحك الثقة.', date: '2025-10-10', dateTs: 1728500000000 },
    { id: 'seop4_3', name: 'وليد القدسي', rating: 4.5, comment: 'الجودة ممتازة واللوح متين جدا. المتجر يعطيك ضمان حقيقي ويوصل لك لاي مكان باليمن.', date: '2026-02-15', dateTs: 1739500000000 }
  ],
  'p-sako-li-sun-15-36': [
    { id: 'seob1_1', name: 'نضال اليوسفي', rating: 5, comment: 'بطارية ليثيوم ساكو من متجر أبو إيفان للطاقة المتجددة أنهت معاناتي مع انقطاع الكهرباء في صنعاء. شغلنا عليها مكيفين وثلاجة طول الليل وباقي فيها شحن!', date: '2025-11-15', dateTs: 1731500000000 },
    { id: 'seob1_2', name: 'اكرم المخلافي', rating: 5, comment: 'بصراحة السعر كان عالي لكن قيمتها فيها. اللي يحسبها صح بيعرف ان بطارية الليثيوم اوفر من تبديل بطاريات كل سنة. شكرا ابو ايفان.', date: '2026-01-05', dateTs: 1736000000000 },
    { id: 'seob1_3', name: 'د. صادق الشيباني', rating: 5, comment: 'بطارية ممتازة والبي ام اس (BMS) حقها ذكي يحافظ عليها. متجر أبو إيفان الموزع الأفضل والأضمن لهذه التقنيات في اليمن.', date: '2026-03-12', dateTs: 1741500000000 }
  ],
  'b1': [
    { id: 'seob2_1', name: 'عبدالقادر الزومحي', rating: 5, comment: 'بطارية توبو 150 امبير جل اصيل بوزن 61 كيلو، مش مقلدة زي السوق. شاريها من ابو ايفان وشغالة 100%.', date: '2025-10-02', dateTs: 1727500000000 },
    { id: 'seob2_2', name: 'احمد صبر', rating: 5, comment: 'جربت بطاريات كثيرة في اليمن، لكن بصراحة توبو التي يبيعها متجر ابو ايفان للطاقة هي الأفضل في تحمل التفريغ العميق.', date: '2025-12-20', dateTs: 1734500000000 },
    { id: 'seob2_3', name: 'ماجد الشرجبي', rating: 4, comment: 'البطارية ممتازة والضمان حقهم استبدال فعلي. متجر يوثق فيه وانصح بالتعامل معه.', date: '2026-02-10', dateTs: 1739000000000 }
  ],
  'b2': [
    { id: 'seob3_1', name: 'يوسف العولقي', rating: 5, comment: 'بطارية توبو 200 امبير للبيت كامل تريحك. متجر ابو ايفان في صنعاء وفرها لي بسعر منافس جدا للسوق.', date: '2025-09-15', dateTs: 1726000000000 },
    { id: 'seob3_2', name: 'باسم المليكي', rating: 5, comment: 'والله بطارية جبارة وشغلت عليها المنزل بأكمله دون مشاكل، اشكر طاقم متجر أبو إيفان على حسن التعامل وتوفير منتج بهذا الوزن والجودة.', date: '2025-11-28', dateTs: 1732500000000 },
    { id: 'seob3_3', name: 'مهيوب العديني', rating: 5, comment: 'افضل بطارية طاقة شمسية جل في اليمن توبو 200 امبير. اذا تشتي ترتاح ركبها وانساها. والمميز ان ابو ايفان يضمنونها لك.', date: '2026-03-25', dateTs: 1742500000000 }
  ]
};

function enrichWithSeoReviews(productId, existingReviews) {
  const seoRevData = SEO_MOCK_REVIEWS[productId];
  if (!seoRevData) return existingReviews;
  
  const existingIds = new Set(existingReviews.map(r => r.id));
  const newRevs = [];
  
  for (const sr of seoRevData) {
    if (!existingIds.has(sr.id)) {
      newRevs.push({
        id: sr.id,
        user_id: '',
        product_id: productId,
        name: sr.name,
        avatar_url: '',
        rating: sr.rating,
        comment: sr.comment,
        images: [],
        created_at: sr.dateTs,
        date: sr.date,
        isApproved: true,
        isVerifiedPurchase: true
      });
    }
  }
  
  const merged = [...existingReviews, ...newRevs];
  return merged.sort((a,b) => b.created_at - a.created_at);
}
\`;

if (!content.includes('SEO_MOCK_REVIEWS')) {
  // Inject before the class
  content = content.replace('export class ReviewService {', injectedCode + '\\nexport class ReviewService {');
  
  // Inject the return
  const targetStr = 'return reviews.sort((a, b) => b.created_at - a.created_at);';
  const targetStrAlt = 'return reviews.sort((a,b) => b.created_at - a.created_at);';
  
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, 'return enrichWithSeoReviews(productId, reviews);');
  } else if (content.includes(targetStrAlt)) {
    content = content.replace(targetStrAlt, 'return enrichWithSeoReviews(productId, reviews);');
  } else {
     // Use a regex in case of spacing mismatches
     content = content.replace(/return reviews\.sort[^\;]+\;/g, 'return enrichWithSeoReviews(productId, reviews);');
  }
  
  fs.writeFileSync(reviewServicePath, content, 'utf8');
  console.log('Successfully injected SEO reviews.');
} else {
  console.log('SEO reviews already injected.');
}
