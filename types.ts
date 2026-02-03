
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  specs?: string[];
  fullDescription?: string;
  status?: 'الأكثر مبيعاً' | 'جديد' | 'متوفر' | 'خصم';
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
  name: string;
  rating: number;
  comment: string;
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
  status: 'قيد التنفيذ' | 'تم التوصيل' | 'في الشحن';
  itemsCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'discord' | null;
  orders?: Order[];
}
