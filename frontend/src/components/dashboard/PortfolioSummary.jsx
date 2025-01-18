import React from 'react';

export default function PortfolioSummary({ portfolio }) {
  // Provide safe defaults for each property
  const safePortfolio = {
    totalValue: portfolio?.totalValue || 0,
    totalChange: portfolio?.totalChange || 0,
    topPerformerTicker: portfolio?.topPerformerTicker || '-',
    topPerformerChange: portfolio?.topPerformerChange || 0,
  };

  const metrics = [
    {
      label: 'Total Value',
      value: `$${Number(safePortfolio.totalValue).toLocaleString()}`,
      change: null, // No percentage for total value
    },
    {
      label: 'Total Change',
      value: `${safePortfolio.totalChange >= 0 ? '+' : ''}$${Number(safePortfolio.totalChange).toLocaleString()}`,
      change: safePortfolio.totalChange,
    },
    {
      label: 'Top Performer',
      value: safePortfolio.topPerformerTicker,
      change: `$${Number(safePortfolio.topPerformerChange).toLocaleString()}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <p className="text-sm text-gray-500">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
          {metric.change !== null && (
            <p
              className={`mt-2 ${
                metric.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change >= 0 ? '+' : ''}
              {metric.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
