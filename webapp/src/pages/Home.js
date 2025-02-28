import React, { useContext } from 'react';
import styled from 'styled-components';

import StockChart from '../components/StockChart';
import BalanceInfo from '../components/BalanceInfo';
import TradeControls from '../components/TradeControls';
import { TradingContext } from '../context/TradingProvider';

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  padding: 40px 25px;
  border-radius: 12px;
  box-shadow: 1px 2px 14px -1px rgba(0,0,0,0.75);
`;

const Heading = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h1 {
    margin-bottom: 0;
    color: #C0C9CA;
    font-family: "Poppins", serif;
    font-size: 35px;
  }
`;

const Main = styled.div`
  margin-top: 24px;
`;

const Home = () => {
  const { logout } = useContext(TradingContext);

  return (
    <Container>
      <Heading>
        <h1>Stock Trading App</h1>
        <button onClick={logout}>
          <span class="material-symbols-outlined">logout</span>
        </button>
      </Heading>

      <BalanceInfo />

      <Main>        
        <TradeControls />
        <StockChart />
      </Main>
    </Container>
  );
};

export default Home;
