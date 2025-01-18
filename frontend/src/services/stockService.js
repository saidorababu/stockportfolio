import axios from 'axios';
const API_URL = 'https://api.twelvedata.com/time_series';

const API_KEYS = [
  'e81dbf2504ce43239381926950226928', // khsd118194@gmail.com
  'ea1a6eb075a24df18b9fe3dc20469609', // khsaidorababu219@gmail.com
  '351621a8538b42168dfcafbc56f4eb7b', // khsdorababu11819@gmail.com
  '4ad764c35ba44c6c88fbd1604069112b',  // coderr912@gmail.com
  '52cb795c776f404abfbdf6a7e0028867', // khsdorababu.pc@gmail.com
  '171587164539423193268477e9ddaef9' // khsaidorababu@gmail.com
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * API_KEYS.length);
  return API_KEYS[randomIndex];
}

export const fetchStockRealtimePrice = async (symbol) => {
  const API_KEY = getRandomApiKey();
  const response = await axios.get("https://api.twelvedata.com/price", {
    params: {
      symbol: symbol,
      apikey: API_KEY,
    },
  });
  await updateStockRealtimePrice(symbol,response.data.price);
  return response.data;
};


export const updateStockRealtimePrice = async (symbol,price) => {
  const response = await axios.post("http://localhost:8080/api/stocks/updatePrice", {
    ticker: symbol,
    price: price
  });
  return response.data;
}

export const fetchStockData = async (symbol) => {
  const API_KEY = getRandomApiKey();
  const response = await axios.get("https://api.twelvedata.com/quote", {
    params: {
      symbol: symbol, // Replace with a stock symbol
      apikey: API_KEY,
    },
  });
  return response.data; // Returns stock prices
};

export const fetchStockOverTime = async (symbol) => {
  const API_KEY = getRandomApiKey();
  const response = await axios.get("https://api.twelvedata.com/time_series", {
    params: {
      symbol: symbol,
      apikey: API_KEY,
      interval: '5min',
    },
  });
  return response.data; // Returns stock details
};

// Add stock to portfolio
export const buyStock = async ({ symbol, quantity, price, jwtToken }) => {
  const endpoint = `http://localhost:8080/api/stocks/buy`;
  const payload = {
    ticker: symbol,
    quantity,
    price,
    jwtToken,
  };
  const response = await axios.post(endpoint, payload);
  return response.data;
};

// Sell stock from portfolio
export const sellStock = async ({ symbol, quantity, price, jwtToken }) => {
  const endpoint = `http://localhost:8080/api/stocks/sell`;
  const payload = {
    ticker: symbol,
    quantity,
    jwtToken,
    price
  };
  const response = await axios.post(endpoint, payload);
  return response.data;
};
