import React from "react";
import { Stock } from "../../models/stock";

type StockItemProps = {
  stocks: Stock[];
};
const StockItem: React.FC<StockItemProps> = ({ stocks }) => {
  return (
    <div>
      <h2>Stocks</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Threshold</th>
            <th>Position (Stock goes above or below)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.current.toFixed(2) + stock.high.toFixed(2)}>
              <td>{stock.current.toFixed(2)}</td>
              <td>{stock.high.toFixed(2)}</td>
              <td>{stock.low.toFixed(2)}</td>
              <td>Placeholder for Update/cancel </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockItem;
