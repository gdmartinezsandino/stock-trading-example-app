import React, { useContext } from 'react';
import styled from 'styled-components';

import { TradingContext } from '../context/TradingProvider';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto max-content;
`;

const ContainerBalance = styled.div`
  h3 {
    color: #969697;
    font-size: 14px;
    margin-bottom: 4px;
    font-family: 'Poppins', serif;
  }

  p {
    color: #000000;
    font-size: 26px;
    margin: 0;
    font-family: 'Poppins', serif;
  }
`;

const ContainerShares = styled.div`
  grid-column: 1 / -1;
  margin-top: 8px;

  h3 {
    color: #969697;
    font-size: 14px;
    margin-bottom: 4px;
    font-family: 'Poppins', serif;
  }

  p {
    color: #000000;
    font-size: 26px;
    margin: 0;
    font-family: 'Poppins', serif;
  }
`;

const ContainerPrice = styled.div`
  display: grid;
  grid-template-rows: max-content auto;
  grid-template-columns: auto max-content;
  align-items: center;
  column-gap: 8px;

  h3 {
    grid-row: 1;
    grid-column: 1 / -1;
    color: #969697;
    font-family: 'Poppins', serif;
    font-size: 14px;
    margin-bottom: 4px;
  }
    
  p {
    grid-row: 2;
    grid-column: 1;
    color: #000000;
    font-family: 'Poppins', serif;
    font-size: 26px;
    margin: 0;
  }

  span {
    grid-row: 2;
    grid-column: 2;
  }
`;

const PriceIndicatorIncrease = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: #89F67D;
  color: #000000;
  font-family: 'Poppins', serif;
`;

const PriceIndicatorDecrease = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: #FB354F;
  color: #000000;
  font-family: 'Poppins', serif;
`;

const BalanceInfo = () => {
  const { balance, price, shares, priceHistory } = useContext(TradingContext);

  const prevPrice = priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : null;
  const priceChange = prevPrice !== null ? (price > prevPrice ? 'up' : price < prevPrice ? 'down' : null) : null;

  return (
    <Container>
      <ContainerBalance>
        <h3>Your current balance</h3>
        <p>${Number(balance || 0).toFixed(2)}</p>
      </ContainerBalance>

      <ContainerPrice>
        <h3>Current Price</h3>
        <p>${Number(price || 0).toFixed(2)}</p>
        <span>
          {priceChange === 'up' && <PriceIndicatorIncrease>📈 Up</PriceIndicatorIncrease>}
          {priceChange === 'down' && <PriceIndicatorDecrease>📉 Down</PriceIndicatorDecrease>}
        </span>
      </ContainerPrice>

      <ContainerShares>
        <h3>Shares</h3>
        <p>{Number(shares)}</p>
      </ContainerShares>
    </Container>
  );
};

export default BalanceInfo;
