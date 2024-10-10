import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuItem, getMenuItems } from '../db/operations';

interface MenuListProps {
  addToOrder: (item: MenuItem) => void;
  currentOrder: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ addToOrder, currentOrder }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const items = await getMenuItems();
    setMenuItems(items);
  };

  const visibleMenuItems = menuItems.filter(item => item.visible);

  return (
    <div>
      <ul className="space-y-6">
        {visibleMenuItems.map((item) => (
          <li key={item.id} className="menu-item-card">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4 shadow-md" />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-blue-600">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => addToOrder(item)}
                className="btn-icon btn-primary"
                aria-label="Add to order"
                title="Add to order"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;