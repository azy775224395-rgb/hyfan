
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { geminiService } from '../services/geminiService';
import { NotificationService } from '../services/notificationService';
import { ProductService } from '../services/productService';
import { ChatMessage, Product } from '../types';

interface AiAssistantProps {
  products: Product[];
  isContactOpen?: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products: fallbackProducts, isContactOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'مرحباً بك في حيفان للطاقة! ☀️\nأنا مساعد حيفان الذكي، كيف يمكنني مساعدتك في اختيار منظومتك الشمسية اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  // جلب المخزون من السحابة لضمان "عقل" محدث
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const data = await ProductService.getLiveProducts();
        if (data && data.length > 0) setLiveProducts(data);
      } catch (err) {
        setLiveProducts(fallbackProducts);
      }
    };
    fetchCloudData();
  }, [fallbackProducts]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text };
    
    if (!textOverride) setInput('');
    // تحديث الحالة فوراً لضمان تجربة مستخدم سريعة
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const inventory = liveProducts.length > 0 ? liveProducts : fallbackProducts;
      const context = inventory.map(p => 
        `- [ID:${p.id}] ${p.name} | السعر: ${p.price}ر.س | المواصفات: ${p.specs?.join(', ')} | الوصف: ${p.description}`
      ).join('\n');

      // إرسال التاريخ بالكامل لضمان عدم فقدان الذاكرة
      const response = await geminiService.chatWithCustomer([...messages, userMsg], context);
      
      setMessages(prev => [...prev, { role: 'model', text: response }]);

      if (text.length > 12) {
        NotificationService.sendTelegramNotification(
          NotificationService.formatAiChatMessage(text, response)
        );
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'نعتذر يا غالي، واجهت مشكلة بسيطة في الاتصال. لكن ثق أننا نوفر أفضل الألواح والبطاريات. تفضل اسأل مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, liveProducts, fallbackProducts]);

  const toggleVoice = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return alert("متصفحك لا يدعم البحث الصوتي.");
    const rec = new Recognition();
    rec.lang = 'ar-YE';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e: any) => handleSend(e.results[0][0].transcript);
    rec.start();
  };

  // وظيفة لتحويل رموز المنتجات إلى أزرار تفاعلية حقيقية
  const parseMessage = (text: string) => {
    // Regex matches [#product-ID]
    const parts = text.split(/(\[#product-[a-zA-Z0-9_-]+\])/g);
    
    return parts.map((part, i) => {
      const match = part.match(/\[#product-([a-zA-Z0-9_-]+)\]/);
      if (match) {
        const id = match[1];
        // محاولة إيجاد اسم المنتج للعرض داخل الزر
        const product = liveProducts.find(p => p.id === id) || fallbackProducts.find(p => p.id === id);
        const productName = product ? product.name : 'عرض المنتج';

        return (
          <button 
            key={i} 
            onClick={() => { 
                window.location.hash = `#/product/${id}`; 
                // إغلاق المحادثة ليرى المستخدم المنتج (اختياري)
                // setIsOpen(false); 
            }}
            className="group mt-2 mb-1 w-full bg-white border border-emerald-200 hover:border-emerald-500 rounded-xl p-3 flex items-center gap-3 transition-all shadow-sm hover:shadow-md text-right"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"/></svg>
            </div>
            <div className="flex-grow">
               <span className="block text-[10px] text-gray-400 font-bold uppercase">منتج مقترح</span>
               <span className="block text-xs font-black text-emerald-950 group-hover:text-emerald-700 truncate max-w-[180px]">
                 {productName}
               </span>
            </div>
            <div className="text-emerald-400 group-hover:translate-x-1 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-180"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </button>
        );
      }
      return part;
    });
  };

  return (
    <div className={`fixed left-6 z-[80] transition-all duration-500 ease-in-out ${isContactOpen ? 'bottom-[380px] md:bottom-[480px]' : 'bottom-32'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center text-white shadow-4xl hover:bg-black transition-all active:scale-90 border-4 border-white overflow-hidden group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative w-full h-full">
            <img src={LOGO_URL} alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            <span className="absolute bottom-1 right-3 w-3 h-3 bg-emerald-500 border-2 border-emerald-900 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[450px] bg-white rounded-[2.5rem] shadow-4xl border border-emerald-50 flex flex-col h-[600px] overflow-hidden animate-chat-pop origin-bottom-left">
          <div className="bg-emerald-950 p-5 text-white flex items-center gap-4 border-b border-emerald-900">
            <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden shadow-xl shrink-0">
              <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
            </div>
            <div className="text-right flex-grow">
              <h3 className="font-black text-base">مساعد حيفان الذكي</h3>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest opacity-80">
                  {isLoading ? 'جاري الكتابة...' : 'متصل الآن'}
                </span>
              </div>
            </div>
            <button onClick={() => setMessages([])} className="p-2 text-white/50 hover:text-white transition-colors" title="مسح المحادثة">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#f8fafc] scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm font-bold ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-emerald-950 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {parseMessage(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <button 
              onClick={toggleVoice}
              disabled={isLoading}
              className={`p-3 rounded-xl transition-all shadow-sm active:scale-95 shrink-0 ${isListening ? 'bg-red-50 text-red-500 animate-pulse border border-red-200' : 'bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب سؤالك هنا..."
              disabled={isLoading}
              className="flex-grow bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-emerald-300 focus:bg-white transition-all font-bold text-emerald-950 placeholder:font-normal"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-950 text-white p-3 rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:shadow-none shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
