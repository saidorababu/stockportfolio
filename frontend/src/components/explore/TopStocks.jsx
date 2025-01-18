import { Link } from 'react-router-dom';
import React from 'react';
import StockPrice from '../common/StockPrice';

export default function TopStocks({ stocks }) {
  if (!Array.isArray(stocks)) {
    return <div>No stocks available</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performers</h2>
        <div className="space-y-4">
          {stocks.map((stock) => (
            <div 
              key={stock.symbol}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
            >
              <div>
                <Link 
                  to={`/stock/${stock.symbol}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                >
                  {stock.symbol}
                </Link>
                <p className="text-sm text-gray-500">{stock.name}</p>
              </div>
              <div className="text-right">
                <StockPrice price={stock.price} />
                <StockPrice 
                  price={stock.change}
                  isChange={true}
                  percentage={stock.changePercent}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}