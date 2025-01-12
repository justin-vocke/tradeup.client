import React from "react";
import { Stock } from "../../models/stock";
import StockItem from "./StockItem";

type StockListProps = {
  stocks: Stock[];
};
const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <div>
      <h2>Stock Prices</h2>
      {stocks.map((stock) => (
        <StockItem key={stock.ticker} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
