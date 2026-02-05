
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
    { role: 'model', text: 'أهلاً بك في متجر حيفان للطاقة. أنا خبير المبيعات والحلول التقنية، كيف يمكنني مساعدتك في تصميم منظومتك أو اختيار منتجاتك اليوم؟' }
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
      // إرسال سياق مفصل جداً يتضمن المعرفات لتوليد الروابط
      const context = products.map(p => 
        `- المنتج: ${p.name} | السعر: ${p.price} ر.س | الفئة: ${p.category} | المعرف: ${p.id} | المواصفات: ${p.specs?.join(', ')} | الوصف: ${p.description}`
      ).join('\n');
      
      const response = await geminiService.chatWithCustomer(userMsg, context);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      
      NotificationService.sendTelegramNotification(
        NotificationService.formatAiChatMessage(userMsg, response)
      );
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'نعتذر عن هذا الانقطاع الفني، أنا هنا لمساعدتك، يرجى إعادة إرسال استفسارك بخصوص منتجات الطاقة.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // وظيفة لتحويل الروابط في النص إلى روابط قابلة للنقر
  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all font-black">
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
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[420px] bg-white rounded-[2.5rem] shadow-3xl border border-emerald-100 flex flex-col h-[550px] overflow-hidden animate-chat-pop">
          <div className="bg-emerald-950 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl overflow-hidden shadow-inner">
                 <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-sm">موظف مبيعات حيفان</h3>
                <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">خبير حلول الطاقة المعتمد</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-gray-50/50 text-right scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 px-5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold' 
                    : 'bg-white border border-emerald-50 text-emerald-950 rounded-bl-none font-bold whitespace-pre-wrap'
                }`}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-50 p-3 px-5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-black italic">جاري مراجعة المخزن والبيانات الفنية...</span>
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
              placeholder="هل يوجد منتج جينكو؟ كيف أصمم منظومتي؟"
              className="flex-grow bg-gray-50 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-950 transition-all border-gray-100 border text-right font-bold placeholder:text-gray-300 shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-950 text-white p-4 rounded-2xl hover:bg-black transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
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
          animation: chat-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
