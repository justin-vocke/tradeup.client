import React from "react";
import StockSearchBar from "./StockSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { addStock } from "../../Storage/Redux/stockSlice";
import StockItem from "./StockItem";

const StockSearchBarWrapper = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stockStore.stockList);
  const handleStockData = (data) => {
    console.log("handle stock data called");
    dispatch(addStock(data));
  };
  return (
    <div>
      <h1>Stock Search</h1>
      <StockSearchBar onSearch={handleStockData} />
      {stocks && <StockItem stocks={stocks} />}
    </div>
  );
};

export default StockSearchBarWrapper;
