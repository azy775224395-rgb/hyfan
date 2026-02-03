
import React, { useState } from 'react';
import { Product } from '../types';

interface PaymentModalProps {
  product: Product;
  onClose: () => void;
}

type PaymentStep = 'selection' | 'details' | 'processing' | 'success';

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<PaymentStep>('selection');
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState('');
  
  const methods = [
    { id: 'visa', name: 'بطاقة فيزا / ماستر', icon: '💳', color: 'bg-blue-600', desc: 'دفع آمن وفوري' },
    { id: 'crypto', name: 'بينانس / USDT', icon: '₿', color: 'bg-yellow-500', desc: 'العملات الرقمية (TRC20)' },
    { id: 'kuraimi', name: 'بنك الكريمي', icon: '🏦', color: 'bg-emerald-700', desc: 'تحويل يمني مباشر' },
    { id: 'google', name: 'جوجل بلاي', icon: '🤖', color: 'bg-red-500', desc: 'رصيد المتجر' },
    { id: 'whatsapp', name: 'واتساب مباشر', icon: '💬', color: 'bg-emerald-500', desc: 'تواصل مع المبيعات' },
  ];

  const handleMethodSelect = (method: any) => {
    if (method.id === 'whatsapp') {
      const message = `أريد شراء "${product.name}" بسعر ${product.price} ر.س.`;
      window.open(`https://wa.me/967784400333?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }
    setSelectedMethod(method);
    setStep('details');
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  const renderSelection = () => (
    <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar-hide p-2">
      {methods.map(method => (
        <button
          key={method.id}
          onClick={() => handleMethodSelect(method)}
          className="w-full flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
              {method.icon}
            </span>
            <div className="text-right">
              <p className="font-black text-emerald-950">{method.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{method.desc}</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-200 group-hover:text-emerald-600 transition-colors"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      ))}
    </div>
  );

  const renderDetails = () => {
    switch (selectedMethod?.id) {
      case 'visa':
        return (
          <form onSubmit={handleCompletePayment} className="space-y-6 animate-fade-in">
            <div className="relative h-44 w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-8 bg-yellow-400/20 rounded-md border border-yellow-400/30"></div>
                <div className="text-xl italic font-black">VISA</div>
              </div>
              <div className="text-lg md:text-xl font-mono tracking-[0.2em] mb-4">
                {cardNumber.padEnd(16, '•').match(/.{1,4}/g)?.join(' ')}
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] opacity-50 uppercase font-bold">Card Holder<br/><span className="text-sm opacity-100 uppercase">HAYFAN CUSTOMER</span></div>
                <div className="text-[10px] opacity-50 uppercase font-bold text-left">Expires<br/><span className="text-sm opacity-100">12/28</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="text" required placeholder="رقم البطاقة (16 رقم)" maxLength={16}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-bold" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="MM/YY" className="bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-blue-500 font-bold" />
                <input type="text" required placeholder="CVV" maxLength={3} className="bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-blue-500 font-bold" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-xl font-black shadow-xl hover:bg-blue-700 transition-all">إتمام الدفع الآمن</button>
          </form>
        );
      case 'crypto':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 inline-block mx-auto">
               <div className="w-48 h-48 bg-white border-8 border-white rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TMTW7eR7p4vE8vW7eR7p4vE8vW7eR7p4vE8v" alt="QR" className="w-full h-full p-2" />
                 <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none"></div>
               </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">USDT Wallet Address (TRC20)</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-emerald-200 font-mono text-[10px] md:text-sm break-all select-all">
                TMTW7eR7p4vE8vW7eR7p4vE8vW7eR7p4vE8v
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText('TMTW7eR7p4vE8vW7eR7p4vE8vW7eR7p4vE8v'); alert('تم نسخ العنوان بنجاح'); }}
                className="text-emerald-600 font-black text-sm flex items-center gap-2 mx-auto hover:underline"
              >
                نسخ العنوان
              </button>
            </div>
            <button onClick={handleCompletePayment} className="w-full bg-yellow-500 text-emerald-950 py-5 rounded-xl font-black shadow-xl">أرسلت المبلغ، تأكيد العملية</button>
          </div>
        );
      case 'kuraimi':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-emerald-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              <h4 className="text-emerald-400 font-black mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                تفاصيل الحساب الموحد
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] opacity-50 uppercase font-bold">الاسم</p>
                  <p className="text-lg font-black">حيفان للطاقة المتجددة</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-50 uppercase font-bold">رقم الحساب</p>
                  <p className="text-2xl font-black tracking-wider text-emerald-100">123456789</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm text-gray-500 font-medium leading-relaxed">
              يرجى إرسال حوالة أو إيداع بنكي للمبلغ المذكور أعلاه، ثم إرفاق صورة السند عبر الواتساب لتأكيد الطلب فوراً.
            </div>
            <button onClick={handleCompletePayment} className="w-full bg-emerald-700 text-white py-5 rounded-xl font-black shadow-xl">تأكيد إرسال الحوالة</button>
          </div>
        );
      default:
        return <div className="text-center py-20 text-gray-400">جاري التحميل...</div>;
    }
  };

  const renderProcessing = () => (
    <div className="py-20 text-center space-y-8 animate-pulse">
      <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <div>
        <h3 className="text-2xl font-black text-emerald-950 mb-2">جاري تأكيد المعاملة</h3>
        <p className="text-emerald-600/60 font-bold">يرجى عدم إغلاق هذه الصفحة...</p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="py-12 text-center space-y-8 animate-fade-in">
      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div>
        <h3 className="text-3xl font-black text-emerald-950 mb-3">تم الدفع بنجاح!</h3>
        <p className="text-emerald-800/50 font-bold max-w-xs mx-auto leading-relaxed">شكراً لثقتك بـ حيفان للطاقة. تم استلام طلبك وهو الآن قيد التجهيز للشحن.</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">رقم التتبع للطلب</p>
        <p className="text-lg font-black text-emerald-900">HYF-{Math.floor(Math.random() * 999999)}-2026</p>
      </div>
      <button onClick={onClose} className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-black shadow-xl active:scale-95">العودة للمتجر</button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-3xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-gray-100 bg-emerald-50/20">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {step !== 'selection' && step !== 'success' && (
                <button onClick={() => setStep('selection')} className="p-2 hover:bg-white rounded-xl transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              )}
              <h2 className="text-2xl md:text-3xl font-black text-emerald-950">
                {step === 'selection' ? 'اختر وسيلة الدفع' : step === 'success' ? 'مبارك عملية الشراء' : selectedMethod?.name}
              </h2>
            </div>
            <button onClick={onClose} className="p-2.5 bg-white rounded-full hover:rotate-90 transition-all border border-emerald-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          {step !== 'success' && (
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100">
              <img src={product.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={product.name} />
              <div>
                <p className="font-black text-emerald-900 text-sm leading-tight mb-1">{product.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-black">{product.price} ر.س</span>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">شامل الضريبة والشحن</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {step === 'selection' && renderSelection()}
          {step === 'details' && renderDetails()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>

        {/* Footer */}
        {step !== 'success' && (
          <div className="p-6 md:p-8 bg-emerald-900 text-white text-center">
            <div className="flex items-center justify-center gap-4 opacity-50 mb-3 scale-75 md:scale-100">
               <span className="text-[8px] md:text-[10px] font-black border border-white/30 px-2 py-0.5 rounded">SSL SECURE</span>
               <span className="text-[8px] md:text-[10px] font-black border border-white/30 px-2 py-0.5 rounded">PCI COMPLIANT</span>
               <span className="text-[8px] md:text-[10px] font-black border border-white/30 px-2 py-0.5 rounded">256-BIT AES</span>
            </div>
            <p className="text-[10px] opacity-40 font-bold tracking-widest uppercase">نظام الدفع المشفر - حيفان للطاقة 2026</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
