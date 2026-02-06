
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
    { role: 'model', text: 'أهلاً بك في متجر حيفان. أنا المهندس "أبو طاقة"، مستشارك الهندسي لتصميم منظومات الطاقة الشمسية والأجهزة المنزلية في اليمن. كيف أقدر أخدمك يا غالي؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const LOGO_URL = "https://i.postimg.cc/50g6cG2T/IMG-20260201-232332.jpg";

  // جلب المخزون الحي من السحابة (Supabase)
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await ProductService.getLiveProducts();
        if (data && data.length > 0) setLiveProducts(data);
      } catch (err) {
        console.warn("Using fallback inventory for AI assistant");
      }
    };
    fetchInventory();
  }, []);

  // التمرير التلقائي لأسفل المحادثة
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    
    // تحديث الواجهة فوراً برسالة المستخدم
    if (!textOverride) setInput('');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // تجهيز "قاعدة المعرفة" للمهندس بناءً على أحدث بيانات المخزون
      const currentInventory = liveProducts.length > 0 ? liveProducts : fallbackProducts;
      const inventoryContext = currentInventory.map(p => 
        `- [ID: ${p.id}] الاسم: ${p.name} | السعر: ${p.price} ر.س | الفئة: ${p.category} | التفاصيل: ${p.description} | المواصفات: ${p.specs?.join(', ')}`
      ).join('\n');

      // إرسال السجل الكامل لضمان "الذاكرة"
      const historyForAi = [...messages, userMessage];
      const aiResponse = await geminiService.chatWithCustomer(historyForAi, inventoryContext);
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

      // إشعار الإدارة بالاستفسارات الطويلة والمهمة
      if (textToSend.length > 10) {
        NotificationService.sendTelegramNotification(
          NotificationService.formatAiChatMessage(textToSend, aiResponse)
        );
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'المعذرة يا غالي، يبدو أن هناك ضيق في الإنترنت حالياً. لكن أنا هنا وبجانبك، كل الأجهزة والمنظومات اللي تحتاجها متوفرة في حيفان للطاقة. تفضل اسأل مرة ثانية.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, liveProducts, fallbackProducts]);

  const toggleVoice = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      alert("متصفحك لا يدعم البحث الصوتي. يرجى تجربة جوجل كروم.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'ar-YE';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.start();
  };

  return (
    <div className={`fixed left-6 z-[80] transition-all duration-500 ease-in-out ${isContactOpen ? 'bottom-[380px] md:bottom-[480px]' : 'bottom-32'}`}>
      {/* Button to Toggle Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-950 rounded-full flex items-center justify-center text-white shadow-3xl hover:bg-black transition-all active:scale-90 border-4 border-white overflow-hidden group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <img src={LOGO_URL} alt="المهندس الذكي" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[320px] sm:w-[450px] bg-white rounded-[2.5rem] shadow-4xl border border-emerald-50 flex flex-col h-[600px] overflow-hidden animate-chat-pop">
          {/* Header */}
          <div className="bg-emerald-950 p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-emerald-600/20">
              <img src={LOGO_URL} alt="حيفان" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-black text-base">المهندس أبو طاقة</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  {isLoading ? 'جاري التحليل الهندسي...' : 'متصل بقاعدة البيانات'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
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
                <div className="bg-white border border-emerald-100 p-4 px-6 rounded-3xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
            <button 
              onClick={toggleVoice}
              disabled={isLoading}
              className={`p-4 rounded-2xl transition-all shadow-lg active:scale-95 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اطلب تصميم منظومتك..."
              disabled={isLoading}
              className="flex-grow bg-gray-50 rounded-2xl px-5 py-4 text-sm outline-none border border-transparent focus:border-emerald-300 transition-all font-bold text-emerald-950 disabled:opacity-50"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-950 text-white p-4.5 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
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
