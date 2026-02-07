
import React, { useState, useEffect } from 'react';
import { UserProfile, Order } from '../types';
import { NotificationService } from '../services/notificationService';
import { supabase } from '../lib/supabaseClient';

interface AuthSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUserUpdate: (user: UserProfile) => void;
}

const AuthSidebar: React.FC<AuthSidebarProps> = ({ onClose, user, onUserUpdate }) => {
  const [authMode, setAuthMode] = useState<'selection' | 'email_login' | 'register' | 'orders'>('selection');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Login Form States
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const GOOGLE_CLIENT_ID = "413172724194-1tjqdcb8bv56f4ae1qlsetcr3t5ocvmt.apps.googleusercontent.com";

  const defaultOrders: Order[] = [
    { id: 'HYF-98210', date: '2025-11-12', total: 4500, status: 'delivered', itemsCount: 3 },
    { id: 'HYF-77412', date: '2025-12-05', total: 1800, status: 'shipped', itemsCount: 1 },
    { id: 'HYF-11029', date: '2026-01-20', total: 950, status: 'processing', itemsCount: 2 },
  ];

  useEffect(() => {
    if (!user) {
      const initGoogleAuth = () => {
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredential,
            auto_select: true,
          });

          const container = document.getElementById("google-login-button-main");
          if (container) {
            (window as any).google.accounts.id.renderButton(container, {
              theme: "filled_blue",
              size: "large",
              width: "320",
              shape: "pill",
              text: "continue_with"
            });
          }
        }
      };

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
  }, [user, authMode]);

  // Sync user to Supabase Profiles Table
  const syncUserToSupabase = async (userData: UserProfile) => {
    try {
      if (!supabase) return;
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userData.id,
          full_name: userData.name,
          email: userData.email,
          avatar_url: userData.avatar,
          role: userData.role || 'customer',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        console.error("Supabase Sync Error:", error);
      }
    } catch (err) {
      console.error("Sync Exception:", err);
    }
  };

  // Helper to generate a deterministic UUID from the Google ID
  const generateDeterministicUUID = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    // Format as UUID (8-4-4-4-12)
    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;
  };

  const handleGoogleCredential = async (response: any) => {
    setIsProcessing(true);
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
      
      const userId = await generateDeterministicUUID(payload.sub);

      const userData: UserProfile = {
        id: userId,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        provider: 'google',
        orders: defaultOrders
      };

      await syncUserToSupabase(userData);
      onUserUpdate(userData);
      NotificationService.sendTelegramNotification(NotificationService.formatLoginMessage(userData));
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء تسجيل الدخول بجوجل");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      alert("الرجاء إدخال البريد الإلكتروني");
      return;
    }

    setIsProcessing(true);
    
    // Trim and Lowercase Email for Consistency
    const cleanEmail = emailInput.trim().toLowerCase();
    
    const userId = await generateDeterministicUUID(cleanEmail);
    
    const userData: UserProfile = {
      id: userId,
      name: "مستخدم حيفان",
      email: cleanEmail,
      avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      provider: 'email',
      orders: defaultOrders
    };

    await syncUserToSupabase(userData);
    onUserUpdate(userData);
    NotificationService.sendTelegramNotification(NotificationService.formatLoginMessage(userData));
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-[3.5rem] shadow-3xl border border-emerald-50 overflow-hidden">
        <div className="bg-emerald-950 p-10 md:p-14 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            {user ? `أهلاً بك، ${user.name.split(' ')[0]}` : 'بوابة حيفان الذكية'}
          </h2>
          <p className="text-emerald-400 font-bold opacity-80">نحن هنا لنضيء حياتك بأفضل حلول الطاقة</p>
        </div>

        <div className="p-10 md:p-20">
          {user ? (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8 border-b border-emerald-50 pb-12">
                 <img src={user.avatar} className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] border-4 border-emerald-50 shadow-xl object-cover" alt="Profile" />
                 <div className="text-center md:text-right">
                    <h3 className="text-2xl md:text-3xl font-black text-emerald-950 mb-2">{user.name}</h3>
                    <p className="text-gray-400 font-bold text-lg">{user.email}</p>
                    <div className="mt-4 flex gap-3 justify-center md:justify-start">
                       <span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">عميل ذهبي</span>
                       <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{user.provider || 'بريد مباشر'}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-2xl font-black text-emerald-950 mb-8">نشاطات الحساب</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="bg-emerald-50/50 p-8 rounded-[2rem] border-2 border-transparent hover:border-emerald-200 transition-all text-right group">
                       <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">📦</span>
                       <p className="font-black text-emerald-950 text-xl mb-1">تتبع الطلبات</p>
                       <p className="text-gray-400 font-bold text-sm">لديك {user.orders?.length || 0} طلبات سابقة</p>
                    </button>
                    <button className="bg-amber-50/50 p-8 rounded-[2rem] border-2 border-transparent hover:border-amber-200 transition-all text-right group">
                       <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">⭐</span>
                       <p className="font-black text-amber-900 text-xl mb-1">نقاط الولاء</p>
                       <p className="text-gray-400 font-bold text-sm">رصيد نقاطك: 450 نقطة</p>
                    </button>
                 </div>
                 <button 
                  onClick={() => { localStorage.removeItem('hyfan_user'); window.location.hash = '#/'; window.location.reload(); }}
                  className="w-full p-6 text-red-500 font-black hover:bg-red-50 rounded-2xl transition-all border-2 border-transparent hover:border-red-100"
                 >
                   تسجيل الخروج من الحساب
                 </button>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {authMode === 'selection' ? (
                <div className="flex flex-col gap-8 items-center">
                  <div id="google-login-button-main" className="scale-125 md:scale-150 py-4"></div>
                  <div className="flex items-center gap-6 w-full opacity-20">
                    <div className="h-px bg-emerald-950 flex-grow"></div>
                    <span className="text-xs font-black">أو عبر البريد</span>
                    <div className="h-px bg-emerald-950 flex-grow"></div>
                  </div>
                  <button 
                    onClick={() => setAuthMode('email_login')}
                    className="w-full bg-emerald-950 text-white py-6 rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 text-xl active:scale-95"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    دخول بالبريد الإلكتروني
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmailLogin} className="space-y-8 animate-fade-in">
                  <button onClick={() => setAuthMode('selection')} className="flex items-center gap-2 text-emerald-600 font-black mb-8 hover:underline">
                    <svg className="rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                    الرجوع للخيارات
                  </button>
                  <div className="space-y-6">
                    <input 
                      type="email" 
                      required 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="البريد الإلكتروني" 
                      className="w-full bg-emerald-50/30 border-2 border-emerald-50 p-6 rounded-2xl outline-none focus:border-emerald-500 font-black text-lg" 
                    />
                    <input 
                      type="password" 
                      required 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="كلمة المرور" 
                      className="w-full bg-emerald-50/30 border-2 border-emerald-50 p-6 rounded-2xl outline-none focus:border-emerald-500 font-black text-lg" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-emerald-700 transition-all active:scale-95">دخول آمن</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
