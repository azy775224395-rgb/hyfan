
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
  user_id?: string;
  product_id?: string;
  name: string; // Display name from joined Profile
  avatar_url?: string; // Avatar from joined Profile
  rating: number;
  comment: string;
  image_url?: string; // New field for review image
  created_at?: string;
  date: string; // Computed for display
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  itemsCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'discord' | 'email' | null;
  orders?: Order[];
}
