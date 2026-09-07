import { supabase } from '@/lib/supabase';
import { CartItem } from '@/components/ui/cart';
import { Database } from '../database.types';

type Order = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Insert'];
type Payment = Database['public']['Tables']['payments']['Insert'];

interface CreateOrderParams {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
}

interface CreatePaymentParams {
  orderId: string;
  amount: number;
  paymentIntentId: string;
  paymentMethod: string;
}

export async function createOrder({
  userId,
  items,
  totalAmount,
  shippingAddress,
  contactEmail,
  contactPhone,
  contactName,
}: CreateOrderParams) {
  const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  
  if (isPlaceholder) {
    const mockOrder = {
      id: 'order-' + Date.now(),
      user_id: userId,
      status: 'pending',
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      contact_name: contactName,
      created_at: new Date().toISOString(),
      order_items: items.map(item => ({
        id: 'item-' + Math.random(),
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        name: item.name,
      })),
      payments: []
    };

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('agrobyte_orders') || '[]');
      localStorage.setItem('agrobyte_orders', JSON.stringify([mockOrder, ...existing]));
    }
    return mockOrder as any;
  }

  try {
    // Start a Supabase transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        contact_name: contactName,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems: OrderItem[] = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      seller_id: item.sellerId,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function createPayment({
  orderId,
  amount,
  paymentIntentId,
  paymentMethod,
}: CreatePaymentParams) {
  const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  if (isPlaceholder) {
    return {
      id: 'pay-' + Date.now(),
      order_id: orderId,
      amount,
      status: 'pending',
      payment_intent_id: paymentIntentId,
      payment_method: paymentMethod,
    } as any;
  }

  try {
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        amount,
        status: 'pending',
        payment_intent_id: paymentIntentId,
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (error) throw error;
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    return { id: 'mock-pay', order_id: orderId, amount, status: 'pending' } as any;
  }
}

export async function updatePaymentStatus(paymentIntentId: string, status: 'succeeded' | 'failed') {
  const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  if (isPlaceholder) {
    return { status } as any;
  }

  try {
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .update({ status })
      .eq('payment_intent_id', paymentIntentId)
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Update order status based on payment status
    const orderStatus = status === 'succeeded' ? 'processing' : 'cancelled';
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: orderStatus })
      .eq('id', payment.order_id);

    if (orderError) throw orderError;

    return payment;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return null;
  }
}

// Fetch all orders for a user, including order items and payment status
export async function getOrdersByUser(userId: string) {
  try {
    const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (isPlaceholder) {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('agrobyte_orders');
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch {
            return [];
          }
        }
      }
      return [];
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*),
        payments(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return orders || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
} 