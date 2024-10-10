import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { Order, getOrders, updateOrder } from '../db/operations';

const ReportView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log('Orders updated:', orders);
  }, [orders]);

  const fetchOrders = async () => {
    console.log('Fetching orders');
    const fetchedOrders = await getOrders();
    console.log('Fetched orders:', fetchedOrders);
    setOrders(fetchedOrders);
  };

  const completeOrder = async (orderId: string) => {
    console.log('Marking order as complete:', orderId);
    const updatedOrder = await updateOrder(orderId, { completed: true });
    console.log('Updated order:', updatedOrder);
    
    // Refresh orders regardless of the updateOrder result
    await fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-blue-600">
        <CheckCircle className="mr-2" /> Orders Report
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              {order.completed ? (
                <span className="text-green-600 font-semibold flex items-center">
                  <CheckCircle className="mr-1" size={20} /> Completed
                </span>
              ) : (
                <span className="text-orange-500 font-semibold flex items-center">
                  <XCircle className="mr-1" size={20} /> Pending
                </span>
              )}
            </div>
            <p className="text-gray-600">Name: {order.name}</p>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Time: {order.time}</p>
            {order.notes && (
              <div className="mt-2">
                <h4 className="font-semibold flex items-center">
                  <FileText className="mr-1" size={16} /> Notes:
                </h4>
                <p className="text-gray-600 ml-5">{order.notes}</p>
              </div>
            )}
            <h4 className="font-semibold mt-4 mb-2">Items:</h4>
            <ul className="list-disc list-inside space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="text-gray-700">{item.name}</li>
              ))}
            </ul>
            {!order.completed && (
              <button
                onClick={() => completeOrder(order.id)}
                className="mt-4 btn-icon btn-primary"
                title="Mark as Completed"
              >
                <CheckCircle className="w-6 h-6" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportView;