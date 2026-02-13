
import { Product, Order, UserSession } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'hyfan_products_db';
const ORDERS_KEY = 'hyfan_orders_db';
const SETTINGS_KEY = 'hyfan_store_settings';
const SESSIONS_KEY = 'hyfan_active_sessions';
const BANNED_IPS_KEY = 'hyfan_banned_ips';

export const LocalDataService = {
  // --- Products ---
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      // Initialize with constants if empty
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProduct: (product: Product) => {
    const products = LocalDataService.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.unshift(product);
    }
    
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('products-updated'));
    return products;
  },

  deleteProduct: (id: string) => {
    const products = LocalDataService.getProducts();
    const newProducts = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
    window.dispatchEvent(new Event('products-updated'));
    return newProducts;
  },

  // --- Orders ---
  getOrders: (): Order[] => {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addOrder: (order: Order) => {
    const orders = LocalDataService.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders;
  },

  updateOrderStatus: (id: string, status: Order['status']) => {
    const orders = LocalDataService.getOrders();
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    return updatedOrders;
  },

  // --- Settings ---
  getStoreSettings: () => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {
      storeName: 'حيفان للطاقة المتجددة',
      supportPhone: '967784400333',
      currency: 'SAR',
      maintenanceMode: false,
      allowOrders: true
    };
  },

  saveStoreSettings: (settings: any) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  },

  // --- Session & Security Tracking ---
  
  // Call this from App.tsx periodically to verify "Online" status
  updateSessionHeartbeat: (ip: string, email?: string, name?: string) => {
    const stored = localStorage.getItem(SESSIONS_KEY);
    let sessions: UserSession[] = stored ? JSON.parse(stored) : [];
    
    // Remove duplicates/old entries for this IP
    sessions = sessions.filter(s => s.ip !== ip);
    
    // Add updated session
    sessions.unshift({
      ip,
      email: email || 'زائر',
      name: name || 'غير مسجل',
      lastSeen: Date.now(),
      device: navigator.userAgent
    });

    // Clean up very old sessions (> 24 hours) to save space
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    sessions = sessions.filter(s => s.lastSeen > oneDayAgo);

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    return sessions;
  },

  getSessions: (): UserSession[] => {
    const stored = localStorage.getItem(SESSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // --- IP Banning ---
  
  getBannedIPs: (): string[] => {
    const stored = localStorage.getItem(BANNED_IPS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  banIP: (ip: string) => {
    const list = LocalDataService.getBannedIPs();
    if (!list.includes(ip)) {
      list.push(ip);
      localStorage.setItem(BANNED_IPS_KEY, JSON.stringify(list));
    }
    return list;
  },

  unbanIP: (ip: string) => {
    const list = LocalDataService.getBannedIPs();
    const newList = list.filter(i => i !== ip);
    localStorage.setItem(BANNED_IPS_KEY, JSON.stringify(newList));
    return newList;
  },

  isBanned: (ip: string): boolean => {
    const list = LocalDataService.getBannedIPs();
    return list.includes(ip);
  }
};
