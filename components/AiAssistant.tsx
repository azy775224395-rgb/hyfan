
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { NotificationService } from '../services/notificationService';
import { ChatMessage, Product } from '../types';

interface AiAssistantProps {
  products: Product[];
  isContactOpen?: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products, isContactOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'المهندس حيفان معك. أعطني سؤالك التقني عن أي منتج وسأعطيك الخلاصة.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

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
      // تمرير بيانات مفصلة للمساعد ليشمل البدائل
      const context = products.map(p => 
        `- المنتج: ${p.name} | السعر: ${p.price} ر.س | الفئة: ${p.category} | الوصف: ${p.description}`
      ).join('\n');
      
      const response = await geminiService.chatWithCustomer(userMsg, context);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      
      NotificationService.sendTelegramNotification(
        NotificationService.formatAiChatMessage(userMsg, response)
      );
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'خطأ تقني. يرجى إعادة المحاولة.' }]);
    } finally {
      setIsLoading(false);
    }
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
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[400px] bg-white rounded-[2rem] shadow-3xl border border-emerald-100 flex flex-col h-[480px] overflow-hidden animate-chat-pop">
          <div className="bg-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg overflow-hidden">
                 <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-xs">المهندس حيفان</h3>
                <p className="text-[8px] opacity-50 font-bold uppercase">خبير التوفر والبدائل</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50/50 text-right">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold' 
                    : 'bg-white border border-emerald-50 text-emerald-950 rounded-bl-none font-bold whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-50 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-black">جاري مراجعة المخزن...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white flex gap-2 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="هل يوجد منتج...؟"
              className="flex-grow bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-950 transition-all border-gray-100 border text-right font-bold"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-950 text-white p-3 rounded-xl hover:bg-black transition-all disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chat-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chat-pop {
          animation: chat-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
