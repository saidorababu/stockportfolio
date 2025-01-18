import React from 'react';

export default function StockStats({ stats }) {
  const metrics = [
    { label: 'Open Price', value: stats.open, prefix: '$' },
    { label: 'High Price', value: stats.high, prefix: '$' },
    { label: 'Low Price', value: stats.low, prefix: '$' },
    { label: 'Close Price', value: stats.close, prefix: '$' },
    { label: 'Previous Close', value: stats.previous_close, prefix: '$' },
    { label: 'Percent Change', value: `${stats.percent_change}%` },
    { label: 'Volume', value: stats.volume },
    { label: 'Average Volume', value: stats.average_volume },
    { label: '52W High', value: stats.fifty_two_week.high, prefix: '$' },
    { label: '52W Low', value: stats.fifty_two_week.low, prefix: '$' },
    { label: 'Market Open', value: stats.is_market_open ? 'Yes' : 'No' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4">
              <dt className="text-sm font-medium text-gray-500">{metric.label}</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {metric.value !== undefined && metric.value !== null
                  ? typeof metric.value === 'number'
                    ? `${metric.prefix || ''}${metric.value.toLocaleString()}`
                    : metric.value
                  : 'N/A'}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
