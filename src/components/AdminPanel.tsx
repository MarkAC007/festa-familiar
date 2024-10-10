import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash, Eye, EyeOff, X } from 'lucide-react';
import { MenuItem, getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../db/operations';

const AdminPanel: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    image: '',
    visible: true,
  });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    console.log('Menu items updated:', menuItems);
  }, [menuItems]);

  const fetchMenuItems = async () => {
    const items = await getMenuItems();
    console.log('Fetched menu items:', items);
    setMenuItems(items);
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new item:', newItem);
    const addedItem = await addMenuItem(newItem);
    console.log('Added item:', addedItem);
    
    // Proceed even if addedItem is null
    console.log('Fetching updated menu items');
    await fetchMenuItems();
    console.log('Setting new item state');
    setNewItem({
      name: '',
      description: '',
      image: '',
      visible: true,
    });
    console.log('New item state set');
  };

  const handleEditMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      console.log('Updating item:', editingItem);
      const updatedItem = await updateMenuItem(editingItem.id, editingItem);
      console.log('Updated item:', updatedItem);
      
      // Proceed even if updatedItem is null
      console.log('Fetching updated menu items');
      await fetchMenuItems();
      console.log('Resetting editing state');
      setEditingItem(null);
    }
  };

  const toggleVisibility = async (id: string) => {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      const updatedItem = await updateMenuItem(id, { visible: !item.visible });
      if (updatedItem) {
        await fetchMenuItems();
      }
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      const success = await deleteMenuItem(id);
      if (success) {
        await fetchMenuItems();
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="section-title">
          {editingItem ? (
            <>
              <Edit className="mr-2" /> Edit Menu Item
            </>
          ) : (
            <>
              <PlusCircle className="mr-2" /> Add Menu Item
            </>
          )}
        </h2>
        <form onSubmit={editingItem ? handleEditMenuItem : handleAddMenuItem} className="space-y-4">
          <input
            type="text"
            value={editingItem ? editingItem.name : newItem.name}
            onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            required
            className="input"
          />
          <textarea
            value={editingItem ? editingItem.description : newItem.description}
            onChange={(e) => editingItem ? setEditingItem({...editingItem, description: e.target.value}) : setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Item description"
            required
            className="input"
          />
          <input
            type="url"
            value={editingItem ? editingItem.image : newItem.image}
            onChange={(e) => editingItem ? setEditingItem({...editingItem, image: e.target.value}) : setNewItem({ ...newItem, image: e.target.value })}
            placeholder="Image URL"
            required
            className="input"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editingItem ? editingItem.visible : newItem.visible}
              onChange={(e) => editingItem ? setEditingItem({...editingItem, visible: e.target.checked}) : setNewItem({ ...newItem, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Visible to users</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary flex items-center"
            title={editingItem ? "Save Changes" : "Add Item"}
          >
            {editingItem ? (
              <>
                <Edit className="w-6 h-6 mr-2" /> Save Changes
              </>
            ) : (
              <>
                <PlusCircle className="w-6 h-6 mr-2" /> Add Item
              </>
            )}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="btn btn-secondary flex items-center mt-2"
              title="Cancel Edit"
            >
              <X className="w-6 h-6 mr-2" /> Cancel Edit
            </button>
          )}
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
                  <button 
                    className="btn-icon btn-secondary mr-2" 
                    title="Edit"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    className="btn-icon btn-danger" 
                    title="Delete"
                    onClick={() => handleDeleteMenuItem(item.id)}
                  >
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