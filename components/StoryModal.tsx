import React from 'react';
import { ShieldCheck, Award, Leaf, Users, ChevronRight, Zap } from 'lucide-react';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
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
            <h1 className="font-black text-emerald-950 text-lg">من نحن - قصة أبـو إيفان</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-7xl font-black text-emerald-950 mb-6 leading-tight">
            نحن لا نبيع ألواحاً.. <br className="hidden md:block" />
            <span className="text-emerald-600">نحن نبيع نوراً لا ينطفئ</span>
          </h2>
          <p className="text-xl md:text-3xl text-gray-600 font-bold max-w-3xl mx-auto leading-relaxed">
            من قلب اليمن الصامد، وُلدت مؤسسة "أبو إيفان للطاقة المتجددة" لتكون شريان حياة يضيء آلاف المنازل، المزارع، والشركات بخبرة هندسية لا تضاهى.
          </p>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 mb-20">
          <div className="space-y-8 text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
            <p>
              عندما خيم الظلام واشتدت الحاجة للطاقة المستدامة، لم نكتفِ بمجرد الاستيراد والبيع كغيرنا. لقد قمنا بتأسيس فريق هندسي متخصص يطوف محافظات اليمن، يدرس المناخ، يفحص الرطوبة في عدن، ويحلل طبيعة الغبار والرياح في الجوف ومأرب.
            </p>
            <p>
              وبناءً على هذه الدراسات الدقيقة، بدأنا بالتعاقد مع كبرى المصانع العالمية (مثل Jinko و Growatt و Tubo) لصناعة ألواح وبطاريات وإنفرترات <span className="font-bold text-emerald-900 bg-emerald-100 px-2 rounded">بمواصفات يمنية خاصة 100%</span>، قادرة على تحمل أقسى الظروف.
            </p>
            
            <div className="bg-emerald-900 text-white p-10 rounded-[2rem] shadow-lg mt-10 md:-mx-10 transform md:scale-105 border-r-8 border-emerald-400">
              <h3 className="text-2xl font-black mb-4">رؤيتنا لمستقبل اليمن</h3>
              <p className="text-emerald-50 leading-relaxed font-bold">
                تطمح مؤسسة أبو إيفان أن يصبح اليمن بالكامل معتمداً على الطاقة النظيفة بحلول عام 2030، حيث لا يوجد بيت إلا وفيه نور دائم وآمن، ولا مزرعة إلا وترتوي عبر غطاسات شمسية حديثة منقطعة النظير. نحن ندعم الاقتصاد الوطني ونحافظ على بيئتنا لأجيالنا القادمة.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <h3 className="text-3xl font-black text-center text-emerald-950 mb-12">القيم والمبادئ التي لا نساوم عليها</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 flex items-center justify-center rounded-2xl mb-6">
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-black text-xl text-emerald-950 mb-3">الأمانة أولاً</h4>
            <p className="text-gray-500 font-medium">نصارح عميلنا بالعيوب والمزايا، ولا نبيع المقلد ولو كان الربح فيه مضاعفاً أضعافاً.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-2xl mb-6">
              <Award size={32} />
            </div>
            <h4 className="font-black text-xl text-emerald-950 mb-3">خبرة هندسية</h4>
            <p className="text-gray-500 font-medium">نحن لسنا مجرد تُجار، فريقنا يضم كوكبة من مهندسي الطاقة لتصميم منظومتك بحسابات علمية دقيقة.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl mb-6">
              <Zap size={32} />
            </div>
            <h4 className="font-black text-xl text-emerald-950 mb-3">ضمان حقيقي</h4>
            <p className="text-gray-500 font-medium">الضمان عندنا ليس مجرد ورقة؛ بل هو استبدال فوري ودعم فني ممتد حتى بعد البيع بسنوات.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 flex items-center justify-center rounded-2xl mb-6">
              <Leaf size={32} />
            </div>
            <h4 className="font-black text-xl text-emerald-950 mb-3">دعم البيئة اليمنية</h4>
            <p className="text-gray-500 font-medium">هدفنا التخلص من مولدات الديزل الملوثة والمزعجة، وحماية جوائنا وسمائنا من الانبعاثات.</p>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-emerald-950 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center relative z-10">
             <div>
               <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-2">+15</div>
               <div className="text-xl font-bold opacity-90">سنوات من الخبرة والريادة</div>
             </div>
             <div>
               <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-2">40,000</div>
               <div className="text-xl font-bold opacity-90">عميل يمني نتشرف بخدمته</div>
             </div>
             <div>
               <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-2">22</div>
               <div className="text-xl font-bold opacity-90">محافظة يشملها شحننا وتغطيتنا</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryModal;
