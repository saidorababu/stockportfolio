import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import StockHoldings from '../components/dashboard/StockHoldings';
import PortfolioChart from '../components/dashboard/PortfolioChart';
import AddStockModal from '../components/dashboard/AddStockModal';
import { fetchPortfolio } from '../services/portfolioService';
import { useAuth } from '../context/AuthContext'; // Import the context provider
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [portfolio, setPortfolio] = useState({
  //   summary: {},
  //   holdings: [],
  // }); // Holds the portfolio data
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  const { user, portfolio, portfolioLoading, loadPortfolio } = useAuth();

  // const {user } = useAuth();

  // Function to fetch and load the portfolio data
  // const loadPortfolio = async () => {
  //   try {
  //     setIsLoading(true);
  //     const data = await fetchPortfolio(user);
  //     // Handle the case where holdings are not found or an error message is returned
  //     if (typeof data.holdings === 'string' && data.holdings === 'No portfolios found for this user.') {
  
  //       setPortfolio({
  //         summary: {
  //           totalValue: 0,
  //           totalChange: 0,
  //           dailyChange: 0,
  //           topPerformer: { symbol: '-', change: 0 },
  //         },
  //         holdings: [],
  //       });
  //       toast('No stocks found in the portfolio.', {
  //         style: {
  //           background: '#e3f2fd', // Light blue background
  //           color: '#0d47a1',      // Dark blue text
  //         },
  //         icon: 'ℹ️',
  //       });
  //     } else {
  //       setPortfolio(data);
  //     }
  //   } catch (error) {
  //     toast.error('Failed to load portfolio');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadPortfolio();
  // }, [user]);

  if (portfolioLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
      </div>

      <PortfolioSummary portfolio={portfolio.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* <PortfolioChart portfolio={portfolio} /> */}
        <StockHoldings 
          holdings={portfolio.holdings} 
          onUpdate={loadPortfolio}
        />
      </div>

      {/* <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={loadPortfolio}
      /> */}
    </div>
  );
}
