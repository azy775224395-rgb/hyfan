
import React, { useEffect, useState } from 'react';
import { UserProfile, Order, Product, UserSession } from '../types';
import { LocalDataService } from '../services/localDataService';
import { 
  LayoutDashboard, ShoppingBag, Users, Package, Settings, LogOut, Search, 
  ChevronDown, CheckCircle, XCircle, Clock, Truck, Plus, ArrowLeft,
  DollarSign, Edit, Trash, Save, Globe, Phone, CreditCard, ToggleLeft, ToggleRight,
  ShieldAlert, Activity
} from 'lucide-react';

interface AdminDashboardProps {
  user: UserProfile | null;
  onNavigate: (hash: string) => void;
}

// --- Views Enum ---
type AdminView = 'dashboard' | 'revenue' | 'products' | 'orders' | 'settings' | 'product-editor' | 'customers';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onNavigate }) => {
  // --- Security ---
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const ALLOWED_EMAIL = "azy775224395@gmail.com";
  const DASHBOARD_PASSWORD = "azy_715371939";

  // --- State ---
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [storeSettings, setStoreSettings] = useState<any>({});
  
  // Product Editor State
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Buyer Info Modal State
  const [selectedBuyerOrder, setSelectedBuyerOrder] = useState<Order | null>(null);

  // Ban State
  const [banInput, setBanInput] = useState('');
  const [bannedIPs, setBannedIPs] = useState<string[]>([]);

  useEffect(() => {
    if (user?.email !== ALLOWED_EMAIL) {
      alert("عذراً، هذا الحساب غير مصرح له.");
      onNavigate('#/');
    }
  }, [user, onNavigate]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      setIsLocked(false);
      loadData();
    } else {
      setAuthError("كلمة المرور غير صحيحة");
    }
  };

  const loadData = () => {
    setProducts(LocalDataService.getProducts());
    setOrders(LocalDataService.getOrders());
    setStoreSettings(LocalDataService.getStoreSettings());
    setSessions(LocalDataService.getSessions());
    setBannedIPs(LocalDataService.getBannedIPs());
  };

  const formatPrice = (p: number) => `${p.toLocaleString()} ${storeSettings.currency || 'ر.س'}`;

  // --- Actions ---

  const handleProductSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price) return alert("الاسم والسعر مطلوبان");

    const productToSave: Product = {
      id: editingProduct.id || `p_${Date.now()}`,
      name: editingProduct.name!,
      price: Number(editingProduct.price),
      oldPrice: editingProduct.oldPrice ? Number(editingProduct.oldPrice) : undefined,
      description: editingProduct.description || '',
      fullDescription: editingProduct.fullDescription || '',
      image: editingProduct.image || 'https://via.placeholder.com/300',
      category: editingProduct.category || 'عام',
      specs: Array.isArray(editingProduct.specs) ? editingProduct.specs : (editingProduct.specs as unknown as string || '').split(',').map(s => s.trim()).filter(Boolean),
      status: editingProduct.status || 'متوفر'
    };

    const updatedList = LocalDataService.saveProduct(productToSave);
    setProducts(updatedList);
    setCurrentView('products');
    setEditingProduct({});
    alert("تم حفظ المنتج بنجاح وتحديث المتجر");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      const updated = LocalDataService.deleteProduct(id);
      setProducts(updated);
    }
  };

  const handleOrderStatus = (id: string, status: Order['status']) => {
    const updated = LocalDataService.updateOrderStatus(id, status);
    setOrders(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    LocalDataService.saveStoreSettings(storeSettings);
    alert("تم حفظ إعدادات المتجر بنجاح");
  };

  const handleBanIP = (e: React.FormEvent) => {
    e.preventDefault();
    if(banInput) {
       const newList = LocalDataService.banIP(banInput);
       setBannedIPs(newList);
       setBanInput('');
       alert(`تم حظر IP: ${banInput} بنجاح`);
    }
  };

  const handleUnbanIP = (ip: string) => {
    const newList = LocalDataService.unbanIP(ip);
    setBannedIPs(newList);
  };

  // --- Sub-Components ---

  const Sidebar = () => (
    <aside className="w-64 bg-gray-950 border-l border-gray-800 hidden md:flex flex-col">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
         <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black text-white">H</div>
         <span className="font-bold text-white">لوحة التحكم</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
         {[
           { id: 'dashboard', label: 'نظرة عامة', icon: LayoutDashboard },
           { id: 'revenue', label: 'الإيرادات', icon: DollarSign },
           { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: orders.filter(o => o.status === 'pending').length },
           { id: 'customers', label: 'العملاء', icon: Users },
           { id: 'products', label: 'المنتجات', icon: Package },
           { id: 'settings', label: 'الإعدادات', icon: Settings },
         ].map(item => (
           <button
             key={item.id}
             onClick={() => { setCurrentView(item.id as AdminView); loadData(); }}
             className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentView === item.id ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
           >
             <div className="flex items-center gap-3">
               <item.icon size={18} />
               <span className="font-bold text-sm">{item.label}</span>
             </div>
             {item.badge ? <span className="bg-red-500 text-white text-[10px] px-2 rounded-full">{item.badge}</span> : null}
           </button>
         ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
         <button onClick={() => onNavigate('#/')} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 p-2">
            <LogOut size={18} />
            <span className="text-sm font-bold">خروج</span>
         </button>
      </div>
    </aside>
  );

  const RevenueView = () => {
    const revenueItems = orders.flatMap(o => 
       (o.items || []).map(item => ({
          orderId: o.id,
          date: o.date,
          customerEmail: o.customerEmail,
          itemName: item.name,
          itemPrice: item.price
       }))
    );

    return (
      <div className="animate-fade-in space-y-6">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">تقرير الإيرادات التفصيلي</h2>
            <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700">
               <ArrowLeft size={16} /> رجوع
            </button>
         </div>

         <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden">
            <table className="w-full text-right text-gray-300">
               <thead className="bg-black/20 text-xs uppercase font-black text-gray-500">
                  <tr>
                     <th className="p-4">المنتج المباع</th>
                     <th className="p-4">سعر الوحدة</th>
                     <th className="p-4">بريد العميل</th>
                     <th className="p-4">تاريخ البيع</th>
                     <th className="p-4">رقم الطلب</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-700 text-sm font-bold">
                  {revenueItems.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                       <td className="p-4 text-white">{row.itemName}</td>
                       <td className="p-4 text-emerald-400">{formatPrice(row.itemPrice)}</td>
                       <td className="p-4">{row.customerEmail}</td>
                       <td className="p-4">{row.date}</td>
                       <td className="p-4 font-mono text-xs opacity-50">#{row.orderId}</td>
                    </tr>
                  ))}
                  {revenueItems.length === 0 && (
                     <tr><td colSpan={5} className="p-8 text-center text-gray-500">لا توجد مبيعات مسجلة حتى الآن</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    );
  };

  const CustomersView = () => {
    // 1. Calculate Active Users
    const now = Date.now();
    const activeThreshold = 60 * 1000; // 1 Minute
    const onlineCount = sessions.filter(s => (now - s.lastSeen) < activeThreshold).length;

    const [searchTerm, setSearchTerm] = useState('');

    const filteredSessions = sessions.filter(s => 
       s.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       s.ip.includes(searchTerm)
    );

    return (
      <div className="animate-fade-in space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           <div className="bg-emerald-900/30 border border-emerald-500/30 p-6 rounded-3xl flex items-center justify-between">
              <div>
                 <p className="text-gray-400 text-sm font-bold">المتصلون الآن</p>
                 <h3 className="text-3xl font-black text-white">{onlineCount}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                 <Activity className="text-white" />
              </div>
           </div>
           <div className="bg-gray-800 border border-gray-700 p-6 rounded-3xl flex items-center justify-between">
              <div>
                 <p className="text-gray-400 text-sm font-bold">إجمالي الزوار المسجلين</p>
                 <h3 className="text-3xl font-black text-white">{sessions.length}</h3>
              </div>
              <Users className="text-gray-600" size={32} />
           </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white">سجل العملاء والزوار</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="بحث بالبريد أو IP..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl py-2 px-4 pr-10 text-white outline-none focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden">
          <table className="w-full text-right text-gray-300">
            <thead className="bg-black/20 text-xs uppercase font-black text-gray-500">
              <tr>
                <th className="p-4">الحالة</th>
                <th className="p-4">العميل</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">آخر ظهور</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm font-bold">
              {filteredSessions.map((session, idx) => {
                const isOnline = (now - session.lastSeen) < activeThreshold;
                return (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`}></span>
                          <span className="text-xs">{isOnline ? 'متصل' : 'غائب'}</span>
                       </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 font-black">
                          {session.email ? session.email.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                           <p className="text-white">{session.name || 'زائر'}</p>
                           <p className="text-xs text-gray-500">{session.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-amber-400">{session.ip}</td>
                    <td className="p-4 text-gray-400">{new Date(session.lastSeen).toLocaleTimeString('ar-YE')}</td>
                    <td className="p-4">
                       <button onClick={() => { setBanInput(session.ip); setCurrentView('settings'); }} className="text-red-400 hover:text-red-300 text-xs border border-red-500/30 px-2 py-1 rounded">حظر IP</button>
                    </td>
                  </tr>
                );
              })}
              {filteredSessions.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">لا توجد بيانات حالياً</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const SettingsView = () => (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-black text-white mb-4">إعدادات المتجر العامة</h2>
      
      {/* Ban Section */}
      <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-3xl">
         <h3 className="text-lg font-black text-red-400 mb-4 flex items-center gap-2">
            <ShieldAlert size={20} /> حظر المستخدمين (IP Ban)
         </h3>
         <form onSubmit={handleBanIP} className="flex gap-4 mb-6">
            <input 
               type="text" 
               placeholder="أدخل عنوان IP (مثال: 192.168.1.1)" 
               value={banInput}
               onChange={e => setBanInput(e.target.value)}
               className="flex-grow bg-gray-900 border border-gray-700 text-white rounded-xl px-4 outline-none focus:border-red-500"
            />
            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl font-black hover:bg-red-500">حظر</button>
         </form>
         
         <div className="space-y-2">
            <h4 className="text-xs text-gray-400 mb-2">قائمة المحظورين حالياً:</h4>
            {bannedIPs.length === 0 && <p className="text-gray-500 text-sm">لا يوجد محظورين.</p>}
            {bannedIPs.map(ip => (
               <div key={ip} className="flex justify-between items-center bg-gray-900 p-3 rounded-xl border border-gray-800">
                  <span className="text-white font-mono">{ip}</span>
                  <button onClick={() => handleUnbanIP(ip)} className="text-emerald-400 text-xs font-bold hover:underline">إلغاء الحظر</button>
               </div>
            ))}
         </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* General Info */}
        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
          <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
            <Globe size={20} className="text-emerald-500" /> معلومات المتجر
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-xs mb-2">اسم المتجر</label>
              <input 
                type="text" 
                value={storeSettings.storeName || ''} 
                onChange={e => setStoreSettings({...storeSettings, storeName: e.target.value})}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-2">رقم دعم الواتساب</label>
              <input 
                type="text" 
                value={storeSettings.supportPhone || ''} 
                onChange={e => setStoreSettings({...storeSettings, supportPhone: e.target.value})}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-2">العملة الافتراضية</label>
              <select 
                value={storeSettings.currency || 'SAR'} 
                onChange={e => setStoreSettings({...storeSettings, currency: e.target.value})}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-white outline-none"
              >
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="YER">ريال يمني (YER)</option>
                <option value="USD">دولار أمريكي (USD)</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Controls */}
        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
          <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
            <Settings size={20} className="text-amber-500" /> التحكم بالنظام
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl mb-4">
            <div>
              <h4 className="text-white font-bold text-sm">وضع الصيانة</h4>
              <p className="text-xs text-gray-500">إغلاق المتجر مؤقتاً أمام الزوار</p>
            </div>
            <button 
              type="button"
              onClick={() => setStoreSettings({...storeSettings, maintenanceMode: !storeSettings.maintenanceMode})}
              className={`p-2 rounded-full transition-colors ${storeSettings.maintenanceMode ? 'text-emerald-400' : 'text-gray-600'}`}
            >
              {storeSettings.maintenanceMode ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
            <div>
              <h4 className="text-white font-bold text-sm">استقبال الطلبات</h4>
              <p className="text-xs text-gray-500">تفعيل/إيقاف زر الشراء في الموقع</p>
            </div>
            <button 
              type="button"
              onClick={() => setStoreSettings({...storeSettings, allowOrders: !storeSettings.allowOrders})}
              className={`p-2 rounded-full transition-colors ${storeSettings.allowOrders ? 'text-emerald-400' : 'text-gray-600'}`}
            >
              {storeSettings.allowOrders ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black shadow-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 text-lg">
          <Save size={20} /> حفظ التغييرات
        </button>
      </form>
    </div>
  );

  const ProductEditor = () => (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
       <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">{isNewProduct ? 'إضافة منتج جديد' : 'تعديل المنتج'}</h2>
          <button onClick={() => setCurrentView('products')} className="flex items-center gap-2 text-gray-400 hover:text-white">
             <ArrowLeft size={20} /> إلغاء
          </button>
       </div>

       <form onSubmit={handleProductSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div>
                <label className="block text-gray-400 text-xs mb-1">اسم المنتج</label>
                <input required type="text" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" placeholder="مثال: لوح شمسي 500 وات" />
             </div>
             <div>
                <label className="block text-gray-400 text-xs mb-1">رابط الصورة</label>
                <input required type="text" value={editingProduct.image || ''} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" placeholder="https://..." />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-gray-400 text-xs mb-1">السعر</label>
                   <input required type="number" value={editingProduct.price || ''} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" />
                </div>
                <div>
                   <label className="block text-gray-400 text-xs mb-1">السعر السابق (اختياري)</label>
                   <input type="number" value={editingProduct.oldPrice || ''} onChange={e => setEditingProduct({...editingProduct, oldPrice: Number(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" />
                </div>
             </div>
             <div>
                <label className="block text-gray-400 text-xs mb-1">القسم</label>
                <select value={editingProduct.category || ''} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-none">
                   <option value="">اختر القسم...</option>
                   <option value="الالواح الشمسيه">الالواح الشمسيه</option>
                   <option value="البطاريات">البطاريات</option>
                   <option value="الانفرترات">الانفرترات</option>
                   <option value="الاجهزة الكهربائيه">الاجهزة الكهربائيه</option>
                   <option value="اجهزة الطباخه">اجهزة الطباخه</option>
                   <option value="الباقات">الباقات</option>
                </select>
             </div>
             <div>
                <label className="block text-gray-400 text-xs mb-1">الحالة</label>
                <select value={editingProduct.status || 'متوفر'} onChange={e => setEditingProduct({...editingProduct, status: e.target.value as any})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-none">
                   <option value="متوفر">متوفر</option>
                   <option value="جديد">جديد</option>
                   <option value="الأكثر مبيعاً">الأكثر مبيعاً</option>
                   <option value="خصم">خصم</option>
                </select>
             </div>
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-gray-400 text-xs mb-1">الوصف المختصر</label>
                <textarea value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none h-24" />
             </div>
             <div>
                <label className="block text-gray-400 text-xs mb-1">المميزات (افصل بفاصلة)</label>
                <textarea 
                  value={Array.isArray(editingProduct.specs) ? editingProduct.specs.join(', ') : editingProduct.specs || ''} 
                  onChange={e => setEditingProduct({...editingProduct, specs: e.target.value.split(',')})} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none h-24" 
                  placeholder="ضمان 5 سنوات, جودة عالية, ..."
                />
             </div>
             
             {/* Live Preview Card */}
             <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-xs mb-2">معاينة البطاقة:</p>
                <div className="w-64 mx-auto bg-white rounded-2xl p-3 shadow-lg transform scale-90 origin-top">
                   <div className="aspect-square bg-gray-100 rounded-xl mb-2 overflow-hidden">
                      {editingProduct.image && <img src={editingProduct.image} className="w-full h-full object-cover" />}
                   </div>
                   <h4 className="text-emerald-950 font-black text-sm">{editingProduct.name || 'اسم المنتج'}</h4>
                   <p className="text-emerald-700 font-bold">{editingProduct.price || 0} ر.س</p>
                </div>
             </div>
          </div>

          <div className="md:col-span-2 pt-6 border-t border-gray-800 flex justify-end gap-4">
             <button type="button" onClick={() => setCurrentView('products')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">إلغاء</button>
             <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-500 shadow-lg transition-all transform active:scale-95">
                حفظ المنتج
             </button>
          </div>
       </form>
    </div>
  );

  const PendingOrdersView = () => {
     const pending = orders.filter(o => o.status === 'pending');
     
     return (
        <div className="space-y-6 animate-fade-in">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">الطلبات المعلقة ({pending.length})</h2>
              <button onClick={() => setCurrentView('dashboard')} className="text-gray-400 hover:text-white text-sm font-bold flex gap-2"><ArrowLeft size={16}/> رجوع</button>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {pending.length === 0 ? (
                 <div className="p-12 text-center bg-gray-800 rounded-3xl text-gray-500">لا توجد طلبات معلقة حالياً</div>
              ) : (
                 pending.map(order => (
                    <div key={order.id} className="bg-gray-800 border border-gray-700 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/30 transition-colors">
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-mono">#{order.id}</span>
                             <span className="text-gray-400 text-xs">{order.date}</span>
                          </div>
                          <h3 className="text-white font-black text-lg">{order.customerName}</h3>
                          <p className="text-gray-400 text-sm">{order.itemsCount} منتجات • الإجمالي: <span className="text-emerald-400 font-bold">{formatPrice(order.total)}</span></p>
                       </div>
                       
                       <div className="flex flex-wrap gap-3">
                          <button 
                             onClick={() => setSelectedBuyerOrder(order)}
                             className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl font-bold hover:bg-blue-500/20 transition-colors"
                          >
                             ℹ️ معلومات المشتري
                          </button>
                          <button 
                             onClick={() => {
                                if(confirm("هل أنت متأكد من رفض الطلب؟")) handleOrderStatus(order.id, 'cancelled');
                             }}
                             className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl font-bold hover:bg-red-500/20 transition-colors"
                          >
                             ❌ رفض الطلب
                          </button>
                          <button 
                             onClick={() => handleOrderStatus(order.id, 'processing')}
                             className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-xl font-black hover:bg-emerald-400 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
                          >
                             ✅ تمت المراجعة
                          </button>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </div>
     );
  };

  // --- Main Render ---

  if (isLocked) {
     return (
       <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 text-right" dir="rtl">
         <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md animate-slide-up">
           <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
             <Settings size={32} className="text-white" />
           </div>
           <h2 className="text-2xl font-black text-white text-center mb-6">لوحة الإدارة المركزية</h2>
           <form onSubmit={handleUnlock} className="space-y-4">
             <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="كود الدخول..." className="w-full bg-gray-900 border border-gray-700 text-white px-5 py-4 rounded-xl outline-none focus:border-emerald-500 text-center font-black tracking-widest" autoFocus />
             {authError && <p className="text-red-500 text-xs text-center font-bold">{authError}</p>}
             <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-500 transition-all shadow-lg">دخول النظام</button>
             <button type="button" onClick={() => onNavigate('#/')} className="w-full text-gray-500 text-xs font-bold hover:text-white mt-2">عودة للمتجر</button>
           </form>
         </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans text-right flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-8">
         {/* Mobile Header */}
         <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="font-black text-xl">لوحة الإدارة</h1>
            <button onClick={() => onNavigate('#/')}><LogOut size={20} className="text-red-400" /></button>
         </div>

         {/* Content Switcher */}
         {currentView === 'dashboard' && (
            <div className="animate-fade-in space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div onClick={() => setCurrentView('revenue')} className="bg-gray-800 p-6 rounded-3xl border border-gray-700 cursor-pointer hover:border-emerald-500/50 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><DollarSign size={24} /></div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-400">عرض التفاصيل &larr;</span>
                     </div>
                     <h3 className="text-gray-400 font-bold text-sm">الإجمالي</h3>
                     <p className="text-3xl font-black text-white">{formatPrice(orders.reduce((acc, o) => acc + o.total, 0))}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
                     <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit mb-4"><ShoppingBag size={24} /></div>
                     <h3 className="text-gray-400 font-bold text-sm">إجمالي الطلبات</h3>
                     <p className="text-3xl font-black text-white">{orders.length}</p>
                  </div>
                  <div onClick={() => setCurrentView('customers')} className="bg-gray-800 p-6 rounded-3xl border border-gray-700 cursor-pointer hover:border-purple-500/50 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Users size={24} /></div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-purple-400">عرض التفاصيل &larr;</span>
                     </div>
                     <h3 className="text-gray-400 font-bold text-sm">العملاء</h3>
                     <p className="text-3xl font-black text-white">{sessions.length}</p>
                  </div>
                  <div onClick={() => setCurrentView('orders')} className="bg-gray-800 p-6 rounded-3xl border border-gray-700 cursor-pointer hover:border-amber-500/50 transition-all">
                     <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit mb-4"><Clock size={24} /></div>
                     <h3 className="text-gray-400 font-bold text-sm">قيد الانتظار</h3>
                     <p className="text-3xl font-black text-white">{orders.filter(o => o.status === 'pending').length}</p>
                  </div>
               </div>

               <div className="bg-gradient-to-r from-emerald-900 to-gray-900 rounded-3xl p-8 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                     <h2 className="text-2xl font-black text-white mb-2">إجراءات سريعة</h2>
                     <p className="text-emerald-200/60 font-bold">تحكم كامل في منتجات وطلبات المتجر</p>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => { setIsNewProduct(true); setEditingProduct({}); setCurrentView('product-editor'); }} className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-black shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2">
                        <Plus size={18} /> إضافة منتج
                     </button>
                     <button onClick={() => setCurrentView('orders')} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-black shadow-lg hover:bg-emerald-500 transition-colors">
                        مراجعة الطلبات
                     </button>
                  </div>
               </div>
            </div>
         )}

         {currentView === 'revenue' && <RevenueView />}
         
         {currentView === 'customers' && <CustomersView />}
         
         {currentView === 'settings' && <SettingsView />}
         
         {currentView === 'product-editor' && <ProductEditor />}

         {currentView === 'products' && (
            <div className="animate-fade-in space-y-6">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-white">إدارة المنتجات ({products.length})</h2>
                  <button onClick={() => { setIsNewProduct(true); setEditingProduct({}); setCurrentView('product-editor'); }} className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold flex gap-2">
                     <Plus size={18} /> إضافة
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(p => (
                     <div key={p.id} className="bg-gray-800 border border-gray-700 p-4 rounded-2xl flex gap-4 group hover:border-gray-500 transition-all">
                        <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden shrink-0">
                           <img src={p.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="font-bold text-white truncate">{p.name}</h4>
                           <p className="text-emerald-400 text-sm font-bold">{p.price} ر.س</p>
                           <p className="text-gray-500 text-xs mt-1">{p.category}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                           <button onClick={() => { setIsNewProduct(false); setEditingProduct(p); setCurrentView('product-editor'); }} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"><Edit size={16} /></button>
                           <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"><Trash size={16} /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {currentView === 'orders' && <PendingOrdersView />}

         {/* Buyer Info Modal */}
         {selectedBuyerOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
               <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 w-full max-w-lg shadow-2xl relative">
                  <button onClick={() => setSelectedBuyerOrder(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white"><XCircle size={24} /></button>
                  <h3 className="text-2xl font-black text-white mb-6 border-r-4 border-blue-500 pr-3">معلومات المشتري</h3>
                  <div className="space-y-4 text-right">
                     <div className="bg-gray-900 p-4 rounded-xl">
                        <label className="text-xs text-gray-500 block mb-1">الاسم</label>
                        <p className="font-bold text-white text-lg">{selectedBuyerOrder.customerName}</p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-4 rounded-xl">
                           <label className="text-xs text-gray-500 block mb-1">الهاتف</label>
                           <p className="font-bold text-emerald-400">{selectedBuyerOrder.customerPhone || 'غير متوفر'}</p>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-xl">
                           <label className="text-xs text-gray-500 block mb-1">البريد</label>
                           <p className="font-bold text-white text-sm truncate">{selectedBuyerOrder.customerEmail}</p>
                        </div>
                     </div>
                     <div className="bg-gray-900 p-4 rounded-xl">
                        <label className="text-xs text-gray-500 block mb-1">العنوان</label>
                        <p className="font-bold text-white">
                           {selectedBuyerOrder.shippingInfo 
                              ? `${selectedBuyerOrder.shippingInfo.city} - ${selectedBuyerOrder.shippingInfo.address}` 
                              : 'العنوان غير مسجل'}
                        </p>
                     </div>
                     <div className="bg-gray-900 p-4 rounded-xl">
                        <label className="text-xs text-gray-500 block mb-1">طريقة الدفع</label>
                        <p className="font-bold text-amber-400">{selectedBuyerOrder.paymentMethod || 'غير محدد'}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedBuyerOrder(null)} className="w-full mt-6 bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-gray-600">إغلاق النافذة</button>
               </div>
            </div>
         )}
      </main>
    </div>
  );
};

export default AdminDashboard;
