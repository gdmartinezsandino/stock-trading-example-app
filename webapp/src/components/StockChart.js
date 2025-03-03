import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

import { TradingContext } from '../context/TradingProvider';

const Container = styled.div`
  margin-top: 12px;
`;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  const { priceHistory } = useContext(TradingContext);

  if (!Array.isArray(priceHistory)) {
    return <p className="text-gray-500">Loading price history...</p>;
  }

  const chartData = {
    labels: priceHistory.map((data) => new Date(data.time).toLocaleTimeString()),
    datasets: [
      {
        label: 'Stock Price',
        data: priceHistory.map((data) => data.price),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Container>
        {priceHistory.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>Loading price history...</p>
        )}
    </Container>
  );
};

export default StockChart;
