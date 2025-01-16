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

      <StockItem stocks={stocks} />
    </div>
  );
};

export default StockList;
