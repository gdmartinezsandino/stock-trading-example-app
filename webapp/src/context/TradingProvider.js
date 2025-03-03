import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const TradingContext = createContext();

const TradingProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [price, setPrice] = useState(150);
  const [balance, setBalance] = useState(10000);
  const [shares, setShares] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);

  const login = async (email, password) => {
    try {
      const request = await fetch('http://localhost/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const response = await request.json();
      if (!request.ok) throw new Error(response.message || 'Login failed');
  
      localStorage.setItem('token', response.token);
      setToken(response.token);
      fetchUserData();
    } catch (error) {
      console.error('Login error: ', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };  
  
  const fetchUserData = async () => {
    if (!token) return;
    
    try {
      const request = await fetch('http://localhost/api/user/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      const response = await request.json();
      if (!response.ok) throw new Error(response.message || 'Failed to fetch user data');

      setBalance(response.user.balance);
      setShares(response.user.shares);
    } catch (error) {
      console.error('User data fetch error:', error.message);
    }
  };

  const tradeStock = async (type, quantity) => {
    if (!token) {
      console.error('Not authenticated!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost/api/trade', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ symbol: 'AAPL', type, quantity, price }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Trade failed');
  
      console.log('Trade successful', data.trade);
  
      // Update the balance and shares state
      setBalance(data.balance);
      setShares(data.shares);
    } catch (error) {
      console.error('Trade error:', error.message);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost', { 
      path: '/socket.io',
      transports: ['websocket', 'polling'], 
      withCredentials: true 
    });

    socket.on('stockPriceUpdate', (data) => {
      if (!data || !data.stockPrice) return;
      setPrice(data.stockPrice);
      setPriceHistory((prev) => [...prev.slice(-49), { time: Date.now(), price: data.stockPrice }]);
    });

    if (token) {
      fetchUserData();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <TradingContext.Provider value={{ token, login, logout, price, balance, shares, priceHistory, tradeStock }}>
      {children}
    </TradingContext.Provider>
  );
};

export { TradingProvider, TradingContext };
