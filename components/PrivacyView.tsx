import React from 'react';
import SEO from './SEO';

interface PrivacyViewProps {
  onClose: () => void;
}

const PrivacyView: React.FC<PrivacyViewProps> = ({ onClose }) => {
  return (
    <div className="pt-24 pb-32 container mx-auto px-4 max-w-4xl min-h-screen">
      <SEO title="سياسة الاستخدام والخصوصية | أبو إيفان للطاقة المتجددة" description="سياسة الاستخدام والخصوصية لمتجر أبو إيفان للطاقة المتجددة" />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-emerald-950">سياسه الاستخدام و الخصوصيه</h2>
        <button onClick={onClose} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">عودة للرئيسية</button>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 prose prose-emerald prose-lg max-w-none font-medium text-gray-600">
        <p className="font-bold text-xl text-emerald-800">
          في أبو إيفان للطاقة المتجددة، نحن نأخذ خصوصيتك على محمل الجد. توضح هذه السياسة كيفية جمعنا للمعلومات، واستخدامها، وحمايتها.
        </p>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">1. جمع المعلومات</h3>
        <p>
          نحن نجمع المعلومات التي تقدمها لنا بشكل مباشر عندما تستخدم موقعنا الإلكتروني لإنشاء حساب، أو إكمال طلب شراء، أو الاشتراك في النشرة الإخبارية، أو التواصل مع خدمة العملاء. قد تشمل هذه المعلومات الاسم، رقم الهاتف، البريد الإلكتروني، وعنوان التوصيل.
        </p>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">2. استخدام المعلومات</h3>
        <p>
          نשתخدم المعلومات التي نجمعها للأغراض التالية:
        </p>
        <ul className="list-disc pr-6 space-y-2 mt-4 font-bold">
          <li>معالجة وإدارة طلباتك.</li>
          <li>التواصل معك بخصوص طلبك، وتقديم خدمة دعم العملاء.</li>
          <li>تحسين خدماتنا وتجربة المستخدم على موقعنا.</li>
          <li>إرسال العروض الترويجية والتحديثات إذا كنت قد اشتركت في النشرة.</li>
        </ul>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">3. حماية المعلومات</h3>
        <p>
          نتخذ الإجراءات الأمنية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح. يتم تخزين المعلومات في بيئة آمنة وتشفيرها عند الضرورة.
        </p>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">4. مشاركة المعلومات</h3>
        <p>
          نحن لا نقوم ببيع أو تأجير معلوماتك الشخصية لجهات خارجية. قد نشارك المعلومات فقط مع الشركاء الموثوقين الذين يشاركوننا في تقديم الخدمة (مثل شركات الشحن).
        </p>
        
        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">5. التغييرات في السياسة</h3>
        <p>
          نحتفظ بالحق في تعديل هذه السياسة من وقت لآخر. سيتم نشر التغييرات على هذه الصفحة، لذا يرجى مراجعتها بشكل دوري.
        </p>
      </div>
    </div>
  );
};

export default PrivacyView;
