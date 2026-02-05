
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { NotificationService } from '../services/notificationService';
import { ProductService } from '../services/productService';
import { ChatMessage, Product } from '../types';

interface AiAssistantProps {
  products: Product[]; // هذه ستكون كنسخة احتياطية
  isContactOpen?: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products: fallbackProducts, isContactOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في حيفان للطاقة. أنا مهندس المبيعات الخاص بك، مستعد لتصميم أفضل منظومة طاقة لمنزلك بناءً على المخزون المتوفر حالياً. كيف أخدمك يا غالي؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  useEffect(() => {
    // جلب المنتجات الحية من السحابة عند تشغيل المساعد
    const fetchCloudInventory = async () => {
      const data = await ProductService.getLiveProducts();
      setLiveProducts(data);
    };
    fetchCloudInventory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // استخدام المنتجات الحية إذا توفرت، وإلا العودة للاحتياطية
      const currentInventory = liveProducts.length > 0 ? liveProducts : fallbackProducts;
      
      const context = currentInventory.map(p => 
        `- المنتج: ${p.name} | السعر: ${p.price} ر.س | الفئة: ${p.category} | المعرف: ${p.id} | المواصفات: ${p.specs?.join(', ')} | الحالة: ${p.status || 'متوفر'}`
      ).join('\n');
      
      const response = await geminiService.chatWithCustomer(userMsg, context);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      
      if (userMsg.length > 15) {
        NotificationService.sendTelegramNotification(
          NotificationService.formatAiChatMessage(userMsg, response)
        );
      }
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'أهلاً بك. لدينا حالياً أفضل عروض الألواح والبطاريات بضمان حقيقي. تفضل بسؤالك عن أي منتج وسأعطيك البديل الأنسب فوراً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-black underline underline-offset-4 hover:text-blue-700 transition-colors">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div 
      className={`fixed left-6 z-[80] transition-all duration-500 ease-in-out ${
        isContactOpen 
          ? 'bottom-[380px] md:bottom-[480px]' 
          : 'bottom-32'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-black transition-all active:scale-90 border-4 border-white overflow-hidden group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative w-full h-full">
            <img src={LOGO_URL} alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[450px] bg-white rounded-[3rem] shadow-3xl border border-emerald-100 flex flex-col h-[600px] overflow-hidden animate-chat-pop">
          <div className="bg-emerald-950 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden shadow-xl border border-white/20">
                 <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-base">مهندس مبيعات حيفان</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">مخزون السحابة متصل</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-gray-50/50 text-right scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[92%] p-5 px-6 rounded-3xl text-[14px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold' 
                    : 'bg-white border border-emerald-100 text-emerald-950 rounded-bl-none font-bold whitespace-pre-wrap'
                }`}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 p-4 px-6 rounded-3xl rounded-bl-none shadow-sm flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] text-emerald-800 font-black italic">أبحث في المستودع السحابي عن بدائل...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t bg-white flex gap-3 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="هل لوح جينكو 580 وات متوفر؟"
              className="flex-grow bg-emerald-50/30 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-950 transition-all border-emerald-100 border text-right font-bold placeholder:text-gray-300"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-950 text-white p-4.5 rounded-2xl hover:bg-black transition-all disabled:opacity-50 shadow-xl active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chat-pop {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chat-pop {
          animation: chat-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
