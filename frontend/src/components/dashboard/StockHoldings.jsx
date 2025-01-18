import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteHolding } from '../../services/portfolioService';
import React from 'react';
import toast from 'react-hot-toast';
import { sellStock } from '../../services/stockService';
import { useAuth } from '../../context/AuthContext';

export default function StockHoldings({ holdings, onUpdate }) {
  const { user } = useAuth();

  const handleDelete = async (data) => {
    try {
      await sellStock(data);
      toast.success('Stock removed successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to remove stock');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Your Holdings</h3>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {holdings.map((holding) => {
                  const currentValue = holding.quantity * holding.stock.currentPrice; // Current value
                  const returnPercentage = (
                    ((holding.stock.currentPrice - holding.averagePrice) /
                      holding.averagePrice) *
                    100
                  ).toFixed(2); // Calculate return percentage

                  return (
                    <tr key={holding.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {holding.stock.ticker}
                            </div>
                            <div className="text-sm text-gray-500">
                              {holding.stock.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${holding.averagePrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${currentValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm ${
                            returnPercentage >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {returnPercentage > 0 ? '+' : ''}
                          {returnPercentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete({symbol: holding.stock.ticker, quantity: holding.quantity, price: holding.averagePrice, jwtToken: user.token})}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
