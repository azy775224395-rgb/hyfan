import React from 'react';
import SEO from './SEO';

interface RefundPolicyViewProps {
  onClose: () => void;
}

const RefundPolicyView: React.FC<RefundPolicyViewProps> = ({ onClose }) => {
  return (
    <div className="pt-24 pb-32 container mx-auto px-4 max-w-4xl min-h-screen">
      <SEO title="سياسة الاستبدال والاسترجاع | أبو إيفان للطاقة المتجددة" description="سياسة الاستبدال والاسترجاع لمتجر أبو إيفان للطاقة المتجددة" />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-emerald-950">سياسة الاستبدال أو الاسترجاع</h2>
        <button onClick={onClose} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">عودة للرئيسية</button>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 prose prose-emerald prose-lg max-w-none font-medium text-gray-600">
        <p className="font-bold text-xl text-emerald-800">
          في أبو إيفان للطاقة المتجددة، نحن نضمن لك تجربة تسوق مريحة وشفافة. إذا لم تكن راضياً عن منتجك، يمكنك الاستفادة من سياسة الاستبدال والاسترجاع الموضحة أدناه.
        </p>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">أولاً: الاسترجاع</h3>
        <ul className="list-disc pr-6 space-y-2 font-bold">
          <li>يمكن للعميل استرجاع المنتج خلال <strong>3 أيام</strong> من تاريخ استلام الطلب.</li>
          <li>يجب أن يكون المنتج بحالته الأصلية، غير مستخدم، وبغلافه الأصلي وكامل ملحقاته.</li>
          <li>لا يشمل الاسترجاع المنتجات التي تم تركيبها أو تشغيلها إذا كانت سليمة ولا تعاني من عيوب مصنعية.</li>
          <li>يتحمل العميل تكاليف شحن الإرجاع إلا إذا كان هناك خطأ في الطلب أو المنتج تالفاً عند الوصول.</li>
        </ul>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">ثانياً: الاستبدال</h3>
        <ul className="list-disc pr-6 space-y-2 font-bold">
          <li>يمكن للعميل استبدال المنتج خلال <strong>7 أيام</strong> من تاريخ الاستلام.</li>
          <li>يجب إعادة المنتج بحالته الأصلية تماماً للتأكد من قبوله للاستبدال.</li>
          <li>في حال استبدال منتج بمنتج آخر ذو قيمة مختلفة، سيتم تسوية فارق السعر بالتواصل مع خدمة العملاء.</li>
        </ul>

        <h3 className="text-2xl font-black text-emerald-900 mt-10 mb-4">ثالثاً: العيوب المصنعية والضمان</h3>
        <p>
          إذا استلمت منتجاً معيباً مصنعياً، فنحن نتكفل باستبداله مجاناً. وتطبق سياسة الضمان المعتمدة لدينا على الأعطال والأضرار التي تغطيها وثيقة ضمان كل منتج.
        </p>

        <div className="mt-12 bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100 text-center">
          <p className="font-bold text-emerald-900 mb-4">
            لتقديم طلب استرجاع أو استبدال، نرجو منك التواصل مع خدمة العملاء وتزويدنا برقم الطلب.
          </p>
          <a href="https://wa.me/967784400333" target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-emerald-700 transition-colors">
            التواصل مع خدمة العملاء
          </a>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyView;
