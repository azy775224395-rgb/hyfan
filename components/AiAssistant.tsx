
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
    { role: 'model', text: 'أهلاً بك في متجر حيفان. أنا المهندس وليد، خبيرك التقني لتصميم منظومات الطاقة الشمسية. كيف أقدر أساعدك في بناء منظومتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  // تحديث المخزون من السحابة قبل بدء أي استشارة
  useEffect(() => {
    const syncInventory = async () => {
      try {
        const data = await ProductService.getLiveProducts();
        if (data && data.length > 0) setLiveProducts(data);
      } catch (err) {
        console.warn("AI using static product list");
      }
    };
    syncInventory();
  }, []);

  // التمرير التلقائي لأحدث رسالة
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const currentText = textOverride || input.trim();
    if (!currentText || isLoading) return;

    // 1. إضافة رسالة المستخدم للواجهة
    const userMsg: ChatMessage = { role: 'user', text: currentText };
    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      // 2. تجهيز بيانات المخزون للمهندس (العقل السحابي)
      const inventory = liveProducts.length > 0 ? liveProducts : fallbackProducts;
      const contextStr = inventory.map(p => 
        `- [ID:${p.id}] ${p.name} | السعر: ${p.price} ر.س | المواصفات: ${p.specs?.join(', ')}`
      ).join('\n');

      // 3. إرسال كامل السجل (لضمان الذاكرة)
      // نرسل النسخة المحدثة من السجل التي تتضمن رسالة المستخدم الجديدة
      const historyToSend = [...messages, userMsg];
      const aiResponse = await geminiService.chatWithCustomer(historyToSend, contextStr);
      
      // 4. عرض رد المهندس
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

      // إرسال تنبيه للإدارة للاستفسارات المهمة
      if (currentText.length > 8) {
        NotificationService.sendTelegramNotification(
          NotificationService.formatAiChatMessage(currentText, aiResponse)
        );
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'أهلاً بك يا غالي. نعتذر منك، يبدو أن الاتصال ضعيف قليلاً. كمهندس، أنصحك ببطاريات توبو وألواح جينكو لضمان استقرار الكهرباء عندك. جرب ترسل سؤالك مرة ثانية.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoice = () => {
    const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Speech) return alert("متصفحك لا يدعم الصوت.");
    
    const rec = new Speech();
    rec.lang = 'ar-YE';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e: any) => handleSend(e.results[0][0].transcript);
    rec.start();
  };

  return (
    <div className={`fixed left-6 z-[80] transition-all duration-500 ease-in-out ${isContactOpen ? 'bottom-[380px] md:bottom-[480px]' : 'bottom-32'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center text-white shadow-3xl hover:bg-black transition-all active:scale-90 border-4 border-white overflow-hidden group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <img src={LOGO_URL} alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[450px] bg-white rounded-[2.5rem] shadow-4xl border border-emerald-50 flex flex-col h-[600px] overflow-hidden animate-chat-pop">
          {/* Header */}
          <div className="bg-emerald-950 p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden shadow-xl">
              <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-black text-base">المهندس وليد</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  {isLoading ? 'جاري التحليل الهندسي...' : 'متصل بالمخزون السحابي'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-gray-50/50 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 px-6 rounded-3xl text-sm leading-relaxed shadow-sm font-bold ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white border border-emerald-100 text-emerald-950 rounded-bl-none whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 p-4 px-6 rounded-3xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t flex gap-2 items-center">
            <button 
              onClick={startVoice}
              disabled={isLoading}
              className={`p-4 rounded-2xl transition-all shadow-lg active:scale-95 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-50 text-emerald-700'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل المهندس عن أي منظومة..."
              disabled={isLoading}
              className="flex-grow bg-gray-50 rounded-2xl px-5 py-4 text-sm outline-none border border-transparent focus:border-emerald-300 transition-all font-bold"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-950 text-white p-4.5 rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
