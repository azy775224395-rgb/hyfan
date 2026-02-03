
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUserUpdate: (user: UserProfile) => void;
}

const AuthSidebar: React.FC<AuthSidebarProps> = ({ isOpen, onClose, user, onUserUpdate }) => {
  const [authMode, setAuthMode] = useState<'selection' | 'email_login' | 'register'>('selection');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // الـ Client ID الجديد الذي زودتني به
  const GOOGLE_CLIENT_ID = "413172724194-1tjqdcb8bv56f4ae1qlsetcr3t5ocvmt.apps.googleusercontent.com";

  useEffect(() => {
    if (isOpen && !user) {
      const initGoogleAuth = () => {
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredential,
            auto_select: true, // تسجيل دخول تلقائي إذا كان المستخدم مسجلاً مسبقاً
            cancel_on_tap_outside: true,
          });

          // رندر زر جوجل الرسمي في الحاوية المخصصة
          const container = document.getElementById("google-login-button-main");
          if (container) {
            (window as any).google.accounts.id.renderButton(container, {
              theme: "filled_blue",
              size: "large",
              width: "320",
              shape: "pill",
              text: "continue_with",
              logo_alignment: "left"
            });
          }

          // تفعيل نافذة "One Tap" الجانبية
          (window as any).google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
               console.log("One Tap not displayed:", notification.getNotDisplayedReason());
            }
          });
        }
      };

      // التأكد من تحميل المكتبة
      if (!(window as any).google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGoogleAuth;
        document.head.appendChild(script);
      } else {
        initGoogleAuth();
      }
    }
  }, [isOpen, user, authMode]);

  const handleGoogleCredential = (response: any) => {
    setIsProcessing(true);
    try {
      // فك تشفير الـ ID Token القادم من جوجل (JWT)
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
      
      onUserUpdate({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        provider: 'google'
      });
      setIsProcessing(false);
      onClose();
    } catch (e) {
      console.error("Auth Exception:", e);
      setError("حدث خطأ أثناء معالجة الجلسة. يرجى المحاولة لاحقاً.");
      setIsProcessing(false);
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onUserUpdate({
        name: "عميل حيفان",
        email: "customer@example.com",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        provider: null
      });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex flex-col text-right">
            <h2 className="text-2xl font-black text-emerald-950">بوابة حيفان</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">تسجيل دخول آمن 2026</p>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 text-emerald-950 rounded-2xl hover:bg-emerald-50 transition-all active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-grow p-8 flex flex-col overflow-y-auto">
          {user ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="relative inline-block mb-6">
                <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-emerald-500 shadow-xl object-cover" alt="Profile" />
                <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md">
                   <svg className="text-emerald-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <h3 className="text-xl font-black text-emerald-950">{user.name}</h3>
              <p className="text-gray-400 font-bold text-sm mb-12">{user.email}</p>
              
              <div className="space-y-4">
                <button className="w-full p-4 rounded-2xl bg-emerald-50 text-emerald-700 font-black hover:bg-emerald-100 transition-all border border-emerald-100">طلباتي السابقة</button>
                <button 
                  onClick={() => { localStorage.removeItem('hyfan_user'); window.location.reload(); }}
                  className="w-full p-4 rounded-2xl bg-red-50 text-red-600 font-black hover:bg-red-100 transition-all border border-red-100"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-fade-in text-right" dir="rtl">
              {authMode === 'selection' ? (
                <div className="space-y-10">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
                      <svg className="text-emerald-600" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 className="text-2xl font-black text-emerald-950">دخول ذكي</h3>
                    <p className="text-gray-400 font-bold text-sm leading-relaxed px-4">استخدم حسابك في جوجل لتجربة شراء أسرع وأكثر أماناً.</p>
                  </div>

                  <div className="flex flex-col gap-6 items-center">
                    <div id="google-login-button-main" className="min-h-[44px]"></div>

                    {/* تنبيه ذكي لمعالجة خطأ 401 */}
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-[10px] text-amber-700 font-bold leading-relaxed">
                      💡 هل يظهر لك خطأ 401؟ تأكد من إضافة رابط الموقع 
                      <span className="bg-amber-200 px-1 rounded mx-1">{window.location.origin}</span>
                      إلى قائمة "Authorized JavaScript Origins" في Google Console.
                    </div>

                    <div className="flex items-center gap-4 w-full opacity-20 py-2">
                      <div className="h-px bg-emerald-900 flex-grow"></div>
                      <span className="text-[10px] font-black">أو</span>
                      <div className="h-px bg-emerald-900 flex-grow"></div>
                    </div>

                    <button 
                      onClick={() => setAuthMode('email_login')}
                      className="w-full p-5 rounded-full bg-emerald-950 text-white font-black hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      الدخول عبر البريد الإلكتروني
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 flex flex-col h-full animate-fade-in">
                  <button onClick={() => setAuthMode('selection')} className="flex items-center gap-2 text-emerald-600 font-black mb-4 text-sm hover:underline">
                    <svg className="rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                    الرجوع للخيارات
                  </button>

                  <h3 className="text-2xl font-black text-emerald-950">تسجيل الدخول</h3>
                  
                  <form onSubmit={handleEmailLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                      <input type="email" required className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label>
                      <input type="password" required className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all">دخول</button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8 bg-emerald-50 border-t border-emerald-100 text-center">
          <p className="text-[9px] text-emerald-800/60 font-black uppercase tracking-tighter leading-relaxed">
            جميع الحقوق محفوظة لمتجر حيفان للطاقة 2026. <br/>
            نظام حماية البيانات المشفر وفق معايير SSL.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default AuthSidebar;
