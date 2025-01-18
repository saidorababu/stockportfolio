import StockPrice from '../common/StockPrice';
import React from 'react';


export default function StockInfo({ stock, price }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{stock.name}</h1>
          <p className="text-gray-500">{stock.symbol}</p>
        </div>
        <div className="text-right">
          <StockPrice price={price} />
          <div className="mt-1">
            <StockPrice 
              price={stock.change}
              isChange={true}
              percentage={stock.percent_change}
            />
          </div>
        </div>
      </div>
      {/* <p className="mt-4 text-gray-600">{stock.description}</p> */}
    </div>
  );
}