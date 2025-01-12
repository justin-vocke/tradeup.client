import React from "react";
import { Stock } from "../../models/stock";

type StockItemProps = {
  stock: Stock;
};
const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  return (
    <div>
      <strong>{stock.ticker}</strong>: ${stock.price.toFixed(2)}
    </div>
  );
};

export default StockItem;
