
import React, { useState } from 'react';

const APPLIANCES = [
  { id: 'lights', name: 'إضاءة (5 لمبات)', watts: 50 },
  { id: 'tv', name: 'شاشة تلفزيون', watts: 100 },
  { id: 'fan', name: 'مروحة سقف', watts: 75 },
  { id: 'fridge', name: 'ثلاجة إنفرتر', watts: 200 },
  { id: 'laptop', name: 'كمبيوتر محمول', watts: 65 },
  { id: 'ac', name: 'مكيف 1 طن (إنفرتر)', watts: 1200 },
];

const SolarCalculator: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [hours, setHours] = useState(5);
  const WHATSAPP_NUMBER = '967784400333';

  const toggleItem = (id: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (newItems[id]) delete newItems[id];
      else newItems[id] = 1;
      return newItems;
    });
  };

  const totalWatts = Object.keys(selectedItems).reduce((sum, id) => {
    const item = APPLIANCES.find(a => a.id === id);
    return sum + (item ? item.watts : 0);
  }, 0);

  const dailyWh = totalWatts * hours;
  const suggestedPanels = Math.ceil(dailyWh / 450); 
  const suggestedBattery = Math.ceil((dailyWh / 12) * 1.3); // سعة البطارية مع هامش تفريغ
  const suggestedInverter = Math.ceil((totalWatts * 1.25) / 500) * 500;

  const handleRequestQuote = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("يرجى اختيار جهاز واحد على الأقل أولاً.");
      return;
    }

    const selectedNames = Object.keys(selectedItems)
      .map(id => APPLIANCES.find(a => a.id === id)?.name)
      .join('، ');

    const message = `السلام عليكم حيفان للطاقة، أريد طلب عرض سعر رسمي بناءً على حسابات الموقع:

*الأجهزة المختارة:* ${selectedNames}
*ساعات التشغيل المتوقعة:* ${hours} ساعات يومياً
*إجمالي الحمل اللحظي:* ${totalWatts} وات
*الاستهلاك اليومي الكلي:* ${dailyWh} وات/ساعة

*المنظومة المقترحة:*
- عدد الألواح (550W): ${suggestedPanels} ألواح
- سعة البطارية المطلوبة: ${suggestedBattery} أمبير
- سعة الإنفرتر المطلوبة: ${suggestedInverter} وات

يرجى تزويدي بأفضل سعر متوفر لهذه المنظومة. شكراً.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-20 bg-gray-900 rounded-[3rem] my-12 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">حاسبة الطاقة الذكية</h2>
          <p className="text-emerald-400 font-bold">اختر أجهزتك وسنخبرك بما تحتاجه من منظومة حيفان</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
              <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-xs text-white">1</span>
              الأجهزة المراد تشغيلها معاً:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {APPLIANCES.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all text-right flex flex-col gap-2 ${
                    selectedItems[item.id] 
                    ? 'border-emerald-500 bg-emerald-500/20 text-white ring-2 ring-emerald-500/50' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-[10px] opacity-60 font-mono tracking-wider">{item.watts}W</span>
                </button>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-bold text-gray-400">ساعات التشغيل اليومية:</h3>
                 <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black">{hours} ساعات</span>
              </div>
              <input 
                type="range" min="1" max="24" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold uppercase">
                <span>1 ساعة</span>
                <span>24 ساعة</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
            <h3 className="text-2xl font-black mb-8 text-center">التوصية المقترحة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 p-5 rounded-3xl text-center border border-white/10">
                <div className="text-3xl mb-2">☀️</div>
                <div className="text-2xl font-black">{suggestedPanels || 0}</div>
                <div className="text-[10px] font-bold opacity-80 uppercase">أحتاج ألواح 550W</div>
              </div>
              <div className="bg-white/10 p-5 rounded-3xl text-center border border-white/10">
                <div className="text-3xl mb-2">🔋</div>
                <div className="text-2xl font-black">{suggestedBattery || 0}Ah</div>
                <div className="text-[10px] font-bold opacity-80 uppercase">سعة البطارية (12V)</div>
              </div>
              <div className="bg-white/20 p-5 rounded-3xl text-center border border-white/20 scale-105 shadow-xl">
                <div className="text-3xl mb-2">🔌</div>
                <div className="text-2xl font-black">{suggestedInverter || 0}W</div>
                <div className="text-[10px] font-black uppercase text-emerald-100">سعة الإنفرتر</div>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
               <div className="flex justify-between text-sm border-b border-emerald-500/50 pb-2">
                  <span className="opacity-70">إجمالي الحمل اللحظي:</span>
                  <span className="font-bold">{totalWatts} وات</span>
               </div>
               <div className="flex justify-between text-sm border-b border-emerald-500/50 pb-2">
                  <span className="opacity-70">الاستهلاك اليومي الكلي:</span>
                  <span className="font-bold">{dailyWh} وات/ساعة</span>
               </div>
            </div>

            <p className="mt-8 text-[11px] text-emerald-100 italic leading-relaxed text-center">
              * هذه النتائج مبنية على معايير تقنية متوسطة. ننصح دائماً بالتواصل معنا لتخصيص المنظومة بدقة.
            </p>
            <button 
              onClick={handleRequestQuote}
              className="mt-6 bg-white text-emerald-900 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              اطلب عرض سعر رسمي
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
