import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';

import { fetchPortfolio } from '../services/portfolioService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const cookies = new Cookies();

  const [portfolio, setPortfolio] = useState({
      summary: {},
      holdings: [],
    });

    // Fetch user details from the backend using the token
    const fetchUserDetails = async (token) => {
      try {
        console.log(token);
        const response = await axios.get(`http://localhost:8080/api/auth/user/${token}`); // Modify the URL as per your backend
        response.data.token = token; // Attach the token to the user object
        setUser(response.data); // Assuming the backend returns user data under 'data'
      } catch (error) {
        console.error('Failed to fetch user details', error.response?.data || error.message);
      } finally {
        setUserLoading(false); // Mark loading as complete
      }
    };

    const loadPortfolio = async () => {
        try {
          setPortfolioLoading(true);
          const data = await fetchPortfolio(user);
          // Handle the case where holdings are not found or an error message is returned
          if (typeof data.holdings === 'string' && data.holdings === 'No portfolios found for this user.') {
            setPortfolio({
              summary: {
                totalValue: 0,
                totalChange: 0,
                dailyChange: 0,
                topPerformer: { symbol: '-', change: 0 },
              },
              holdings: [],
            });
            toast('No stocks found in the portfolio.', {
              style: {
                background: '#e3f2fd', // Light blue background
                color: '#0d47a1',      // Dark blue text
              },
              icon: 'ℹ️',
            });
          } else {
            setPortfolio(data);
          }
        } catch (error) {
          // toast.error('Failed to load portfolio');
        } finally {
          setPortfolioLoading(false);
        }
    };
    

  useEffect(() => {
    const token = cookies.get('jwtToken'); // Get the token from cookies
    console.log(token);
    if (token) {
      fetchUserDetails(token);
      loadPortfolio();
    } else {
      setUserLoading(false); // If no token, mark loading as complete
      // navigate('/home');
    }
  }, []);


  const login = async (credentials) => {
    try {
      const response = await axios.post( 'http://localhost:8080/api/auth/login',credentials,{ withCredentials: true });
      console.log(response.data);
      // Save the token to cookies for 10 hours
      cookies.set('jwtToken', response.data.token, {
        path: '/',
        maxAge: 3600 * 10, // 10 hours
        sameSite: 'strict',
      });
      setUser(response.data); 
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        userData,
        { withCredentials: true }
      );

      // Save the token to localStorage
      localStorage.setItem('jwtToken', response.data.token);

      setUser(response.data.user); // Assuming the response contains user info under 'user'
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  const logout = async () => {
    // Optionally clear the token on logout
    // localStorage.removeItem('jwtToken');
    setUser(null);
  };

  const updateUsername = (newUsername) => {
    setUser((prevUser) => {
      if (!prevUser) return null; // Handle cases where user is not logged in
      return { ...prevUser, username: newUsername };
    });
  };

  return (
    <AuthContext.Provider value={{ user, portfolio, userLoading, portfolioLoading, fetchUserDetails,loadPortfolio, login, register, logout, updateUsername }}>
      {!userLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
