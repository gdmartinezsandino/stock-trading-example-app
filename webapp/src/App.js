import React, { useContext } from 'react';
import { TradingProvider, TradingContext } from './context/TradingProvider';
import Home from './pages/Home';
import Login from './pages/Login';

const AppContent = () => {
  const { token } = useContext(TradingContext);
  return token ? <Home /> : <Login />;
};

const App = () => {
  return (
    <TradingProvider>
      <AppContent />
    </TradingProvider>
  );
};

export default App;
