import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderAcceptanceProps {
  onClose: () => void;
}

const OrderAcceptance: React.FC<OrderAcceptanceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Order Accepted!</h2>
        <p className="mb-6 text-gray-600">Thank you for your order. It will be ready at the specified time.</p>
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