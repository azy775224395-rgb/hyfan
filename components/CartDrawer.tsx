
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const WHATSAPP_NUMBER = '967784400333';

  const handleCheckoutWhatsApp = () => {
    let orderSummary = "السلام عليكم، أريد شراء المنتجات التالية:\n\n";
    items.forEach((item, index) => {
      const productUrl = `${window.location.origin}/#product-${item.id}`;
      orderSummary += `${index + 1}- ${item.name} (عدد: ${item.quantity})\nالسعر: ${item.price * item.quantity} ر.س\nالرابط: ${productUrl}\n\n`;
    });
    orderSummary += `*المجموع الكلي:* ${total} ر.س\n\nاريد شراء هذه المنتجات`;
    
    const encodedMessage = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left border-r border-emerald-50">
        <div className="p-6 border-b flex items-center justify-between bg-emerald-50/20">
          <h2 className="text-2xl font-black flex items-center gap-3 text-emerald-900">
            سلة المشتريات
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              {items.length}
            </span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-emerald-100 hover:shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <p className="text-lg font-bold">سلتك فارغة حالياً</p>
              <button 
                onClick={onClose}
                className="mt-4 text-emerald-600 font-bold hover:underline"
              >ابدأ التسوق الآن</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-5 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.name}</h4>
                    <p className="text-emerald-600 font-black text-lg">{item.price} <small className="text-[10px] font-normal text-gray-400">ر.س</small></p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50/50 overflow-hidden">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-1 px-3 hover:bg-emerald-50 text-emerald-600 transition-colors"
                      >-</button>
                      <span className="px-3 text-xs font-black">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1 px-3 hover:bg-emerald-50 text-emerald-600 transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      title="حذف"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t bg-emerald-50/30">
            <div className="flex items-center justify-between mb-8">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">المجموع الإجمالي</span>
              <span className="text-3xl font-black text-emerald-600">{total} <small className="text-sm font-bold text-emerald-300">ر.س</small></span>
            </div>
            <button 
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              تأكيد الطلب واتساب
            </button>
            <p className="text-center text-[10px] text-emerald-400 mt-4 font-bold">تواصل معنا عبر واتساب لإتمام الشحن والدفع</p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
