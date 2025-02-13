import { useState } from "react";
import useSignalR from "../../hooks/useSignalr";

const HUB_URL = "http://localhost:5000/stockHub";

const StockSubscription = () => {
  const { subscribeToStock, stockData } = useSignalR(HUB_URL);
  const [ticker, setTicker] = useState("");

  const handleSubscribe = () => {
    if (ticker.trim()) {
      subscribeToStock(ticker);
      setTicker(""); // Clear input
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker"
      />
      <button onClick={handleSubscribe}>Subscribe</button>

      {stockData && (
        <div>
          <h3>Stock Data:</h3>
          <p>Ticker: {stockData.ticker}</p>
          <p>Price: {stockData.price}</p>
        </div>
      )}
    </div>
  );
};

export default StockSubscription;
