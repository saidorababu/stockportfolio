import React from 'react';

export default function StockPrice({ price, isChange = false, percentage }) {
  const isPositive = price > 0;
  const textColor = isChange
    ? isPositive ? 'text-green-600' : 'text-red-600'
    : 'text-gray-900';

  return (
    <span className={`text-sm font-medium ${textColor}`}>
      {price != null && !isNaN(price) ? (
        price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      ) : (
        'N/A'
      )}
      {isChange && percentage && (
        <span className="ml-1">
          ({isPositive ? '+' : ''}{Number(percentage).toFixed(2)}%)
        </span>
      )}
    </span>
  );
}