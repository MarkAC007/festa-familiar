import React, { useState } from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { addOrder, MenuItem } from '../db/operations';

interface OrderFormProps {
  selectedItems: MenuItem[];
  onOrderPlaced: () => void;
  removeFromOrder: (index: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ selectedItems, onOrderPlaced, removeFromOrder }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showOrderAcceptance, setShowOrderAcceptance] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: '', date: '', time: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      items: selectedItems,
      name,
      date,
      time,
      completed: false,
    };
    const addedOrder = await addOrder(order);
    if (addedOrder) {
      console.log('Order submitted:', addedOrder);
      setOrderDetails({ name, date, time });
      setName('');
      setDate('');
      setTime('');
      setShowOrderAcceptance(true);
      onOrderPlaced();
    }
  };

  const handleCloseOrderAcceptance = () => {
    setShowOrderAcceptance(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Order</h2>
      {selectedItems.length === 0 ? (
        <p className="text-gray-500 mb-6">Your order is empty</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {selectedItems.map((item, index) => (
            <li key={`${item.id}-${index}`} className="flex items-center justify-between bg-white p-2 rounded-lg shadow">
              <span>{item.name}</span>
              <button
                onClick={() => removeFromOrder(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="input"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
          title="Place Order"
          disabled={selectedItems.length === 0}
        >
          <ShoppingBag className="w-6 h-6 mr-2" />
          Place Order
        </button>
      </form>
      {showOrderAcceptance && (
        <OrderAcceptance
          onClose={handleCloseOrderAcceptance}
          orderDetails={orderDetails}
        />
      )}
    </div>
  );
};

export default OrderForm;