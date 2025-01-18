import { Link } from 'react-router-dom';
import React from 'react';
import StockPrice from '../common/StockPrice';

export default function StockList({ stocks }) {
  if (!Array.isArray(stocks)) {
    return <div>No stocks available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Stocks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3"></th> {/* Empty header for icons */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/stock/${stock.symbol}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                      <img
                        src={stock.icon}
                        alt={`${stock.name} logo`}
                        className="h-6 w-6"
                      />
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/stock/${stock.symbol}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                        {stock.symbol}
                        </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/stock/${stock.symbol}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                      {stock.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StockPrice price={stock.price} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StockPrice
                        price={stock.change}
                        isChange={true}
                        percentage={stock.percent_change}
                      />
                    </td>
                    
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
