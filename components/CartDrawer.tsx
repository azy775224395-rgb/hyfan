
import React, { useMemo } from 'react';
import { CartItem, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  user?: UserProfile | null;
  formatPrice: (p: number) => string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose, items, onRemove, onUpdateQty, user, formatPrice }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const WHATSAPP_NUMBER = '967784400333';

  // Smart Compatibility Check Logic
  const voltageWarning = useMemo(() => {
    const voltages = new Set<string>();
    items.forEach(item => {
      // Extract voltage (12V, 24V, 48V) from name or description
      const match = (item.name + " " + item.description).match(/(\d+)\s*[vVفولت]/);
      if (match) {
        voltages.add(match[1]);
      }
    });
    
    // If we have mixed voltages (e.g., 12 and 24), return warning
    if (voltages.has('12') && voltages.has('24')) return "تنبيه: يوجد اختلاف في الفولتية (12V و 24V). يرجى التأكد من توافق الأجهزة.";
    if (voltages.has('12') && voltages.has('48')) return "تنبيه: يوجد اختلاف كبير في الفولتية (12V و 48V).";
    if (voltages.has('24') && voltages.has('48')) return "تنبيه: يوجد اختلاف في الفولتية (24V و 48V).";
    
    return null;
  }, [items]);

  const handleCheckoutWhatsApp = () => {
    let orderSummary = "السلام عليكم، أريد شراء المنتجات التالية:\n\n";
    items.forEach((item, index) => {
      orderSummary += `${index + 1}- ${item.name} (عدد: ${item.quantity})\nالسعر: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    orderSummary += `*المجموع الكلي:* ${formatPrice(total)}`;
    
    NotificationService.sendTelegramNotification(
      NotificationService.formatOrderMessage({
        product: items.map(i => `${i.name} (x${i.quantity})`).join(', '),
        price: formatPrice(total),
        method: "سلة مشتريات (تواصل واتساب)",
        customer: user ? { 
          fullName: user.name, 
          phone: "مسجل عبر الموقع", 
          city: "غير محدد", 
          address: "غير محدد" 
        } : { 
          fullName: "عميل زائر", 
          phone: "عبر الواتساب", 
          city: "غير محدد", 
          address: "غير محدد" 
        }
      })
    );

    const encodedMessage = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in min-h-[80vh] pb-32">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-5xl font-black text-emerald-950">سلة المشتريات</h2>
        <button onClick={onClose} className="p-3 md:p-4 bg-gray-50 text-gray-600 rounded-2xl hover:bg-gray-100 transition-all font-black flex items-center gap-2 border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
          <span className="hidden md:inline">العودة للتسوق</span>
        </button>
      </div>
      
      {/* Smart Warning Banner */}
      {voltageWarning && items.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-pulse">
           <span className="text-2xl">⚠️</span>
           <div>
             <h4 className="font-black text-amber-800 text-sm">تحقق من التوافق الهندسي</h4>
             <p className="text-amber-700 text-xs font-bold">{voltageWarning}</p>
           </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-10 md:p-20 text-center border border-gray-200 shadow-md">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>
          <h3 className="text-xl font-black text-emerald-900 mb-2">سلتك فارغة حالياً</h3>
          <p className="text-gray-400 font-bold mb-8">تصفح منتجاتنا المميزة وأضف ما يعجبك إلى السلة</p>
          <button onClick={onClose} className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-black shadow-lg hover:bg-emerald-700 transition-all">ابدأ التسوق الآن</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-[1.5rem] border border-gray-200 shadow-sm flex gap-4 items-center group relative overflow-hidden">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-black text-emerald-950 text-sm md:text-lg mb-1 truncate">{item.name}</h4>
                  <p className="text-emerald-600 font-black text-base md:text-lg">{formatPrice(item.price)}</p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1 shadow-sm">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-black">-</button>
                    <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-black">+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-xs text-red-400 hover:text-red-600 font-bold underline p-1">حذف</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg h-fit border border-gray-100 sticky top-24">
            <h3 className="text-xl font-black mb-6 text-emerald-950">ملخص الطلب</h3>
            <div className="space-y-4 mb-8 divide-y divide-gray-100">
              <div className="flex justify-between text-gray-500 font-bold text-sm pt-2">
                <span>عدد المنتجات</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)} قطعة</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-sm pt-4">
                <span>الشحن</span>
                <span className="text-emerald-600 font-black">مجاني</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 text-emerald-900">
                <span>الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>تأكيد الطلب واتساب</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
