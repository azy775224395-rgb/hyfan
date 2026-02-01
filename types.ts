
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
