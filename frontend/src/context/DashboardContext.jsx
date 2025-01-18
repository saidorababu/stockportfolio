import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchPortfolio } from '../services/portfolioService';
import toast from 'react-hot-toast';

// Create the context
const DashboardContext = createContext();

// // Dashboard context provider component
// export const DashboardProvider = ({ children }) => {
  

  

//   // Fetch portfolio data when the context provider is mounted
//   // useEffect(() => {
//   //   loadPortfolio();
//   // }, []);

//   // Context value
//   const value = {
//     portfolio,
//     isLoading,
//     loadPortfolio,
//   };

//   return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
// };

// Custom hook to use the DashboardContext
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
