
import React from 'react';
import { CartItem, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  user?: UserProfile | null;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose, items, onRemove, onUpdateQty, user }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const WHATSAPP_NUMBER = '967784400333';

  const handleCheckoutWhatsApp = () => {
    let orderSummary = "السلام عليكم، أريد شراء المنتجات التالية:\n\n";
    items.forEach((item, index) => {
      orderSummary += `${index + 1}- ${item.name} (عدد: ${item.quantity})\nالسعر: ${item.price * item.quantity} ر.س\n\n`;
    });
    orderSummary += `*المجموع الكلي:* ${total} ر.س`;
    
    NotificationService.sendTelegramNotification(
      NotificationService.formatOrderMessage({
        product: items.map(i => `${i.name} (x${i.quantity})`).join(', '),
        price: `${total} ر.س`,
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
    <div className="container mx-auto px-4 py-12 animate-fade-in min-h-[60vh]">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-emerald-950">سلة المشتريات</h2>
        <button onClick={onClose} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all font-black flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
          العودة للتسوق
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border border-emerald-50 shadow-xl">
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-200"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>
          <h3 className="text-2xl font-black text-emerald-900 mb-4">سلتك فارغة حالياً</h3>
          <p className="text-gray-400 font-bold mb-10">تصفح منتجاتنا المميزة وأضف ما يعجبك إلى السلة</p>
          <button onClick={onClose} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all">ابدأ التسوق الآن</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-emerald-50 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:shadow-md transition-all">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-emerald-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow text-center md:text-right">
                  <h4 className="font-black text-emerald-950 text-xl mb-2">{item.name}</h4>
                  <p className="text-emerald-600 font-black text-2xl">{item.price} <small className="text-xs font-bold text-gray-400">ر.س</small></p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border-2 border-emerald-50 rounded-2xl bg-emerald-50/30 p-1">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-emerald-600 hover:bg-white rounded-xl transition-all font-black">-</button>
                    <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-emerald-600 hover:bg-white rounded-xl transition-all font-black">+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-950 text-white p-10 rounded-[3rem] shadow-2xl h-fit sticky top-28">
            <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">ملخص الطلب</h3>
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-white/60 font-bold">
                <span>عدد المنتجات</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)} قطعة</span>
              </div>
              <div className="flex justify-between text-white/60 font-bold">
                <span>الشحن</span>
                <span className="text-emerald-400 font-black">مجاني</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/10">
                <span>الإجمالي</span>
                <span className="text-emerald-400">{total} ر.س</span>
              </div>
            </div>
            <button 
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-500 text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              تأكيد الطلب واتساب
            </button>
            <p className="text-center text-[10px] text-white/30 font-bold mt-6 uppercase tracking-widest">جميع العمليات مشفرة وآمنة</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
