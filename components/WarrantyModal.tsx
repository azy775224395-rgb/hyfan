import React from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, ChevronRight, PenTool as Tool, Wrench } from 'lucide-react';

interface WarrantyModalProps {
  onClose: () => void;
}

const WarrantyModal: React.FC<WarrantyModalProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] animate-fade-in pb-24 md:pb-32">
       {/* Header Back Button */}
       <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <div className="flex-grow text-center ml-11">
            <h1 className="font-black text-emerald-950 text-lg">الضمان والدعم الفني</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="text-center mb-16 animate-slide-up">
          <div className="w-24 h-24 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
             <ShieldCheck size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-6">
            وثيقة <span className="text-emerald-600">الضمان الذهبي</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-bold max-w-2xl mx-auto leading-relaxed">
            في أبو إيفان للطاقة المتجددة، نحن لا نترك عميلنا بعد عملية الشراء. التزامنا تجاهك مستمر لسنوات لنضمن أداء منظومتك كما في اليوم الأول.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
             <h3 className="text-2xl font-black text-emerald-950 mb-6 flex items-center gap-3">
               <span className="bg-emerald-100 p-2 rounded-xl text-emerald-600"><ShieldCheck size={28} /></span>
               ضمان الألواح والبطاريات
             </h3>
             <ul className="space-y-4 text-gray-600 font-medium text-lg">
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 font-bold ml-1">الألواح الشمسية:</strong> ضمان مصنعي حقيقي وأداء فعلي يصل إلى 25 عاماً من كبرى الوكالات (Jinko, JA Solar).
                </li>
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 font-bold ml-1">البطاريات (جل أو ليثيوم):</strong> نحن الوكيل الحصري الذي يوفر ضمان "استبدال فوري" من المالك مباشرة في حال الهبوط غير المبرر للأداء ووجود عيب مصنع.
                </li>
             </ul>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
             <h3 className="text-2xl font-black text-emerald-950 mb-6 flex items-center gap-3">
               <span className="bg-amber-100 p-2 rounded-xl text-amber-600"><Wrench size={28} /></span>
               ضمان الإنفرترات والغطاسات
             </h3>
             <ul className="space-y-4 text-gray-600 font-medium text-lg">
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 font-bold ml-1">الإنفرترات:</strong> صيانة مجانية شاملة القطع لـ(سنة واحدة)، إلى جانب التحديث المجاني لنظام التشغيل إن لزم الأمر.
                </li>
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 font-bold ml-1">غطاسات الآبار:</strong> نضمن الغطاسات ضد التآكل والصدأ لمياه البيار المالحة، مع كفالة على المضخة والمحرك لـ12 شهراً.
                </li>
             </ul>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-shrink-0 w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
                <Truck size={40} />
             </div>
             <div>
               <h3 className="text-2xl font-black text-emerald-950 mb-4">كفالة الشحن والتأمين حتى الباب</h3>
               <p className="text-gray-600 font-medium text-lg leading-relaxed">
                 تخشى كسر الألواح أثناء الشحن لمدينتك؟ نحن نتحمل المسؤولية الكاملة والتأمين على منتجاتك من لحظة خروجها من مستودعاتنا في المعلا أو صنعاء، وحتى استلامك لها شخصياً. في حال حدوث أي ضرر في الطريق، نقوم بشحن بديل فوراً على نفقتنا دون نقاش أو تحميلك لرسوم إضافية.
               </p>
             </div>
          </div>
        </div>

        {/* Support Steps */}
        <div className="bg-emerald-950 rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl">
           <h3 className="text-3xl font-black mb-10 text-center">خطوات طلب الدعم الفني أو الضمان</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="text-center z-10">
                 <div className="w-16 h-16 mx-auto bg-emerald-800 text-emerald-300 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-inner border-2 border-emerald-700">1</div>
                 <h4 className="text-xl font-bold mb-3 text-emerald-50">تواصل مع الدعم</h4>
                 <p className="text-emerald-200/80 font-medium">أرسل رسالة واتساب توضح فيها فاتورة الشراء وصورة أو مقطع فيديو قصير للمشكلة.</p>
              </div>
              
              <div className="hidden md:block absolute top-[2rem] w-full h-1 border-t-2 border-dashed border-emerald-800/80 z-0"></div>
              
              <div className="text-center z-10">
                 <div className="w-16 h-16 mx-auto bg-emerald-800 text-emerald-300 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-inner border-2 border-emerald-700">2</div>
                 <h4 className="text-xl font-bold mb-3 text-emerald-50">التشخيص السريع</h4>
                 <p className="text-emerald-200/80 font-medium">المهندس المناوب سيقوم بمراجعة حالتك وعمل تشخيص أولي وقد يطلب منك ضبط بعض الإعدادات.</p>
              </div>

              <div className="text-center z-10">
                 <div className="w-16 h-16 mx-auto bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-4 border-emerald-400">3</div>
                 <h4 className="text-xl font-bold mb-3 text-white">الاستبدال أو الصيانة</h4>
                 <p className="text-emerald-100 font-medium">إذا ثبت وجود عيب مصنعي، سنتكفل بالاستبدال الفوري وشحنه لمدينتك مجاناً بأسرع وقت، أو إحالة القطعة لمركز الصيانة المعتمد لدينا.</p>
              </div>
           </div>
           
           <div className="mt-16 text-center">
             <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = "https://wa.me/967784400333";
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }} 
                className="inline-flex items-center gap-3 bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-gray-100 transition-all active:scale-95"
              >
                <HeadphonesIcon size={24} />
                تواصل مع المهندس المناوب الآن
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WarrantyModal;
