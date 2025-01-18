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
  Legend,
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

export default function StockChart({ data }) {
  const formatDatetime = (datetime) => {
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Prepare chart data
  const chartData = {
    labels: data.values.map((entry) => formatDatetime(entry.datetime)),
    datasets: [
      {
        label: 'Closing Price (USD)',
        data: data.values.map((entry) => parseFloat(entry.close)), // Y-axis values
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill under the line
        tension: 0.4, // Smooth lines
        borderWidth: 2, // Line thickness
        pointRadius: 4, // Point size
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
      },
    ],
  };

  // Chart options with tooltip customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Stock Price for ${data.meta.symbol}`,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Get the Y-axis value (price)
            const label = tooltipItem.label; // Get the X-axis label (datetime)
            return `Price: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Datetime',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Line data={chartData} options={options} />
    </div>
  );
}
