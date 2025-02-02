import React from "react";
import SubscriptionItem from "./SubscriptionItem";
import EditSubscriptionForm from "./EditSubscriptionForm";
import DeleteSubscriptionForm from "./DeleteSubscriptionForm";
const SubscriptionList = ({ subscriptions }) => {
  const onTickerClick = (tickerSymbol) => {};
  return (
    <div>
      <h2>Subscriptions</h2>
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
          {console.log("sub list subs: " + subscriptions)}
          {subscriptions.map((sub) => (
            <tr key={sub.tickerSymbol + sub.threshold.toFixed(2)}>
              <td>{sub.tickerSymbol}</td>
              <td>{sub.threshold.toFixed(2)}</td>
              <td>{sub.position == 0 ? "Above" : "Below"}</td>
              <td>
                <EditSubscriptionForm subscription={sub} />{" "}
                <DeleteSubscriptionForm subscription={sub} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;
