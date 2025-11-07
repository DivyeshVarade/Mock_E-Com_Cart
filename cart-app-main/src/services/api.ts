// Mock API service simulating REST endpoints
// In a real app, these would make actual HTTP calls to a backend

import { Product } from '@/types/product';
import { CartItem, CheckoutFormData, Order } from '@/types/product';
import { mockProducts } from '@/data/products';

const CART_KEY = 'vibe-cart';
const ORDERS_KEY = 'vibe-orders';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// GET /api/products - Fetch all products
export async function getProducts(): Promise<Product[]> {
  await delay();
  return mockProducts;
}

// GET /api/cart - Fetch cart items
export async function getCart(): Promise<CartItem[]> {
  await delay();
  const saved = localStorage.getItem(CART_KEY);
  return saved ? JSON.parse(saved) : [];
}

// POST /api/cart - Add item to cart
export async function addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
  await delay();
  const cart = await getCart();
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    throw new Error('Product not found');
  }

  const existing = cart.find(item => item.id === productId);
  let updatedCart: CartItem[];

  if (existing) {
    updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    updatedCart = [...cart, { ...product, quantity }];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
}

// PUT /api/cart/:id - Update cart item quantity
export async function updateCartItem(productId: string, quantity: number): Promise<CartItem[]> {
  await delay();
  const cart = await getCart();
  
  const updatedCart = cart.map(item =>
    item.id === productId ? { ...item, quantity } : item
  );

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
}

// PATCH /api/cart/:id - Partially update cart item
export async function patchCartItem(productId: string, updates: Partial<CartItem>): Promise<CartItem[]> {
  await delay();
  const cart = await getCart();
  
  const updatedCart = cart.map(item =>
    item.id === productId ? { ...item, ...updates } : item
  );

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
}

// DELETE /api/cart/:id - Remove item from cart
export async function deleteCartItem(productId: string): Promise<CartItem[]> {
  await delay();
  const cart = await getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
}

// DELETE /api/cart - Clear entire cart
export async function clearCart(): Promise<void> {
  await delay();
  localStorage.removeItem(CART_KEY);
}

// POST /api/checkout - Process checkout
export async function checkout(formData: CheckoutFormData, cartItems: CartItem[]): Promise<Order> {
  await delay();
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const order: Order = {
    id: `ORD-${Date.now()}`,
    items: [...cartItems],
    total,
    customerName: formData.name,
    customerEmail: formData.email,
    timestamp: new Date().toISOString(),
  };

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Clear cart after successful checkout
  await clearCart();

  return order;
}

// GET /api/orders - Fetch all orders (bonus feature)
export async function getOrders(): Promise<Order[]> {
  await delay();
  const saved = localStorage.getItem(ORDERS_KEY);
  return saved ? JSON.parse(saved) : [];
}

// GET /api/orders/:id - Fetch single order
export async function getOrder(orderId: string): Promise<Order | null> {
  await delay();
  const orders = await getOrders();
  return orders.find(order => order.id === orderId) || null;
}
