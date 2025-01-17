import React from "react";
import { Stock } from "../../models/stock";
import AddSubscriptionForm from "../subscriptions/AddSubscriptionForm";
type StockItemProps = {
  stocks: Stock[];
};
const StockItem: React.FC<StockItemProps> = ({ stocks }) => {
  return (
    <div className="d-flex">
      <h2>Stocks</h2>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Current</th>
            <th>Percent Change</th>
            <th>Daily High</th>
            <th>Daily Low</th>
            <th>Opening Price</th>
            <th>Previous Close</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.current.toFixed(2) + stock.high.toFixed(2)}
              style={{ verticalAlign: "middle" }}
            >
              <td>{stock.ticker}</td>
              <td>{stock.current.toFixed(2)}</td>
              <td>{stock.percentChange.toFixed(3) + "%"}</td>
              <td>{stock.high.toFixed(2)}</td>
              <td>{stock.low.toFixed(2)}</td>
              <td>{stock.openingPrice.toFixed(2)}</td>
              <td>{stock.previousClose.toFixed(2)}</td>
              <td>
                <AddSubscriptionForm stock={stock} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockItem;
