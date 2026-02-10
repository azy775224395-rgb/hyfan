
import { Product, Order } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'hyfan_products_db';
const ORDERS_KEY = 'hyfan_orders_db';

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
    // Trigger event for App re-render if needed (basic implementation)
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
  }
};
