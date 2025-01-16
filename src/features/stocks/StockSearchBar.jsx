import React, { useState, useEffect } from "react";
import { useGetStockDataQuery } from "../../Apis/stockApi";

const StockSearchBar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [errorMessage, setError] = useState(null);

  // Hook for fetching stock data
  const { data, error, isLoading } = useGetStockDataQuery(
    triggerFetch ? symbol : null,
    {
      skip: !triggerFetch, // Skip the query until explicitly triggered
    }
  );

  // Effect to handle data after fetching
  useEffect(() => {
    if (data && !isLoading && !error) {
      onSearch(data);
      setTriggerFetch(false); // Reset triggerFetch to avoid unnecessary re-fetching
    }
    if (error) {
      console.log(error);
      setError("Failed to fetch stock data.");
      setTriggerFetch(false);
    }
  }, [data, isLoading, error, onSearch]);

  const handleSearch = () => {
    if (!symbol) {
      setError("Please enter a stock symbol.");
      return;
    }

    setError(null);
    setTriggerFetch(true); // Trigger the query
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Search</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default StockSearchBar;
