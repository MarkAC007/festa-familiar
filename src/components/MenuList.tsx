import React from 'react';
import { PlusCircle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  visible: boolean;
}

interface MenuListProps {
  menuItems: MenuItem[];
  addToOrder: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, addToOrder }) => {
  const visibleMenuItems = menuItems.filter(item => item.visible);

  return (
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
  );
};

export default MenuList;