import React from 'react';
import { CheckCircle, Calendar, Clock, FileText } from 'lucide-react';

interface OrderAcceptanceProps {
  onClose: () => void;
  orderDetails: {
    name: string;
    date: string;
    time: string;
    notes: string;
  };
}

const OrderAcceptance: React.FC<OrderAcceptanceProps> = ({ onClose, orderDetails }) => {
  console.log('OrderAcceptance rendered', orderDetails);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Order Accepted!</h2>
        <p className="mb-4 text-gray-600">Thank you for your order, {orderDetails.name}.</p>
        <div className="flex justify-center items-center mb-4">
          <Calendar className="text-blue-500 mr-2" />
          <p className="text-gray-600">{orderDetails.date}</p>
        </div>
        <div className="flex justify-center items-center mb-4">
          <Clock className="text-blue-500 mr-2" />
          <p className="text-gray-600">{orderDetails.time}</p>
        </div>
        {orderDetails.notes && (
          <div className="flex items-start mb-6">
            <FileText className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
            <p className="text-gray-600 text-left">{orderDetails.notes}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderAcceptance;