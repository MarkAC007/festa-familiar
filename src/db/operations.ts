import { supabase } from '../supabaseClient';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  visible: boolean;
}

export interface Order {
  id: string;
  items: MenuItem[];
  name: string;
  date: string;
  time: string;
  completed: boolean;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  
  return data || [];
}

export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .single();
  
  if (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
  
  return data;
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
  const { data, error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
  
  return data;
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
  
  return true;
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data || [];
}

export async function addOrder(order: Omit<Order, 'id'>): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .single();
  
  if (error) {
    console.error('Error adding order:', error);
    return null;
  }
  
  return data;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error updating order:', error);
    return null;
  }
  
  return data;
}
