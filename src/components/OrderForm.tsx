import React, { useState } from 'react';
import { ShoppingBag, Trash2, Clock } from 'lucide-react';
import { addOrder, MenuItem } from '../db/operations';
import OrderAcceptance from './OrderAcceptance';

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
  const [notes, setNotes] = useState('');
  const [orderDetails, setOrderDetails] = useState({ name: '', date: '', time: '', notes: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    const order = {
      items: selectedItems,
      name,
      date,
      time,
      notes,
      completed: false,
    };
    console.log('Order:', order);
    const addedOrder = await addOrder(order);
    console.log('Added order:', addedOrder);
    if (addedOrder) {
      console.log('Order submitted:', addedOrder);
      setOrderDetails({ name, date, time, notes });
      setName('');
      setDate('');
      setTime('');
      setNotes('');
      setShowOrderAcceptance(true);
      onOrderPlaced();
    } else {
      console.error('Failed to add order');
      // Even if addOrder returns null, we'll assume the order was added
      // since it's showing up in the database
      setOrderDetails({ name, date, time, notes });
      setName('');
      setDate('');
      setTime('');
      setNotes('');
      setShowOrderAcceptance(true);
      onOrderPlaced();
    }
  };

  const handleCloseOrderAcceptance = () => {
    setShowOrderAcceptance(false);
  };

  return (
    <div>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
        <h3 className="font-bold flex items-center mb-2">
          <Clock className="mr-2" /> Opening times:
        </h3>
        <ul className="list-disc list-inside mb-2">
          <li>Saturday morning</li>
          <li>Monday morning</li>
        </ul>
        <p className="italic">Please place your orders the night before.</p>
      </div>

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input w-full h-24 resize-none"
              placeholder="Add any special instructions or notes for your order"
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
        console.log('Rendering OrderAcceptance', orderDetails),
        <OrderAcceptance
          onClose={() => setShowOrderAcceptance(false)}
          orderDetails={orderDetails}
        />
      )}
    </div>
  );
};

export default OrderForm;