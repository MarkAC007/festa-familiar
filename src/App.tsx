import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, ClipboardList, BarChart } from 'lucide-react';
import MenuList from './components/MenuList';
import OrderForm from './components/OrderForm';
import AdminPanel from './components/AdminPanel';
import ReportView from './components/ReportView';
import { initSupabase } from './initSupabase';
import { MenuItem } from './db/operations';

// Import SVG flags as React components
import { ReactComponent as ScotlandFlag } from './assets/gb-sct.svg';
import { ReactComponent as PortugalFlag } from './assets/pt.svg';
import { ReactComponent as SouthAfricaFlag } from './assets/za.svg';

function App() {
  const [view, setView] = useState<'customer' | 'admin' | 'report'>('customer');
  const [background, setBackground] = useState('default');
  const [dbState, setDbState] = useState({
    isConnected: false,
    menuItemsTableStatus: 'unknown',
    ordersTableStatus: 'unknown',
    lastChecked: new Date(),
  });
  const [currentOrder, setCurrentOrder] = useState<MenuItem[]>([]);

  useEffect(() => {
    const checkDatabase = async () => {
      const state = await initSupabase();
      setDbState(state);
    };
    checkDatabase();
  }, []);

  const backgrounds = {
    default: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80',
    scotland: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=1920&q=80',
    portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1920&q=80',
    southAfrica: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80'
  };

  const removeFromOrder = (index: number) => {
    const newOrder = [...currentOrder];
    newOrder.splice(index, 1);
    setCurrentOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-gray-100 nature-bg" style={{
      backgroundImage: `url(${backgrounds[background as keyof typeof backgrounds]})`,
      transition: 'background-image 0.5s ease-in-out'
    }}>
      <header className="bg-gradient-to-r from-scotland-bg via-portugal-bg to-south-africa-bg text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Menu className="mr-2 float" /> A Grande Festa Familiar
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              className="hover:scale-110 transition-transform duration-200 focus:outline-none" 
              onClick={() => setBackground('scotland')}
              title="Scotland"
            >
              <scotlandFlag className="w-8 h-8" />
            </button>
            <button 
              className="hover:scale-110 transition-transform duration-200 focus:outline-none" 
              onClick={() => setBackground('portugal')}
              title="Portugal"
            >
              <portugalFlag className="w-8 h-8" />
            </button>
            <button 
              className="hover:scale-110 transition-transform duration-200 focus:outline-none" 
              onClick={() => setBackground('southAfrica')}
              title="South Africa"
            >
              <southAfricaFlag className="w-8 h-8" />
            </button>
          </div>
          <nav className="space-x-2">
            <button
              onClick={() => setView('customer')}
              className={`btn-icon ${view === 'customer' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              title="Order"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button
              onClick={() => setView('admin')}
              className={`btn-icon ${view === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              title="Admin"
            >
              <ClipboardList className="w-6 h-6" />
            </button>
            <button
              onClick={() => setView('report')}
              className={`btn-icon ${view === 'report' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              title="Reports"
            >
              <BarChart className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        {view === 'customer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="section-title">
                <ShoppingCart className="mr-2 float" /> Menu
              </h2>
              <MenuList
                addToOrder={(item) => setCurrentOrder([...currentOrder, item])}
                currentOrder={currentOrder}
              />
            </div>
            <div className="card">
              <h2 className="section-title">
                <ClipboardList className="mr-2 float" /> Your Order
              </h2>
              <OrderForm
                selectedItems={currentOrder}
                onOrderPlaced={() => setCurrentOrder([])}
                removeFromOrder={removeFromOrder}
              />
            </div>
          </div>
        )}
        {view === 'admin' && (
          <div className="card">
            <AdminPanel />
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Database Status</h3>
              <p>Connection: {dbState.isConnected ? 'Connected' : 'Disconnected'}</p>
              <p>Menu Items Table: {dbState.menuItemsTableStatus}</p>
              <p>Orders Table: {dbState.ordersTableStatus}</p>
              <p>Last Checked: {dbState.lastChecked.toLocaleString()}</p>
            </div>
          </div>
        )}
        {view === 'report' && (
          <div className="card">
            <ReportView orders={[]} completeOrder={() => Promise.resolve()} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;