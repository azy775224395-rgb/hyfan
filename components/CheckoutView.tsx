
import React, { useState, useEffect } from 'react';
import { Product, ShippingInfo, UserProfile } from '../types';

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
    } else if (step === 'otp-verify') {
      if (otp.length < 4) return;
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
        <p className="text-gray-400 font-bold mb-10 text-sm">سيتم استخدام هذه البيانات في بوليصة الشحن الرسمية.</p>
        <form onSubmit={handleNextStep} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mr-2">الاسم الرباعي الكامل</label>
            <input 
              type="text" required value={shipping.fullName} 
              onChange={e => setShipping({...shipping, fullName: e.target.value})}
              placeholder="الاسم كما في الهوية"
              className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mr-2">رقم هاتف التواصل</label>
              <input 
                type="tel" required value={shipping.phone}
                onChange={e => setShipping({...shipping, phone: e.target.value})}
                placeholder="7XXXXXXXX"
                className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mr-2">المحافظة</label>
              <select 
                value={shipping.city}
                onChange={e => setShipping({...shipping, city: e.target.value})}
                className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-black"
              >
                <option>صنعاء</option><option>تعز</option><option>عدن</option><option>إب</option><option>حضرموت</option><option>الحديدة</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mr-2">العنوان السكني التفصيلي</label>
            <textarea 
              required value={shipping.address}
              onChange={e => setShipping({...shipping, address: e.target.value})}
              placeholder="المنطقة، الشارع، علامة مميزة..."
              className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold min-h-[120px]"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl mt-8">
            المتابعة لعملية الدفع الآمن
          </button>
        </form>
      </div>
    </div>
  );

  const renderCardPayment = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50">
        <div className={`relative h-60 w-full rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden mb-12 transform hover:rotate-1 transition-all duration-500 ${
          cardType === 'visa' ? 'bg-gradient-to-br from-blue-700 to-blue-900' : 
          cardType === 'mastercard' ? 'bg-gradient-to-br from-red-600 to-orange-600' :
          'bg-gradient-to-br from-gray-800 to-gray-950'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex justify-between items-start mb-12">
            <div className="w-16 h-10 bg-yellow-400/40 rounded-lg border border-yellow-400/50 shadow-inner" />
            <div className="text-3xl font-black italic tracking-tighter opacity-80 uppercase">{cardType === 'unknown' ? 'BANK CARD' : cardType}</div>
          </div>
          <div className="text-2xl md:text-3xl font-mono tracking-[0.3em] mb-8 drop-shadow-lg">
            {card.number.padEnd(16, '•').match(/.{1,4}/g)?.join(' ')}
          </div>
          <div className="flex justify-between items-end">
             <div>
               <div className="text-[10px] opacity-60 font-black uppercase mb-1">Holder</div>
               <div className="text-base font-black truncate max-w-[220px] tracking-wide">{card.name || 'HAYFAN CUSTOMER'}</div>
             </div>
             <div className="text-left">
               <div className="text-[10px] opacity-60 font-black uppercase mb-1">Exp</div>
               <div className="text-base font-black tracking-widest">{card.expiry || 'MM/YY'}</div>
             </div>
          </div>
        </div>

        <form onSubmit={handleNextStep} className="space-y-6">
          {cardError && <div className="p-5 bg-red-50 text-red-600 rounded-2xl text-xs font-black text-center border border-red-100">{cardError}</div>}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3">رقم البطاقة (16 رقم)</label>
            <input 
              type="text" required maxLength={19}
              value={card.number}
              onChange={e => {
                const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                detectCardType(val);
                const parts = val.match(/.{1,4}/g) || [];
                setCard({...card, number: parts.join(' ')});
              }}
              placeholder="0000 0000 0000 0000"
              className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-mono text-xl tracking-[0.15em]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3">اسم حامل البطاقة</label>
            <input 
              type="text" required value={card.name}
              onChange={e => setCard({...card, name: e.target.value.toUpperCase()})}
              placeholder="NAME AS PRINTED"
              className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black uppercase tracking-wider"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3">انتهاء (MM/YY)</label>
              <input type="text" required maxLength={5} value={card.expiry} onChange={e => setCard({...card, expiry: e.target.value})} placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black text-center" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3">CVV</label>
              <input type="password" required maxLength={3} value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} placeholder="•••" className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black text-center" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black shadow-2xl hover:bg-indigo-700 transition-all text-xl mt-4">إرسال طلب التحقق البنكي</button>
        </form>
      </div>
    </div>
  );

  const renderOtpVerify = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4 text-center">
       <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-3xl border border-emerald-50">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-10"><svg className="text-blue-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <h2 className="text-3xl font-black text-emerald-950 mb-4">نظام التحقق الموحد</h2>
          <p className="text-gray-500 font-bold mb-10 text-sm">أرسل البنك رمز التحقق OTP إلى هاتفك. يرجى إدخاله لإتمام العملية.</p>
          <div className="space-y-8">
            <input type="text" required maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} placeholder="0 0 0 0" className="w-full bg-gray-50 border-2 border-gray-100 p-6 rounded-[1.5rem] outline-none focus:border-blue-500 font-mono text-4xl text-center tracking-[0.5em]" />
            <button onClick={handleNextStep} disabled={otp.length < 4} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-blue-700 transition-all text-xl disabled:opacity-30">تأكيد عملية الشراء</button>
          </div>
       </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="max-w-xl mx-auto py-32 text-center space-y-12 animate-fade-in">
       <div className="relative w-36 h-36 mx-auto">
          <div className="absolute inset-0 border-[10px] border-emerald-100 rounded-full" /><div className="absolute inset-0 border-[10px] border-emerald-600 border-t-transparent rounded-full animate-spin" />
       </div>
       <h2 className="text-4xl font-black text-emerald-950 mb-4 tracking-tight">معالجة المعاملة...</h2>
       <p className="text-emerald-700/60 font-bold text-lg">يرجى عدم إغلاق الصفحة، يتم التحقق من الرصيد والبيانات الحقيقية.</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto py-20 animate-fade-in text-center px-4">
       <div className="bg-white p-10 md:p-20 rounded-[4rem] shadow-3xl border border-emerald-50 space-y-10 relative overflow-hidden">
          <div className="w-28 h-28 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl ring-[20px] ring-emerald-50"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-emerald-950 mb-4">اكتملت العملية!</h2>
            <p className="text-gray-500 font-bold text-lg leading-relaxed max-w-sm mx-auto">أهلاً بك {user?.name}، تم استلام المبلغ بنجاح وتأكيد شحن طلبك إلى {shipping.city}.</p>
          </div>
          <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 grid grid-cols-2 gap-8 text-right">
             <div><p className="text-[10px] text-emerald-400 font-black uppercase mb-2">رقم الفاتورة</p><p className="text-xl font-black text-emerald-900 font-mono">INV-{Math.floor(Math.random()*999999)}</p></div>
             <div><p className="text-[10px] text-emerald-400 font-black uppercase mb-2">تاريخ الشحن</p><p className="text-xl font-black text-emerald-900">صباح الغد</p></div>
          </div>
          <button onClick={onCancel} className="w-full bg-emerald-950 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-black transition-all text-xl">العودة للرئيسية</button>
       </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] py-10 bg-emerald-50/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <div className="flex items-center gap-4">
             <button onClick={onCancel} className="p-4 bg-white rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm border border-emerald-50"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></button>
             <h1 className="text-3xl font-black text-emerald-950">بوابة الدفع الرسمية</h1>
           </div>
        </div>

        <div className="animate-slide-up">
          {step === 'shipping' && renderShipping()}
          {step === 'payment-method' && (
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-emerald-50 md:col-span-2 text-center">
                  <h2 className="text-4xl font-black text-emerald-950 mb-4">اختر وسيلة الدفع</h2>
                  <p className="text-gray-400 font-bold">بوابة حيفان الموحدة تدعم التشفير البنكي العالمي.</p>
                </div>
                {[
                  { id: 'process-card', name: 'بطاقة ائتمان بنكية', icon: '💳', color: 'bg-blue-600', desc: 'فيزا وماستر كارد' },
                  { id: 'process-crypto', name: 'بينانس / USDT', icon: '₿', color: 'bg-yellow-500', desc: 'TRC20 دفع مشفر' },
                  { id: 'process-kuraimi', name: 'بنك الكريمي', icon: '🏦', color: 'bg-emerald-700', desc: 'حوالة رسمية مباشرة' }
                ].map(m => (
                  <button key={m.id} onClick={() => setStep(m.id as CheckoutStep)} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 hover:shadow-2xl transition-all group flex flex-col items-center text-center gap-6">
                    <span className={`w-24 h-24 ${m.color} rounded-[2rem] flex items-center justify-center text-5xl shadow-xl transition-transform group-hover:scale-110`}>{m.icon}</span>
                    <h3 className="text-2xl font-black text-emerald-950 mb-2">{m.name}</h3>
                    <p className="text-sm text-gray-400 font-bold">{m.desc}</p>
                  </button>
                ))}
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
