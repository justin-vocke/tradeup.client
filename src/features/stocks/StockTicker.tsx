import React, { useState } from "react";
import useSignalR from "../../hooks/useSignalr";

const HUB_URL = "https://localhost:5001/stockHub"; // Need to extract this to remove magic string

const StockTicker: React.FC = () => {
  const [tickerSymbol, setTickerSymbol] = useState<string>("");
  const stockData = useSignalR(HUB_URL, tickerSymbol);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTickerSymbol(e.target.value.toUpperCase()); // Ticker symbols are usually uppercase
  };

  const handleSubscribe = () => {
    if (tickerSymbol.trim()) {
      setTickerSymbol("");
    }
  };
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-3">Live Stock Updates</h2>
      <input
        type="text"
        placeholder="Enter Stock Symbol"
        value={tickerSymbol}
        onChange={handleChange}
        className="mb-3 p-2 text-black rounded"
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      {stockData ? (
        <div className="mb-2 p-2 bg-gray-800 rounded">
          <strong>{stockData.symbol}</strong> - $
          {stockData.lastPrice.toFixed(2)}
          <span className="ml-2 text-sm text-gray-400">({stockData.time})</span>
        </div>
      ) : (
        <div className="text-gray-400">Enter a symbol to get live updates.</div>
      )}
    </div>
  );
};

export default StockTicker;
