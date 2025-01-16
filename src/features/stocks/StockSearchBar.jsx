import React, { useState, useEffect } from "react";
import { useGetStockDataQuery } from "../../Apis/stockApi";
import { sp500StockList } from "../../utils/stocks";
const StockSearchBar = ({ onSearch }) => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Filter stocks by user input
    if (input) {
      const matches = sp500StockList.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(input.toLowerCase()) ||
          stock.name.toLowerCase().includes(input.toLowerCase())
      );
      console.log(matches);
      setFilteredStocks(matches);
    } else {
      setFilteredStocks([]);
    }
  };

  const handleSelectStock = (stock) => {
    setSearchTerm(stock.symbol); // Populate the input with the selected stock symbol
    setFilteredStocks([]); // Clear the dropdown
  };
  // Hook for fetching stock data
  const { data, error, isLoading } = useGetStockDataQuery(
    triggerFetch ? searchTerm : null,
    {
      skip: !triggerFetch, // Skip the query until explicitly triggered
    }
  );

  // Effect to handle data after fetching
  useEffect(() => {
    if (data && !isLoading && !error) {
      onSearch(data);
      console.log("useeffect in stocksearchbar");

      setTriggerFetch(false); // Reset triggerFetch to avoid unnecessary re-fetching
    }
    if (error) {
      console.log(error);
      setError("Failed to fetch stock data.");
      // Reset triggerFetch only if there was an error

      setTriggerFetch(false);
    }
  }, [data, isLoading, error]);

  const handleSearch = () => {
    if (!searchTerm) {
      setError("Please enter a stock symbol.");
      return;
    }

    setError(null);
    setTriggerFetch(true); // Trigger the query
  };

  return (
    <div>
      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a stock"
          style={{ width: "100%", padding: "8px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px", cursor: "pointer" }}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
        {filteredStocks.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              maxHeight: "200px",
              overflowY: "auto",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {filteredStocks.map((stock) => (
              <li
                key={stock.symbol}
                onClick={() => handleSelectStock(stock)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {stock.symbol} - {stock.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default StockSearchBar;
