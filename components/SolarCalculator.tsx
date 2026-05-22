
import React, { useState } from 'react';

const APPLIANCES = [
  { id: 'lights', name: 'إضاءة (5 لمبات)', watts: 50 },
  { id: 'tv', name: 'شاشة تلفزيون', watts: 100 },
  { id: 'fan', name: 'مروحة سقف', watts: 75 },
  { id: 'fridge', name: 'ثلاجة إنفرتر', watts: 200 },
  { id: 'laptop', name: 'كمبيوتر محمول', watts: 65 },
  { id: 'ac', name: 'مكيف 1 طن', watts: 1200 },
];

const SolarCalculator: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [hours, setHours] = useState(5);
  const [isSending, setIsSending] = useState(false);
  
  const WHATSAPP_NUMBER = '967784400333';

  const toggleItem = (id: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (newItems[id]) delete newItems[id];
      else newItems[id] = 1;
      return newItems;
    });
  };

  const resetCalculator = () => {
    setSelectedItems({});
    setHours(5);
  };

  const totalWatts = Object.keys(selectedItems).reduce((sum, id) => {
    const item = APPLIANCES.find(a => a.id === id);
    return sum + (item ? item.watts : 0);
  }, 0);

  const dailyWh = totalWatts * hours;
  const suggestedPanels = Math.ceil(dailyWh / 450) || 0; 
  const suggestedBattery = Math.ceil((dailyWh / 12) * 1.3) || 0; 
  const suggestedInverter = Math.ceil((totalWatts * 1.25) / 500) * 500 || 0;

  const handleRequestQuote = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("يرجى اختيار جهاز واحد على الأقل من القائمة أولاً.");
      return;
    }

    setIsSending(true);

    const selectedNames = Object.keys(selectedItems)
      .map(id => APPLIANCES.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join('، ');

    const message = `السلام عليكم أبو إيفان للطاقة المتجددة، أريد طلب عرض سعر رسمي بناءً على حسابات الموقع:

*الأجهزة المختارة:* ${selectedNames}
*ساعات التشغيل المتوقعة:* ${hours} ساعات يومياً
*إجمالي الحمل اللحظي:* ${totalWatts} وات
*الاستهلاك اليومي الكلي:* ${dailyWh} وات/ساعة

*المنظومة المقترحة:*
- عدد الألواح (550W): ${suggestedPanels} ألواح
- سعة البطارية المطلوبة: ${suggestedBattery} أمبير
- سعة الإنفرتر المطلوبة: ${suggestedInverter} وات`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    // محاكاة تحميل بسيطة لتحسين تجربة المستخدم
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSending(false);
    }, 800);
  };

  return (
    <section className="py-8 md:py-24 bg-gray-900 rounded-[1.5rem] md:rounded-[4rem] my-8 md:my-16 text-white overflow-hidden relative border border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6">
          <div className="text-right">
            <h2 className="text-2xl md:text-5xl font-black mb-3">حاسبة الطاقة الذكية</h2>
            <p className="text-emerald-400 font-bold text-xs md:text-xl opacity-90">صمم منظومتك بنفسك في ثوانٍ</p>
          </div>
          <button 
            onClick={resetCalculator}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-6 py-3 rounded-2xl border border-red-500/20 transition-all font-bold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            مسح جميع الأجهزة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 w-full">
            <h3 className="text-base md:text-2xl font-black mb-6 md:mb-10 flex items-center gap-3 text-emerald-400">
              <span className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center text-xs md:text-xl text-white shadow-lg">1</span>
              الأجهزة:
            </h3>
            <div className="grid grid-cols-2 gap-3 md:gap-6 w-full">
              {APPLIANCES.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3 md:p-8 rounded-xl md:rounded-[2.5rem] border transition-all text-right flex flex-col gap-1 md:gap-4 ${
                    selectedItems[item.id] 
                    ? 'border-emerald-500 bg-emerald-500/20 text-white ring-4 ring-emerald-500/20' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span className="font-black text-[10px] md:text-xl leading-tight">{item.name}</span>
                  <span className="text-[8px] md:text-sm opacity-60 font-mono tracking-widest">{item.watts}W</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 md:mt-16 p-4 md:p-10 bg-white/5 rounded-[1.5rem] md:rounded-[3rem] border border-white/5">
              <div className="flex justify-between items-center mb-4 md:mb-8">
                 <h3 className="text-[10px] md:text-lg font-black text-gray-400 uppercase">ساعات التشغيل:</h3>
                 <span className="bg-emerald-500 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xl font-black shadow-lg">{hours} س</span>
              </div>
              <input 
                type="range" min="1" max="24" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-1.5 md:h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="bg-emerald-600 p-6 md:p-16 rounded-[1.5rem] md:rounded-[3rem] shadow-3xl flex flex-col justify-center w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-xl md:text-4xl font-black mb-8 md:mb-16 text-center relative z-10">المنظومة المقترحة</h3>
            
            <div className="grid grid-cols-3 gap-2 md:gap-8 w-full relative z-10">
              <div className="bg-white/15 backdrop-blur-md p-3 md:p-10 rounded-xl md:rounded-[2.5rem] text-center border border-white/20 flex flex-col items-center justify-center">
                <div className="text-xl md:text-5xl mb-1">☀️</div>
                <div className="text-sm md:text-4xl font-black">{suggestedPanels}</div>
                <div className="text-[7px] md:text-sm font-black opacity-80 uppercase mt-1">لوح</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md p-3 md:p-10 rounded-xl md:rounded-[2.5rem] text-center border border-white/20 flex flex-col items-center justify-center">
                <div className="text-xl md:text-5xl mb-1">🔋</div>
                <div className="text-sm md:text-4xl font-black">{suggestedBattery}</div>
                <div className="text-[7px] md:text-sm font-black opacity-80 uppercase mt-1">أمبير</div>
              </div>
              <div className="bg-white/25 backdrop-blur-md p-3 md:p-10 rounded-xl md:rounded-[2.5rem] text-center border border-white/30 flex flex-col items-center justify-center shadow-xl md:scale-110">
                <div className="text-xl md:text-5xl mb-1">🔌</div>
                <div className="text-sm md:text-4xl font-black">{suggestedInverter}W</div>
                <div className="text-[7px] md:text-sm font-black uppercase mt-1">إنفرتر</div>
              </div>
            </div>

            <button 
              onClick={handleRequestQuote}
              disabled={isSending}
              className={`mt-8 md:mt-16 bg-white text-emerald-900 py-4 md:py-8 rounded-xl md:rounded-[2.5rem] font-black transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-2xl relative z-10 ${isSending ? 'opacity-80 cursor-not-allowed' : 'hover:bg-emerald-50'}`}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5 md:h-8 md:w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التحويل...
                </>
              ) : (
                'اطلب عرض سعر رسمي'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
