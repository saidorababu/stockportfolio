import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchStockOverTime,
  fetchStockRealtimePrice,
  fetchStockData,
  buyStock,
  sellStock,
} from '../services/stockService';
import StockChart from '../components/stock/StockChart';
import StockInfo from '../components/stock/StockInfo';
import StockStats from '../components/stock/StockStats';
import toast from 'react-hot-toast';
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function StockDetail() {
  const { symbol } = useParams();
  const { user } = useAuth();
  const [stockDetailOverTime, setStockDetailOverTime] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0); // For buy/sell
  const [isBuying, setIsBuying] = useState(false); // Toggle between buy/sell

  useEffect(() => {
    loadStockDetails();
  }, [symbol]);

  const loadStockDetails = async () => {
    try {
      const stockdetailovertime = await fetchStockOverTime(symbol);
      const stockprice = await fetchStockRealtimePrice(symbol);
      const stockdata = await fetchStockData(symbol);

      setStockPrice(stockprice);
      setStockDetailOverTime(stockdetailovertime);
      setStockData(stockdata);
    } catch (error) {
      toast.error('Failed to load stock details');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyOrSell = async () => {
    try {
      const payload = {
        symbol,
        quantity,
        price: stockPrice.price,
        jwtToken: user.token,
      };

      if (isBuying) {
        await buyStock(payload);
        toast.success('Stock bought successfully!');
      } else {
        await sellStock(payload);
        toast.success('Stock sold successfully!');
      }

      loadStockDetails(); // Reload stock data
    } catch (error) {
      toast.error(`Failed to ${isBuying ? 'buy' : 'sell'} stock: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!stockData) return <div>Stock not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <StockInfo stock={stockData} price={stockPrice.price} />
      <div className="mt-8">
        <StockChart data={stockDetailOverTime} />
      </div>
      <div className="mt-8">
        <StockStats stats={stockData} />
      </div>

      {/* Buy and Sell Actions */}
      <div className="mt-8 flex space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsBuying(true)}
        >
          Buy
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setIsBuying(false)}
        >
          Sell
        </button>
      </div>

      {/* Buy/Sell Modal */}
      <div className="mt-4">
        <h3 className="text-xl">{isBuying ? 'Buy' : 'Sell'} Stock</h3>
        <input
          type="number"
          placeholder="Enter quantity"
          className="border rounded px-2 py-1 w-1/3"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleBuyOrSell}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
