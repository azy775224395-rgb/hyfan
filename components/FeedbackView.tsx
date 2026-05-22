import React from 'react';
import SEO from './SEO';

interface FeedbackViewProps {
  onClose: () => void;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ onClose }) => {
  return (
    <div className="pt-24 pb-32 container mx-auto px-4 max-w-4xl min-h-screen">
      <SEO title="الشكاوى والاقتراحات | أبو إيفان للطاقة المتجددة" description="تواصل معنا لتقديم الشكاوى أو الاقتراحات" />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-emerald-950">الشكاوى و الاقتراحات</h2>
        <button onClick={onClose} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">عودة للرئيسية</button>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-gray-600 font-bold text-lg leading-relaxed mb-6">
            نحن نهتم برأيك ونسعى لتقديم أفضل خدمة ممكنة. في حال كان لديك أي شكوى أو اقتراح، يرجى تعبئة النموذج أدناه أو التواصل معنا مباشرة.
          </p>
          <div className="flex justify-center gap-4">
             <a href="https://wa.me/967784400333" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-transform hover:scale-105 active:scale-95">تواصل معنا عبر واتساب</a>
             <a href="mailto:support@abuevan-energy.com" className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition-colors">إرسال بريد إلكتروني</a>
          </div>
        </div>

        <form className="max-w-2xl mx-auto flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("نشكرك على تواصلك. تم الإرسال بنجاح."); onClose(); }}>
           <div className="flex flex-col gap-2">
             <label className="font-bold text-emerald-900 ml-2">الاسم الكريم</label>
             <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 font-bold transition-colors" required />
           </div>
           <div className="flex flex-col gap-2">
             <label className="font-bold text-emerald-900 ml-2">رقم الجوال</label>
             <input type="tel" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 font-bold transition-colors" dir="ltr" placeholder="+967" required />
           </div>
           <div className="flex flex-col gap-2">
             <label className="font-bold text-emerald-900 ml-2">نوع الرسالة</label>
             <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 font-bold transition-colors">
                <option>اقتراح لتحسين الخدمة</option>
                <option>شكوى بخصوص منتج</option>
                <option>شكوى بخصوص الخدمة</option>
                <option>أخرى</option>
             </select>
           </div>
           <div className="flex flex-col gap-2">
             <label className="font-bold text-emerald-900 ml-2">تفاصيل الرسالة</label>
             <textarea rows={5} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 font-bold transition-colors resize-none" required></textarea>
           </div>
           <button type="submit" className="w-full bg-emerald-600 text-white font-black text-lg py-4 rounded-xl shadow-lg mt-4 hover:bg-emerald-700 transition-transform active:scale-95">إرسال الرسالة</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackView;
