
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage, Product } from '../types';

interface AiAssistantProps {
  products: Product[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في حيفان للطاقة! أنا مستشارك التقني المتخصص. كيف يمكنني مساعدتك في تصميم منظومتك الشمسية اليوم؟' }
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
      // إرسال سياق مفصل جداً للبوت ليشمل كل شيء عن المنتجات
      const context = `
        معلومات المتجر: متجر حيفان للطاقة المتجددة، رائدون في اليمن لعام 2026.
        قائمة المنتجات المتوفرة حالياً:
        ${products.map(p => `
          - المنتج: ${p.name}
          - السعر: ${p.price} ر.س
          - القسم: ${p.category}
          - المواصفات: ${p.specs?.join(', ') || 'لا توجد مواصفات محددة'}
          - الوصف: ${p.description}
        `).join('\n')}
        تعليمات هامة: 
        1. إذا سأل العميل عن "أفضل بطارية"، قارن بين الليثيوم والجل بناءً على المنتجات المتوفرة.
        2. إذا سأل عن حساب أحمال، استخدم خبرتك في الطاقة الشمسية لتقدير عدد الألواح والبطاريات.
        3. لا توجه العميل للواتساب إلا إذا قال "أريد الشراء" أو "أريد التواصل مع شخص حقيقي".
        4. رقم الواتساب للطلب الرسمي: 967784400333.
      `;
      
      const response = await geminiService.chatWithCustomer(userMsg, context);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، أواجه ضغطاً في الطلبات حالياً. هل يمكنك إعادة سؤالك؟' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-32 left-6 z-[70]">
      {/* Floating Button - Moved to bottom-32 to be above social buttons */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-85 sm:w-[400px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-emerald-50 flex flex-col h-[550px] overflow-hidden animate-chat-pop">
          <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                 <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-base text-right leading-tight">استشاري حيفان الذكي</h3>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-90 font-bold uppercase tracking-wider text-right">متصل الآن - خبير طاقة</p>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/30 text-right"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold' 
                    : 'bg-white border border-emerald-50 text-emerald-950 rounded-bl-none font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-50 p-4 rounded-3xl rounded-bl-none shadow-sm flex gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
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
              placeholder="اسألني عن الألواح، البطاريات، أو حساب الأحمال..."
              className="flex-grow bg-emerald-50/50 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-100 border text-right font-bold placeholder:text-emerald-300"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg active:scale-95"
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
          animation: chat-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
