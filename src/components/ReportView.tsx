import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Order {
  id: number;
  items: MenuItem[];
  name: string;
  date: string;
  time: string;
  completed: boolean;
}

interface ReportViewProps {
  orders: Order[];
  completeOrder: (orderId: number) => Promise<void>;
}

const ReportView: React.FC<ReportViewProps> = ({ orders, completeOrder }) => {
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