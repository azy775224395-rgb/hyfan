
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
    { role: 'model', text: 'أهلاً بك في حيفان للطاقة! أنا المهندس الاستشاري المسؤول. كيف يمكنني مساعدتك في تصميم منظومتك الشمسية اليوم؟' }
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
      const context = `
        قائمة المنتجات الحالية:
        ${products.map(p => `- ${p.name}: السعر ${p.price} ر.س، القسم: ${p.category}.`).join('\n')}
      `;
      
      const response = await geminiService.chatWithCustomer(userMsg, context);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      
      // إرسال الإشعار لتليجرام ليعلم المشرف بما يدور في المحادثة
      NotificationService.sendTelegramNotification(
        NotificationService.formatAiChatMessage(userMsg, response)
      );
      
    } catch (error) {
      const errorMsg = 'عذراً، المساعد مشغول قليلاً. المهندس متاح عبر واتساب للاستشارات العاجلة.';
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
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
        className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_40px_rgba(5,150,105,0.4)] hover:bg-emerald-700 transition-all active:scale-90 border-4 border-white overflow-hidden group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative w-full h-full">
            <img src={LOGO_URL} alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-emerald-600/10 group-hover:bg-transparent transition-colors"></div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[420px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-emerald-50 flex flex-col h-[520px] overflow-hidden animate-chat-pop">
          <div className="bg-emerald-600 p-5 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-emerald-400">
                 <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-sm text-right leading-tight">المهندس الاستشاري</h3>
                <p className="text-[9px] opacity-80 font-bold uppercase text-right">خبير طاقة شمسية</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-gray-50/50 text-right">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold' 
                    : 'bg-white border border-emerald-50 text-emerald-950 rounded-bl-none font-medium whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-50 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-emerald-400 font-bold mr-2">جاري التفكير الهندسي...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white flex gap-2 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="مثال: كم لوح يحتاج مكيف 12؟"
              className="flex-grow bg-emerald-50/50 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-100 border text-right font-bold"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
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
          animation: chat-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
