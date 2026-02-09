
import React, { useEffect, useState, useMemo } from 'react';
import { UserProfile, Order, Product } from '../types';
import { supabase } from '../lib/supabaseClient';
import { INITIAL_PRODUCTS } from '../constants';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Truck
} from 'lucide-react';

interface AdminDashboardProps {
  user: UserProfile | null;
  onNavigate: (hash: string) => void;
}

interface DashboardStats {
  revenue: number;
  totalOrders: number;
  activeUsers: number;
  pendingOrders: number;
}

type TabType = 'overview' | 'orders' | 'products' | 'users' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onNavigate }) => {
  // Security State
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Data State
  const [stats, setStats] = useState<DashboardStats>({ revenue: 0, totalOrders: 0, activeUsers: 0, pendingOrders: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  
  // UI State
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const ALLOWED_EMAIL = "azy775224395@gmail.com";
  const DASHBOARD_PASSWORD = "azy_715371939";

  // --- Initialization ---
  useEffect(() => {
    if (!user) {
      onNavigate('#/');
      return;
    }
    if (user.email !== ALLOWED_EMAIL) {
      alert("عذراً، هذا الحساب غير مصرح له بالدخول.");
      onNavigate('#/');
    }
  }, [user, onNavigate]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      setIsLocked(false);
      fetchDashboardData();
    } else {
      setAuthError("كلمة المرور غير صحيحة");
      setPasswordInput('');
    }
  };

  // --- Data Fetching ---
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`*, profiles(full_name, email, avatar_url)`)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // 2. Fetch Users
      const { data: profilesData, error: userError } = await supabase
        .from('profiles')
        .select('*');

      if (userError) throw userError;

      // Process Orders
      const formattedOrders: Order[] = (ordersData || []).map((o: any) => ({
        id: o.id,
        date: new Date(o.created_at).toLocaleDateString('ar-YE'),
        total: o.total_amount,
        status: o.status,
        itemsCount: o.items_count,
        customerName: o.profiles?.full_name || 'زائر',
        customerEmail: o.profiles?.email
      }));

      // Calculate Stats
      const totalRevenue = formattedOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      const pendingCount = formattedOrders.filter(o => o.status === 'pending').length;

      setStats({
        revenue: totalRevenue,
        totalOrders: formattedOrders.length,
        activeUsers: profilesData?.length || 0,
        pendingOrders: pendingCount
      });

      setOrders(formattedOrders);
      setUsersList(profilesData || []);

    } catch (error) {
      console.error("Dashboard data load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (error) {
      alert("فشل تحديث الحالة");
    }
  };

  const formatPrice = (p: number) => `${p.toLocaleString()} ر.س`;

  // --- Render Helpers ---
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <CheckCircle size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'processing': return <Clock size={14} />;
      default: return <XCircle size={14} />;
    }
  };

  // --- Views ---

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'الإيرادات', value: formatPrice(stats.revenue), icon: '💰', color: 'from-emerald-500 to-teal-600' },
          { title: 'الطلبات', value: stats.totalOrders, icon: '📦', color: 'from-blue-500 to-indigo-600' },
          { title: 'العملاء', value: stats.activeUsers, icon: '👥', color: 'from-purple-500 to-pink-600' },
          { title: 'قيد الانتظار', value: stats.pendingOrders, icon: '⏳', color: 'from-amber-500 to-orange-600' },
        ].map((stat, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-3xl bg-gray-800 border border-gray-700 p-6 group hover:-translate-y-1 transition-transform">
             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`}></div>
             <div className="relative z-10 flex justify-between items-start">
               <div>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                 <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
               </div>
               <span className="text-3xl">{stat.icon}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Chart Placeholder */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-3xl p-6">
           <h3 className="text-xl font-black mb-6 text-white flex items-center gap-2">
             <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
             تحليل المبيعات (شهري)
           </h3>
           <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-700/50">
              {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 95].map((h, i) => (
                <div key={i} className="w-full bg-emerald-500/20 hover:bg-emerald-500 rounded-t-lg transition-all relative group" style={{ height: `${h}%` }}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-emerald-950 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     {h}%
                   </div>
                </div>
              ))}
           </div>
           <div className="flex justify-between text-xs text-gray-500 font-bold mt-4 px-2">
              <span>يناير</span><span>مايو</span><span>سبتمبر</span><span>ديسمبر</span>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-emerald-900 to-gray-900 border border-emerald-500/20 rounded-3xl p-6">
           <h3 className="text-xl font-black mb-6 text-white">إجراءات سريعة</h3>
           <div className="space-y-3">
             <button onClick={() => setActiveTab('products')} className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl flex items-center gap-4 transition-all group">
               <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">+</div>
               <div className="text-right">
                 <p className="font-bold text-white">إضافة منتج جديد</p>
                 <p className="text-xs text-gray-400">تحديث المخزون</p>
               </div>
             </button>
             <button onClick={() => setActiveTab('orders')} className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl flex items-center gap-4 transition-all group">
               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">📋</div>
               <div className="text-right">
                 <p className="font-bold text-white">مراجعة الطلبات المعلقة</p>
                 <p className="text-xs text-gray-400">{stats.pendingOrders} طلبات جديدة</p>
               </div>
             </button>
             <button onClick={() => window.open('https://dmkyurpyqhqwoczmdpeb.supabase.co', '_blank')} className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl flex items-center gap-4 transition-all group">
               <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">🗄️</div>
               <div className="text-right">
                 <p className="font-bold text-white">قاعدة البيانات</p>
                 <p className="text-xs text-gray-400">Supabase Dashboard</p>
               </div>
             </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => {
    const filteredOrders = orders.filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            o.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-800 p-4 rounded-2xl border border-gray-700">
          <div className="relative flex-grow max-w-md">
            <input 
              type="text" 
              placeholder="بحث برقم الطلب أو اسم العميل..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 text-white pl-4 pr-10 py-3 rounded-xl focus:border-emerald-500 outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-colors border ${
                  filterStatus === status 
                    ? 'bg-emerald-600 text-white border-emerald-500' 
                    : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-black/30 text-gray-400 text-xs uppercase font-black tracking-wider">
                <tr>
                  <th className="p-5">رقم الطلب</th>
                  <th className="p-5">العميل</th>
                  <th className="p-5">التاريخ</th>
                  <th className="p-5">العناصر</th>
                  <th className="p-5">الإجمالي</th>
                  <th className="p-5">الحالة</th>
                  <th className="p-5 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 text-sm font-bold text-gray-200">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5 font-mono text-xs text-emerald-400">#{order.id.slice(0, 8)}</td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-white font-black">{order.customerName}</span>
                        <span className="text-[10px] text-gray-500">{order.customerEmail || 'لا يوجد بريد'}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-400">{order.date}</td>
                    <td className="p-5"><span className="bg-gray-700 px-2 py-1 rounded text-xs">{order.itemsCount} منتجات</span></td>
                    <td className="p-5 text-lg font-black">{formatPrice(order.total)}</td>
                    <td className="p-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${getStatusColor(order.status)} text-xs font-black uppercase`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="relative group/actions inline-block">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-xs outline-none focus:border-emerald-500 cursor-pointer text-white appearance-none pr-8"
                        >
                          <option value="pending">معلق</option>
                          <option value="processing">تجهيز</option>
                          <option value="shipped">تم الشحن</option>
                          <option value="delivered">تم التسليم</option>
                        </select>
                        <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-500 flex flex-col items-center">
                      <Package size={48} className="mb-4 opacity-20" />
                      لا توجد طلبات مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700">
         <h2 className="text-xl font-black text-white">إدارة المخزون ({productsList.length})</h2>
         <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-500 transition-all active:scale-95 flex items-center gap-2">
           <span>+</span> إضافة منتج
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsList.map(product => (
            <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-3xl p-4 flex flex-col gap-4 group hover:border-emerald-500/50 transition-all">
               <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500" />
                 <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-bold">
                   {product.category}
                 </div>
               </div>
               <div className="flex-1">
                 <h3 className="font-black text-white text-sm line-clamp-1 mb-1">{product.name}</h3>
                 <p className="text-emerald-400 font-bold">{formatPrice(product.price)}</p>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <button className="bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-bold transition-colors">تعديل</button>
                 <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-bold transition-colors">حذف</button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
         <h2 className="text-xl font-black text-white mb-2">قاعدة بيانات العملاء</h2>
         <p className="text-gray-400 text-sm">إجمالي المسجلين: {usersList.length} عميل</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-xl">
          <table className="w-full text-right">
              <thead className="bg-black/30 text-gray-400 text-xs uppercase font-black">
                <tr>
                  <th className="p-5">العميل</th>
                  <th className="p-5">البريد الإلكتروني</th>
                  <th className="p-5">الدور</th>
                  <th className="p-5">تاريخ الانضمام</th>
                  <th className="p-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 text-sm font-bold text-gray-200">
                 {usersList.map((u, i) => (
                   <tr key={i} className="hover:bg-white/5">
                      <td className="p-5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-800 rounded-full overflow-hidden">
                           <img src={u.avatar_url || 'https://via.placeholder.com/40'} className="w-full h-full object-cover" alt="Avatar" />
                        </div>
                        <span className="font-bold">{u.full_name}</span>
                      </td>
                      <td className="p-5 text-gray-400 font-mono text-xs">{u.email}</td>
                      <td className="p-5"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs uppercase">{u.role || 'User'}</span></td>
                      <td className="p-5 text-xs text-gray-500">{new Date(u.updated_at || Date.now()).toLocaleDateString('ar-YE')}</td>
                      <td className="p-5 text-center">
                        <button className="text-gray-400 hover:text-white p-2"><MoreVertical size={16} /></button>
                      </td>
                   </tr>
                 ))}
              </tbody>
          </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white mb-6">إعدادات النظام</h2>
      
      <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 space-y-8">
         <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-white">وضع الصيانة</h3>
              <p className="text-gray-400 text-xs mt-1">إيقاف المتجر مؤقتاً للزوار</p>
            </div>
            <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
               <div className="absolute top-1 left-1 w-4 h-4 bg-gray-500 rounded-full transition-all"></div>
            </div>
         </div>

         <div className="border-t border-gray-700 pt-6 space-y-4">
            <h3 className="font-black text-white">بيانات التواصل</h3>
            <div className="space-y-3">
               <div>
                  <label className="text-xs text-gray-400 mb-1 block">رقم الواتساب</label>
                  <input type="text" value="967784400333" readOnly className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm" />
               </div>
               <div>
                  <label className="text-xs text-gray-400 mb-1 block">البريد الإلكتروني للإشعارات</label>
                  <input type="text" value={ALLOWED_EMAIL} readOnly className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm" />
               </div>
            </div>
         </div>

         <div className="border-t border-gray-700 pt-6">
            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-500 transition-all">
               حفظ التغييرات
            </button>
         </div>
      </div>
    </div>
  );

  // --- Lock Screen ---
  if (isLocked) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md text-center animate-slide-up">
          <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
            <Settings size={32} color="white" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">لوحة الإدارة المركزية</h2>
          <p className="text-gray-400 font-bold text-sm mb-8">نظام حيفان لإدارة الموارد والطلبات</p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="أدخل كود المرور..."
              className="w-full bg-gray-900 border border-gray-700 text-white px-5 py-4 rounded-xl outline-none focus:border-emerald-500 font-black tracking-widest text-center text-lg"
              autoFocus
            />
            {authError && <p className="text-red-500 text-xs font-bold">{authError}</p>}
            
            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-500 transition-all shadow-lg active:scale-95 text-lg"
            >
              دخول آمن
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('#/')}
              className="text-gray-500 text-xs font-bold hover:text-white transition-colors mt-4 block mx-auto"
            >
              العودة للمتجر
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Dashboard Layout ---
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans text-right flex flex-col md:flex-row overflow-hidden" dir="rtl">
      
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-gray-950 border-l border-gray-800 hidden md:flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <span className="font-black text-xl">H</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-white">لوحة حيفان</h1>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">نظام الإدارة v2.0</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
            { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: stats.pendingOrders },
            { id: 'products', label: 'المنتجات', icon: Package },
            { id: 'users', label: 'العملاء', icon: Users },
            { id: 'settings', label: 'الإعدادات', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold group ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-sm">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => onNavigate('#/')}
            className="w-full flex items-center gap-3 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl font-bold transition-colors"
          >
             <LogOut size={20} />
             <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-900 relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-gray-950 border-b border-gray-800 p-4 flex justify-between items-center z-30">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black">H</div>
             <span className="font-bold text-sm">لوحة الإدارة</span>
           </div>
           <button onClick={() => onNavigate('#/')} className="text-gray-400"><LogOut size={20} /></button>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
               <h1 className="text-2xl md:text-4xl font-black text-white capitalize">
                 {activeTab === 'overview' && 'نظرة عامة على المتجر'}
                 {activeTab === 'orders' && 'إدارة الطلبات'}
                 {activeTab === 'products' && 'المخزون والمنتجات'}
                 {activeTab === 'users' && 'قاعدة بيانات العملاء'}
                 {activeTab === 'settings' && 'الإعدادات العامة'}
               </h1>
               {activeTab === 'overview' && (
                 <button onClick={fetchDashboardData} disabled={loading} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-gray-700">
                   {loading ? 'جاري التحديث...' : 'تحديث البيانات'}
                 </button>
               )}
            </div>

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden bg-gray-950 border-t border-gray-800 pb-safe-area">
           <div className="flex justify-around p-2">
             {['overview', 'orders', 'products', 'users', 'settings'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as TabType)}
                 className={`p-3 rounded-xl transition-colors ${activeTab === tab ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}
               >
                 {tab === 'overview' && <LayoutDashboard size={20} />}
                 {tab === 'orders' && <ShoppingBag size={20} />}
                 {tab === 'products' && <Package size={20} />}
                 {tab === 'users' && <Users size={20} />}
                 {tab === 'settings' && <Settings size={20} />}
               </button>
             ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
