import axios from 'axios';

import { useAuth } from '../context/AuthContext';

export const fetchPortfolio = async (user) => {
  
  const responseSummary = await axios.get(`http://localhost:8080/api/stocks/portfolio-summary/${user.token}`);

  const responseHoldings = await axios.get(`http://localhost:8080/api/stocks/holdings/${user.token}`);

  console.log(responseHoldings.data);
  console.log(responseSummary.data);

  const response = {
    summary: responseSummary.data,
    holdings: responseHoldings.data,
  }
  return response;
};

export const addHolding = async (holding) => {
  const response = await axios.post(`http://localhost:8080/api/stocks/holdings`, holding);
  return response.data;
};

export const deleteHolding = async (id) => {
  await axios.delete(`${API_URL}/holdings/${id}`);
};