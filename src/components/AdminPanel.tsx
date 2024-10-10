import React, { useState } from 'react';
import { PlusCircle, Edit, Trash, Eye, EyeOff } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  visible: boolean;
}

const AdminPanel: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    image: '',
    visible: true,
  });

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newMenuItem: MenuItem = {
      ...newItem,
      id: menuItems.length + 1,
    };
    setMenuItems([...menuItems, newMenuItem]);
    setNewItem({
      name: '',
      description: '',
      image: '',
      visible: true,
    });
  };

  const toggleVisibility = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="section-title">
          <PlusCircle className="mr-2" /> Add Menu Item
        </h2>
        <form onSubmit={handleAddMenuItem} className="space-y-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            required
            className="input"
          />
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Item description"
            required
            className="input"
          />
          <input
            type="url"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            placeholder="Image URL"
            required
            className="input"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newItem.visible}
              onChange={(e) => setNewItem({ ...newItem, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Visible to users</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary flex items-center"
            title="Add Item"
          >
            <PlusCircle className="w-6 h-6 mr-2" /> Add Item
          </button>
        </form>
      </div>
      <div className="card">
        <h2 className="section-title">Menu Items</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item-card">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    className="btn-icon mr-2" 
                    onClick={() => toggleVisibility(item.id)}
                    title={item.visible ? "Hide from users" : "Show to users"}
                  >
                    {item.visible ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-red-500" />}
                  </button>
                  <button className="btn-icon btn-secondary mr-2" title="Edit">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="btn-icon btn-danger" title="Delete">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;