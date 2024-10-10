import { supabase } from './supabaseClient';

export async function initSupabase() {
  const state = {
    isConnected: false,
    menuItemsTableStatus: 'unknown',
    ordersTableStatus: 'unknown',
    lastChecked: new Date(),
  };

  try {
    console.log('Starting Supabase initialization...');

    // Step 1: Check database connection
    console.log('Checking Supabase connection...');
    const { data: connectionTest, error: connectionError } = await supabase.from('menu_items').select('id').limit(1);
    if (connectionError) {
      console.error('Supabase connection error:', connectionError);
      return state;
    }
    state.isConnected = true;
    console.log('Supabase connection successful');

    // Step 2: Verify menu_items table structure
    console.log('Verifying menu_items table structure...');
    const { data: menuColumns, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .limit(0);
    
    if (menuError) {
      console.error('Error verifying menu_items table:', menuError);
      state.menuItemsTableStatus = 'error';
    } else {
      const expectedMenuColumns = ['id', 'created_at', 'name', 'description', 'image'];
      const actualMenuColumns = Object.keys(menuColumns || {});
      const missingMenuColumns = expectedMenuColumns.filter(col => !actualMenuColumns.includes(col));

      if (missingMenuColumns.length > 0) {
        console.error(`menu_items table is missing columns: ${missingMenuColumns.join(', ')}`);
        state.menuItemsTableStatus = 'error';
      } else {
        state.menuItemsTableStatus = 'ok';
      }
    }

    // Step 3: Check if orders table exists and verify its structure
    console.log('Checking orders table...');
    const { data: orderColumns, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .limit(0);
    
    if (orderError) {
      if (orderError.code === 'PGRST116') {
        console.log('orders table does not exist yet');
        state.ordersTableStatus = 'error';
      } else {
        console.error('Error verifying orders table:', orderError);
        state.ordersTableStatus = 'error';
      }
    } else {
      const expectedOrderColumns = ['id', 'created_at', 'items', 'name', 'date', 'time', 'completed'];
      const actualOrderColumns = Object.keys(orderColumns || {});
      const missingOrderColumns = expectedOrderColumns.filter(col => !actualOrderColumns.includes(col));

      if (missingOrderColumns.length > 0) {
        console.error(`orders table is missing columns: ${missingOrderColumns.join(', ')}`);
        state.ordersTableStatus = 'error';
      } else {
        state.ordersTableStatus = 'ok';
      }
    }

    console.log('Supabase initialization and verification complete');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }

  return state;
}