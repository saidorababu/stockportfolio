import { Line } from 'react-chartjs-2';
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PortfolioChart({ portfolio }) {
  const data = {
    labels: portfolio.history.map(h => h.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolio.history.map(h => h.value),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Line data={data} options={options} />
    </div>
  );
}