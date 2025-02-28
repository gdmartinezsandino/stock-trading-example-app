import React, { useContext, useState } from "react";
import { TradingContext } from "../context/TradingProvider";

const TradeControls = () => {
  const { tradeStock } = useContext(TradingContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="p-4 flex gap-2">
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-2 rounded-md"
      />
      <button
        onClick={() => tradeStock("buy", quantity)}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Buy
      </button>
      <button
        onClick={() => tradeStock("sell", quantity)}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Sell
      </button>
    </div>
  );
};

export default TradeControls;
