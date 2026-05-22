
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
    { role: 'model', text: 'مرحباً بك في أبو إيفان للطاقة المتجددة! ☀️\nأنا المهندس أبو إيفان، كيف أقدر أخدمك في منظومتك الشمسية اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const LOGO_URL = "https://res.cloudinary.com/dxzqizvzw/image/upload/v1779209369/IMG_%D9%A2%D9%A0%D9%A2%D9%A6%D9%A0%D9%A5%D9%A1%D9%A9_%D9%A1%D9%A9%D9%A2%D9%A5%D9%A4%D9%A2_kji9am.png";

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
    
    // Clear input immediately
    if (!textOverride) setInput('');
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Safety: Increased to 60s to prevent premature timeout UI
    const safetyTimeout = setTimeout(() => {
      setIsLoading((current) => {
        if (current) {
           setMessages(prev => [...prev, { role: 'model', text: 'يبدو أن الاتصال أخذ وقتاً أطول من المعتاد. 🔌\nيرجى المحاولة مرة أخرى أو التواصل واتساب.' }]);
           return false;
        }
        return false;
      });
    }, 60000);

    try {
      const inventory = liveProducts.length > 0 ? liveProducts : fallbackProducts;
      const context = inventory.map(p => 
        `- ${p.name} | ${p.price}ر.س | ${p.category}`
      ).join('\n');

      const response = await geminiService.chatWithCustomer([...messages, userMsg], context);
      
      clearTimeout(safetyTimeout);
      
      setMessages(prev => [...prev, { role: 'model', text: response }]);

      if (text.length > 5) {
        NotificationService.sendTelegramNotification(
          NotificationService.formatAiChatMessage(text, response)
        ).catch(() => {});
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'حدث خطأ بسيط، هل يمكن أن تعيد سؤالك؟' }]);
    } finally {
      clearTimeout(safetyTimeout);
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

  const parseMessage = (text: string) => {
    return text.split('\n').map((line, i) => <span key={i} className="block mb-1">{line}</span>);
  };

  return (
    // Added pointer-events-none to container to prevent blocking the site
    <div className={`fixed left-6 z-[80] transition-all duration-500 ease-in-out pointer-events-none ${isContactOpen ? 'bottom-[380px] md:bottom-[480px]' : 'bottom-32'}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        // Added pointer-events-auto to button so it remains clickable
        className="pointer-events-auto w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center text-white shadow-4xl hover:bg-black transition-all active:scale-90 border-4 border-white overflow-hidden group"
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
        // Added pointer-events-auto to chat window
        <div className="pointer-events-auto absolute bottom-20 left-0 w-[320px] sm:w-[450px] bg-white rounded-[2.5rem] shadow-4xl border border-emerald-50 flex flex-col h-[500px] md:h-[600px] overflow-hidden animate-chat-pop origin-bottom-left">
          <div className="bg-emerald-950 p-5 text-white flex items-center gap-4 border-b border-emerald-900">
            <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden shadow-xl shrink-0">
              <img src={LOGO_URL} alt="أبو إيفان" className="w-full h-full object-cover" />
            </div>
            <div className="text-right flex-grow">
              <h3 className="font-black text-base">مساعد أبو إيفان الذكي</h3>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest opacity-80">
                  {isLoading ? 'جاري الكتابة...' : 'متصل الآن (Gemini)'}
                </span>
              </div>
            </div>
            <button type="button" onClick={() => setMessages([])} className="p-2 text-white/50 hover:text-white transition-colors" title="مسح المحادثة">
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
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                  <span className="text-xs font-black text-emerald-800 ml-2">جاري الرد</span>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <button 
              type="button"
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  handleSend();
                }
              }}
              placeholder="اكتب سؤالك هنا..."
              disabled={isLoading}
              className="flex-grow bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-emerald-300 focus:bg-white transition-all font-bold text-emerald-950 placeholder:font-normal"
            />
            <button 
              type="button"
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
