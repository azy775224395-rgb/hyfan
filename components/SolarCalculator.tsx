
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
  const suggestedBattery = Math.ceil((dailyWh / 12) * 1.3); 
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
- سعة الإنفرتر المطلوبة: ${suggestedInverter} وات`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-12 md:py-24 bg-gray-900 rounded-3xl md:rounded-[4rem] my-8 md:my-16 text-white overflow-hidden relative border border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="container mx-auto px-2 md:px-12 relative z-10 w-full">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">حاسبة الطاقة الذكية</h2>
          <p className="text-emerald-400 font-bold text-sm md:text-xl opacity-90">صمم منظومتك بنفسك في ثوانٍ معدودة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 w-full">
          {/* الاختيارات */}
          <div className="bg-white/5 backdrop-blur-2xl p-4 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 w-full">
            <h3 className="text-lg md:text-2xl font-black mb-6 md:mb-10 flex items-center gap-4 text-emerald-400">
              <span className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-sm md:text-xl text-white shadow-lg">1</span>
              الأجهزة المراد تشغيلها:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-6 w-full">
              {APPLIANCES.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all text-right flex flex-col gap-2 md:gap-4 ${
                    selectedItems[item.id] 
                    ? 'border-emerald-500 bg-emerald-500/20 text-white ring-4 ring-emerald-500/20' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span className="font-black text-xs md:text-xl leading-tight">{item.name}</span>
                  <span className="text-[10px] md:text-sm opacity-60 font-mono tracking-widest">{item.watts}W</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 md:mt-16 p-5 md:p-10 bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-white/5">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                 <h3 className="text-xs md:text-lg font-black text-gray-400 uppercase">ساعات التشغيل:</h3>
                 <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs md:text-xl font-black shadow-lg">{hours} ساعات</span>
              </div>
              <input 
                type="range" min="1" max="24" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 md:h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] md:text-sm text-gray-500 mt-4 font-black">
                <span>1 ساعة</span>
                <span>24 ساعة</span>
              </div>
            </div>
          </div>

          {/* النتائج */}
          <div className="bg-emerald-600 p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-3xl flex flex-col justify-center w-full relative overflow-hidden">
            {/* زخرفة خلفية للنتيجة */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 text-center relative z-10">المنظومة المقترحة</h3>
            
            <div className="grid grid-cols-3 gap-2 md:gap-8 w-full relative z-10">
              <div className="bg-white/15 backdrop-blur-md p-3 md:p-10 rounded-2xl md:rounded-[2.5rem] text-center border border-white/20 flex flex-col items-center justify-center group hover:bg-white/25 transition-all">
                <div className="text-2xl md:text-5xl mb-2">☀️</div>
                <div className="text-lg md:text-4xl font-black leading-none">{suggestedPanels || 0}</div>
                <div className="text-[9px] md:text-sm font-black opacity-80 uppercase mt-2">ألواح 550W</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md p-3 md:p-10 rounded-2xl md:rounded-[2.5rem] text-center border border-white/20 flex flex-col items-center justify-center group hover:bg-white/25 transition-all">
                <div className="text-2xl md:text-5xl mb-2">🔋</div>
                <div className="text-lg md:text-4xl font-black leading-none">{suggestedBattery || 0}Ah</div>
                <div className="text-[9px] md:text-sm font-black opacity-80 uppercase mt-2">بطارية 12V</div>
              </div>
              <div className="bg-white/25 backdrop-blur-md p-3 md:p-10 rounded-2xl md:rounded-[2.5rem] text-center border border-white/30 flex flex-col items-center justify-center shadow-2xl scale-110">
                <div className="text-2xl md:text-5xl mb-2">🔌</div>
                <div className="text-lg md:text-4xl font-black leading-none">{suggestedInverter || 0}W</div>
                <div className="text-[9px] md:text-sm font-black uppercase text-emerald-50 mt-2">الإنفرتر</div>
              </div>
            </div>
            
            <div className="mt-12 md:mt-20 space-y-4 relative z-10">
               <div className="flex justify-between text-xs md:text-xl border-b border-emerald-500/50 pb-4">
                  <span className="opacity-80">إجمالي الحمل اللحظي:</span>
                  <span className="font-black">{totalWatts} وات</span>
               </div>
               <div className="flex justify-between text-xs md:text-xl border-b border-emerald-500/50 pb-4">
                  <span className="opacity-80">الاستهلاك اليومي:</span>
                  <span className="font-black">{dailyWh} وات/ساعة</span>
               </div>
            </div>

            <button 
              onClick={handleRequestQuote}
              className="mt-10 md:mt-16 bg-white text-emerald-900 py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black hover:bg-emerald-50 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 text-sm md:text-2xl relative z-10"
            >
              اطلب عرض سعر رسمي الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
