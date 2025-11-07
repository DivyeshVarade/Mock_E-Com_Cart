export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  timestamp: string;
}
