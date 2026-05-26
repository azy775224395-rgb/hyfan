import React, { useMemo, useState } from "react";
import { CartItem, UserProfile } from "../types";
import { NotificationService } from "../services/notificationService";
import {
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Phone,
  Trash2,
  Plus,
  Minus,
  X,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  user?: UserProfile | null;
  formatPrice: (p: number) => string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  onClose,
  items,
  onRemove,
  onUpdateQty,
  user,
  formatPrice,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyerData, setBuyerData] = useState({
    name: user?.name || "",
    location: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const WHATSAPP_NUMBER = "967784400333";

  // Smart Compatibility Check Logic
  const voltageWarning = useMemo(() => {
    const voltages = new Set<string>();
    items.forEach((item) => {
      const match = (item.name + " " + item.description).match(
        /(\d+)\s*[vVفولت]/,
      );
      if (match) voltages.add(match[1]);
    });

    if (voltages.has("12") && voltages.has("24"))
      return "تنبيه: يوجد اختلاف في الفولتية (12V و 24V). يرجى التأكد من توافق الأجهزة.";
    if (voltages.has("12") && voltages.has("48"))
      return "تنبيه: يوجد اختلاف كبير في الفولتية (12V و 48V).";
    if (voltages.has("24") && voltages.has("48"))
      return "تنبيه: يوجد اختلاف في الفولتية (24V و 48V).";

    return null;
  }, [items]);

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerData.name || !buyerData.location) {
      alert("يرجى تعبئة الاسم والموقع");
      return;
    }

    let orderSummary = "السلام عليكم، أريد شراء المنتجات التالية:\n\n";
    items.forEach((item, index) => {
      orderSummary += `${index + 1}- ${item.name} (عدد: ${item.quantity})\nالسعر: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    orderSummary += `*المجموع الكلي:* ${formatPrice(total)}\n\n`;
    orderSummary += `*بيانات المشتري:*\nالاسم: ${buyerData.name}\nالموقع: ${buyerData.location}`;

    const encodedMessage = encodeURIComponent(orderSummary);
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in min-h-[80vh] pb-32">
      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 w-full max-w-md relative animate-slide-up">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black text-emerald-950 mb-6 border-r-4 border-primary pr-3">
              بيانات المشتري
            </h3>
            <form onSubmit={handleCheckoutWhatsApp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  الاسم الكريم
                </label>
                <input
                  required
                  type="text"
                  value={buyerData.name}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary font-bold"
                  placeholder="الاسم"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  الموقع (المدينة, الحي)
                </label>
                <input
                  required
                  type="text"
                  value={buyerData.location}
                  onChange={(e) =>
                    setBuyerData({ ...buyerData, location: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary font-bold"
                  placeholder="صنعاء - التحرير"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg hover:bg-secondary transition-all mt-4"
              >
                المتابعة لإكمال الطلب عبر واتساب
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-5xl font-black text-slate-900">
          سلة المشتريات
        </h2>
        <button
          onClick={onClose}
          className="p-3 md:p-4 bg-gray-50 text-gray-600 rounded-2xl hover:bg-gray-100 transition-all font-bold flex items-center gap-2 border border-gray-200"
        >
          <ArrowRight size={20} />
          <span className="hidden md:inline font-bold">العودة للتسوق</span>
        </button>
      </div>

      {voltageWarning && items.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-pulse">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-800 text-sm">
              تحقق من التوافق الهندسي
            </h4>
            <p className="text-amber-700 text-xs font-medium">
              {voltageWarning}
            </p>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-10 md:p-20 text-center border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <ShoppingCart size={48} />
          </div>
          <h3 className="text-xl font-black text-primary mb-2">
            سلتك فارغة حالياً
          </h3>
          <p className="text-gray-400 font-bold mb-8">
            تصفح منتجاتنا المميزة وأضف ما يعجبك إلى السلة
          </p>
          <button
            onClick={onClose}
            className="bg-primary text-white px-8 py-4 rounded-xl font-black shadow-lg hover:bg-secondary transition-all"
          >
            ابدأ التسوق الآن
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-2 text-right">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 items-center group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white border border-gray-50 flex-shrink-0 p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm md:text-lg mb-1 truncate">
                    {item.name}
                  </h4>
                  <p className="text-primary font-black text-base md:text-lg">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-bold underline flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl h-fit border border-gray-50 sticky top-24 text-right">
            <h3 className="text-xl font-black mb-6 text-slate-900 border-b border-gray-50 pb-4">
              ملخص الطلب
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>عدد المنتجات</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)} قطعة</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>الشحن</span>
                <span className="text-primary font-black">مجاني</span>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-between text-2xl font-black text-primary">
                <span>الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-black text-2xl shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>الشراء الان</span>
              <ShoppingCart size={24} className="fill-none" strokeWidth={2.5} />
            </button>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center gap-3 text-gray-500">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <p className="text-[10px] font-bold leading-relaxed">
                تسوق آمن: جميع المعاملات تتم عبر الواتساب لتوفير أفضل تجربة ودعم
                فني مباشر.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
