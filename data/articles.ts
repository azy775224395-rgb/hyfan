export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  date?: string;
  readingTime?: string;
  author?: string;
  category?: string;
}

export const articles: Article[] = [
{
  "id": "choosing-copper-cable-diameter-deep-wells",
  "title": "الحساب الدقيق لقطر الكيابل النحاسية للآبار العميقة (فوق 200 متر)",
  "excerpt": "الكيابل المغشوشة قد تحرق الغطاس! كيف تحسب سماكة الكيبل المناسب لمنع هبوط الفولتية في الآبار العميقة؟",
  "date": "2026-06-06",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "هندسة وحسابات",
  "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "كيابل نحاسية لغطاسات الآبار",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          إذا كنت تخطط لضخ المياه من بئر يتجاوز عمقه 200 متر، فإن اختيار الكابل النحاسي يصبح بنفس أهمية اختيار الغطاس نفسه. راجع <a href=\"#/blog/ultimate-solar-water-pumps-guide-yemen-2026-part1\" class=\"text-emerald-600 font-bold underline\">دليل الغطاسات الشمسية للآبار في اليمن</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">كارثة هبوط الجهد (Voltage Drop)</h2>\n        <p class=\"mb-4\">\n          كلما طال السلك زادت مقاومته. الغطاس الذي يبعد 300 متر للأسفل سيصل له فولت ضعيف إذا ركبت كيبل 6 ملي، مما يجبر محرك الغطاس على سحب أمبير عالي لتعويض نقص الفولت، والنتيجة: ذوبان ملفات الموتور واحتراق الغطاس! \n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أعرف الملي المناسب للغطاس؟</summary>\n            <p class=\"mt-2 text-gray-700\">هناك جداول هندسية جاهزة، ولكن كقاعدة عامة للآبار اليمنية العميقة لغطاس 7.5 حصان كحد أدنى استخدم كابل 10 أو 16 ملي نحاس صافٍ 100%.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل الكيابل الألمنيوم تنفع للآبار بدل النحاس لتوفير التكلفة؟</summary>\n            <p class=\"mt-2 text-gray-700\">إطلاقاً لا! الألمنيوم مقاومته عالية جداً وينقطع بسهولة داخل البيارات تحت ضغط وزن الماء وميله للتآكل.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "protecting-solar-pump-dry-run-sensors",
  "title": "حماية الغطاس الشمسي من التشغيل الجاف (Dry Run) باستخدام الحساسات المائية",
  "excerpt": "ماذا يحدث إذا نشف ماء البئر والغطاس الشمسي لا يزال يعمل؟ وكيف تمنع احتراقه باستخدام الحساسات الرخيصة.",
  "date": "2026-06-07",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "تركيبات وبرمجة",
  "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "حساسات المياه في الآبار",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          يعاني الكثير من المزارعين في اليمن من نضوب المياه المؤقت في بعض المواسم. إذا استمر اللوح بضخ الكهرباء لغطاس في بئر فارغ يحصل الكارثة. اقرأ معلومات أعمق عن الغطاسات في <a href=\"#/blog/ultimate-solar-water-pumps-guide-yemen-2026-part1\" class=\"text-emerald-600 font-bold underline\">الجزء الأول لدليل الغطاسات الزراعية</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">ماهو الغطس الجاف؟</h2>\n        <p class=\"mb-4\">\n          يحدث عندما يدور الموتور بسرعة هائلة لعدم وجود مقاومة مائية، فترتفع حرارته بشكل جنوني وتحترق القطع الروتور والكرس. الحل بسيط: حساس مستوى الماء (Water Level Sensor).\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">أين يتم تركيب حساس الماء في البئر؟</summary>\n            <p class=\"mt-2 text-gray-700\">يتم تركيبه بربطه بكيبل الغطاس على ارتفاع متر أو مترين فوق المضخة وتوصيله مباشرة إلى الإنفرتر الزراعي الذي سيقوم بإيقاف التشغيل فور انقطاع الإشارة المائية.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل يمكن الاستغناء عن الحساس وإيقافه عبر برمجة الإنفرتر؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم، يوجد في أغلب الإنفرترات الذكية وضع مراقبة الحمولة الخفيفة (Under-load warning) بحيث يفصل الإنفرتر إذا لاحظ انخفاض سحب الغطاس بشكل مفاجئ نظراً لغياب الماء، ولكنه ليس دقيقاً كالحساس الفيزيائي.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "stainless-steel-pumps-sulfur-salty-water",
  "title": "حلول غطاسات الستانلس ستيل في المياه الكبريتية والمالحة للمزارع اليمنية",
  "excerpt": "السر وراء اختيار معدن الغطاس! لماذا يتآكل غطاس الحديد في أسابيع داخل آبار الحديدة وحضرموت؟",
  "date": "2026-06-08",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "مقارنات معدات",
  "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "غطاسات ستانلس ستيل زراعية",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n           المزارعون في المناطق الساحلية كالحديدة وبعض مناطق شبوة وحضرموت يعانون من نسبة الملوحة العالية. يمكنك الإطلاع على خياراتنا من <a href=\"#/category/water-pumps\" class=\"text-emerald-600 underline\">الغطاسات المخصصة</a> لدينا.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">عدو المعدن في الماء المر</h2>\n        <p class=\"mb-4\">\n          غطاسات الـ Cast Iron (الزهر) ممتازة للمياه العذبة الجبلية، لكن في المياه المليئة بالأملاح والكبريت تذوب وتتآكل تماماً. الحل الاستثماري الناجح هو الغطاس الصنوع بالكامل (هيكل ومراوح) من الستانلس ستيل بدرجة 304 أو الأقوى 316.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل يختلف سعر الستانلس ستيل عن الزهر (الحديد المسبوك)؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم، الستانلس ستيل أغلى بنسبة تقارب 30% إلى 50%، ولكنه استثمار مضمون، فعمره الافتراضي في المياه القاسية يتجاوز الثلاثة أضعاف.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل مراوح الستانلس ستيل تتكسر أسرع من مروحة النوريل البلاستيك؟</summary>\n            <p class=\"mt-2 text-gray-700\">لا! الستانلس ستيل أصلب ومقاوم جداً لاحتكاك الرمال والحصى التي تتواجد بكثرة في المياه الجوفية مما يحفظ قوة الضخ لعشرات السنين دون ضعف.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "vfd-pump-inverter-programming-guide",
  "title": "دليل برمجة إنفرتر المضخات (VFD) للعمل بكفاءة من الصباح حتى المساء",
  "excerpt": "كيف تبرمج إنفرتر الغطاس (VFD) حتى يبدأ الضخ بقوة متصاعدة منذ طلوع الشمس ويمنع إرهاق الألواح.",
  "date": "2026-06-09",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "برمجة وإنفرترات",
  "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "إنفرتر الغطاس VFD",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n           عملية التدوير السلس (Soft Start) للغطاس هي السبب الرئيسي لانتشار الطاقة الشمسية في المزارع، لأن الإنفرترات الذكية (VFD) تدير الجهد بقوة تصاعدية. اقرأ أيضاً: <a href=\"#/blog/ultimate-solar-inverter-guide-yemen-2026\" class=\"text-emerald-600 underline\">دليل إنفرترات المنازل والمزارع السريع</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">التحكم بالترددات VFD!</h2>\n        <p class=\"mb-4\">\n          يجب ضبط الإنفرتر ليقوم ببدء سحب التردد (Frequency) تدريجياً من 0 هرتز وحتى 50 هرتز. هذا يمنع الشفط المفاجئ والقوي الذي يحرق المحرك أو يهز مواسير البئر بعنف ويسبب سقوط الغطاس!\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">متى يمكنني ضبط الغطاس للعمل؟</summary>\n            <p class=\"mt-2 text-gray-700\">قم بضبط الإنفرتر ليأخذ إشارة (Auto-start) بمجرد أن تتجاوز شمس الصباح قوة محددة للألواح حتى لا يهدر الإنفرتر جهده في المحاولات الفاشلة قبل شروق الشمس الكلي.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل أحتاج لوصلة حماية من الصواعق للإنفرتر المائي؟</summary>\n            <p class=\"mt-2 text-gray-700\">بكل تأكيد، الإنفرترات الزراعية مكسبة في العراء وأكثر عرضة للصواعق. تمديد خطوط الـ SPD ضروري مع وتد نحاسي للأرض.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "series-parallel-solar-panels-for-pumps",
  "title": "طريقة توصيل الألواح (توالي وتوازي) لتتناسب تماماً مع فولتية الغطاس",
  "excerpt": "تعلم الطريقة الهندسية لربط 20 لوح شمسي وما فوق توالي وتوازي للحصول على الأمبير والفولت المخصص للغطاس وحماية الإنفرتر.",
  "date": "2026-06-10",
  "readingTime": "6 دقائق",
  "author": "م. أبو إيفان",
  "category": "تركيب وهندسة",
  "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "توصيل الألواح التوالي والتوازي",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n           شرحنا سابقاً عن الألواح في دليل <a href=\"#/blog/ultimate-solar-panels-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الألواح الشمسية في اليمن</a>. الآن سنتكلم عن المصفوفات العملاقة!\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">قاعدة التوالي والتوازي ببساطة</h2>\n        <p class=\"mb-4\">\n          التوصيل على التوالي (الموجب في السالب) يرفع الفولتية (Voltage) ولا يغير الأمبير. التوصيل بالتوازي (الموجب بالموجب) يرفع الأمبير ولا يغير الفولتية. وبما أن الغطاس 3 فاز (380 فولت) يحتاج لحوالي 500-600 فولت من الألواح (DC) للعمل بأعلى قدرة.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أوصل 24 لوح 550 وات لغطاس 7.5 حصان 380V؟</summary>\n            <p class=\"mt-2 text-gray-700\">لوح 550 يعطي الفولت التقريبي المفتوح (Voc) 50V. للوصول لـ 600V، نضع 12 ألواح بالتوالي فنحصل على مصفوفة 600V. ثم نصنع مصفوفة ثانية 12 ألواح بتوالي مشابه، ونشبك المصفوفتين معاً بالتوازي لرفع الأمبير.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">ما أهمية الدايودات المانعة للرجوع (Blocking Diodes) في المصفوفات الضخمة؟</summary>\n            <p class=\"mt-2 text-gray-700\">توضع في صندوق التجميع (Combiner Box) لمنع رجوع التيار العكسي في حال تغطية سلسلة من الألواح بظل مفاجئ، وتحمي الألواح من الاحتراق.</p>\n          </details>\n        </div>\n      </div>\n    "
},

{
  "id": "growatt-lithium-battery-settings-yemen",
  "title": "ضبط إعدادات شحن الليثيوم في إنفرترات Growatt",
  "excerpt": "تعلم كيفية البرمجة الصحيحة لإنفرترات جروات (Growatt) للتعامل بشكل مثالي مع بطاريات الليثيوم في اليمن، لحمايتها وإطالة عمرها.",
  "date": "2026-05-26",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "صيانة وبرمجة",
  "image": "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "برمجة إنفرتر Growatt لبطاريات الليثيوم",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          للمزيد من المعلومات الأساسية، راجع <a href=\"#/blog/ultimate-solar-battery-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل الشامل لبطاريات الطاقة الشمسية في اليمن 2026</a>. العديد من المستخدمين في اليمن ينتقلون لبطاريات الليثيوم، لكنهم يغفلون عن ضبط إعدادات الإنفرتر بشكل يطابق متطلبات الـ BMS الخاص بالبطارية.\n        </p>\n        \n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">الخطوات العملية لضبط إنفرتر Growatt</h2>\n        <p class=\"mb-4\">\n          أولاً يجب اختيار نوع البطارية في القائمة (غالباً الخيار رقم 5) ليكون (LI) بدلاً من (AGM) أو (User). بمجرد اختيار (LI)، سيطلب منك الإنفرتر تحديد بروتوكول الاتصال. يمكنك الإطلاع على منتجاتنا في قسم <a href=\"#/category/batteries\" class=\"text-emerald-600 underline\">البطاريات</a> للحصول على بطاريات متوافقة 100%.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أضبط فولتية الشحن العائمة (Float Charge) لليثيوم؟</summary>\n            <p class=\"mt-2 text-gray-700\">في الحقيقة بطاريات الليثيوم لا تحتاج إلى Float Charge كبطاريات الجل، ونظام الـ BMS يتولى فصل الشحن عند الامتلاء. لكن إن احتجت لضبطها يدوياً فتكون عادة 53.2V لمنظومات الـ 48V.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل كابل الاتصال (Communication Cable) ضروري؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم، كابل الـ CAN/RS485 ضروري جداً بين بطارية الليثيوم وإنفرتر جروات ليتم التخاطب ومعرفة نسبة الشحن الفعلية (SOC) وتجنب التفريغ العميق القاتل للبطارية.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "gel-battery-failure-signs-yemen",
  "title": "علامات تلف بطاريات الجل وكيفية اكتشافها مبكراً",
  "excerpt": "تعرف على العلامات الخفية التي تدل على اقتراب نهاية عمر بطارية الجل الخاصة بك لتتجنب الانقطاع المفاجئ للتيار.",
  "date": "2026-05-27",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "صيانة",
  "image": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "بطاريات جل متضررة",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          يعتمد الكثيرون في الريف اليمني على بطاريات الجل. وإذا لم تكن مستعداً لشراء ليثيوم، فعليك حماية بطارياتك قدر الإمكان. لمقارنة شاملة، اقرأ <a href=\"#/blog/ultimate-solar-battery-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل العملاق لبطاريات الطاقة الشمسية</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">كيف تكتشف الهبوط الوهمي للمساء؟</h2>\n        <p class=\"mb-4\">\n          أهم علامة هي حين تشحن البطارية بالكامل وتظهر الشاشة 13.8V، ولكن بمجرد تشغيل حمل بسيط (كالشاشة والراوتر)، يهبط الفولت بشكل خيالي إلى 11.5V في دقائق. هذه الظاهرة نسميها في السوق اليمني \"الشحن الوهمي\".\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل انتفاخ البطارية يعني تلفها النهائي؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم، انتفاخ بطارية الجل من الجوانب يعني تلف الخلايا الداخلية بسبب الشحن الزائد (Overcharge) أو الحرارة، ويجب استبدالها فوراً قبل خطر الانفجار.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">لماذا يكون عمر البطارية قصير جداً عندي؟</summary>\n            <p class=\"mt-2 text-gray-700\">السبب الرئيسي في اليمن هو \"التفريغ العميق\"، عندما تهبط بالبطارية ليلاً إلى مستويات أقل من 11.0 فولت بشكل يومي مما يقضي على دورات حياتها.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "tubo-tubular-vs-flat-gel-batteries",
  "title": "مميزات بطاريات TUBO الأنبوبية عن البطاريات المسطحة",
  "excerpt": "لماذا تكتسح البطاريات الأنبوبية (مثل TUBO) السوق اليمني في الآونة الأخيرة؟ مقارنة هندسية بينها وبين الجل المسطح.",
  "date": "2026-05-28",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "مقارنات معدات",
  "image": "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "بطاريات أنبوبية للطاقة الشمسية",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          هل تحتار بين شراء بطارية جل مسطحة عادية أو بطارية أنبوبية (Tubular)؟ في <a href=\"#/blog/ultimate-solar-battery-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل الشامل للبطاريات</a> أوضحنا أن الاختيار يعتمد على دورات التفريغ.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">السر وراء قوة البطاريات الأنبوبية</h2>\n        <p class=\"mb-4\">\n          البطاريات الأنبوبية مثل علامة TUBO تمتلك شبكة رصاص أمتن وتغليفاً أسطوانياً للمادة الفعالة، مما يمنع تساقطها تحت ضغط الحرارة والتفريغ العميق. هذا يجعلها مثالية لتشغيل الأحمال الطويلة في الليل. يمكنك تصفح قسم <a href=\"#/category/batteries\" class=\"text-emerald-600 underline\">البطاريات</a> لطلبها الآن.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل بطارية TUBO الأنبوبية تحتاج صيانة ومعبأة بالأسيد؟</summary>\n            <p class=\"mt-2 text-gray-700\">هناك نوعان: أنبوبي سائل يحتاج لمراقبة وإضافة ماء مقطر كل فترة، وهناك الأنبوبي بصيغة الجل (Tubular Gel) وهو مفضل لدينا لأنه لا يحتاج الصيانة التقليدية.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">أيهما يعيش أطول: الجل المسطح أم الأنبوبي؟</summary>\n            <p class=\"mt-2 text-gray-700\">الأنبوبي يتفوق في دورات الحياة (Cycles) خصوصاً إذا كان حجم التفريغ يصل إلى 50% أو 80%، ولذلك ننصح بها في المناطق الحارة كمأرب وعدن.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "battery-terminals-maintenance-aden-hodeidah",
  "title": "صيانة أقطاب البطاريات في المناطق الساحلية (عدن والحديدة)",
  "excerpt": "الرطوبة العالية في عدن والحديدة تقتل البطاريات بالصمت عبر أكسدة الأقطاب. إليك نصائح ذهبية لمنع الكلس والصدأ.",
  "date": "2026-05-28",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "صيانة مناطقية",
  "image": "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "تنظيف أقطاب البطاريات",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          سكان الحديدة وعدن يعانون دائماً من مشكلة تكلس الأقطاب وانخفاض أداء المنظومة. للتعرف على المزيد حول تجهيزات المدن الساحلية، راجع قسم \"حلول مقاومة للرطوبة\" في <a href=\"#/blog/ultimate-solar-bundles-yemen-2026\" class=\"text-emerald-600 font-bold underline\">دليل عروض الطاقات الشاملة</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">ما هو مسحوق الكلس المالح؟</h2>\n        <p class=\"mb-4\">\n          الأملاح والمناخ الرطب تتفاعل مع غازات التفريغ مسببة عازلاً كبريتياً أبيض أو أخضر يمنع مرور التيار بشكل سليم. هذا يخدع الإنفرتر ويجعله يعتقد أن البطارية امتلأت بينما هي فارغة!\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أنظف الكلس من أقطاب البطارية بأمان؟</summary>\n            <p class=\"mt-2 text-gray-700\">باستخدام ماء ساخن مع قليل من صودا الخبز (البايكنج صودا). اسكبها ببطء على القطب، ثم استخدم فرشاة سلك خفيفة للتنظيف وجففها تماماً، ثم قم بطليها بالشحم أو الفازلين الخالي من الأسيد لمنع عودة التأكسد.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل ينفع استخدام الصابون العادي لتنظيف الأقطاب؟</summary>\n            <p class=\"mt-2 text-gray-700\">لا ينصح بالصابون لأنه قد يترك رواسب قلوية، البايكنج صودا هو الخيار الكيميائي الأسلم لمعادلة الأحماض المتسربة.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "calculate-200ah-battery-runtime-yemen",
  "title": "طريقة حساب زمن تشغيل بطارية 200 أمبير للأحمال المنزلية",
  "excerpt": "تعلم الحسبة الرياضية البسيطة التي تخبرك بالضبط متى ستنطفئ الكهرباء عنك في الليل، بناءً على نوع بطاريتك وأجهزتك.",
  "date": "2026-05-29",
  "readingTime": "6 دقائق",
  "author": "م. أبو إيفان",
  "category": "هندسة وحسابات",
  "image": "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "حساب سعة البطارية",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          معظم المشتريين يسألون: \"لو ركبت بطارية 200 كم باتمشيني؟\" لمعرفة المزيد عن كفاءات البطاريات المختلفة، راجع <a href=\"#/blog/ultimate-solar-battery-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل العملاق لبطاريات اليمن 2026</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">المعادلة الذهبية</h2>\n        <p class=\"mb-4\">\n          بطارية جل 200 أمبير @ 12 فولت = 2400 واط/ساعة كلي. ولكن لا يمكننا تفريغ الجل بأكثر من 50% لحمايتها، إذاً المتاح لك هو 1200 واط. لو كانت أحمالك شاشتين وإنارة وراوتر ومراوح صغيرة تستهلك 200 واط في الساعة، البطارية ستكفيك حوالي 6 ساعات (1200 ÷ 200 = 6).\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل تختلف الحسبة لبطاريات الليثيوم؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم! الليثيوم يسمح بتفريغ يصل لـ 80% أو أكثر، مما يعني أن بطارية ليثيوم 200 أمبير ستعطيك حوالي 1900 واط متاحة للاستخدام، فتكفيك لساعات أطول ونفس الأحمال.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">لماذا تنطفئ المروحة أسرع من المتوقع؟</summary>\n            <p class=\"mt-2 text-gray-700\">لأنك ربما لم تحسب ضياع الطاقة في الإنفرتر (الكفاءة عادة 90%) أو لأن أسلاك التيار المستمر (DC) نحيفة جداً وتستهلك طاقة على شكل حرارة مهدرة.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "how-to-clean-solar-panels-without-scratching",
  "title": "الطريقة الصحيحة لتنظيف الألواح من الغبار دون خدش الزجاج",
  "excerpt": "الغبار في المحافظات الشمالية والصحراوية في اليمن يمنع 20% من قدرة اللوح للتوليد. هكذا تنظفه كالمحترفين.",
  "date": "2026-05-30",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "صيانة",
  "image": "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "تنظيف الألواح الشمسية من الغبار",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          الألواح الشمسية تمثل المحرك الأساسي لمنظومتك، وتنظيفها الخاطئ أخطر من عدم تنظيفها! لمزيد من المعلومات، اقرأ <a href=\"#/blog/ultimate-solar-panels-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">دليل شراء الألواح الشمسية في اليمن</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">متى الوقت المثالي للتنظيف؟</h2>\n        <p class=\"mb-4\">\n          أهم قاعدة يغفل عنها الكثيرون هي تنظيف الألواح إما في الصباح الباكر جداً قبل أن تشرق الشمس بوضوح، أو في المساء. غسل الألواح وقت الظهيرة والزجاج ساخن بالماء البارد يؤدي لكسر الزجاج فوراً بسبب الصدمة الحرارية!\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">ما هي المادة المثالية للتنظيف عشان الألواح ما تتشمخ؟</summary>\n            <p class=\"mt-2 text-gray-700\">استخدم الماء النقي ويفضل خلطه بقطرات قليلة من صابون غسيل السيارات (وليس التايد) ثم المسح بممسحة مطاطية ناعمة (Squeegee) مخصصة للزجاج لتجنب الخدوش الصغيرة التي تخفض كفاءة اللوح.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل الغبار يقتل اللوح الشمسي؟</summary>\n            <p class=\"mt-2 text-gray-700\">لا يقتله فيزيائياً، ولكن تراكم الغبار الكثيف بعد موجات الرياح قد يخفض قدرة الشحن لديك بنسبة 15% الى 30% مما يحرم بطاريتك من الشحن الكامل.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "partial-shading-effect-on-solar-panels",
  "title": "تأثير الظلال الجزئية (سلك أو خزان) على إنتاجية المنظومة المربوطة",
  "excerpt": "ظل شجرة صغير أو سلك ممتد على طرف اللوح قد يطفئ منظومتك بالكامل. كيف تتعامل مع مشكلة الظلال في الأسطح اليمنية المزدحمة.",
  "date": "2026-05-30",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "هندسة وتركيب",
  "image": "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "ظلال على خلية الألواح الشمسية",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          عند توصيل سلسلة ألواح (String)، يكون النظام كاملاً بقوة أضعف خلية فيه! اقرأ أكثر في <a href=\"#/blog/ultimate-solar-panels-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">كيف نفهم تقنيات الألواح الشمسية</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">كارثة خزان المياه!</h2>\n        <p class=\"mb-4\">\n          عشوائية الأسطح في صنعاء وغيرها تدفع البعض لتركيب اللوح بجانب خزان المياه. حين يقع الظل على 10% من اللوح المعلق توالي مع 5 ألواح أخرى، فإن إنتاج المنظومة كلها قد يهبط لنصف القوة فوراً بفضل مبدأ الزجاجة الخانقة.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل تقنية Half-Cut تحل مشكلة الظلال تماماً؟</summary>\n            <p class=\"mt-2 text-gray-700\">تقنية الخلايا المقطوعة نصفياً (Half-Cut) تقلص المشكلة إلى النصف، ففي حال ظلل الجزء السفلي من اللوح، سيبقى الجزء العلوي ينتج طاقة وهذا أفضل بكثير من الألواح القديمة الكاملة.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أتجنب الظلال قبل التركيب؟</summary>\n            <p class=\"mt-2 text-gray-700\">استخدم قواعد حديدية لرفع الألواح لمستوى أعلى من الأسوار والخزانات المجاورة، وتتبع مسار الشمس من الصباح للغروب قبل التثبيت.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "verify-original-solar-panels-barcode-jinko-trina",
  "title": "كيفية قراءة باركود الألواح الأصلية (Trina & Jinko) والتمييز بينها وبين المقلد",
  "excerpt": "الأسواق ممتلئة بألواح (ستيكر معدل). كيف تستخدم هاتفك لكشف التزوير وحماية أموالك في اليمن.",
  "date": "2026-06-01",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "كشف الغش",
  "image": "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "باركود لوح شمسي وفحصه",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          تحدثنا مراراً في <a href=\"#/blog/ultimate-solar-panels-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل العملاق لمعرفة الألواح</a> عن فئات الجودة، ولكن الأهم هو عدم الوقوع ضحية للغش والتزوير المنتشر. نحن في متجرنا نقدم ألواح <a href=\"#/category/solar-panels\" class=\"text-emerald-600 underline\">أصلية ومضمونة فقط</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">السر في الزجاج!</h2>\n        <p class=\"mb-4\">\n          الباركود الحقيقي لا يكون ملصقاً خارجياً ورقياً يمكن طباعته في أي مكان، بل يكون مطبوعاً حرارياً محفوراً و(مدمجاً تحت طبقة الزجاج الأمامي)، ولا يمكن إزالته.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أستخدم موقع الشركة للفحص؟</summary>\n            <p class=\"mt-2 text-gray-700\">قم بمسح الباركود أسفل الزجاج بتطبيق قارئ الباركود، وقارن الرقم الناتج بالرقم التسلسلي في الملصق الخلفي، ثم أدخله في موقع الوكيل الرسمي أو موقع الشركة الصيني للتأكد من وجوده كقطعة أصلية مصنعة لديهم.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل السيليكون الأسود المبعثر يدل على أن اللوح مقلد؟</summary>\n            <p class=\"mt-2 text-gray-700\">بشكل كبير نعم! تصنيع الألواح العالمية مثل لونجي وجينكو يتم آلياً بروبوتات، فالسيليكون حول إطار الألمنيوم يكون متساوياً وأنيقاً تماماً، العشوائية تعني ورشات تجميع رخيصة.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "best-solar-panel-angle-sanaa-vs-aden",
  "title": "الزاوية المثالية لتركيب الألواح الشمسية في صنعاء مقابل عدن",
  "excerpt": "زاوية الميل والتوجيه تفرق في إنتاجك أكثر من 15%. كيف تضبط قاعدة الألواح الخاصة بك باحترافية؟",
  "date": "2026-06-02",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "تركيب وهندسة",
  "image": "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "توجيه الألواح الشمسية وزاويتها",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          الكثيرون يركبون الألواح بشكل أفقي تماماً وهذا خطأ شنيع. لكي تفهم زوايا السقوط يجب عليك مراجعة <a href=\"#/blog/ultimate-solar-panels-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل الشامل للتركيبات</a> وألواح الفئة أ.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">التوجيه الحتمي</h2>\n        <p class=\"mb-4\">\n          في اليمن، لأننا نقع في النصف الشمالي للكرة الأرضية، يجب أن تتجه الألواح دائماً وأبداً وبدون استثناء نحو (الجنوب الجغرافي). استخدم بوصلة الهاتف لضبط القاعدة.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كم درجة الميل الأنسب لصنعاء وعدن؟</summary>\n            <p class=\"mt-2 text-gray-700\">لمدينة صنعاء درجة الميل المثالية تقترب من 15-18 درجة، بينما في عدن والحديدة تكون الزاوية أقل (شبه منبسطة مع ميل خفيف لتسريب المطر) بحدود 12-14 درجة لأنها أقرب لخط الاستواء.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">ما أهمية الميل غير موضوع زاوية الشمس؟</summary>\n            <p class=\"mt-2 text-gray-700\">الميل مهم جداً للـ (Self-cleaning)، فميل اللوح يجبر مياه الأمطار على غسله بصورة طبيعية دون أن يركد الماء ويترك بقع طينية جافة على سطح الزجاج.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "aluminum-vs-galvanized-steel-solar-mounts",
  "title": "الفرق بين قواعد الألمنيوم والحديد المجلفن للألواح الشمسية",
  "excerpt": "ما هو أفضل خيار لتثبيت ألواحك ضد الرياح العاتية وهل حقاً يستحق الألمنيوم دفع الفارق المادي؟",
  "date": "2026-06-03",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "تركيبات",
  "image": "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "قواعد تثبيت الألواح",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          التثبيت القوي جزء لا يتجزأ من العروض الجبارة في <a href=\"#/blog/ultimate-solar-bundles-yemen-2026\" class=\"text-emerald-600 font-bold underline\">باقات أبو إيفان المخصصة للمنازل</a>. \n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">اختلاف المواد والمعادن</h2>\n        <p class=\"mb-4\">\n          الحديد العادي المدهون بالبرايمر يصدأ بسرعة خلال عامين خصوصاً بصنعاء وقت الأمطار أو بالمناطق الساحلية الندية. المجلفن (المغطى بالزنك) أقوى وأثقل ويعيش طويلاً ولكنه صعب التعديل في الموقع ويحتاج وزن إضافي للسقف. أما الألمنيوم فهو الأخف، لا يصدأ أبداً، وشكله أنيق، لكنه الأغلى.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل قواعد الألمنيوم تتحمل الرياح الشديدة؟</summary>\n            <p class=\"mt-2 text-gray-700\">نعم تماماً، القطاعات الهندسية للألمنيوم مصممة لامتصاص الصدمات وتأتي مع ملحقات وتدية مخصصة، بشرط أن يثبتها فني مختص بشكل دوراني محكم.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أمنع اللوح من أن يطير مع الرياح في السطح؟</summary>\n            <p class=\"mt-2 text-gray-700\">يجب وضع ثقل إسمنتي (بلك مملوء صبة أو قواعد خرسانية) لربط القواعد فيها، وتجنب استخدام سلك الربط المعماري الضعيف، استخدم \"Clamps\" (الشنابر المعدنية الجانبية والوسطية) وهي الطريقة الهندسية الوحيدة.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "sbu-mode-hybrid-inverters-explained",
  "title": "شرح وضعية SBU في الإنفرترات الهجينة ومتى يجب أن تستخدمها",
  "excerpt": "الوضعية السحرية للإنفرتر الهجين التي تمنحك استغلالاً أقصى للطاقة الشمسية وتوفر لك فواتير الكهرباء والمولدات التجارية.",
  "date": "2026-06-03",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "برمجة وإنفرترات",
  "image": "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "شاشة برمجة الإنفرتر والهجين",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          هل تشتري <a href=\"#/category/off-grid-inverters\" class=\"text-emerald-600 underline\">إنفرتراً ذكياً</a> ثم تستخدمه كمنظم شحن عادي؟ تعرف على كيفية التلاعب بإعدادات الطاقة لتبني ما تم تفصيله مسبقاً في <a href=\"#/blog/ultimate-solar-inverter-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">دليل إنفرترات الطاقة في اليمن</a>.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">ما هو SBU؟</h2>\n        <p class=\"mb-4\">\n          أحرف SBU تعني Solar (ألواح)، Battery (بطارية)، Utility (كهرباء أو ماطور تجاري). باختيارك لهذه الوضعية، أنت تخبر الإنفرتر بوضع الألواح أولوية أولى، والبطارية ثانياً، والكهرباء التجارية كملاذ أخير طارئ فقط. هذه إعدادات المهندسين الخبراء لتخفيف الفواتير!\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل أضع الوضعية SUB أم SBU أثناء اشتراكي مع المولدات التجارية؟</summary>\n            <p class=\"mt-2 text-gray-700\">دائماً SBU! إذا وضعت SUB فإن الإنفرتر سيخلط الكهرباء التجارية مع الألواح مما يرفع رصيد الفاتورة بشكل خفي دون أن تشعر!</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">أين أجد هذه الإعدادات في إنفرتر Voltronic أو Growatt؟</summary>\n            <p class=\"mt-2 text-gray-700\">غالباً تكون في البرنامج رقم (01) في الشاشة (Output Source Priority). واضغط Enter للحفظ ثم إعادة تشغيل الأحمال.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "fix-inverter-loud-fan-noise",
  "title": "أسباب وحلول مشكلة صوت المروحة المزعج في الإنفرتر الشمسي",
  "excerpt": "لماذا يصيح إنفرترك كطائرة نفاثة في الصيف، وكيف تُهدئ من روعه وتطيل عمره.",
  "date": "2026-06-04",
  "readingTime": "4 دقائق",
  "author": "م. أبو إيفان",
  "category": "صيانة أجهزة",
  "image": "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "مروحة التبريد للإنفرتر",
  "content": "\n      <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n        <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n          صوت مراوح التبريد للإنفرترات، خصوصاً إنفرترات التردد العالي، مزعج جداً داخل المنازل، وكما شرحنا في <a href=\"#/blog/ultimate-solar-inverter-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">الدليل الشامل للإنفرترات</a>، الصيانة الدورية تفصل بين جهاز يبقى طويلاً وآخر يحترق.\n        </p>\n\n        <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">التحذير الأول والأخير!</h2>\n        <p class=\"mb-4\">\n          لا تسدّ فتحات التهوية إطلاقاً ولا تضع الإنفرتر داخل دولاب مغلق. صوت المروحة ليس عيباً مصنعياً، هو استجابة طبيعية للـ (Load) العالي أو لحرارة الجو. المشتت الحراري يطلب برودة مستعجلة لحماية ترانزستورات الـ IGBT من الانصهار.\n        </p>\n\n        <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n        <div class=\"space-y-4\">\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">كيف أنظف الإنفرتر لتقليل صوت المروحة؟</summary>\n            <p class=\"mt-2 text-gray-700\">أطفئ الإنفرتر وافصله عن البطاريات والألواح تماماً، استخدم (Blower) منفاخ هواء هوائي لتنفيض الغبار المتراكم على مراوح السحب والدفع الشبكية بالأسفل والأعلى.</p>\n          </details>\n          <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n            <summary class=\"font-bold text-lg text-emerald-900\">هل يمكنني تغيير مروحة الإنفرتر بمروحة هادئة؟</summary>\n            <p class=\"mt-2 text-gray-700\">لا ينصح بتغييرها بمروحة تجارية ذات \"دورة\" أبطأ، هذا سيقلل الضجيج ولكنه سيحرق اللوحة الأم. استبدلها فقط في مراكز الصيانة المعتمدة بنفس الأمبير وRPM الأصلية.</p>\n          </details>\n        </div>\n      </div>\n    "
},
{
  "id": "how-to-choose-dc-breaker-solar-inverter",
  "title": "كيفية اختيار قاطع الـ DC المناسب بين الألواح والإنفرتر وتجنب الحرائق",
  "excerpt": "أكثر من 70% من حرائق المنظومات في اليمن سببها قواطع الـ AC الرخيصة التي توضع في مسار الألواح! دليلك الهندسي السريع.",
  "date": "2026-06-05",
  "readingTime": "5 دقائق",
  "author": "م. أبو إيفان",
  "category": "أمان وحماية",
  "image": "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=1600&fm=webp&fit=crop",
  "imageAlt": "قواطع وحمايات لمنظومة طاقة شمسية",
  "content": "\n       <div class=\"prose prose-lg prose-emerald max-w-none mb-12\">\n         <p class=\"lead text-2xl text-gray-600 font-medium leading-relaxed mb-8\">\n           لنكن واقعيين، حماية المنظومة هي أهم بند بعد شراء العتاد الأصلي، وقد تم التنويه لذلك بشدة في <a href=\"#/blog/ultimate-solar-protection-guide-yemen-2026\" class=\"text-emerald-600 font-bold underline\">دليل الحماية من الاحتراق والصواعق المتكامل</a>.\n         </p>\n \n         <h2 class=\"text-2xl font-black text-emerald-950 mt-8 mb-4\">الجريمة الكهربائية في السوق!</h2>\n         <p class=\"mb-4\">\n           فولتية التيار المستمر (DC) النازلة من الألواح لزجة وتشكل \"قوس كهربائي - Arc\" ناري إذا تم فصل الدائرة في الحمل. استخدام قاطع منزلي متردد (AC) لفصل خطوط الواح الشمسية هو قنبلة موقوتة، لأنه يعجز عن إخماد شرارة الـ DC ويحترق ويذوب. يجب شراء قاطع DC أصلي بحجم يتحمل (Isc) اللوح مضروباً بـ 1.25.\n         </p>\n \n         <h2 class=\"text-3xl font-black text-emerald-950 mt-12 mb-6\">أسئلة شائعة (البحث الصوتي)</h2>\n         <div class=\"space-y-4\">\n           <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n             <summary class=\"font-bold text-lg text-emerald-900\">كيف أحسب أمبير القاطع المناسب بين البطاريات والإنفرتر؟</summary>\n             <p class=\"mt-2 text-gray-700\">اقسم قوة الإنفرتر (بالوات) على فولتية البطاريات. مثلاً انفرتر 3000 واط لنظام 24 فولت (3000÷24 = 125). مع معامل أمان، تحتاج قاطع DC بطاريات 150 ملي أمبير.</p>\n           </details>\n           <details class=\"bg-gray-50 p-4 rounded-xl cursor-pointer\">\n             <summary class=\"font-bold text-lg text-emerald-900\">هل القواطع الذكية اللي تفصل من النقال آمنة؟</summary>\n             <p class=\"mt-2 text-gray-700\">آمنة إذا كانت مخصصة للجهد المستمر من ماركات معروفة مثل (TOMZN أو CHINT)، ولكن يُفضل الاعتماد على القواطع الميكانيكية اليدوية المعزولة بجانب البطاريات للظروف الطارئة جداً.</p>\n           </details>\n         </div>\n       </div>\n     "
},

  {
    id: "ultimate-solar-battery-guide-yemen-2026",
    title: "الدليل الشامل لبطاريات الطاقة الشمسية في اليمن 2026: كيف تختار أفضل بطارية لمنزلك؟",
    excerpt: "تعرف على كل ما يخص بطاريات الطاقة الشمسية في اليمن لعام 2026... المقارنة بين الليثيوم والجل، والمواصفات الفنية بالتفصيل.",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "دليل بطاريات الطاقة الشمسية في اليمن 2026",
    content: `
      <h2>البطارية: القلب النابض لمنظومة الطاقة الشمسية</h2>
      <p>مرحباً بك يا صديقي في هذا العالم المعقد والمتسارع. بصفتي خبيراً في مجال الطاقة المتجددة، دعني أكون صريحاً معك: يمكنك شراء أفضل وأغلى الألواح الشمسية في العالم، ويمكنك اقتناء إنفرتر بمواصفات خيالية، لكن إذا أخطأت في اختيار "محفظة الطاقة" الخاصة بك — وأقصد هنا <strong>بطاريات تخزين للطاقة الشمسية</strong> — فكل هذا الاستثمار سيذهب أدراج الرياح.</p>
      <p>في اليمن، حيث تتذبذب الكهرباء العمومية بشكل مستمر، وتحديداً مع مشكلة انقطاع الكهرباء في ذروة الصيف في محافظات مثل عدن والحديدة وغيرها، لم تعد المنظومة الشمسية مجرد رفاهية لإنارة مصباح، بل أصبحت شريان حياة حقيقي لتبريد منزلك، حفظ طعامك، وتسيير أعمالك. ومشكلة انقطاع الكهرباء لا تُحل من الجذور إلا ببطارية قوية ومناسبة قادرة على تخزين تلك الطاقة الثمينة من <strong>الألواح الشمسية</strong> وإمدادك بها عندما تغيب الشمس.</p>

      <h3>ما هي "دورة الحياة" (Cycle Life)؟ ولماذا هي المقياس الأهم؟</h3>
      <p>كثيراً ما يسألني العملاء: "هذه البطارية كم ستعيش معي؟ سنتين أم خمس؟" الجواب هنا لا يُقاس بالسنوات كضمان مطلق، بل بما يُسمى في علم الطاقة <strong>بدورة الحياة (Cycle Life)</strong>. دورة الحياة تعني ببساطة: كم مرة يمكنك تفريغ البطارية ثم شحنها بنسبة معينة (مثلاً 50% أو 80%) قبل أن تتدهور سعتها الأصلية وتصبح غير قادرة على تلبية احتياجات طاقة منزلك.</p>
      <p>تختلف هذه الدورات جذرياً بين بطارية وأخرى. فالبطاريات العادية قد تعطيك مئات الدورات القليلة (300-500 دورة)، بينما <strong>أفضل بطاريات طاقة شمسية</strong> من نوع "الجل" المحترمة تعطي 1000 إلى 1500 دورة. وتتسيد <strong>بطاريات ليثيوم في اليمن</strong> (LiFePO4) الساحة بتقديمها أكثر من 6000 دورة! هذا يعني ببساطة أن الليثيوم قد تدوم من 10 إلى 15 سنة، بينما الجل قد تخدمك 3 إلى 5 سنوات بناءً على طريقة استخدامك ومقدار استهلاكك (التفريغ العميق أو DoD).</p>

      <h3>مقارنة دقيقة: الجل vs الليثيوم vs الأنبوبية</h3>
      <p>دعنا نضع النقاط على الحروف في جدول مقارنة يوضح لك الفروقات التقنية والعملية لتتمكن من اتخاذ قرارك بكل وضوح وشفافية:</p>

      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base">
          <thead class="bg-emerald-50">
            <tr>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">الميزة / النوع</th>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">بطاريات الجل (Gel)</th>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">بطاريات الليثيوم (LiFePO4)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">دورة الحياة (Cycle Life)</td>
              <td class="py-3 px-4 border-b">1000 - 1500 دورة (عند تفريغ 50%)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">6000+ دورة (عند تفريغ 80%)</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">تحمل التفريغ العميق (DoD)</td>
              <td class="py-3 px-4 border-b">يُنصح بعدم تجاوز 50% كحد أقصى للحفاظ على عمرها.</td>
              <td class="py-3 px-4 border-b">ممتاز! يمكن تفريغها حتى 80% وأحياناً 90% بشكل آمن.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">سرعة الشحن والإمداد</td>
              <td class="py-3 px-4 border-b">بطيئة نسبياً وتحتاج لتيارات شحن أمبيرية محددة.</td>
              <td class="py-3 px-4 border-b">سريعة جداً وتقبل شحن أمبير عالي بوقت زمني أقصر.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">التكلفة والجدوى الاقتصادية</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">اقتصادية ومناسبة للميزانيات الحالية المتوسطة والمحدودة.</td>
              <td class="py-3 px-4 border-b">التكلفة الأولية عالية، لكنها الأوفر والأرخص على مدى 10 سنوات صيانة.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>وماذا عن البطاريات الأنبوبية (Tubular) مقابل بطاريات الأسيد السائلة التقليدية؟</h4>
      <p>في متجر أبو إيفان للطاقة المتجددة، نحن نوفر العديد من العلامات التجارية الموثوقة جداً مثل بطاريات <strong>Tubular TUBO</strong>. البطاريات الأنبوبية (Tubular) صُممت بلوحات رصاصية على شكل أنابيب تتحمل التآكل والتفريغ العميق أفضل بمرات عديدة من البطاريات السائلة العادية ذات الألواح المسطحة. إنها ممتازة لتحمل الحرارة والضغط العالي المستمر، وتعتبر مناسبة جداً لمشاريع المحلات التجارية وحلول <strong>طاقة شمسية للمنازل</strong> ذات الاستهلاك المتوسط. أما بطاريات الأسيد السائلة العادية (الخاصة بالسيارات)، فلا ننصح بها إطلاقاً للاستخدام الممتد في الطاقة الشمسية لأنها مصممة أساساً لإنتاج تيار عالي في ثوانٍ معدودة، وليس للإمداد المستمر لساعات.</p>

      <h3>تأثير درجات الحرارة القاسية في مناطقنا</h3>
      <p>درجة الحرارة هي "القاتل الصامت" لجميع البطاريات. في محافظات كـ عدن، الحديدة، وحضرموت حيث تصل الحرارة ذروتها صيفاً، يجب أن تعلم تفصيلة تقنية مهمة: <strong>لكل ارتفاع بمقدار 10 درجات مئوية فوق المعدل (25 درجة مئوية)، ينخفض عمر بطارية الجل أو الرصاص بمقدار النصف!</strong> ولهذا السبب، فإن العناية بموقع البطاريات وتوفير مكان جيد التهوية وبارد بعيداً عن أشعة الشمس المباشرة هو أمر حتمي ولا غنى عنه.<br>
      في المقابل، تتميز بطاريات الليثيوم باحتوائها على نظام إدارة الخلايا الذكي (BMS) وهو بمثابة "دماغ إلكتروني" يراقب درجة حرارة كل خلية داخلية، ويوقف تلقائياً الشحن أو التفريغ إذا وصلت الحرارة لمستويات تُنذر بالخطر، ليحافظ على استثمارك المالي بذكاء وحماية مطلقة.</p>

      <h3>كيف تقرأ ملصق البطارية كالمهندسين؟ (Ah, V, C-Rating)</h3>
      <p>صديقي، عندما تتخذ قراراً بشراء بطارية، يجب ألا تكتفي بكلمة المبيعات الشهيرة "حجمها 200 أمبير". اقرأ الملصق الهندسي بعناية:</p>
      <ul>
        <li><strong>السعة أو الكثافة (Ah):</strong> مثلاً تجد مكتوباً 200Ah، وهي ببساطة تعني مقدار الشحنة الإجمالية التي يمكن تخزينها في هذا الصندوق.</li>
        <li><strong>الفولتية (V):</strong> وتكون 12V للمنظومات المنزلية الخفيفة، أو 24V و 48V (كما هو الحال غالباً في الليثيوم والأنظمة الكبيرة) لتشغيل الأحمال العالية كالتكييف والغسالات ومضخات المياه.</li>
        <li><strong>معدل وتيرة التفريغ (C-Rating):</strong> ابحث دائماً عن رمز C10 المكتوب غالباً على أغطية بطاريات الجل الجيدة، وهذا التصنيف التصنيعي يعني أن البطارية صُممت هندسياً لتفرغ كامل سعتها وتُعطيك طاقتها على مدار بـ 10 ساعات متواصلة (وهي المثالية لك في الليل). احذر تماماً من بعض البطاريات ذات C100 أو C20 إذا كان استهلاكك سريعاً وحمولي (يجب الاسترشاد برأي خبير).</li>
      </ul>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">نصائح الصيانة الذهبية: دليلك لإطالة عمر البطارية إلى الضعف</h2>
      <p>لنكن واضحين، حتى أغلى بطارية في العالم ستتلف خلال أشهر إذا أسأت معاملتها. سر العمر الطويل يكمن في "الضبط القمري" لإنفرترك، والاهتمام اليومي.</p>

      <h3>1. البرمجة الصحيحة للإنفرتر (شريان الحياة)</h3>
      <p>يجب أن تضبط إنفرترك (أو منظم الشحن) بدقة بحسب نوع بطاريتك. كل بطارية لها "دليل مستخدم" يذكر القيم الصحيحة، ولكن دعني أعطيك الجوهر:</p>
      <ul>
        <li><strong>مرحلة الشحن العالي (Bulk/Boost Charge):</strong> للبطاريات الجل غالباً ما تكون بين 14.2V - 14.4V للبطارية الواحدة (28.4V لمنظومة 24V). أما الليثيوم LiFePO4 فيُنصح بضبطها بين 14.4V - 14.6V.</li>
        <li><strong>التبخير أو الامتصاص (Absorption):</strong> وهي مرحلة شحن بطيئة أخيرة لإيصال البطارية لـ 100% دون تسخينها.</li>
        <li><strong>شحن التعويم (Float Charge):</strong> للجل تكون حوالي 13.5V - 13.8V، ولليثيوم (أحياناً تلغى هذه المرحلة في أنظمة الـ BMS الذكية أو توضع على 13.6V). وظيفة الـ Float تعويض النقص البسيط وإبقاء البطارية مشحونة بالكامل.</li>
        <li><strong>جهد القطع المنخفض (Low DC Cut-off):</strong> <strong>هنا يقع الخلل الأكبر!</strong> لا تترك الإنفرتر يستمر في التفريغ حتى 10V. لبطاريات الجل، اضبط فصل الإنفرتر (Cut-off) على 11.5V - 11.8V لحمايتها من الموت المفاجئ.</li>
      </ul>

      <h3>2. التهوية ونظافة الأقطاب (الصيانة الفيزيائية)</h3>
      <ul>
        <li>احذر من التكديس! اترك فراغاً (على الأقل 2-5 سم) بين كل بطارية وأخرى ليسمح بتبديد الحرارة.</li>
        <li>كل شهر، تأكد من نظافة أقطاب البطارية السالب والموجب. تراكم الأملاح الخضراء والبيضاء يسبب مقاومة كهربائية عالية، فترتفع حرارة الكيبل وتقل كفاءة الشحن.</li>
        <li>نظّف الأقطاب بقطعة قماش جافة (أو بقليل من الماء الساخن بحذر إذا تراكمت الأملاح في البطاريات السائلة)، وشد البراغي (صواميل الأقطاب) المرتخية؛ لأن "الرخاوة" تسبب شراراً وتآكلاً وتولد حرارة مدمرة.</li>
      </ul>

      <h3>3. جدول الصيانة الدورية المقترح</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base text-center">
          <thead class="bg-emerald-50">
            <tr>
              <th class="py-3 px-4 border-b text-emerald-900 font-bold">الفترة الزمنية</th>
              <th class="py-3 px-4 border-b text-emerald-900 font-bold">الإجراء المطلوب</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">أسبوعياً</td>
              <td class="py-3 px-4 border-b text-right">مراقبة عداد الإنفرتر للتأكد من وصول البطارية للامتلاء الكامل (100% أو Float) بفضل نظامك الشمسي وعدم بقائها فارغة لعدة أيام متواصلة.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">شهرياً</td>
              <td class="py-3 px-4 border-b text-right">التأكد من شد البراغي (الصواميل) الخاصة بالأقطاب. مسح البطاريات من الأتربة لضمان التبريد الجيد.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">كل 6 أشهر</td>
              <td class="py-3 px-4 border-b text-right">إعادة برمجة الإنفرتر إذا لاحظت تغيرات (مثل انخفاض إنتاجية الألواح بسبب تراكم الغبار العنيف). وإذا توفر فحص أومية (Internal Resistance)، يفضل فحص البطاريات في المنظومة.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">التحليل الاقتصادي الشامل: متى يكون "الغالي هو الأرخص"؟</h2>
      <p>كثير من الزبائن يسألونني: "لماذا أشتري بطارية ليثيوم بـ ثلاثة أضعاف سعر الجل؟". الإجابة تكمن في الحسبة الاستثمارية طويلة الأمد:</p>
      
      <p><strong>السيناريو الأول: بطاريات جل رخيصة:</strong><br/>
      تشتري بطارية جل بـ 200 دولار تقريباً (مثال افتراضي). تستهلكها بشكل عميق، فتموت بعد سنتين. تشتري أخرى بـ 200 دولار، وتموت بعد سنتين... على مدار 10 سنوات، ستدفع <strong>1000 دولار للصيانة والتغيير!</strong> علاوة على مشقة حمل البطاريات، والمفاجآت بانقطاع الكهرباء.</p>
      
      <p><strong>السيناريو الثاني: الاستثمار في تكنولوجيا ذكية (مثل الليثيوم أو Tubular عالية الجودة):</strong><br/>
      تستثمر 800 دولار في بطارية ليثيوم 100 أمبير (والتي تعادل في قوة تفريغها بطارية جل 200 أمبير لأنه يمكنك تفريغها لـ 90%).<br/>
      تمر الـ 10 سنوات وبطاريتك صامدة لآلاف الدورات. <strong>لقد وفرت مئات الدولارات</strong>، حظيت براحة بال مطلقة ولا وجود لرحلات الصيانة المرهقة!</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">حالات واقعية من اليمن (Case Studies): ماذا أختار؟</h2>
      <ul class="space-y-4">
        <li><strong>منظومة منزلية صغيرة إلى متوسطة (إنارة، شاشات، ثلاجة منزلية صغيرة):</strong><br/>
        البطارية المثالية هنا هي <strong>بطارية الجل العالية الجودة العميقة التفريغ (Deep Cycle Gel)</strong>. تكلفتها معقولة لتغطية هذه الأحمال، وإذا لم تستهلكมากกว่า 50% سترتاح كثيراً لـ 3-5 سنوات.</li>
        
        <li><strong>بقالة تجارية أو سوبرماركت (تشغيل ثلاجات مركزية لساعات):</strong><br/>
        يحتاج البقال لـ "وحش تحمل". أنصح وبشدة بـ <strong>البطاريات الأنبوبية (Tubular)</strong> من ماركة مرموقة كـ TUBO، نظراً لتحملها القاسي للضغط المستمر في الأجواء الحارة دون أن تتلف خلاياها بسرعة.</li>
        
        <li><strong>منظومة منزلية كبيرة أو مشروع يعتمد 100% على الطاقة في بيئة حارة (عدن، الحديدة):</strong><br/>
        لا يوجد خيار منطقي هنا سوى <strong>الليثيوم (LiFePO4)</strong>. إنها استثمار المليون. ستوفر لك السلاسة، لا خوف من التفريغ العميق للمكيفات، ونظام الـ BMS سيقيها شر الحرارة التي تدمر باقي الأنواع.</li>
      </ul>

      <div class="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">هل أنت مستعد لاختيار القلب النابض لمنظومتك؟</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          في <strong>أبو إيفان للطاقة المتجددة</strong>، نحن لا نبيع معدات؛ نحن نقدم حلولاً مصممة بالمللي متر لاحتياجاتك الحقيقية.
          فريقنا الهندسي جاهز لتحليل أحمالك واقتراح البطارية الأنسب والأوفر لك، وضمان البرمجة المثالية لإنفرترك!
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/batteries" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">استكشف قسم البطاريات</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-900 transition shadow-lg border border-emerald-500 w-full sm:w-auto">استشارة هندسية مجانية</a>
        </div>
      </div>

      <h3 class="text-2xl font-black text-emerald-900 mt-8 mb-4">اقرأ أيضاً (مقالات ذات صلة):</h3><ul class="list-disc pr-6 mb-8 text-gray-700 font-bold"><li><a href="#/blog/growatt-lithium-battery-settings-yemen" class="text-emerald-600 underline">ضبط إعدادات شحن الليثيوم للإنفرتر</a></li><li><a href="#/blog/tubo-tubular-vs-flat-gel-batteries" class="text-emerald-600 underline">مميزات بطاريات TUBO الأنبوبية والمسطحة</a></li></ul><h3 class="text-2xl font-black text-emerald-900 mt-8 mb-4">اقرأ أيضاً (مقالات ذات صلة):</h3><ul class="list-disc pr-6 mb-8 text-gray-700 font-bold"><li><a href="#/blog/how-to-clean-solar-panels-without-scratching" class="text-emerald-600 underline">الطريقة الصحيحة لتنظيف الألواح من الغبار</a></li><li><a href="#/blog/verify-original-solar-panels-barcode-jinko-trina" class="text-emerald-600 underline">كيفية قراءة باركود الألواح الأصلية (Trina & Jinko) والتمييز بينها وبين المقلد</a></li></ul><h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كم سعر بطارية الليثيوم في اليمن؟</summary>
          <p class="mt-2 text-gray-700">الأسعار تتراوح بين 600 إلى 1200 دولار أمريكي للـ 100 أمبير (48 فولت) تقريباً، حسب الماركة ومدى ذكاء نظام الـ BMS المدمج بها.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كيف أعرف أن بطارية الليثيوم أصلية؟</summary>
          <p class="mt-2 text-gray-700">تأكد من وجود باركود مصنعي، واسأل عن شهادات الوكالة، ولا تتردد في طلب فحص داخلي بالكمبيوتر لبرمجة הـ BMS من المهندس.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">متى أختار بطارية جل ومتى أختار ليثيوم؟</summary>
          <p class="mt-2 text-gray-700">الجل للإضاءة والأحمال الخفيفة والميزانيات المتوسطة. الليثيوم مخصصة للمكيفات والأحمال الثقيلة والمناطق الشديدة الحرارة كعدن والحديدة.</p>
        </details>
      </div>
    `
  },
  {
    id: "how-to-choose-solar-system-yemen",
    title: "دليل المبتدئين: كيف تختار منظومة الطاقة الشمسية المناسبة لمنزلك في اليمن؟",
    excerpt: "تعلم كيفية حساب أحمال الطاقة الشمسية لمنزلك، والفرق بين الأنظمة، وأهمية جودة الألواح والبطاريات.",
    image: "https://images.unsplash.com/photo-1509391366360-1e97f52cefd3?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "منظومة طاقة منزلية، تركيب الألواح الشمسية على سطح منزل في اليمن",
    content: `
      <h2>أهمية اختيار منظومة الطاقة الشمسية المناسبة</h2>
      <p>مع تزايد الاعتماد على الطاقة البديلة، أصبح امتلاك <strong>منظومة طاقة منزلية</strong> ضرورة لا غنى عنها للحصول على كهرباء مستقرة وموفرة. في هذا الدليل، سنشرح لك كيفية التخطيط واختيار الأنظمة الأفضل لضمان <strong>توفير الكهرباء في اليمن</strong> بشكل مستدام.</p>

      <h3>1. كيفية حساب أحمال الطاقة الشمسية</h3>
      <p>أول خطوة هي <strong>حساب أحمال الطاقة الشمسية</strong> الخاصة بك بدقة. قم بتسجيل جميع الأجهزة التي ترغب بتشغيلها:</p>
      <ul>
        <li><strong>الإضاءة والمراوح:</strong> عادة لا تستهلك الكثير، ولكن احسب عددها وساعات التشغيل.</li>
        <li><strong>الثلاجة والأجهزة الكبيرة:</strong> تحتاج إلى تيار بدء (Inrush Current) أعلى وإنفرتر قوي (يفضل نظام 24 فولت أو 48 فولت).</li>
        <li><strong>الأجهزة الإلكترونية الصغيرة:</strong> مثل التلفاز وشواحن الهواتف يجب تضمينها.</li>
      </ul>
      <p>بعد جمع إجمالي الوات المستهلك يومياً، يمكنك تحديد سعة الألواح وحجم البطاريات المطلوبة لتحمل هذا العبء.</p>

      <h3>2. الفرق بين الأنظمة الصغيرة والكبيرة</h3>
      <p>تختلف الأنظمة بناءً على احتياجك. الأنظمة الصغيرة (12 فولت) قد تكفي للإضاءة والتلفاز الصغير، في حين أن تشغيل ثلاجة ومضخات מياه يتطلب أنظمة أكبر (24 إلى 48 فولت)، لضمان استقرار فولتية النظام وتقليل الضياعات في الكيبلات.</p>

      <h3>3. جودة الألواح والبطاريات</h3>
      <p>لا تساوم أبداً على جودة الألواح والبطاريات! ابحث دائماً عن الألواح المصنفة Tier 1 والبطاريات ذات السمعة العالية. زيارة قسم <a href="#/category/solar-panels" class="text-emerald-700 font-bold underline">الألواح الشمسية</a> ستعطيك فكرة عن التكنولوجيا الحديثة.</p>

      <div class="bg-gray-50 border border-emerald-100 rounded-2xl p-6 mt-8 mb-4 text-center">
        <h4 class="text-xl font-bold text-emerald-900 mb-2">هل تحتاج مساعدة في حساب منظومتك؟</h4>
        <p class="text-gray-700 mb-4">فريقنا في أبو إيفان للطاقة المتجددة جاهز لحساب أحمالك وتصميم النظام الأمثل لك.</p>
        <a href="https://wa.me/967784400333" class="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl relative hover:bg-emerald-700 transition">تواصل معنا الآن للاستشارة المجانية</a>
      </div>
    `
  },
  {
    id: "lithium-vs-gel-batteries-yemen",
    title: "مقارنة شاملة: بطاريات الليثيوم vs بطاريات الجل.. أيهما الأفضل لأجواء اليمن؟",
    excerpt: "تعرف على الفروقات الأساسية بين بطاريات الليثيوم والجل من حيث العمر الافتراضي وتحمل الحرارة والتكلفة.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "أفضل بطاريات طاقة شمسية، مقارنة بين بطاريات الليثيوم والجل",
    content: `
      <h2>اختيار أفضل بطاريات طاقة شمسية</h2>
      <p>عند بناء أنظمة الطاقة الشمسية، يحتار الكثيرون بين تقنيات البطاريات المختلفة. في هذه المقالة سنعقد مقارنة تفصيلية لاختيار <strong>أفضل بطاريات طاقة شمسية</strong> تلائم الظروف المناخية في مناطقنا.</p>

      <h3>العمر الافتراضي ودورات الشحن</h3>
      <p>تتميز <strong>بطاريات ليثيوم في اليمن</strong> بعمر افتراضي طويل جداً يتجاوز 6000 دورة شحن، مما يجعلها استثماراً رائعاً على المدى الطويل. بينما بطاريات الجل تقدم متوسط 1000 إلى 1500 دورة شحن، وهي ممتازة للأنظمة الاقتصادية والمتوسطة.</p>

      <h3>تحمل الحرارة وأجواء اليمن</h3>
      <p>بطاريات الجل (Gel) معروفة بتحملها الجيد للحرارة العالية، وهو أمر ضروري في معظم المدن. ومع ذلك، تقنية الليثيوم الحديثة (LiFePO4) أصبحت تأتي بأنظمة إدارة بطاريات ذكية (BMS) تحميها من الحرارة الزائدة والتفريغ العميق.</p>

      <h3>التكلفة مقابل الأداء</h3>
      <ul>
        <li>بطاريات الجل: تكلفة أولية أقل، مثالية للميزانيات المحدودة للمنازل.</li>
        <li>بطاريات الليثيوم: تكلفة مبدئية أعلى ولكنها الأرخص على المدى البعيد لعدم الحاجة لاستبدالها لسنوات طويلة.</li>
      </ul>
      <p>استكشف مجموعتنا من <a href="#/category/batteries" class="text-emerald-700 font-bold underline">بطاريات الجل والليثيوم</a> بأفضل الأسعار.</p>

      <h3>صيانة بطاريات الطاقة الشمسية</h3>
      <p>كلا النوعين (الجيل والليثيوم) يعتبران "معفيين من الصيانة" (Maintenance Free)، إلا أن <strong>صيانة بطاريات الطاقة الشمسية</strong> تشمل الحفاظ على أماكن جيدة التهوية والتأكد من ضبط قيم الفولتية في الإنفرتر أو المنظم بشكل صحيح لتفادي الانتفاخ أو التلف المبكر.</p>

      <div class="bg-gray-50 border border-emerald-100 rounded-2xl p-6 mt-8 mb-4 text-center">
        <h4 class="text-xl font-bold text-emerald-900 mb-2">محتار في اختيار بطاريتك؟</h4>
        <p class="text-gray-700 mb-4">نحن هنا للإجابة على جميع تساؤلاتك ومساعدتك في اختيار التقنية الأنسب لطلبك ولميزانيتك!</p>
        <a href="https://wa.me/967784400333" class="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 transition">راسلنا على واتساب</a>
      </div>
    `
  },
  {
    id: "ultimate-solar-panels-guide-yemen-2026",
    title: "دليل الألواح الشمسية في اليمن 2026: كيف تختار أفضل لوح شمسي لسطحك؟",
    excerpt: "ما الفرق بين N-Type و P-Type؟ وما هي تقنيات الألواح الحديثة؟ الدليل الشامل والمفصل لاختيار ألواحك الشمسية وتقنيات الفحص والتركيب في اليمن.",
    image: "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "ألواح ترينا وجينكو أفضل أنواع الألواح الشمسية",
    content: `
      <h2>حقول الطاقة: كيف تختار "محرك" منظومتك بدقة هندسية؟</h2>
      <p>مرحباً بك مجدداً في مدونة أبو إيفان للطاقة المتجددة. إذا كانت البطارية هي "القلب" الذي يخزن الطاقة، فإن الألواح الشمسية هي "المحرك" الأساسي الذي يصطاد فوتونات الضوء ويحولها لتيار كهربائي. في سوق يعج بعشرات الأسماء واللقصات التجارية، كيف تضمن أنك لا تدفع أموالك في "زجاج" رديء يفقد نصف طاقته بعد عام واحد؟</p>
      <p>في هذا الدليل العملاق لعام 2026، لن نتحدث بلغة مندوبي المبيعات، بل بلغة الخبراء. سنفكك طلاسم التقنيات الحديثة، ونشرح لك ببساطة لماذا نركز في أبو إيفان على الثلاثة الكبار: <strong>Trina Solar</strong>، <strong>JA Solar</strong>، و <strong>Jinko Solar</strong>.</p>

      <h3>معركة التقنيات الجوهرية: P-Type مقابل N-Type</h3>
      <p>ربما سمعت الكثيرين يروجون لـ "ألواح N-Type"، لكن ما هي حقاً؟ ولماذا هي ثورة؟<br>
      في تصنيع شرائح السيليكون (الخلايا الشمسية)، يتم "تطعيم" السيليكون بمواد أخرى لجعله موصلاً. 
      </p>
      <ul>
        <li><strong>تقنية P-Type (النوع الموجب):</strong> هي التقنية التقليدية التي هيمنت على السوق لعقد كامل. يتم فيها تطعيم السيليكون بمادة "البورون". عيبها القاتل هو تعرضها لظاهرة التدهور الناجم عن الضوء (LID)، مما يعني أن اللوح يفقد جزءاً من كفاءته في الأسابيع الأولى من تشغيله!</li>
        <li><strong>تقنية N-Type (النوع السالب):</strong> هنا يتم التطعيم بمادة "الفوسفور". هذه التقنية محصنة تقريباً ضد الـ LID (التدهور الأولي). والأهم من ذلك؟ <strong>تلتقط طيفاً أوسع من الضوء وتتمتع بكفاءة تحويل أعلى (تتجاوز 22-23%).</strong> في الأجواء اليمنية الحارة، الألواح من نوع N-Type تتغلب على P-Type بسهولة تامة في الإنتاجية الصافية والكفاءة طويلة الأمد.</li>
      </ul>

      <h3>كتالوج التقنيات الفضائية: ما معنى Half-Cut و Bifacial؟</h3>
      <p>الشركات العالمية لا تتوقف عن الابتكار، واليوم نجد هذه المصطلحات على نصف الألواح في الأسواق، فما أهميتها السحرية لمشروعك؟</p>
      <p><strong>1. تقنية الخلايا المقطوعة نصفياً (Half-Cut Cells):</strong><br>
      تتكون الألواح العادية من خلايا كاملة. تقنية Half-Cut تعني قطع الخلية نصفين عبر الليزر. الفائدة؟ تنخفض المقاومة الكهربائية داخل اللوح للنصف، فتقل الحرارة الداخلية التي يولدها اللوح نفسه، والأهم: <strong>التعامل مع الظلال.</strong> إذا سقط ظل شجرة المدار أو غيمة عابرة على نصف اللوح، النصف الآخر يستمر بالعمل بكفاءة 100%، بينما في الألواح العادية يتوقف اللوح بأكمله (أو يفقد معظمه)!
      </p>
      <p><strong>2. الألواح ثنائية الوجه (Bifacial):</strong><br>
      لوح بخلايا قادرة على امتصاص الضوء من الأمام (الواجهة المباشرة للشمس) ومن الخلف (الضوء المنعكس من الأرضية، سواء كانت بلاط أو سطح مدهون)! هذه التقنية قد تزيد من إنتاجيتك بنسبة تصل إلى 5% - 20% تقريباً دون إضافة لوح واحد. ممتازة جداً لمظلات السيارات والمساحات المكشوفة.</p>

      <h3>معامل الحرارة (Temperature Coefficient): السر الذي يخفيه البعض في اليمن!</h3>
      <p>خذ هذه القاعدة الذهبية: <strong>الألواح الشمسية تكره الحرارة!</strong> يُصمم اللوح ليُعطي قوته القصوى (مثلاً 580 وات) عند درجة حرارة 25 مئوية. فماذا يحدث في ظهيرة الحديدة المكوية أو صحراء مأرب عندما تصل حرارة السطح إلى 45-50 مئوية؟</p>
      <p>هنا يأتي دور (معامل الحرارة). ستجد في الملصق قيمة مثل: (-0.29% / °C). هذا يعني أنه لكل درجة حرارة فوق الـ 25 تتراجع كفاءة اللوح بنسبة 0.29%.<br>
      الألواح الحديثة (مثل تقنية N-Type الموجودة في Jinko و JA) تتمتع بمعامل حراري منخفض جداً مقارنة بالألواح القديمة، مما يعني <strong>طاقة أعلى بـ 10% إلى 15% طوال وقت العصر الحار!</strong></p>

      <h3>صراع الجبابرة: مقارنة الماركات (Trina, JA, Jinko) في متجرنا</h3>
      <p>لم نختر هذه الثلاثة عبثاً في متجر أبو إيفان. جميعها شركات <strong>Tier 1</strong> (مستوى أول عالمياً، قابلة للتمويل، ولديها القدرة على تصنيع كامل للوح). كيف تختار بينها؟</p>

      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base">
          <thead class="bg-emerald-50">
            <tr>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">العلامة التجارية والتقنية</th>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">مميزات جوهرية</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">Jinko</span>
                (Tiger Neo N-Type)
              </td>
              <td class="py-3 px-4 border-b">وحش حقيقي! تقنية TOPCon N-Type وكفاءة تصل لـ 22.5%. يعتبر <strong>لوح Jinko Solar 580W</strong> الموجود لدينا الخيار رقم واحد لمن يبحث عن التحمل الشديد للحرارة وإنتاجية استثنائية في الأيام الغائمة. ضمان يصل لـ 25 سنة على الأداء.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-emerald-600 text-white text-xs px-2 py-1 rounded">JA Solar</span>
                (DeepBlue)
              </td>
              <td class="py-3 px-4 border-b">إذا كنت تبحث عن المتانة والموثوقية المطلقة، سلسلة DeepBlue صممت لتهزم العوامل الجوية (الرياح، الضباب الملحي في السواحل، الرطوبة). نوفر لك <strong>لوح JA Solar 550W</strong> والمثالي جداً لمشاريع المنازل بكفاءة قوية.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Trina</span>
                (Vertex Series)
              </td>
              <td class="py-3 px-4 border-b">أناقة في التصميم وقوة في الأداء. التميز في ألواح Trina يكمن في دمج خلية 210mm الكبيرة مع تقنيات تقطيع الخلايا بمهارة، مما يقدم كثافة طاقة هائلة في مساحة أقل.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4">الغالي هو الأرخص: استراتيجية هندسة الفضاء للتوفير!</h3>
      <p>حين تلجأ لشراء ألواح بقوة 580 وات (عالية الكفاءة) بدل ألواح 300 وات تقليدية مجهولة الهوية لتوفير بضع مئات من الريالات، أنت في الحقيقة تخسر آلافاً! الألواح عالية الكفاءة تعني <strong>نصف المساحة المطلوبة على السطح، نصف كمية هياكل التثبيت (الحديد/الألمنيوم العالي التكلفة)، ونصف أطوال كيبلات التيار المستمر السميكة والنحاسية باهظة الثمن</strong>. الكفاءة العالية كفاءة محفظتك المادية قبل كل شيء!</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">دليل الفحص وكشف التقليد: كيف تحمي استثمارك بذكاء؟ (أسرار الخبراء)</h2>
      <p>أحد أخطر التحديات في السوق اليمني هو انتشار الألواح المقلدة أو المجددة. كيف تضمن أن اللوح الذي تشتريه أصلي وجديد تماماً؟ إليك أسرار الخبراء:</p>
      
      <h3>1. الباركود (Barcode) هو الهوية الحقيقية</h3>
      <p>كل لوح شمسي من شركة Tier 1 يخرج من المصنع بهوية فريدة (Serial Number) محفورة أسفل الزجاج بشكل لا يمكن إزالته، ونفس الرقم مطبوع على ملصق خلفي مع رمز الاستجابة السريعة (QR Code). تأكد من تطابق الرقمين، وبإمكانك غالباً مسح الكود أو إدخاله في موقع الشركة لمطابقته والتأكد من تاريخ التصنيع.</p>
      
      <h3>2. جودة إطار الألمنيوم وعلبة التوصيل (Junction Box)</h3>
      <p>الألواح الأصلية تأتي بإطار ألمنيوم صلب، زواياه مصمتة بشكل آلي نظيف بدون أي شقوق مسننة. علبة التوصيل في الخلف يجب أن تكون مختومة بإحكام شديد (حماية IP68)، والكيبلات الممتدة منها يجب أن تحمل شعارات ماركات معروفة بمقاومتها للحرارة (مثل Staubli MC4) وتكون ثقيلة وسميكة.</p>

      <h3>3. احذر "الألواح المجددة" (Recycled Panels)</h3>
      <p>بعض ضعاف النفوس يغسلون الألواح المستعملة أو التالفة جزئياً ويعيدون تغليفها. لكشفها: انظر للوح بانعكاس أشعة الشمس، إذا لاحظت اختلافاً بدرجة لون الخلايا (خلية زرقاء غامقة وأخرى باهتة) داخل نفس اللوح، فهذا دليل غش بصري وتجميع رديء. كما أن وجود غراء سيليكون بارز أو غير منتظم على الحواف يدل على إعادة التجميع اليدوي.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسرار التركيب لرفع الكفاءة (ما لا يخبرك به الفنيون)</h2>
      <p>اللوح العظيم بتركيب سيء ستكون نتيجته كارثية. لضمان حصولك على الـ 580 وات بالكامل، اتبع هذه القوانين الهندسية:</p>
      
      <ul>
        <li><strong>التهوية خلف الألواح (التبريد الطبيعي):</strong> أكبر خطأ هو تثبيت اللوح مباشرة على السقف الأسمنتي بدون مسافة. اللوح يخنق من الحرارة العكسية. اترك مسافة لا تقل عن (15 إلى 30 سم) بين اللوح والسقف ليسمح للهواء بالمرور وتبريد اللوح طبيعياً، هذا التبريد يرفع الكفاءة بنسبة مذهلة.</li>
        <li><strong>زاوية الميل المثالية والمواجهة:</strong> في اليمن، الألواح يجب أن تتوجه دائماً نحو الجنوب الجغرافي. أفضل زاوية ميل طوال العام تتراوح حول 15-18 درجة (لضمان غسيل الأمطار للغبار). إذا كنت تصمم للذروة الشتوية يمكن رفع الزاوية قليلاً.</li>
        <li><strong>عصابة قاتلة اسمها "الظلال الجزئية":</strong> هل ترى سلك الكهرباء الرفيع الذي يمر فوق اللوح؟ هذا السلك يخلق ظلاً خطياً يرفع حرارة الخلية المظللة (Hot-Spot) ويخفض إنتاجية الألواح المتصلة به (في سلسلة) بنسبة قد تصل لـ 30%. اللوح الشمسي حساس كالعين البشرية للشوائب، اختر موقعاً نظيف المدار 100%.</li>
      </ul>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">التحليل الاقتصادي: ماذا يعني ضمان 25 سنة؟</h2>
      <p>عندما نقول أن ألواح Jinko أو Trina تتمتع بضمان أداء خطي لمدة 25 سنة، فهذا وعد هندسي بأن اللوح في السنة الخامسة والعشرين لن تقل إنتاجيته عن 84.8% (في حال N-Type) من طاقته الأصلية! هذا يعني أنك أمنت كهرباء لمنزلك لمدة ربع قرن.</p>
      
      <p><strong>العائد على الاستثمار (ROI):</strong> لو افترضنا أنك تدفع فواتير لكهرباء تجارية (شحن زائد للمواطير)، المنظومة الأصلية تعوض ثمنها (رأس المال) في غضون 2 إلى 3 سنوات في معظم المدن اليمنية. الـ 22 سنة المتبقية هي طاقة "مجانية" وصافية. الفرق البسيط الذي تدفعه اليوم (10-20 دولار إضافية) لأخذ لوح وكالة أصلي سيعود لك أضعافاً مضاعفة في الإنتاج اليومي وتجنب التلف المبكر.</p>

      <div class="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">اجعل سطح منزلك محطة طاقة متطورة!</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          نحن في <strong>أبو إيفان للطاقة المتجددة</strong> نوفر لك راحة البال. منتجاتنا تأتي بضمانات وكالة وتصنيف Tier 1. فريقنا مستعد لحساب احتياجك وتصميم قاعدة بياناتك الشمسية بمقاييس هندسية دقيقة لتنعم بالكهرباء المستدامة.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/solar-panels" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">تصفح أحدث الألواح المتوفرة</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-950 transition shadow-lg border border-emerald-500 w-full sm:w-auto">اطلب تصميم منظومتك الآن</a>
        </div>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كيف أفرق بين اللوح الشمسي الأصلي والمقلد؟</summary>
          <p class="mt-2 text-gray-700">عبر مطابقة السيريال نمبر (الباركود) الموجود تحت الزجاج مع الرقم الموجود على الملصق الخلفي والتأكد منه عبر موقع الشركة الرسمي، وتجنب شرائها إذا كان الغراء الجانبي عشوائياً.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">ما هو أفضل نوع ألواح شمسية للمناطق الحارة؟</summary>
          <p class="mt-2 text-gray-700">الألواح التي تمتلك تقنية N-Type من ماركات مثل Jinko أو JA Solar لأنها مقاومة للحرارة العالية ولا تفقد كفاءتها وقت الظهيرة.</p>
        </details>
      </div>
    `
  },
  {
    id: "ultimate-solar-inverter-guide-yemen-2026",
    title: "دليل إنفرترات الطاقة الشمسية 2026: كيف تشغل المكيف على الطاقة الشمسية بأمان؟",
    excerpt: "تعرف على الفرق بين PWM و MPPT والإنفرترات الهجينة وبرمجتها وأنظمة حمايتها، العقل المدبر لمنظومتك الشمسية في اليمن.",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "إنفرتر هجين طاقة شمسية في اليمن عاكس ذكي",
    content: `
      <h2>الإنفرتر: العقل المدبر ومحطة القيادة الذكية لمنظومتك</h2>
      <p>أهلاً بك في الجزء الثالث من سلسلتنا المرجعية لبناء منظومات الطاقة الشمسية الاحترافية. بعد أن اخترنا <strong>القلب</strong> (البطاريات) و<strong>المحركات</strong> (الألواح)، حان وقت اختيار <strong>العقل المدبر</strong>. الإنفرتر (العاكس) ليس مجرد صندوق يحول تيار الـ DC المستمر من الألواح إلى تيار AC متردد لتشغيل تلفازك؛ إنه المايسترو الذي يدير الشحن، ينظم الجهد، ويقرر متى يأخذ من الألواح، ومتى يسحب من البطارية، ومتى يمزج بينهما!</p>
      <p>اختيار إنفرتر خاطئ في أسواق اليمن، حيث الأحمال المتغيرة والشبكات غير المستقرة، يعني إما حرق الأجهزة، أو تدمير البطاريات ببطء، أو هدر نصف طاقة الألواح التي اشتريتها بآلاف الدولارات. هيا بنا نفكك طلاسم الإنفرترات ونتعرف على أسرارها.</p>

      <h3>معركة منظمات الشحن: لماذا يجب أن تدفن الـ PWM وتنتقل للـ MPPT؟</h3>
      <p>الإنفرترات الحديثة تحتوي داخلها على "منظم شحن" (Charge Controller) وظيفته أخذ الكهرباء من الألواح وترويضها قبل ضخها للبطارية. بالسوق يوجد تقنيتان:</p>
      
      <p><strong>1. تقنية PWM (Pulse Width Modulation):</strong><br>
      وهي التكنولوجيا القديمة والرخيصة. مشكلتها الكبرى أنها تتعامل مع اللوح الشمسي بـ "غباء". إذا كان اللوح ينتج 36 فولت والبطارية تحتاج 14 فولت لتنشحن، سيقوم منظم الـ PWM بـ "قص" الفولت الزائد ورميه في الهواء! النتيجة؟ أنت <strong>تخسر ما يقارب 30% إلى 40% من الطاقة الحقيقية</strong> للوحك الشمسي، خاصة في الشتاء أو في الصباح الباكر.</p>
      
      <p><strong>2. تقنية MPPT (Maximum Power Point Tracking):</strong><br>
      وتعني "متتبع نقطة الطاقة القصوى". هذا المنظم الذكي هو بمثابة "ساحر كهربائي". بدلاً من قص الفولت الزائد (الـ 36 فولت المتبقية من اللوح)، يقوم الـ MPPT بتحويل هذا الفولت الزائد إلى "أمبير إضافي" لتسريع شحن البطارية! النتيجة: <strong>استغلال 99% من طاقة اللوح الشمسي.</strong> شراء إنفرتر يحمل تقنية MPPT هو استثمار سيدفع ثمنه بنفسه في أول سنة من خلال توفير شراء ألواح إضافية.</p>

      <h3>الإنفرترات الهجينة (Hybrid Inverters): المستقبل أصبح حاضراً</h3>
      <p>سابقاً، كانت الإنفرترات العادية (Off-grid) لا تفعل سوى أخذ الطافة من السطح وشحن البطارية. إنفرترات اليوم <strong>الهجينة (Hybrid)</strong> هي أجهزة كمبيوتر مصغرة ومحطات إدارة حقيقية. كيف تعمل؟</p>
      <p>لنفترض أنك تمتلك إنفرتر هجين من نوع <strong>Growatt</strong> أو <strong>Must</strong> ولديك جهاز تكييف يستهلك 1500 وات. الألواح على السطح تنتج حالياً 1000 وات فقط (لأن الوقت عصر). الإنفرتر الهجين الذكي سيقوم بـ <strong>مزج الطاقات</strong>! سيأخذ الـ 1000 وات من الألواح، وسيسحب 500 وات فقط من الكهرباء العمومية (إذا كانت متوفرة) أو من البطارية لتشغيل المكيف بسلاسة تامة ودون إطفاء أو رمش (Flickering).</p>
      
      <p>كما تمتاز الأنظمة الهجينة بقدرتها البارعة على إعطاء الأولوية القصوى للطاقة الشمسية المجانية، ولا تلجأ للبطاريات إلا في المساء، ولا تسحب من الشبكة العامة إلا إذا أردت برمجتها لذلك، مما يطيل عمر البطاريات لسنوات وهو توفير مالي ضخم على المدى البعيد.</p>

      <h3>عمالقة السوق: مقارنة ماركات Growatt, Must و Voltronic</h3>
      <p>في متجر أبو إيفان، نحن لا نعرض إلا الأجهزة التي أثبتت جدارتها في البيئة اليمنية (حرارة عالية، وغبار، وتذبذب كهرباء). إليك أبرز ما ننصح به:</p>

      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base">
          <thead class="bg-emerald-50">
            <tr>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">الماركة والموديل</th>
              <th class="py-3 px-4 text-right border-b text-emerald-900 font-bold">الميزات والقدرات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-amber-500 text-white text-xs px-2 py-1 rounded">Growatt</span>
                (SPF سلسلة)
              </td>
              <td class="py-3 px-4 border-b">إمبراطور الجودة بلا نزاع. يتميز إنفرتر Growatt بقدرته العجيبة على إدارة بطاريات الليثيوم والتواصل معها عبر بروتوكول CAN/RS485. تصميمه المتين ونظامه البرمجي السلس يجعله الأفضل دائمًا لتشغيل المكيفات والأحمال الثقيلة، متوفر لدينا بأحجام 3KW و 5KW.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-red-600 text-white text-xs px-2 py-1 rounded">Must</span>
                (PV1800 سلسلة)
              </td>
              <td class="py-3 px-4 border-b">الخيار الاقتصادي الممتاز! إنفرتر قوي جداً وعملي ومجرب في آلاف المنازل باليمن. يعطيك أداء MPPT ممتاز وتحمل جيد جداً للحرارة وبسعر يناسب الميزانيات المتوسطة، مع إمكانية التشغيل حتى بدون بطارية في موديلات (High Voltage) بوجود أشعة الشمس.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 flex items-center gap-2">
                <span class="bg-blue-800 text-white text-xs px-2 py-1 rounded">Voltronic</span>
                (Axpert)
              </td>
              <td class="py-3 px-4 border-b">من أقدم الشركات وأكثرها ابتكاراً، موديلات 5KW وما فوق تعتبر خياراً صلباً للمحلات التجارية التي تحتاج دمج مذهل مع المولدات (تتحمل عدم استقرار تردد المولد).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">دليل البرمجة وأكواد الأخطاء (أسرار المبرمجين)</h2>
      <p>برمجة الإنفرتر تشبه إعطاء الأوامر لقائد السفينة للتعامل مع العواصف والأمواج. إذا أعطيته أوامر خاطئة ستغرق سفينتك (تتلف بطارياتك).</p>

      <h3>1. ضبط أولويات الإمداد (SOL vs SBU)</h3>
      <p>هذا الإعداد يحدد من أين يسحب الإنفرتر الطاقة أولاً:</p>
      <ul>
        <li><strong>وضعية SOL (Solar First):</strong> الإنفرتر سيسحب الطاقة للتشغيل والشحن من الشمس. الغيوم غطت الشمس؟ سيلجأ مباشرة إلى كهرباء المولد أو العمومي ولن يعتمد على البطارية، مما يجعل البطارية للضرورة فقط.</li>
        <li><strong>وضعية SBU (Solar - Battery - Utility):</strong> هي الوضعية الأشهر والموصى بها للمنازل بدون شبكة مستقرة. الشمس أولاً، فإذا غابت، يسحب الإنفرتر الطافة من البطاريات، وفقط إذا فرغت البطاريات حتى حد معين سيشغل الكهرباء العمومية (إذا توفرت). إنها وضعية استغلال الطاقة الشمسية 100%.</li>
      </ul>

      <h3>2. جهد الفصل للحماية من الموت السريري (Low DC Cut-off):</h3>
      <p>أهم رقم في حياتك الشمسية! إذا سمحت للإنفرتر بتفريغ بطارية الجل الهشة أسفل 10.5 فولت، فهذا دمار مؤكد خلال أسابيع. يجب ضبط هذا الرقم بحسب مواصفات بطاريتك (غالباً 11.5 فولت للجل 12 فولت لمنع التفريغ العميق القاتل). للأسف الكثير من الفنيين ينسون تعديل القيمة الافتراضية للإنفرتر، فتُدمر البطاريات مبكراً!</p>

      <h3>3. فك شفرات أكواد الأخطاء (Error Codes) الشهيرة:</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base text-center">
          <thead class="bg-red-50">
            <tr>
              <th class="py-3 px-4 border-b text-red-900 font-bold">الكود / الخطأ</th>
              <th class="py-3 px-4 border-b text-red-900 font-bold">المعنى والتشخيص</th>
              <th class="py-3 px-4 border-b text-red-900 font-bold">الحل المباشر</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">Error 01 أو 02</td>
              <td class="py-3 px-4 border-b text-right">المراوح تعطلت، أو حرارة الإنفرتر شديدة (Over-Temperature).</td>
              <td class="py-3 px-4 border-b text-right">أطفئ الإنفرتر! نظف الغبار من الفتحات، وتأكد أن المروحة تدور بحرية، وضع الجهاز بمكان أبرد.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">Error 04</td>
              <td class="py-3 px-4 border-b text-right">فولتية البطارية منخفضة جداً (Low Battery).</td>
              <td class="py-3 px-4 border-b text-right">أوقف الأحمال فوراً (المكيفات، غسالة)، وانتظر شروق الشمس لإعادة شحن البطاريات، أو قم بتوفير كهرباء عمومية لشحنها.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">Error 08</td>
              <td class="py-3 px-4 border-b text-right">فولتية الألواح عالية جداً (PV Over-Voltage). خطأ مميت!</td>
              <td class="py-3 px-4 border-b text-right">افصل قاطع الألواح بسرعة! هذا يحدث غالباً في الشتاء أو الصباح الباكر بسبب توصيل ألواح زائدة على طريقة التوالي (Series). يحتاج الفني لتغيير التوصيلة.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">Error 07 أو 52</td>
              <td class="py-3 px-4 border-b text-right">الإنفرتر يحمل فوط طاقته (Overload) أو قصر كهربائي (Short Circuit).</td>
              <td class="py-3 px-4 border-b text-right">افصل الأجهزة الثقيلة، وأعد التشغيل. إذا عاد الخطأ بلا أجهزة متصلة، فهناك عطل إلكتروني داخلي يستدعي الصيانة.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">منظومة الحماية والأمان: كلفة بسيطة تنقذ أرواحاً وأجهزة</h2>
      <p>تركيب إنفرتر بـ 500 دولار بدون حمايات تشبه شراء سيارة فارهة بدون فرامل. يجب أن يكون للإنفرتر "حراس شخصيين" يتصدون لأي خطر قادم من الخارج:</p>

      <ul>
        <li><strong>قاطع التيار المستمر (DC Breaker):</strong> يجب وضع قاطع مخصص لطاقة الـ DC (ليست قواطع البيت العادية للـ AC) بين الألواح والإنفرتر للصيانة ولحماية اللوحة الأم من مرور تيار زائد، وقاطع آخر ضخم بين الإنفرتر والبطاريات (في حال حدوث ماس كهربائي، هذا القاطع سيمنع انفجار البطاريات).</li>
        <li><strong>مانع الصواعق (Surge Arrester):</strong> جهاز رخيص الثمن يوضع في لوحة التجميع القريبة من الألواح، وظيفته إذا ضرب البرق أو حدث ارتفاع مفاجئ في الجهد من الكهرباء العمومية، سيقوم بسحب هذا "الدمار" وتسريبه فوراً إلى نظام (التأريض / Grounding) بدلاً من وصوله لشاشة وبورد الإنفرتر الداخلي واحتراقه بالكامل. إهمال هذه الحماية في مواسم المطر في اليمن كلف الكثير من المزارعين إنفرتراتهم!</li>
        <li><strong>مكان التركيب بعناية:</strong> الإنفرتر جهاز إلكتروني يتنفس. لا تضعه فوق البطاريات مباشرة (فأبخرة الأحماض ستأكل لوحته)، ولا تحشره في خزانة مغلقة، ولا بالقرب من النوافذ المعرضة لغبار الشوارع والأمطار. الخيار الأفضل هو جدار مرتفع في طرقة باردة وجيدة التهوية مع فراغ جانبي وعلي لا يقل عن 20 سم عن السقف.</li>
      </ul>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">الخلاصة الاقتصادية: إنفرتر ذكي وحمايات قوية = ثراء على المدى الطويل</h2>
      <p>الفارق بين شراء إنفرتر ضعيف رخيص وبدون لوحة حمايات، وبين الاستثمار في جهاز Growatt ذكي بجميع أنظمة أمانه وتأريضه.. قد يكون (مئتي دولار إضافية). ولكن، لو افترضنا أن عاصفة رعدية ضربت منطقتك (كما يحدث كثيراً في الجبال اليمنية والسواحل)، الإنفرتر الرخيص سيحترق، وقد تنتشر النار لأسلاكه والبطاريات. أنت لا تخسر مئتي دولار حينها، بل تخسر كامل استثمارك الذي كلف آلاف الدولارات!</p>
      <p>وكذلك، قدرة جهاز הـ MPPT القوي على استغلال أشعة الصباح الباكر والغيوم ترفع من مستوى استقلالك الطاقي وتقلل من ساعات اعتمادك على المولد التجاري باهظ الثمن. باختصار: <strong>اختيار إنفرتر ذكي هو تأمين على العمر الذهبي لمنظومتك.</strong></p>

      <div class="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">لا تترك قلب المنظومة لعقل ضعيف!</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          في <strong>أبو إيفان للطاقة المتجددة</strong>، نعرض لك فقط الأجهزة التي خضعت لاختبارات الأداء القاسية وأثبتت تفوقها بالسوق اليمني وبشهادة آلاف المستخدمين، مع تقديم ضمان الوكيل الأصلي المعتمد.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/inverters" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">تصفح أقوى الإنفرترات لدينا</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-900 transition shadow-lg border border-emerald-500 w-full sm:w-auto">استشر مهندسينا بحجم الإنفرتر المناسب لك</a>
        </div>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كم سعر الإنفرتر الهجين في اليمن؟</summary>
          <p class="mt-2 text-gray-700">يبدأ من 250 دولار للأحجام الصغيرة 3 كيلو، ويصل إلى أكثر من 800 دولار للأحجام الاحترافية 5 أو 8 كيلو وات، وتختلف حسب العلامة التجارية (Growatt وغيرها).</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">ما هو أحسن إنفرتر لتشغيل مكيف؟</summary>
          <p class="mt-2 text-gray-700">أي إنفرتر هجين ذكي بحجم 5 كيلو وات يعمل بنظام 48 فولت ومزود بتقنية MPPT، سيعمل المكيف بكل سلاسة ودون جهد إضافي على البطاريات.</p>
        </details>
      </div>
    `
  },
  {
    id: "ultimate-solar-water-pumps-guide-yemen-2026-part1",
    title: "دليل منظومات الغطاسات الشمسية في اليمن 2026: كيف تختار الغطاس المناسب؟ والفرق بين أنظمة AC و DC",
    excerpt: "للمزارعين وأصحاب الآبار: دليلك الشامل لمعرفة الفرق بين أنظمة المضخات وتوفير مبالغ الطائلة من الديزل.",
    image: "https://images.unsplash.com/photo-1592838464221-a716ebbf4905?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "منظومة غطاس طاقة شمسية للزراعة بئر ري",
    content: `
      <h2>ثورة الري في مزارع اليمن: توديع الديزل إلى الأبد!</h2>
      <p>أهلاً بك يا مزارعنا الجسور وصاحب الأرض المعطاءة في مدونة أبو إيفان للطاقة المتجددة. لطالما كان استنزاف ميزانية المزارع اليمني يذهب في اتجاه واحد: <strong>شراء الديزل، وزيوت المحركات، وصيانة المولدات الدورية</strong>. هل تعلم أن الاستثمار في منظومة ضخ مياه تعمل بالطاقة الشمسية سيعيد لك رأس مالك بالكامل في مدة تتراوح بين 6 إلى 12 شهراً فقط من التوفير المهول لقيمة المحروقات؟</p>
      <p>في هذا الدليل العملاق، وضعنا عصارة الخبرة الهندسية لنشرح لك ولأول مرة الفروقات الحقيقية بين أنظمة الغطاسات الشمسية. لا مزيد من التخبط عند الشراء، فنحن هنا لنقدم لك الخرائط التقنية خطوة بخطوة.</p>

      <h3>معركة الأنظمة: غطاسات التيار المستمر (DC) مقابل التيار المتردد (AC)</h3>
      <p>عندما تذهب للسوق، ستواجه نوعين رئيسيين من الغطاسات التي تعمل بالطاقة الشمسية:</p>
      
      <p><strong>1. غطاسات التيار المستمر الذكية (DC Water Pumps):</strong><br>
      هذا النوع مصمم خصيصاً للطاقة الشمسية. يحتوي على محرك (Brushless DC) يعمل بالتيار المستمر وبكفاءة قد تتجاوز 90%! يأتي غالباً مع وحدة تحكم (Controller) خاصة به توصل الألواح إليها مباشرة دون إنفرتر ضخم. مميزاتها؟ <strong>رخيصة، مثالية للآبار السطحية (حتى عمق 70-100 متر)، ولا تحتاج تيار بدء عالي (Inrush current)</strong>. إنها الخيار المفضل للمزارع الصغيرة والأحواض. في متجرنا نقدم ماركات مشهورة وعالمية في ضخ الـ DC مثل <strong>Difful</strong> وغيرها.</p>
      
      <p><strong>2. غطاسات التيار المتردد التقليدية (AC Water Pumps) مع إنفرتر المضخات (VFD):</strong><br>
      هل لديك غطاس قديم 3 حصان يعمل على ماطور 3 فاز أو 1 فاز وتريد تشغيله على الطاقة الشمسية؟ هنا نستخدم محركات الـ AC التقليدية وندمجها مع العقل الجبار: <strong>إنفرتر المضخات (Solar VFD)</strong>. هذه الأنظمة مخصصة للآبار الارتوازية العميقة جداً والمزارع الشاسعة حيث نحتاج محركات قوية (من 5 حصان إلى 100 حصان وما فوق).</p>

      <h3>ما هو إنفرتر المضخات (Solar VFD)؟ الساحر الذي يستغني عن البطاريات!</h3>
      <p>كيف تعمل هذه المنظومات الكبيرة بدون بطاريات باهظة الثمن؟ السر يكمن في إنفرتر (VFD) المزود بتقنية <strong>MPPT الجبارة</strong>. هذا الإنفرتر يأخذ طاقة الألواح وتتغير سرعة إخراجه للغطاس حسب قوة الشمس. في الصباح الباكر يبدأ بإعطاء تردد قليل (Hz) فتبدأ المضخة بسحب الماء ببطء بدون "صدمة تشغيل"، ومع اشتداد سطوع الشمس تزداد سرعة المضخة وقوة الضخ لتبلغ ذروتها في الظهر، ثم تنخفض تدريجياً مع الغروب. وكل هذا بشكل أوتوماتيكي ومجاني!</p>
      <p>الـ VFD لا يضخ الماء فقط، بل يحمي الغطاس باحترافية: يطفئه تلقائياً إذا جف البئر (Dry Run Protection)، يحميه من زيادة الجهد أو احتراق الفازات، وينبهك بأكواد أعطال دقيقة، مما يطيل عمر الغطاس لسنوات متتالية!</p>

      <h3>المعادلة الذهبية: كيف يختار المزارع غطاسه كمهندس محترف؟</h3>
      <p>أكبر خطأ هو شراء الغطاس بناءً على "عدد الأحصنة (HP)" فقط! الاختيار الصحيح يعتمد على قانونين أساسيين:</p>
      <ul>
        <li><strong>العمق الرأسي الكلي (Head - H):</strong> لا تقيس فقط المسافة من سطح الأرض لمستوى الماء في البئر! بل احسب المسافة من المضخة في الأسفل، وصولاً إلى فوهة البئر، ثم أضف إليها المسافة الأفقية أو الارتفاع إلى الخزان. معرفتك لـ Head الدقيق يمنعك من شراء غطاس لا يستطيع رفع الماء لسطح الأرض.</li>
        <li><strong>كمية المياه المطلوبة في الساعة (Flow - Q):</strong> كم لتر أو متر مكعب (m³) تحتاج يومياً لري مزرعتك؟ بناءً على منحنى الأداء (Pump Curve)، سنقاطع الـ (H) مع الـ (Q) لنستخرج حجم الغطاس الفعلي المناسب بالحصان.</li>
      </ul>
      <p><strong>نصيحة ذهبية:</strong> كلما زادت المسافة بين مصفوفة الألواح والغطاس داخل البئر، وجب عليك زيادة سُمك (مقطع) كيبل النحاس لتجنب هبوط الفولت (Voltage Drop)، فالكيبل الضعيف سيسخن ويحرق محول الغطاس أو ينقص من طاقة الرفع بشكل ملموس.</p>

      <h3>الماركات والجودة: لماذا "الستانلس ستيل" هو الاستثمار الآمن؟</h3>
      <p>المياه الجوفية في العديد من محافظات اليمن تكون مشبعة بالأملاح والكبريت. الغطاس ذو الغلاف البلاستيكي الرديء أو الحديد الزهر العادي سيتآكل في غضون عام، وربما يتعطل داخل البئر ويصعب إخراجه! لذا، في مشاريع أبو إيفان، نوصي دائماً باستخدام الغطاسات المصنوعة بالكامل من معدن <strong>(Stainless Steel الستانلس ستيل المضاد للصدأ 304 أو 316)</strong> لتحمل أقسى الظروف في المياه المالحة والأعماق السحيقة لسنوات طوال دون تآكل، مثل الماركات العريقة (Difful وغيرها من الماركات المعتمدة في متجرنا).</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">دليل التركيب الهندسي (للمقاولين والمزارعين)</h2>
      <p>تجهيز المنظومة يتطلب دقة تتعدى رمي الألواح وتوصيل الأسلاك. إليك الأسرار الهندسية لضمان عمل المنظومة لعقود:</p>
      
      <ul>
        <li><strong>أهمية قطر الكيبل (Cable Size):</strong> أكبر خطأ شائع يرتكبه المزارعون هو التوفير في سُمك كيبل الغطاس. في الآبار العميقة (مثلاً 200 متر)، استخدام كيبل رفيع جداً يسبب (Voltage Drop) فقداناً كبيراً في الجهد، فتصل الكهرباء لمحرك الغطاس ضعيفة، مما يؤدي إما لعدم رفع الماء أو لاحتراق المحرك بسبب الجهد المنخفض! استخدام جداول المقاسات لحساب سُمك النحاس المناسب أولوية.</li>
        <li><strong>حساسات مستوى الماء (Water Level Sensors):</strong> هذه القطعة البسيطة تنقذ استثمارك! حساسات تُعلق مع الغطاس، فإذا نزل مستوى الماء في البئر بشكل مفاجئ، يرسل الحساس إشارة للإنفرتر لإيقاف الغطاس فوراً، مما يحميه من الاحتراق بسبب "التشغيل الجاف" (Dry Run).</li>
        <li><strong>التأريض (Earthing / Grounding):</strong> آبار المياه المفتوحة في المزارع هي هدف محتمل للصواعق الرعدية في مواسم الأمطار. يجب دق وتد نحاسي عميق وربط هياكل الألواح والإنفرتر به لتسريب أي شحنات قوية للأرض وحماية اللوحة الإلكترونية للإنفرتر من التلف الفوري.</li>
      </ul>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">الصيانة الدورية وأخطاء التشغيل الشائعة</h2>
      <p>النظام الشمسي للري يعمل كالآلة الذاتية ولكنه يحتاج للقليل من الحب والاهتمام:</p>

      <h3>1. صيانة الألواح (التنظيف = الماء)</h3>
      <p>الألواح الشمسية في المزارع تتعرض للغبار الكثيف، وفي اليمن يمكن لطبقة الغبار أن تحجب ضوء الشمس وتقلل من إنتاج الطاقة بنسبة تصل لـ 30%. التزم بجدول تنظيف <strong>نصف شهري أو شهري</strong> (في الصباح الباكر وقبل أن تسخن الألواح تجنباً لكسر الزجاج). استخدام الماء وقماشة ناعمة فقط، لا تستخدم منظفات كيميائية أو فرشاة خشنة.</p>

      <h3>2. فك شفرات أخطاء إنفرترات المضخات (VFD Errors)</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base text-center">
          <thead class="bg-red-50">
            <tr>
              <th class="py-3 px-4 border-b text-red-900 font-bold">الخطأ / التحذير</th>
              <th class="py-3 px-4 border-b text-red-900 font-bold">المعنى والتشخيص</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-red-600">Dry Run (التشغيل الجاف)</td>
              <td class="py-3 px-4 border-b text-right">الإنفرتر أحس بأن الغطاس يدور بسرعة عالية ولا يسحب ماءً (بسبب نقص الماء بالبئر). سيتوقف لفترة ثم يعاود الفحص.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-red-600">Low Voltage (جهد منخفض)</td>
              <td class="py-3 px-4 border-b text-right">طاقة الألواح ضعيفة (ربما غيوم كثيفة، أو أن الألواح متسخة جداً، أو مقطوعة الأسلاك).</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-red-600">Over Current (تيار زائد)</td>
              <td class="py-3 px-4 border-b text-right">الغطاس يسحب أمبيراً يفوق قوة الإنفرتر. قد يكون هناك انسداد في ماسورة الماء، أو وحل/طين يمسك بمراوح الغطاس فيعرقل دورانها.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">التحليل المالي النهائي: وداعاً للديزل!</h2>
      <p>لنضع الأرقام على الطاولة: دعنا نفترض مزارعاً لديه محرك ديزل 10 حصان. يستهلك المزارع يومياً حوالي 15-20 لتراً للري، ناهيك عن أسعار الزيوت كل شهرين، وأجور الصيانة وقطع غيار المحرك. سنوياً، سيصرف هذا المزارع <strong>آلاف الدولارات للتشغيل فقط!</strong></p>

      <p>لو انتقل للطاقة الشمسية، وبتكلفة تأسيس مبدئية قد تبدو مكلفة في البداية (نفترض 4000 إلى 6000 دولار لمنظومة كاملة)، فإنه سيستمر بضخ نفس كمية المياه مجانًا تمامًا! هذا الشراء العظيم يعني أن <strong>"نقطة الاسترداد" (Payback Period) ستأتي خلال سنة أو سنة ونصف كحد أقصى!</strong> وبعدها يصبح الإنتاج الزراعي نقياً وصافياً من أي تكاليف تشغيلية لسنوات طويلة (الألواح تعيش 25 عامًا، والغطاسات ذات الستانلس ستيل الجيد قد تعمر فوق الـ 5-8 سنوات).</p>


      <div class="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">ارضِ مزرعتك بماء لا ينضب واحمِ محفظتك المادية</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          في <strong>أبو إيفان للطاقة المتجددة</strong>، نقدم غطاسات بتقنية حديثة وإنفرترات جبارة صُممت خصيصاً للتضاريس والأعماق في اليمن. لا تبنِ مشروعاً كبيراً بتخمين عشوائي!
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/water-pumps" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">تصفح الغطاسات وإنفرترات المضخات</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-900 transition shadow-lg border border-emerald-500 w-full sm:w-auto">اطلب دراسة هيدروليكية مجانية اليوم</a>
        </div>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كم لوح شمسي يحتاج الغطاس 5 حصان؟</summary>
          <p class="mt-2 text-gray-700">يحتاج غطاس الـ 5 حصان إلى حوالي 10 إلى 12 لوحاً من الألواح عالية الكفاءة (مثلاً 550 وات)، لضمان إنطلاق المروحة بقوة من أول ضوء وحتى العصر.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كيف أطول عمر الغطاس في البئر المالح؟</summary>
          <p class="mt-2 text-gray-700">باستخدام غطاس مصنوع بالكامل من الستانلس ستيل القوي (304 أو 316) ليتحمل مقاومة الصدأ في المياه الكبريتية والمالحة للآبار.</p>
        </details>
      </div>
    `
  },
  {
    id: "ultimate-home-appliances-solar-guide-yemen-2026",
    title: "تشغيل المكيف والثلاجة على الطاقة الشمسية في اليمن: كم لوح أحتاج؟",
    excerpt: "تعلم كيف تبرد منزلك وتشغل ثلاجتك وغسالتك بأقل عدد من الألواح عبر تقنية الإنفرتر الموفرة للطاقة والأجهزة الذكية.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "أجهزة منزلية موفرة للطاقة ومكيفات تعمل بالطاقة الشمسية",
    content: `
      <h2>وداعاً لفواتير الكهرباء: كيف تدير منزلك بالكامل من الشمس؟</h2>
      <p>أهلاً بك في الدليل الأهم لكل أسرة يمنية تبحث عن الرفاهية دون استنزاف الميزانية. في الماضي، كان تشغيل "مكيف هواء" أو "فريزر عملاق" على الطاقة الشمسية يُعتبر ضرباً من الخيال أو حكراً على الأثرياء الذين يمتلكون عشرات البطاريات ومساحات شاسعة من الألواح. اليوم، وفي عام 2026، تغيرت اللعبة تماماً!</p>
      <p>السر لم يعد في زيادة عدد بطارياتك وألواحك، بل السر يكمن في <strong>"ذكاء وكفاءة الأجهزة المنزلية"</strong> نفسها. في هذا الدليل المرجعي العملاق، سنكشف لك أسرار تقنية "الإنفرتر" في الأجهزة المنزلية، وكيف يمكنك تبريد غرفتك في صيف الحديدة أو عدن وتجميد أطعمتك بأقل التكاليف الممكنة.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">1. ثورة المكيفات الشمسية (Solar Inverter AC)</h2>
      <p>المكيف التقليدي (T3 العادي) هو وحش كاسر يلتهم الطاقة، حيث يعتمد على كمبريسور (ضاغط) يعمل بنظام (On/Off). عندما يشتغل، يسحب تيار بدء هائل يعادل ثلاثة أضعاف استهلاكه لتبريد الغرفة، ثم يطفئ، ليعود ويشتغل بصدمة كهربائية جديدة.. هذا السلوك يدمر بطاريات الطاقة الشمسية ويسقط الإنفرترات العادية!</p>

      <h3>ما هي تقنية التبريد بالإنفرتر (DC Inverter)؟</h3>
      <p>مكيفات الإنفرتر الحديثة مصممة بضاغط ذكي. بدلاً من التشغيل والإطفاء العنيف، يبدأ الكمبريسور بالدوران بهدوء تام وبدون "Inrush Current" ساحباً أمبيراً متدرجاً، وحين تصل الغرفة للبرودة المطلوبة، لا ينطفئ، بل "يخمد" سرعته ليعمل على سحب تيار بسيط جداً (قد يصل إلى 2 أو 3 أمبير فقط) ليحافظ على البرودة. هذه التقنية <strong>توفر من 50% إلى 60% من الاستهلاك</strong> مقارنة بالمكيفات التقليدية!</p>

      <h3>مقارنة: المكيفات المباشرة (DC) مقابل مكيفات التيار المتردد (AC Inverter)</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base">
          <thead class="bg-blue-50">
            <tr>
              <th class="py-3 px-4 text-right border-b text-blue-900 font-bold">نوع المكيف</th>
              <th class="py-3 px-4 text-right border-b text-blue-900 font-bold">آلية العمل والمميزات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-blue-800">مكيفات التيار المستمر المباشر (100% DC)</td>
              <td class="py-3 px-4 border-b">تعمل بجهد 48 فولت تيار مستمر وتُوصل مباشرة بالبطاريات أو بمنظم الشحن وتتجاهل الإنفرتر المنزلي. <strong>كفاءتها جبارة ولا يوجد فيها أي فاقد تحويل</strong>. عيبها أن سعرها مرتفع وتحتاج لتأسيس شبكة أسلاك DC منفصلة بالمنزل.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-blue-800">مكيفات التيار المتردد التقنية الذكية (AC Inverter)</td>
              <td class="py-3 px-4 border-b">مكيف 220 فولت عادي ولكنه (Inverter). يتم تشغيله عبر إنفرتر الطاقة المتواجد لديك بالمنزل (يفضل Growatt 3KW أو 5KW). يتميز بسعره المعقول وتوفره الواسع في السوق. يعتبر حالياً الخيار الاستراتيجي الأول لمعظم المهندسين في اليمن.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>الحسبة الذهبية: ماذا أحتاج لتشغيل مكيف 12,000 BTU لـ 8 ساعات ليلاً؟</h3>
      <p>إذا اخترت مكيف جداري (AC Inverter) سعة 1 طن (12,000 وحدة) من الفئة "أ" عالية الكفاءة مع ضبط حرارته على 24 درجة مئوية، سيستهلك في المتوسط حوالي 500-600 وات في الساعة بعد استقرار الغرفة.<br>
      لتشغيله 8 ساعات ليلاً (بدون شمس) أنت تحتاج لطاقة مخزنة تقريبية تعادل 4800 وات/ساعة. لتغطية هذا بشكل آمن عبر الليثيوم (أو الجل)، نقترح المنظومة التالية كحد أدنى:</p>
      <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li><strong>البطاريات:</strong> بطارية ليثيوم واحدة 48V سعة 100Ah (تحمل حوالي 4800 وات/ساعة).</li>
        <li><strong>الألواح:</strong> 4 إلى 6 ألواح من الفئة العملاقة (مثل 550W أو 580W من Jinko أو Trina) لضمان شحن البطارية نهاراً وتشغيل المكيف والمراوح بنفس الوقت.</li>
        <li><strong>الإنفرتر:</strong> إنفرتر هجين (Hybrid) لا يقل عن 3 كيلو وات (مثل Growatt 3KW).</li>
      </ul>


      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">2. الثلاجات والفريزرات الاقتصادية (بطل المطبخ)</h2>
      <p>الثلاجة هي الجهاز الوحيد الذي يعمل 24 ساعة بدون توقف. ولذلك اختيارها أهم من اختيار التلفاز أضعافاً مضاعفة. سر الثلاجات الاقتصادية العصرية (مثل ماركة <strong>VOLX</strong> المتوفرة بمتجرنا) يعتمد على جبهتين:</p>
      
      <ul>
        <li><strong>الكمبريسور الموفر (DC/Inverter):</strong> يسحب تياراً ضعيفاً جداً مقارنة بثلاجات الغاز القديمة.</li>
        <li><strong>العزل الحراري الفائق (High-Density Insulation):</strong> وهو الأهم! جدران الثلاجة سميكة جداً ومحقونة بمادة الـ "فوم" عالي الكثافة. هذا العزل يجعل الثلاجة تحتفظ ببرودتها كالثلج لأكثر من 15 ساعة حتى لو انقطعت الكهرباء! مما يعني أن الكمبريسور سيعمل لساعات قليلة جداً خلال اليوم ليعوض الفقد.</li>
      </ul>

      <p><strong>كيف تختار السعة المناسبة؟</strong><br>
      إذا كنت تعتمد على منظومة شمسية متوسطة (لوحين وبطارية 150 أمبير)، فمن الجنون شراء فريزر سعة 600 لتر! اختيار السعة يجب أن يتناسب تناسباً طردياً مع منظومتك. للأسرة المتوسطة، ثلاجة وفريزر دبل مقاس (200 إلى 250 لتراً) من الفئة الاقتصادية ستكون استهلاكها في حدود (60 - 80 وات فقط أثناء الدوران)، وهو استهلاك أقرب لاستهلاك مروحة سقف أو شاشة تلفاز!</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">3. الأجهزة المنزلية الأخرى (الغسالة، المكنسة، والطبخ الذكي)</h2>
      
      <h3>الطبخ النظيف: وداعاً لأزمات الغاز</h3>
      <p>أصبح الطبخ عبر الكهرباء ممكناً جداً! ولكن حذارِ من "المسخنات الحرارية القديمة (الهيتر)" التي تستهلك 2000 و 3000 وات بحرارة مهدرة. العالم اليوم يستخدم <strong>الطباخات الحثية (Induction Cooker)</strong>. هذه الطباخة المغناطيسية تسخن "الإناء المعدني" نفسه وليس سطح الزجاج، بكفاءة تصل لـ 90%، وتطهو الطعام بضعف سرعة الغاز واستهلاك الكهرباء فيها لا يتجاوز 1000-1500 وات ويمكن التحكم به، ومثالية للعمل وقت الظهيرة.</p>

      <h3>القاعدة الذهبية للأحمال الثقيلة</h3>
      <p>هل تريد كوي الملابس؟ هل تريدين تشغيل غسالة الأوتوماتيك المزودة بسخان ماء؟ أو المكنسة الكهربائية؟<br>
      <strong>احصروا هذه الأعمال في وقت الذروة الشمسية فقط (من 10 صباحاً إلى 2 ظهراً)!</strong><br>
      في هذا الوقت، تكون الألواح بقمة عطائها وبطاريتك قد امتلأت. الإنفرتر الهجين سيأخذ الـ 2000 وات التي تحتاجها الغسالة من "الألواح" مباشرة وكأنها مجانية تماماً، ولن يستنزف أمبيراً واحداً من البطارية المخصصة لليل.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">4. جدول استرشادي للأحمال المنزلية (صمم منظومتك)</h2>
      <p>لكي لا يخدعك أحد، احفظ هذا الجدول التقريبي لاستهلاك الأجهزة الحديثة (التي تحمل تصنيف توفير الطاقة A أو نظام الإنفرتر):</p>
      
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base text-center">
          <thead class="bg-emerald-50">
            <tr>
              <th class="py-3 px-4 border-b text-emerald-900 font-bold">الجهاز</th>
              <th class="py-3 px-4 border-b text-emerald-900 font-bold">القدرة التقريبية (وات/ساعة)</th>
              <th class="py-3 px-4 border-b text-emerald-900 font-bold">ملاحظات تشغيلية</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">مكيف إنفرتر (12,000 وحدة)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">500 - 800 W</td>
              <td class="py-3 px-4 border-b text-right">ينخفض الاستهلاك بعد تبريد الغرفة. لا تضبطه تحت 24 درجة.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">ثلاجة موفرة (250 لتر)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">60 - 90 W</td>
              <td class="py-3 px-4 border-b text-right">الكمبريسور يدور ربع الوقت فقط إذا كان العزل ممتازاً.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">شاشة ذكية (LED 43 Inch)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">40 - 60 W</td>
              <td class="py-3 px-4 border-b text-right">خفف من سطوع الشاشة لتقليل الاستهلاك بـ 20%.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">مروحة سقف (حديثة بملف نحاس)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">70 - 90 W</td>
              <td class="py-3 px-4 border-b text-right">يمكنك استخدام المراوح الـ DC للاستهلاك الأقل (30 وات).</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">لمبة إضاءة (LED)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">9 - 15 W</td>
              <td class="py-3 px-4 border-b text-right">استبدل الفوراً أي مصابيح هالوجين قديمة أو نجف مستهلك.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50">غسالة أوتوماتيك (دورة كاملة)</td>
              <td class="py-3 px-4 border-b text-emerald-700 font-bold">300 - 500 W</td>
              <td class="py-3 px-4 border-b text-right text-red-600">هذا بدون السخان! السخان لوحده يسحب 1500 وات (اغسل بماء فاتر ظهراً).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">5. نصائح ذهبية لا تقدر بثمن لترشيد الاستهلاك</h2>
      <ul>
        <li><strong>ضبط المكيف على 24°C:</strong> كل درجة ترفعها في ريموت المكيف تُوفر لك حوالي 5% إلى 7% من فاتورة الكهرباء (أو من سعة البطارية). تبريد الغرفة לدرجة 18°C إرهاق مجنون للمنظومة بدون فائدة جسدية حقيقية.</li>
        <li><strong>تنظيف فلاتر المكيف والغسالة:</strong> تراكم الغبار على الفلاتر يجعل الكمبريسور يختنق ويعمل لوقت أطول لإنتاج نفس البرودة! اغسل فلاتر المكيف كل أسبوعين في الصيف.</li>
        <li><strong>تهوية خلف الثلاجة:</strong> الصق ظهر الثلاجة بالجدار خطأ فادح؛ اترك مسافة 15 سم كحد أدنى ليتمكن الرديتر من تبريد الغاز بكفاءة، مما يوفر طاقة الدوران.</li>
      </ul>

      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">اجعل منزلك ذكياً وبارداً مع تشكيلتنا الموفرة للطاقة</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          في <strong>متجر أبو إيفان للطاقة المتجددة</strong>، نحن لا نوفر منظومات شمسية فقط، بل جلبنا لك نخبة الأجهزة المنزلية العالية الكفاءة والتي تتناغم مع الطاقة الشمسية (مكيفات إنفرتر، ثلاجات VOLX، والمزيد). 
          تصميمنا لحياتك المتكاملة يوفر لك أموال التأسيس.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/accessories" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">استكشف قسم الأجهزة الموفرة</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-950 transition shadow-lg border border-emerald-500 w-full sm:w-auto">احصل على خطة توفير منزلك عبر الواتساب</a>
        </div>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كم لوح شمسي لتشغيل مكيف 1 طن إنفرتر؟</summary>
          <p class="mt-2 text-gray-700">يكفي 4 ألى 6 ألواح من الفئة العملاقة (580 واط) للتشغيل وقت النهار المباشر بجانب شحن بطارية الليثيوم لفترة الليل.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">هل أقدر أشغل غسالة سخان على الطاقة الشمسية؟</summary>
          <p class="mt-2 text-gray-700">نعم، ولكن يُفضل تشغيلها فقط وقت الذروة الشمسية (الظهيرة) لكي يسحب الإنفرتر قوتها الجبارة (1500 وات) من الألواح مباشرة ويوفر عمر البطارية.</p>
        </details>
      </div>
    `
  },
  {
    id: "ultimate-solar-bundles-yemen-2026",
    title: "ما هي أفضل منظومة طاقة لمنزلي في عدن والحديدة؟",
    excerpt: "تعرف على أسرار الباقات الجاهزة، ووفر مالك ووقتك عبر اختيار باقة متكاملة ومصممة هندسياً لتناسب ميزانيتك واحتياجاتك المنزلية والتجارية.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "باقات الطاقة الشمسية المتكاملة في اليمن",
    content: `
      <h2>باقات الطاقة: لماذا تشتري منظومة متكاملة بدلاً من القطع المتفرقة؟</h2>
      <p>أهلاً بك في المحطة الأهم لرحلتك نحو استقلال الطاقة. يقع الكثير من العملاء في فخ "التجميع العشوائي"، حيث يشتري لوحاً من تاجر، وبطارية من تاجر آخر، وإنفرتر من متجر ثالث، معتقداً أنه يوفر بضع دولارات! لكن النتيجة غالباً ما تكون كارثية هندسياً.</p>
      <p><strong>لماذا تختار "باقة جاهزة"؟</strong> السر يكمن في <strong>التوافق التقني (Compatibility)</strong>. عندما يجمع المهندس باقة متكاملة، فهو يضمن أن تفريغ البطارية يتوافق مع قدرة تحمل الإنفرتر، وأن أمبير الألواح لا يحرق منظم الشحن. الباقات الجاهزة توفر لك الوقت، وأجور التركيب المتكررة، وتضمن لك <strong>ضماناً موحداً (Single-Source Warranty)</strong> يحميك من تهرب التجار وإلقائهم اللوم على بعضهم البعض عند توقف النظام.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">تصنيف الباقات: اعثر على هويتك واحتياجك</h2>
      <p>لا توجد باقة "أفضل بالمطلق"، بل يوجد باقة "أنسب لك". في متجرنا قمنا بهندسة وصياغة باقات تغطي كافة قطاعات المجتمع اليمني باختلاف قدراتهم المادية:</p>

      <h3>1. الباقات الاقتصادية (نظام الإضاءة والأساسيات)</h3>
      <p>هي الباقات المصممة لإنقاذك من ظلام الليل والحر الخفيف. تعتمد غالباً على نظام الـ 12 فولت أو 24 فولت البسيط.<br>
      <strong>القدرة التشغيلية:</strong> تشغيل إضاءات LED متعددة، شحن جوالات بلا توقف، تلفاز صغير، ومروحتين إلى ثلاث مراوح سقفية.<br>
      <strong>المكونات المعتادة:</strong> لوح أو لوحين (أقل من 300 وات)، إنفرتر بسيط (أو منظم شحن مباشر DC)، وبطارية جل (Gel) أو سائلة بحجم 100Ah إلى 150Ah.</p>

      <h3>2. الباقات المتوسطة (نظام الرف الرفاهية الأساسية)</h3>
      <p>هي الباقة الأكثر مبيعاً للأسرة اليمنية العادية (الطبقة المتوسطة). وتعمل غالباً بنظام 24 فولت للحصول على صمود أفضل.<br>
      <strong>القدرة التشغيلية:</strong> جميع ما سبق + ثلاجة منزلية (طراز موفر للطاقة أو الإنفرتر) تعمل ليلاً ونهاراً، غسالة حوضين (لاستخدام النهار)، ومجموعة مراوح.<br>
      <strong>المكونات المعتادة:</strong> 3 إلى 4 ألواح حديثة (بحجم 550W وما فوق)، إنفرتر هجين ذكي (3KW)، وبطاريتين جل 200Ah أو بطارية ليثيوم 100Ah/24V.</p>

      <h3>3. الباقات الاحترافية النخبوية (نظام تشغيل المكيفات)</h3>
      <p>للذين لا يتنازلون عن الراحة المطلقة في عز الصيف، خاصة في المدن الساحلية مثل عدن والحديدة. هذا النظام يعمل بـ 48 فولت وبقوة جبارة.<br>
      <strong>القدرة التشغيلية:</strong> تشغيل مكيف إنفرتر (12,000 وحدة أو أكثر) بكل أريحية، ثلاجة ضخمة أو فريزر، غسالة أوتوماتيك، مايكروويف، وباقي الأحمال العادية المتفرقة بحرية تامة.<br>
      <strong>المكونات المعتادة:</strong> 6 إلى 8 ألواح شمسية 580W N-Type، إنفرتر هجين عملاق (5KW وما فوق)، ونظام بطاريات ليثيوم (LiFePO4) لا يقل عن 100Ah/48V لضمان تحمل أمبيرية تفريغ عالية (High Discharge Current) بدون أن تتلف.</p>

      <h3>4. باقات المشاريع (التجارية والزراعية)</h3>
      <p>تُصمم خصيصاً للمحلات الكبيرة، الورش الميكانيكية التي تشغل "صاروخ وماكينة لحام"، أو للمزارع الكبيرة التي تحتوي على مضخات وغطاسات عميقة. هذه الباقات لا تكون ثابتة تماماً بل تصمم <strong>حسب الطلب المهندسي الدقيق (Custom Built)</strong> بعد دراسة استطاعة معداتكم (Three-Phase أو Single-Phase).</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">مكونات الباقة المثالية التي لا نقبل المساومة فيها</h2>
      <p>قد تجد باقتين في السوق يحملان نفس عدد البطاريات والألواح بفرق سعر يبلغ 500 دولار! أين الخدعة؟ الخدعة تكمن في <strong>الإكسسوارات المخفية وتفاصيل الحماية!</strong></p>
      
      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base">
          <thead class="bg-blue-50">
            <tr>
              <th class="py-3 px-4 text-right border-b text-blue-900 font-bold">المكون</th>
              <th class="py-3 px-4 text-right border-b text-blue-900 font-bold">ماذا نقدم لك في باقاتنا المعتمدة؟</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-blue-800">الكيابل والأسلاك</td>
              <td class="py-3 px-4 border-b">أسلاك نحاس خالص مجدولة ومعزولة (DC Cables) مصممة هندسياً لتحمل أشعة الشمس لعشرين عاماً بسماكات محسوبة تمنع أي هبوط في الفولت (Voltage Drop) أو سخونة قد تؤدي إلى حرائق (لا نستخدم الألمنيوم أو النحاس المغشوش إطلاقاً).</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-blue-800">قواطع الحماية والتيار</td>
              <td class="py-3 px-4 border-b">تأتي كل باقة مزودة بلوحات قواطع (DC Breakers) منفصلة بين الألواح والإنفرتر، وبين البطارية والإنفرتر. بالإضافة لنظام حماية من الصواعق (Surge Protection Device) لتسريب أي صاعقة رعدية أو راجع كهربائي للأرض.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-blue-800">الهياكل والقواعد</td>
              <td class="py-3 px-4 border-b">قواعد ألمنيوم أو حديد مجلفن مضاد للصدأ تتناسب مع ظروف اليمن الجبلية، مصممة لتحمل سرعات رياح عالية وتوفير ميلان دقيق لضمان الحصاد الشمسي الأمثل وحمايتها من تطاير العواصف.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">دليل الميزانية: كيف توازن بين السعر والعمر الافتراضي؟</h2>
      <p>هنا نقف عند مفترق طرق. إذا كانت ميزانيتك محدودة، فإن التوجه لباقة ببطاريات "الجل" هو الأنسب كحل إسعافي ممتاز، ولكن سيتعين عليك التعامل معها برفق وتغييرها كل 3 لـ 5 سنوات. بالمقابل، باقات "الليثيوم" أعلى سعراً في البداية ولكنها <strong>تعفيك من التكاليف لأكثر من 10 سنوات</strong>، وهو ما نعتبره أرخص حل اقتصادي على الإطلاق إذا حسبته بالمدى الطويل، ناهيك عن راحة البال التامة من مراقبة مستوى التفريغ بفضل التقنية المدمجة فيها.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">نصائح ذهبية قبل تركيب واستلام باقتك</h2>
      <ul>
        <li><strong>فحص مساحة السطح:</strong> تأكد من وجود مساحة خالية على سطحك لا يغطيها ظل خزان مياه العمارة أو الأشجار المجاورة (حتى الظل البسيط يقتل الإنتاجية بنسبة 30%).</li>
        <li><strong>التوجيه الصحيح:</strong> الألواح يجب أن تتوجه دائماً نحو (الجنوب) في اليمن للحصول على أكبر نسبة من التشميس النهاري.</li>
        <li><strong>تجهيز التمديدات:</strong> جهز مساراً آمناً لإنزال الكيبلات من السطح إلى موقع الإنفرتر بحيث لا يكون الكيبل معرضاً للعبث أو عبور المركبات.</li>
      </ul>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">استعرض باقات أبو إيفان المعتمدة والمبنية على الجودة</h2>
      <p>لقد صممنا في متجرنا باقات أطلقنا عليها أسماء تمثل واقع الميزات التي تقدمها مثل (باقة النور الاقتصادية)، و (باقة التبريد العملاقة للمكيفات). كل باقة مدروسة فنياً بشكل متكامل لتعمل من أول لحظة تشغيل بأعلى كفاءة ممكنة؛ لا اجتهاد في الجودة ولا تهاون في الحماية!</p>


      <div class="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">ريح رأسك من هم التجميع، واحصل على محطة جاهزة بقوة الجبال!</h4>
        <p class="text-emerald-50 mb-6 text-lg leading-relaxed">
          في <strong>متجر أبو إيفان للطاقة المتجددة</strong>، نقدم لك المنظومة شاملة لضمان الوكالة، التركيب الهندسي الاحترافي، ودعم فني على مدار الساعة. اختر باقتك الآن لتودع الأزمات.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/packages" class="bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">تصفح أقسام الباقات الجاهزة</a>
          <a href="https://wa.me/967784400333" class="bg-emerald-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-900 transition shadow-lg border border-emerald-500 w-full sm:w-auto">اطلب باقة مخصصة لاحتياجك الفريد</a>
        </div>
      </div>
    `
  },
  {
    id: "ultimate-solar-protection-guide-yemen-2026",
    title: "حماية منظومات الطاقة الشمسية: كيف تحمي منظومتك من الاحتراق والصواعق؟",
    excerpt: "دليلك الشامل والهندسي لحماية منظومة الطاقة الشمسية من الحرائق والصواعق عبر استخدام القواطع الصحيحة والكيابل النحاسية الأصلية.",
    image: "https://images.unsplash.com/photo-1621255869084-297eb09819ad?q=80&w=1600&fm=webp&fit=crop",
    imageAlt: "حماية وأنظمة طاقة شمسية وقواطع كهربائية وصناديق تجميع",
    content: `
      <h2>نظام الحماية: الجندي المجهول الذي يحمي استثمارك من الاحتراق!</h2>
      <p>أهلاً بك في الجزء المهمل للأسف من منظومات الطاقة الشمسية. تخيل أنك اشتريت سيارة فارهة بمائة ألف دولار، لكنك رفضت دفع مائة دولار لتركيب مكابح (فرامل) لها بحجة التوفير! هذا بالضبط ما يفعله بعض المستهلكين و "أنصاف الفنيين" عندما يبنون منظومة طاقة شمسية ضخمة بألواح حديثة وبطاريات باهظة، ثم يربطون الأسلاك مباشرة بدون قواطع، أو يستخدمون قواطع تجارية رخيصة!</p>
      
      <h3>لماذا لا يجب التهاون أبداً في نظام الحماية؟</h3>
      <p>منظومة الطاقة الشمسية تتعامل مع تيار مستمر (DC) عالي جداً. هذا التيار ليس كالكهرباء المنزلية العادية؛ إنه تيار صامت ولكنه قاتل ويولد شرارات (Arcing) أقسى من لحام الحديد إذا حدث التماس كهربائي. <strong>مخاطر التوصيل المباشر وبدون حماية تشمل:</strong></p>
      <ul>
        <li><strong>احتراق الكيابل والمنازل:</strong> عند الحمل الزائد أو حدوث مس (Short Circuit) تبدأ الأسلاك بالذوبان والاحتراق، وتشتعل النيران في السقف أو غرفة البطاريات.</li>
        <li><strong>عطب اللوحة الأم للإنفرتر:</strong> رجوع تيار مفاجئ من البطارية أو صاعقة رعدية ستفجر اللوحة الإلكترونية للإنفرتر في أجزاء من الثانية.</li>
        <li><strong>انفجار البطاريات:</strong> إذا تعطل منظم الشحن واستمر بضخ 50 فولت لبطارية 12 فولت، ستغلي سوائل البطارية وتنتفخ وقد تنفجر إذا لم يكن هناك قاطع حماية يفصلها!</li>
      </ul>
      <p class="text-red-600 font-bold mt-4">الحقيقة المرة: تكلفة نظام الحماية بالكامل (قواطع، كيابل أصلية، مانع صواعق) لا تتعدى 5% من القيمة الإجمالية للمنظومة، لكنها تحمي الـ 95% الباقية!</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">قواطع التيار المستمر (DC Breakers) مقابل قواطع المنازل (AC Breakers)</h2>
      <p>هنا تقع الكارثة العظمى في اليمن: استخدام قواطع الكهرباء العادية (المخصصة للعمومي/المواطير) في دوائر الألواح والبطاريات الشمسية!</p>
      
      <p><strong>لماذا هذا خطأ فادح ومميت؟</strong><br>
      تيار الـ AC (المتردد) يرتفع وينخفض لدرجة الصفر 50 مرة في الثانية، مما يسمح للقاطع العادي بفصل الشرارة بسهولة. لكن تيار الـ DC (المستمر من الألواح) هو تيار خطي ثابت وقوي. إذا حدث تماس، القاطع العادي (AC) لن يستطيع إخماد القوس الكهربائي (Arc)، وستستمر الكهرباء بالتدفق داخل القاطع حتى وهو "مغلق" مما يؤدي لذوبانه واشتعاله كقطعة بلاستيك!</p>

      <div class="overflow-x-auto my-6">
        <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden text-sm md:text-base text-center">
          <thead class="bg-red-50">
            <tr>
              <th class="py-3 px-4 border-b text-red-900 font-bold">سمة المقارنة</th>
              <th class="py-3 px-4 border-b text-red-900 font-bold">قواطع (DC) الأصلية للطاقة الشمسية</th>
              <th class="py-3 px-4 border-b text-red-900 font-bold">قواطع المنازل العادية (AC)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-red-700">إخماد الشرارة (Arc Extinguishing)</td>
              <td class="py-3 px-4 border-b text-right text-emerald-700 font-bold">مصممة بغرف إخماد مغناطيسية تقطع الأقواس الكهربائية المستمرة فوراً.</td>
              <td class="py-3 px-4 border-b text-right text-red-600">تفشل تماماً في إخماد قوس التيار المستمر العالي فتذوب وتحترق.</td>
            </tr>
            <tr>
              <td class="py-3 px-4 border-b font-semibold bg-gray-50 text-red-700">الاستخدام المناسب</td>
              <td class="py-3 px-4 border-b text-right">في مسار الألواح للإنفرتر، ومن البطارية للإنفرتر.</td>
              <td class="py-3 px-4 border-b text-right">فقط في مخرج الإنفرتر لتشغيل أحمال المنزل (شاشة، مكيف، ثلاجة).</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>كيف تختار حجم القاطع للبطارية؟</strong> قاعدة هندسية مبسطة: احسب أقصى وات سيسحبه الإنفرتر (مثلاً 3000 وات) واقسمه على فولتية البطارية (مثلاً 24V)، الناتج 125 أمبير. اختر قاطع DC يتحمل 125A واضرب في معامل أمان 1.25، فتكون الإجابة المناسبة هي 150 إلى 160 أمبير (DC Breaker مصمم خصيصاً للبطاريات).</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">مانع الصواعق وتذبذب الجهد (Surge Arresters / SPD)</h2>
      <p>هل سبق واحترق شاشة التلفاز لديك بسبب عودة الكهرباء العمومية فجأة بجهد عالٍ؟ الإنفرتر جهاز حساس جداً، ويحتاج لحماية من الارتفاع الجنوني للكهرباء (Voltage Surge).</p>
      <p><strong>قطعة الـ SPD (Surge Protection Device):</strong> هذه القطعة توضع بين الألواح والإنفرتر. لا سمح الله وضربت صاعقة رعدية مصفوفة الألواح لديك على السطح، هذا الجهاز الذكي يستشعر هذا الجهد الخيالي (بالآلاف الفولتات) فيقرر "التضحية بنفسه" ويفتح مساراً سريعاً لتسريب هذه الصاعقة إلى الأرض (عبر التأريض) قبل أن تصل إلى قلب الإنفرتر وتدمره بالكامل.</p>
      
      <h3>أهمية التأريض (Earthing)</h3>
      <p>مانع الصواعق (SPD) <strong>بدون تأريض هو مجرد قطعة ديكور لا قيمة لها!</strong> التأريض هو قيامك بدق وتد نحاسي عميق في أرض رطبة، وربط هياكل الألواح الحديدية وجهاز الإنفرتر وSPD بهذا الوتد. هكذا تُعطي الشحنات الزائدة والكهرباء الاستاتيكية مساراً للهرب نحو باطن الأرض بأمان تام.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">الكيابل الشمسية (Solar Cables) وقانون فقدان الجهد الطاحن</h2>
      <p>هل تستخدم سلك كهرباء عادي لتمديد الألواح الشمسية؟ للأسف، هذا السلك العادي غير مصمم هندسياً لتحمل أشعة الشمس فوق البنفسجية الحارقة (UV) ولا حرارة الجو القاسية. خلال سنتين، سيتشقق العازل البلاستيكي، وربما يتلامس الخطان الموجب والسالب ويحدث حريق!</p>
      
      <p><strong>الكيابل الشمسية المعتمدة (مثل 4mm أو 6mm Tinned Copper):</strong><br>
      هذه الكيابل مغطاة بطبقتين من العزل المقاوم للاشتعال والمقاوم للأشعة فوق البنفسجية. كما أن النحاس بداخلها يكون "مقصدر" (Tinned) ليمنع الأكسدة والصدأ الأخضر الذي ينشأ بسبب رطوبة الأجواء.</p>

      <h3>وحش فقدان الجهد (Voltage Drop)</h3>
      <p>تخيل أن ألواحك تنتج قوة كبيرة، لكن السلك الذي يوصلها للإنفرتر "نحيف" أو "طويل جداً" (مثلاً 50 متر). هذا السلك سيشكل مقاومة عالية للتيار، وسيحول جزءاً كبيراً من هذه الطاقة إلى حرارة مهدرة داخل السلك! هذا يُعرف بـ Voltage Drop.<br>
      لتلافي ذلك: استخدم جداول حساب الكيابل أو استشر مهندسنا لاختيار السماكة المناسبة (مثلاً مسافة 30 متراً قد تحتاج لكابل 6mm، بينما مسافات أطول تستلزم 10mm أو تركيب صندوق تجميع لدمج السلاسل ورفع المقاس).</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">صناديق التجميع (Combiner Boxes) والفيوزات المنقذة</h2>
      <p>حينما يتوسع نظامك ويصبح لديك 8 ألواح، 12 لوحاً، أو مزرعة غطاس كاملة، فإنك ستصل الألواح على شكل (سترينجات) أو مجموعات متوازية.<br>
      <strong>متى نحتاج صندوق التجميع؟</strong> عندما نريد دمج 3 مجموعات (سترينجات) أو أكثر، يجب تمرير كل مجموعة عبر "فيوز حماية" (DC Fuse) قبل دمجها. لماذا؟ لأنه لو حصل مس أو كُسر لوح في مجموعة، فإن المجموعات السليمة ستعكس طاقة هائلة نحو اللوح المكسور مما سيؤدي لاحتراقه بالكامل. الفيوز هنا يقطع الدائرة فوراً ويمنع الكارثة المتسلسلة.</p>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">لا تخاطر بآلاف الدولارات لأجل إكسسوارات مقلدة!</h2>
      <p>السوق يغص بالقواطع المقلدة التي يكتب عليها "DC" وهي في الواقع قواطع "AC" تم تغيير الغلاف الخارجي لها، وأسلاك ألمنيوم مطلية بالنحاس تباع على أنها نحاس 100%. المخاطرة بشراء هذه القطع من مصادر مجهولة هي بمثابة إشعال لكبريت داخل غرفتك المغلقة.</p>

      <div class="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-8 mt-12 text-center text-white shadow-xl">
        <h4 class="text-2xl font-black mb-4">احمِ مملكتك.. الحماية ليست خياراً ثانوياً!</h4>
        <p class="text-red-50 mb-6 text-lg leading-relaxed">
          في <strong>متجر أبو إيفان للطاقة المتجددة</strong>، نحن نوفر قواطع DC الأصلية (من علامات أمريكية وصينية معتمدة)، وصناديق تجميع جاهزة، وكيابل نحاس مقصدر 100%. هل تشك في أمان منظومتك الحالية؟
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#/category/accessories" class="bg-white text-red-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">تصفح قسم قطع الحماية والإكسسوارات</a>
          <a href="https://wa.me/967784400333" class="bg-red-950 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-900 transition shadow-lg border border-red-500 w-full sm:w-auto">اطلب فحص ترقية الحماية فوراً عبر واتساب</a>
        </div>
      </div>

      <h2 class="text-3xl font-black text-emerald-950 mt-12 mb-6">أسئلة شائعة (البحث الصوتي)</h2>
      <div class="space-y-4">
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">ليش تحترق بطاريات الطاقة الشمسية؟</summary>
          <p class="mt-2 text-gray-700">تحترق عادة لعدم وجود قاطع (DC) أصلي، واقتصار الفنيين على شبك الكيبلات مباشرة، وكذلك التفريغ الجائر أو حرارة الجو القاسية دون تهوية.</p>
        </details>
        <details class="bg-gray-50 p-4 rounded-xl cursor-pointer">
          <summary class="font-bold text-lg text-emerald-900">كيف أحمي المنظومة حقنا من الصواعق؟</summary>
          <p class="mt-2 text-gray-700">تركيب وتد تأريض نحاسي بالأرض، مع تمديده لهياكل الألواح ولجهاز الإنفرتر وربطه بقطعة مانع صواعق (SPD) أصلية في مسار الكابل.</p>
        </details>
      </div>
    `
  }
];

