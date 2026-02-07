
import React, { useEffect, useState } from 'react';
import { UserProfile, Order } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AdminDashboardProps {
  user: UserProfile | null;
  onNavigate: (hash: string) => void;
}

interface DashboardStats {
  revenue: number;
  totalOrders: number;
  activeUsers: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats>({ revenue: 0, totalOrders: 0, activeUsers: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'users'>('overview');

  // Step 2: Security Guard - Check role on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!user) {
        onNavigate('#/');
        return;
      }
      
      // Double check against DB for security
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (data?.role !== 'admin') {
        alert("عذراً، ليس لديك صلاحية الوصول لهذه الصفحة.");
        onNavigate('#/');
      } else {
        fetchDashboardData();
      }
    };
    
    verifyAdmin();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`*, profiles(full_name, email)`)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // 2. Fetch Users Count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Process Orders Data
      const formattedOrders: Order[] = (ordersData || []).map((o: any) => ({
        id: o.id,
        date: new Date(o.created_at).toLocaleDateString('ar-YE'),
        total: o.total_amount,
        status: o.status,
        itemsCount: o.items_count,
        customerName: o.profiles?.full_name || 'غير معروف',
        customerEmail: o.profiles?.email
      }));

      // Calculate Revenue
      const totalRevenue = formattedOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

      setStats({
        revenue: totalRevenue,
        totalOrders: formattedOrders.length,
        activeUsers: userCount || 0
      });

      setOrders(formattedOrders);

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

      // Optimistic UI Update
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (error) {
      alert("فشل تحديث الحالة، يرجى المحاولة مرة أخرى.");
      console.error(error);
    }
  };

  const formatPrice = (p: number) => `${p.toLocaleString()} ر.س`;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans text-right" dir="rtl">
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-emerald-950/50 backdrop-blur-xl border-l border-white/10 hidden md:flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-black text-emerald-400">لوحة التحكم</h1>
            <p className="text-xs text-gray-400 mt-1">نظام إدارة حيفان</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold ${activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <span>📊</span> نظرة عامة
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold ${activeTab === 'orders' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <span>📦</span> الطلبات
            </button>
            <div className="border-t border-white/10 my-4 pt-4">
              <button onClick={() => onNavigate('#/')} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold">
                 <span>🚪</span> خروج للمتجر
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-emerald-950 p-4 md:p-8">
          {/* Header Mobile */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-xl font-black">لوحة الإدارة</h1>
            <button onClick={() => onNavigate('#/')} className="text-sm bg-white/10 px-3 py-1 rounded-lg">خروج</button>
          </div>

          {loading ? (
             <div className="flex items-center justify-center h-full">
               <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-gray-400 text-sm font-bold mb-1">إجمالي الإيرادات</p>
                      <h3 className="text-3xl font-black text-white">{formatPrice(stats.revenue)}</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-2xl">💰</div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-gray-400 text-sm font-bold mb-1">الطلبات الكلية</p>
                      <h3 className="text-3xl font-black text-white">{stats.totalOrders}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">📦</div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-gray-400 text-sm font-bold mb-1">المستخدمين النشطين</p>
                      <h3 className="text-3xl font-black text-white">{stats.activeUsers}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl">👥</div>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-xl font-black">إدارة الطلبات الأخيرة</h3>
                  <button onClick={fetchDashboardData} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all">تحديث</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-black/20 text-gray-400 text-xs uppercase font-black">
                      <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">العميل</th>
                        <th className="p-4">التاريخ</th>
                        <th className="p-4">المبلغ</th>
                        <th className="p-4">الحالة</th>
                        <th className="p-4">تحديث الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm font-bold text-gray-300">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono text-xs opacity-50">{order.id.split('-')[0]}...</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="text-white">{order.customerName}</span>
                              <span className="text-[10px] text-gray-500">{order.customerEmail}</span>
                            </div>
                          </td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4 text-emerald-400 font-black">{formatPrice(order.total)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                              order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                              order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                              order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="bg-gray-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">لا توجد طلبات جديدة</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
