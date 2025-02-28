import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { TradingContext } from "../context/TradingProvider";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  const { priceHistory } = useContext(TradingContext);

  // Ensure priceHistory is an array before mapping
  if (!Array.isArray(priceHistory)) {
    return <p className="text-gray-500">Loading price history...</p>;
  }

  // Prepare chart data
  const chartData = {
    labels: priceHistory.map((data) => new Date(data.time).toLocaleTimeString()), // Time on x-axis
    datasets: [
      {
        label: "Stock Price",
        data: priceHistory.map((data) => data.price), // Stock price on y-axis
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-64 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Stock Price History</h2>
      {priceHistory.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p className="text-gray-500">Loading price history...</p>
      )}
    </div>
  );
};

export default StockChart;
