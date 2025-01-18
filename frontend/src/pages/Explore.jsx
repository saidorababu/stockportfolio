import { useState, useEffect } from 'react';
import React from 'react';
import StockList from '../components/explore/StockList';
import TopStocks from '../components/explore/TopStocks';
import SearchBar from '../components/explore/SearchBar';
import { fetchStockRealtimePrice, fetchStockData } from '../services/stockService';
import LoadingPage from '../components/common/LoadingPage';
import toast from 'react-hot-toast';
import axios from 'axios';


const allstocks = [
  { symbol: "AAPL", name: "Apple Inc.", icon: "https://logo.clearbit.com/apple.com" },
  { symbol: "MSFT", name: "Microsoft Corporation", icon: "https://logo.clearbit.com/microsoft.com" },
  { symbol: "GOOGL", name: "Alphabet Inc. (Google Class A)", icon: "https://logo.clearbit.com/google.com" },
  { symbol: "AMZN", name: "Amazon.com Inc.", icon: "https://logo.clearbit.com/amazon.com" },
  { symbol: "TSLA", name: "Tesla Inc.", icon: "https://logo.clearbit.com/tesla.com" },
  { symbol: "META", name: "Meta Platforms Inc. (formerly Facebook)", icon: "https://logo.clearbit.com/meta.com" },
  { symbol: "NFLX", name: "Netflix Inc.", icon: "https://logo.clearbit.com/netflix.com" },
  { symbol: "NVDA", name: "NVIDIA Corporation", icon: "https://logo.clearbit.com/nvidia.com" },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc. Class B", icon: "https://logo.clearbit.com/berkshirehathaway.com" },
  { symbol: "JNJ", name: "Johnson & Johnson", icon: "https://logo.clearbit.com/jnj.com" },
  { symbol: "V", name: "Visa Inc.", icon: "https://logo.clearbit.com/visa.com" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", icon: "https://logo.clearbit.com/jpmorganchase.com" },
  { symbol: "WMT", name: "Walmart Inc.", icon: "https://logo.clearbit.com/walmart.com" },
  { symbol: "PG", name: "Procter & Gamble Co.", icon: "https://logo.clearbit.com/pg.com" },
  { symbol: "DIS", name: "The Walt Disney Company", icon: "https://logo.clearbit.com/disney.com" },
  { symbol: "BABA", name: "Alibaba Group Holding Ltd.", icon: "https://logo.clearbit.com/alibaba.com" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", icon: "https://logo.clearbit.com/exxonmobil.com" },
  { symbol: "KO", name: "Coca-Cola Company", icon: "https://logo.clearbit.com/coca-cola.com" },
  { symbol: "PFE", name: "Pfizer Inc.", icon: "https://logo.clearbit.com/pfizer.com" },
  { symbol: "CSCO", name: "Cisco Systems Inc.", icon: "https://logo.clearbit.com/cisco.com" },
];


const famousStocks = [
  { symbol: "AAPL", name: "Apple Inc.", icon: "https://logo.clearbit.com/apple.com" },
  // { symbol: "MSFT", name: "Microsoft Corporation", icon: "https://logo.clearbit.com/microsoft.com" },
  // { symbol: "GOOGL", name: "Alphabet Inc. (Google Class A)", icon: "https://logo.clearbit.com/google.com" },
  // { symbol: "AMZN", name: "Amazon.com Inc.", icon: "https://logo.clearbit.com/amazon.com" },
  // { symbol: "TSLA", name: "Tesla Inc.", icon: "https://logo.clearbit.com/tesla.com" },
  // { symbol: "META", name: "Meta Platforms Inc. (formerly Facebook)", icon: "https://logo.clearbit.com/meta.com" },
  // { symbol: "NFLX", name: "Netflix Inc.", icon: "https://logo.clearbit.com/netflix.com" },
  // { symbol: "NVDA", name: "NVIDIA Corporation", icon: "https://logo.clearbit.com/nvidia.com" },
  // { symbol: "BRK.B", name: "Berkshire Hathaway Inc. Class B", icon: "https://logo.clearbit.com/berkshirehathaway.com" },
  // { symbol: "JNJ", name: "Johnson & Johnson", icon: "https://logo.clearbit.com/jnj.com" },
  // { symbol: "V", name: "Visa Inc.", icon: "https://logo.clearbit.com/visa.com" },
  // { symbol: "JPM", name: "JPMorgan Chase & Co.", icon: "https://logo.clearbit.com/jpmorganchase.com" },
  // { symbol: "WMT", name: "Walmart Inc.", icon: "https://logo.clearbit.com/walmart.com" },
  // { symbol: "PG", name: "Procter & Gamble Co.", icon: "https://logo.clearbit.com/pg.com" },
  // { symbol: "DIS", name: "The Walt Disney Company", icon: "https://logo.clearbit.com/disney.com" },
  // { symbol: "BABA", name: "Alibaba Group Holding Ltd.", icon: "https://logo.clearbit.com/alibaba.com" },
  // { symbol: "XOM", name: "Exxon Mobil Corporation", icon: "https://logo.clearbit.com/exxonmobil.com" },
  // { symbol: "KO", name: "Coca-Cola Company", icon: "https://logo.clearbit.com/coca-cola.com" },
  // { symbol: "PFE", name: "Pfizer Inc.", icon: "https://logo.clearbit.com/pfizer.com" },
  // { symbol: "CSCO", name: "Cisco Systems Inc.", icon: "https://logo.clearbit.com/cisco.com" },
];

export default function Explore() {
  const [stocks, setStocks] = useState([]);
  const [topStocks, setTopStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStocks();
  }, []);

  const getallStockNames = async (API_KEY) => {
    const response = await axios.get('https://api.twelvedata.com/stocks', {
      params: {
        apikey: API_KEY,
      },
    });
    console.log(response.data);
    return response.data
  }

  const loadStocks = async () => {
    try {
      const stocksPrices = await Promise.all(
        famousStocks.map((stock) => fetchStockRealtimePrice(stock.symbol))
      );
      const stocksData = await Promise.all(
        famousStocks.map((stock) => fetchStockData(stock.symbol))
      );
      console.log(famousStocks);
      console.log(stocksData);
      console.log(stocksPrices);
      stocksData.forEach((stock, index) => {
        stock.symbol = famousStocks[index].symbol;
        stock.price = stocksPrices[index].price;
        stock.name = famousStocks[index].name;
        stock.icon = famousStocks[index].icon;
      });

      setStocks(stocksData);
    } catch (error) {
      toast.error('Failed to load stocks');
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async (query) => {
    try {
      for(let stock of allstocks){

        const symbol = stock.symbol.toLowerCase();
        const name = stock.name.toLowerCase();
        query = query.toLowerCase();

        if(symbol === query || symbol.includes(query)){
          const stocksData = await fetchStockData(stock.symbol);
          const stocksPrices = await fetchStockRealtimePrice(stock.symbol);
          stocksData.symbol = stock.symbol;
          stocksData.price = stocksPrices.price;
          stocksData.name = stock.name;
          stocksData.icon = stock.icon;
          setStocks([stocksData]);
          return;
        }

        if(name.includes(query)){
          const stocksData = await fetchStockData(stock.symbol);
          const stocksPrices = await fetchStockRealtimePrice(stock.symbol);
          stocksData.symbol = stock.symbol;
          stocksData.price = stocksPrices.price;
          stocksData.name = stock.name;
          stocksData.icon = stock.icon;
          setStocks([stocksData]);
          return;
        }
      }
      
    } catch (error) {
      toast.error('Search failed');
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Stocks</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StockList stocks={stocks} />
        </div>
        {/* <div>
          <TopStocks stocks={topStocks} />
        </div> */}
      </div>
    </div>
  );
}