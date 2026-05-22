
import React, { useState, useEffect, useRef } from 'react';
import { Product, ShippingInfo, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';
import { LocalDataService } from '../services/localDataService'; // Import Data Service

interface CheckoutViewProps {
  product: Product;
  onCancel: () => void;
  user: UserProfile | null;
}

type CheckoutStep = 'shipping' | 'processing' | 'success';

const CheckoutView: React.FC<CheckoutViewProps> = ({ product, onCancel, user }) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shipping, setShipping] = useState<ShippingInfo>(() => {
    try {
      const saved = localStorage.getItem('hyfan_shipping');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return { 
      fullName: user?.name || '', 
      phone: '', 
      city: '', 
      address: '' 
    };
  });
  
  // Update name if user logs in later and we don't have one
  useEffect(() => {
    if (user?.name && !shipping.fullName) {
      setShipping(prev => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  // Save shipping to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('hyfan_shipping', JSON.stringify(shipping));
  }, [shipping]);
  
  const WHATSAPP_NUMBER = '967784400333';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const saveOrderToAdmin = (method: string) => {
    const newOrder = {
      id: `HYF-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-YE'),
      total: product.price,
      status: 'pending' as const,
      itemsCount: 1,
      items: [{...product, quantity: 1}], // Add Item Details
      customerName: shipping.fullName,
      customerEmail: user?.email || 'guest@haifan.com',
      customerPhone: shipping.phone,
      shippingInfo: shipping,
      paymentMethod: method
    };
    LocalDataService.addOrder(newOrder);
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step === 'shipping') {
      if (!shipping.fullName || !shipping.phone || !shipping.city) {
        alert("يرجى تعبئة البيانات الأساسية (الاسم، الهاتف، المدينة)");
        return;
      }
      handleWhatsAppOrder();
      return;
    }
  };

  const handleWhatsAppOrder = () => {
    // 1. Construct the message
    const message = `السلام عليكم أبو إيفان للطاقة المتجددة، أريد تأكيد طلب شراء:

📦 *المنتج:* ${product.name}
💰 *السعر:* ${product.price} ر.س

👤 *بيانات العميل:*
الاسم: ${shipping.fullName}
الهاتف: ${shipping.phone}
العنوان: ${shipping.city} - ${shipping.address}

يرجى تأكيد الطلب وتزويدي بطريقة الدفع المناسبة.`;

    // 2. Save locally so admin sees it
    saveOrderToAdmin('واتساب مباشر');

    // 3. Open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    // 4. Move to success view
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16 max-w-4xl mx-auto">
           <button onClick={step === 'shipping' ? onCancel : () => setStep('shipping')} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
           </button>
           <div className="text-center">
              <h1 className="text-2xl font-black text-slate-900">إتمام الشراء والطلب</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">HAYFAN SECURE CHECKOUT</p>
           </div>
           <div className="w-14"></div>
        </div>

        {step === 'shipping' && (
          <div className="max-w-2xl mx-auto animate-fade-in px-4">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                بيانات التوصيل
              </h2>
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 mr-2">الاسم بالكامل</label>
                  <input type="text" required value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} placeholder="الاسم الرباعي" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-primary font-bold transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 mr-2">رقم الهاتف</label>
                    <input type="tel" required value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="77XXXXXXX" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-primary font-bold transition-all text-left" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 mr-2">المحافظة / المدينة</label>
                    <input type="text" required value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="صنعاء، تعز، عدن..." className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-primary font-black transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 mr-2">العنوان بالتفصيل</label>
                  <textarea required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} placeholder="المديرية - الشارع - أقرب معلم" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:border-primary font-bold min-h-[100px] transition-all" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-lg hover:bg-secondary transition-all text-xl mt-4 flex items-center justify-center gap-3 active:scale-[0.98]">
                  <span>إرسال الطلب عبر واتساب</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-40 text-center animate-fade-in flex flex-col items-center">
             <div className="relative w-32 h-32 mb-12">
                <div className="absolute inset-0 border-[12px] border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-[12px] border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
             <h2 className="text-4xl font-black text-slate-900 mb-4">جاري معالجة الطلب...</h2>
             <p className="text-gray-400 font-bold text-lg">يرجى عدم إغلاق الصفحة لضمان اكتمال العملية</p>
          </div>
        )}

        {step === 'success' && (
          <div className="max-w-2xl mx-auto py-20 text-center animate-fade-in px-4 font-sans">
             <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl ring-[12px] ring-primary/5">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">تم استلام الطلب!</h2>
                <p className="text-gray-500 font-bold text-lg leading-relaxed mb-10">شكراً لثقتك بمتجر أبو إيفان للطاقة المتجددة. تم تسجيل طلبك بنجاح وسيقوم فريق المبيعات بالتواصل معك قريباً لترتيب عملية الشحن.</p>
                <button onClick={onCancel} className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xl shadow-lg hover:bg-secondary transition-all active:scale-[0.98]">العودة للرئيسية</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutView;
