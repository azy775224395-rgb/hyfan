
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // Added for Admin Edit
  description: string;
  image: string;
  category: string;
  specs?: string[];
  fullDescription?: string;
  longDescription?: string;
  status?: 'الأكثر مبيعاً' | 'جديد' | 'متوفر' | 'خصم' | 'مقاوم للكسر';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Review {
  id: number;
  user_id?: string;
  product_id?: string;
  name: string;
  avatar_url?: string;
  rating: number;
  comment: string;
  image_url?: string;
  created_at?: string;
  date: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemsCount: number;
  items?: CartItem[]; // Added to track specific items bought
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string; // Added for Buyer Info
  shippingInfo?: ShippingInfo; // Added for Buyer Info
  paymentMethod?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'discord' | 'email' | null;
  role?: 'admin' | 'customer';
  orders?: Order[];
}
